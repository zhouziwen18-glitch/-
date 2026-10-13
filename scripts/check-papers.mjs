/**
 * @file check-papers.mjs
 * @description 学术主页论文自检脚本（启动自更新）。
 *
 * 工作流程：
 *   1. 扫描「参考文献」收录文件夹下的所有 PDF；
 *   2. 与「已收录清单」比对，识别新增 PDF（按文件名 / 内容哈希 / DOI 三重去重）；
 *   3. 对每个新增 PDF 抽取元数据（标题、作者、年份、期刊、DOI 等）：
 *        - 优先使用 Crossref DOI 权威数据；
 *        - macOS 下用 Spotlight(mdls) 读取 PDF 内嵌标题/作者；
 *        - 兜底解析 PDF 首页文本与文件名约定；
 *   4. 将 PDF 复制到 public/论文/，并在 src/data/publications.ts 末尾追加条目；
 *   5. 更新「参考文献/.papers-registry.json」缓存，避免重复处理。
 *
 * 独立运行：  node scripts/check-papers.mjs [--init] [--dry-run]
 *   在 npm run dev / npm run build 启动时也会自动执行。
 */

import { readdir, readFile, writeFile, mkdir, copyFile } from 'fs/promises'
import { existsSync, readFileSync } from 'fs'
import { createHash } from 'crypto'
import { execFile } from 'child_process'
import { promisify } from 'util'
import { dirname, join, basename, extname, resolve } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { PDFParse } from 'pdf-parse'

const execFileAsync = promisify(execFile)

// ---------------------------------------------------------------------------
// 路径与配置
// ---------------------------------------------------------------------------
const __dirname = dirname(fileURLToPath(import.meta.url))
const SCRIPT_DIR = __dirname
// 「参考文献」收录文件夹（已纳入仓库：学术主页/参考文献）
const REFERENCES_DIR = process.env.REFERENCES_DIR
  ? resolve(process.env.REFERENCES_DIR)
  : resolve(SCRIPT_DIR, '../参考文献')
const PAPER_DIR = resolve(SCRIPT_DIR, '../public/论文') // 网站 PDF 目录
const DATA_FILE = resolve(SCRIPT_DIR, '../src/data/publications.ts')
const REGISTRY_FILE = join(REFERENCES_DIR, '.papers-registry.json')

// 若未找到收录文件夹，则在项目根目录下创建
const PROJECT_ROOT = resolve(SCRIPT_DIR, '../../')

// 本人署名（用于识别「第一作者」等标签）
const OWN_NAME_KEYS = ['周子文', 'Zhou Ziwen', 'Ziwen Zhou', 'Zhou, Ziwen', 'Ziwen']

// 期刊分类知识库（用于自动填充 journalCategory）
const KNOWN_JOURNALS = [
  {
    keys: ['trends in food science'],
    name: 'Trends in Food Science and Technology',
    categories: ['SCI'],
    casPartition: '中科院1区',
    impactFactor: 16.0,
  },
  {
    keys: ['food research international'],
    name: 'Food Research International',
    categories: ['SCI'],
    casPartition: '中科院2区',
    impactFactor: 8.0,
  },
  {
    keys: ['lwt'],
    name: 'LWT - Food Science and Technology',
    categories: ['SCI'],
    casPartition: '中科院1区',
    impactFactor: 6.0,
  },
  {
    keys: ['international journal of food microbiology'],
    name: 'International Journal of Food Microbiology',
    categories: ['SCI'],
    casPartition: '中科院2区',
    impactFactor: 5.5,
  },
  {
    keys: ['lipids in health and disease'],
    name: 'Lipids in Health and Disease',
    categories: ['SCI'],
    casPartition: '中科院3区',
    impactFactor: 4.5,
  },
  {
    keys: ['frontiers in microbiology'],
    name: 'Frontiers in Microbiology',
    categories: ['SCI'],
    casPartition: '中科院2区',
    impactFactor: 6.0,
  },
  {
    keys: ['食品安全质量检测学报'],
    name: '食品安全质量检测学报',
    categories: ['北大核心', 'CSCD'],
  },
  {
    keys: ['福建农业学报'],
    name: '福建农业学报',
    categories: ['北大核心', 'CSCD'],
  },
  {
    keys: ['食品研究与开发'],
    name: '食品研究与开发',
    categories: ['北大核心'],
  },
  {
    keys: ['食品工业'],
    name: '食品工业',
    categories: ['北大核心'],
  },
  {
    keys: ['环境与职业医学'],
    name: '环境与职业医学',
    categories: ['北大核心', 'CSCD'],
  },
]

// 常见期刊分类知识库覆盖不足时的兜底映射（保留以备扩展）
// 目前全部已知期刊已在 KNOWN_JOURNALS 中，此表暂空。
const JOURNAL_FALLBACK_KEYS = []

// ---------------------------------------------------------------------------
// 通用工具
// ---------------------------------------------------------------------------
function sha1(data) {
  return createHash('sha1').update(data).digest('hex')
}

function hasChinese(text) {
  return /[\u4e00-\u9fa5]/.test(text)
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

function now() {
  return new Date().toISOString().slice(0, 10)
}

// 从文本中提取 DOI
function extractDoi(text) {
  if (!text) return null
  const m = String(text).match(/10\.\d{4,9}\/[^\s]+/)
  return m ? m[0].replace(/[.,;)]$/, '').trim() : null
}

// 读取目录下 PDF 文件列表
async function listPdfFiles(dir) {
  if (!existsSync(dir)) return []
  const names = await readdir(dir)
  return names.filter((n) => extname(n).toLowerCase() === '.pdf')
}

// macOS Spotlight 读取 PDF 内嵌元数据（标题 / 作者）
async function spotlightMeta(filePath) {
  try {
    const { stdout } = await execFileAsync('mdls', [
      '-name', 'kMDItemTitle',
      '-name', 'kMDItemAuthors',
      filePath,
    ])
    const titleMatch = stdout.match(/kMDItemTitle\s*=\s*"((?:[^"\\]|\\.)*)"/)
    const authorBlock = stdout.match(/kMDItemAuthors\s*=\s*\(([\s\S]*?)\)/)
    let authors = []
    if (authorBlock) {
      authors = [...authorBlock[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1])
    }
    const title = titleMatch ? titleMatch[1] : null
    if (!title) return { title: null, authors: [] }
    // 过滤掉疑似非标题的元数据（如出版商名）
    const cleanTitle = title.trim()
    return { title: cleanTitle, authors: authors.filter(Boolean) }
  } catch {
    return { title: null, authors: [] }
  }
}

// Crossref DOI 权威查询
async function crossrefLookup(doi, timeoutMs = 12000) {
  try {
    const url = `https://api.crossref.org/works/${encodeURIComponent(doi)}?mailto=zhou@example.org`
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    const resp = await fetch(url, { signal: controller.signal, headers: { accept: 'application/json' } })
    clearTimeout(timer)
    if (!resp.ok) return null
    const json = await resp.json()
    const msg = json.message
    if (!msg) return null
    return {
      title: Array.isArray(msg.title) && msg.title.length ? msg.title[0] : null,
      journal:
        Array.isArray(msg['container-title']) && msg['container-title'].length
          ? msg['container-title'][0]
          : null,
      year: msg.issued?.date_parts?.[0]?.[0] || msg['published-print']?.date_parts?.[0]?.[0] || null,
      volume: msg.volume || null,
      issue: msg.issue || null,
      page: msg.page || msg['article-number'] || null,
      authors: Array.isArray(msg.author)
        ? msg.author.map((a) => [a.given, a.family].filter(Boolean).join(' ')).filter(Boolean)
        : [],
    }
  } catch {
    return null
  }
}

// 用 pdf-parse 读取 PDF 首页文本与内嵌信息
async function parsePdf(filePath) {
  const buf = await readFile(filePath)
  const parser = new PDFParse({ data: buf })
  const info = await parser.getInfo().catch(() => null)
  const textRes = await parser.getText({ max: 2 }).catch(() => null)
  const text =
    typeof textRes === 'string'
      ? textRes
      : textRes && typeof textRes.text === 'string'
        ? textRes.text
        : ''
  let doi = null
  if (info && info.info && info.info.Custom) {
    doi = info.info.Custom.doi || info.info.Custom.DOI || null
  }
  if (!doi && info && info.info && info.info.Custom) {
    // 某些版本把 DOI 放在 info 的其他字段
    doi = info.info.doi || null
  }
  if (!doi) {
    doi = extractDoi(text)
  }
  const creationYear = info?.info?.Custom?.['CreationDate--Text']
    ? Number(String(info.info.Custom['CreationDate--Text']).match(/\b(19|20)\d{2}\b/)?.[0])
    : null
  return { text, doi, creationYear, pages: info?.total ?? null }
}

// 从 PDF 首页文本推断标题（取开头的连续标题行）
function inferTitleFromText(text) {
  if (!text) return null
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
  const titleLines = []
  for (const line of lines) {
    const stop =
      /^a\s*r\s*t\s*i\s*c\s*l\s*e\s*i\s*n\s*f\s*o/i.test(line) ||
      /\bkeywords\b/i.test(line) ||
      /\babstract\b/i.test(line) ||
      /\bintroduction\b/i.test(line) ||
      line.includes('@') ||
      /(university|institute|college|laborator|research center|china|journal|school of|hospital|center for)/i.test(
        line,
      ) ||
      line.length < 6
    if (stop) break
    titleLines.push(line)
  }
  if (titleLines.length === 0) return null
  const title = titleLines.join(' ')
  // 首行应首字母大写，长度合理
  if (title.length < 8) return null
  return title
}

// 从 PDF 首页文本推断作者列表（标题之后、单位之前）
function inferAuthorsFromText(text, title) {
  if (!text) return []
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
  const titleIdx = lines.findIndex((l) => title && l.startsWith(title.slice(0, 30)))
  let start = titleIdx >= 0 ? titleIdx + 1 : 0
  const out = []
  for (let i = start; i < lines.length; i++) {
    const line = lines[i]
    if (
      /(university|institute|college|laborator|research center|china|journal|school of|hospital|@|a r t i c l e i n f o|keywords|abstract|received|revised|accepted|available online)/i.test(
        line,
      ) &&
      !/\b(and|&)\b/i.test(line)
    ) {
      break
    }
    // 作者行通常含逗号分隔的人名，且不含中文标点或长句
    if (line.length < 200 && /,/.test(line)) {
      out.push(line)
    }
    if (out.length >= 2) break
  }
  if (out.length === 0) return []
  const joined = out.join(', ')
  const parts = joined
    .split(/\s*[,;]\s*/)
    .map((p) => p.replace(/[*†‡#]+$/, '').trim())
    .filter((p) => p.length > 1 && !/(\d{4})|doi|received|revised/i.test(p))
  return parts
}

// 从文件名推断信息（约定：`年份-标题...-作者.pdf`）
function parseFilename(file) {
  const base = basename(file, extname(file))
  let year = null
  let rest = base
  const ym = base.match(/^(19|20)\d{2}/)
  if (ym) {
    year = Number(ym[0])
    rest = base.slice(ym[0].length).replace(/^[\s\-_:：]+/, '')
  }
  // 中文：最后一个连字符后为作者，中间为标题
  let title = null
  let authors = null
  if (hasChinese(base)) {
    const parts = rest.split('-')
    if (parts.length >= 2) {
      authors = parts[parts.length - 1].trim()
      title = parts.slice(0, parts.length - 1).join('-').trim()
    } else {
      title = rest.trim()
    }
  } else {
    // 英文：`标题 - 期刊 - 作者` 或 `标题 - 作者`
    const parts = rest.split('-').map((p) => p.trim())
    if (parts.length >= 2) {
      title = parts[0]
      authors = parts[parts.length - 1]
    } else {
      title = rest.trim()
    }
  }
  return { year, title: title || null, authors: authors || null }
}

// 匹配期刊分类知识库
function matchJournalCategory(journalName) {
  if (!journalName) return null
  const jn = String(journalName).toLowerCase()
  const hit = KNOWN_JOURNALS.find((j) => j.keys.some((k) => jn.includes(k.toLowerCase())))
  if (!hit) return null
  return {
    name: hit.name,
    categories: hit.categories,
    casPartition: hit.casPartition,
    impactFactor: hit.impactFactor,
  }
}

// 从作者/单位文本推断合作单位（排除本人所在单位；规则需足够具体，避免误报）
function inferCollaboratingInstitutions(text) {
  if (!text) return []
  const found = []
  const rules = [
    { name: '希腊农业科学院', keys: ['nychas g', 'nychas g.-j', 'nychas, g', 'doulgeraki', '希腊农业科学院'] },
    { name: '复旦大学公共卫生学院', keys: ['fudan university', '复旦'] },
    { name: '上海海洋大学', keys: ['shanghai ocean university', '上海海洋大学'] },
    { name: '上海交通大学', keys: ['shanghai jiao tong university', '上海交通大学', 'renji hospital'] },
    { name: '浙江大学', keys: ['zhejiang university', '浙江大学'] },
    { name: '西班牙农业食品研究与技术研究所', keys: ['irta', 'aragon', 'cipriano taboada'] },
    { name: '葡萄牙布拉干萨理工学院', keys: ['polytechnic institute of bragan', 'instituto politécnico de bragan', 'bragan'] },
    { name: '爱尔兰食品生物科学', keys: ['teagasc', 'university college dublin', 'ucd'] },
    { name: '美国农业部', keys: ['usda', 'u.s. department of agriculture'] },
    { name: '中国农业大学', keys: ['china agricultural university', '中国农业大学'] },
  ]
  for (const rule of rules) {
    if (rule.keys.some((k) => text.toLowerCase().includes(k))) {
      found.push(rule.name)
    }
  }
  return found
}

// ---------------------------------------------------------------------------
// 数据文件读写
// ---------------------------------------------------------------------------
// 从 publications.ts 解析已收录的 PDF 文件名与 id、标题、DOI
function parseExistingPublications(content) {
  const known = new Map()
  const idSet = new Set()
  const pdfNameSet = new Set()
  const doiSet = new Set()
  const titleSet = new Set()
  const yearSet = new Set()

  // 提取 pdfPath
  const pdfRe = /pdfPath\s*:\s*'([^']+\.pdf)'/g
  let m
  while ((m = pdfRe.exec(content))) {
    const p = m[1].split('/').pop()
    if (p) pdfNameSet.add(p)
  }
  // 提取 id
  const idRe = /id\s*:\s*'([^']+)'/g
  while ((m = idRe.exec(content))) idSet.add(m[1])
  // 提取 title（近似，取引号内首个较长文本）
  const titleRe = /title:\s*'([^']{10,})'/g
  while ((m = titleRe.exec(content))) titleSet.add(m[1].trim())
  // 提取 link/DOI
  const doiRe = /https:\/\/doi\.org\/([^\s']+)/g
  while ((m = doiRe.exec(content))) doiSet.add(m[1])

  known.set('pdfNames', pdfNameSet)
  known.set('ids', idSet)
  known.set('titles', titleSet)
  known.set('dois', doiSet)
  return known
}

// 在 public/论文 下计算已有 PDF 的哈希集合
async function knownHashesInPaperDir() {
  const hashes = new Set()
  if (!existsSync(PAPER_DIR)) return hashes
  const names = await readdir(PAPER_DIR)
  for (const name of names) {
    if (extname(name).toLowerCase() !== '.pdf') continue
    try {
      const buf = await readFile(join(PAPER_DIR, name))
      hashes.add(sha1(buf))
    } catch {
      /* ignore */
    }
  }
  return hashes
}

async function loadRegistry() {
  try {
    if (!existsSync(REGISTRY_FILE)) return { files: {} }
    const raw = await readFile(REGISTRY_FILE, 'utf-8')
    const json = JSON.parse(raw)
    return { files: json.files || {} }
  } catch {
    return { files: {} }
  }
}

async function saveRegistry(registry) {
  await mkdir(REFERENCES_DIR, { recursive: true })
  await writeFile(
    REGISTRY_FILE,
    JSON.stringify({ version: 1, updatedAt: now(), files: registry.files }, null, 2),
    'utf-8',
  )
}

// ---------------------------------------------------------------------------
// 追加条目到 publications.ts
// ---------------------------------------------------------------------------
function appendPublications(entries) {
  let content
  try {
    content = readFileSync(DATA_FILE, 'utf-8')
  } catch {
    throw new Error(`无法读取数据文件：${DATA_FILE}`)
  }
  const closing = content.lastIndexOf(']')
  if (closing < 0) throw new Error('publications.ts 中未找到数组结束符 "]"')

  const blocks = entries.map((e) => formatEntry(e))
  const insertion = '\n' + blocks.join('\n') + '\n'
  const next = content.slice(0, closing) + insertion + content.slice(closing)
  return writeFile(DATA_FILE, next, 'utf-8')
}

// 将单条记录格式化为 TS 数组元素文本
function formatEntry(e) {
  const lines = []
  lines.push(`    // [auto] ${e.autoDate} 由「参考文献/${e.sourceFile}」自动收录`)
  lines.push(`    {`)
  lines.push(`      id: '${e.id}',`)
  lines.push(`      title: '${escapeTs(e.title)}',`)
  lines.push(`      authors: '${escapeTs(e.authors)}',`)
  lines.push(`      venue: '${escapeTs(e.venue)}',`)
  lines.push(`      year: ${e.year},`)
  lines.push(`      type: 'journal',`)
  if (e.link) lines.push(`      link: '${escapeTs(e.link)}',`)
  lines.push(`      pdfPath: '${escapeTs(e.pdfPath)}',`)
  if (e.tags && e.tags.length) {
    lines.push(`      tags: [${e.tags.map((t) => `'${escapeTs(t)}'`).join(', ')}],`)
  }
  if (e.journalCategory) {
    lines.push(`      journalCategory: {`)
    lines.push(`        name: '${escapeTs(e.journalCategory.name)}',`)
    lines.push(`        categories: [${e.journalCategory.categories.map((c) => `'${escapeTs(c)}'`).join(', ')}],`)
    if (e.journalCategory.casPartition) {
      lines.push(`        casPartition: '${escapeTs(e.journalCategory.casPartition)}',`)
    }
    if (e.journalCategory.impactFactor != null) {
      lines.push(`        impactFactor: ${e.journalCategory.impactFactor},`)
    }
    lines.push(`      },`)
  }
  if (e.collaboratingInstitutions && e.collaboratingInstitutions.length) {
    lines.push(
      `      collaboratingInstitutions: [${e.collaboratingInstitutions
        .map((c) => `'${escapeTs(c)}'`)
        .join(', ')}],`,
    )
  }
  lines.push(`    },`)
  return lines.join('\n')
}

function escapeTs(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

// ---------------------------------------------------------------------------
// 主流程
// ---------------------------------------------------------------------------
async function ensureReferencesDir() {
  if (!existsSync(REFERENCES_DIR)) {
    await mkdir(REFERENCES_DIR, { recursive: true })
    await writeFile(
      join(REFERENCES_DIR, '使用说明.md'),
      [
        '# 参考文献收录文件夹',
        '',
        '把新发表的论文 PDF 放入本文件夹，然后在「学术主页」目录运行：',
        '',
        '```bash',
        'npm run build   # 或 npm run dev',
        '```',
        '',
        '每次启动都会自动扫描本文件夹：',
        '',
        '- 识别新增 PDF，自动抽取标题、作者、年份、期刊、DOI；',
        '- 将 PDF 复制到 学术主页/public/论文/ 并在网页成果列表中追加展示；',
        '- 已处理过的文件不会重复处理。',
        '',
        '文件名建议（非必须）：`2026-论文标题-作者.pdf`，年份前缀可帮助识别发表年份。',
        '若个别论文的分类（中科院分区 / 影响因子）未被自动识别，可在 学术主页/src/data/publications.ts 中补充。',
        '',
      ].join('\n'),
      'utf-8',
    )
    await writeFile(
      join(REFERENCES_DIR, '.gitkeep'),
      '',
      'utf-8',
    )
  }
}

// 识别一条 PDF 是否为新增（未被收录）——已在主循环内联实现，此函数保留作文档说明
function isNewPdf(fileName, contentHash, known, registry) {
  const pdfNames = known.get('pdfNames') || new Set()
  const titles = known.get('titles') || new Set()
  const dois = known.get('dois') || new Set()
  const regFile = registry.files[fileName]
  if (regFile && regFile.processed) return false
  if (pdfNames.has(fileName)) return false
  return true
}
// (以上函数仅为说明，实际判定见 checkForNewPapers 主循环)

/**
 * 处理单个新增 PDF：抽取元数据 → 返回待写条目（或 null）
 */
async function processPdf(fileName, dryRun) {
  const src = join(REFERENCES_DIR, fileName)
  const buf = await readFile(src)
  const fileHash = sha1(buf)

  // 1) 解析 PDF 内容
  let pdfInfo
  try {
    pdfInfo = await parsePdf(src)
  } catch (e) {
    console.warn(`  ⚠ 解析失败 ${fileName}: ${e.message}`)
    pdfInfo = { text: '', doi: null, creationYear: null }
  }

  // 2) macOS 内嵌标题
  const spot = await spotlightMeta(src)

  // 3) 文件名约定
  const fname = parseFilename(fileName)

  // 4) Crossref 权威数据
  let doi = pdfInfo.doi || null
  let cross = null
  if (doi) {
    cross = await crossrefLookup(doi)
  }

  const year = fname.year || cross?.year || pdfInfo.creationYear || new Date().getFullYear()
  const title =
    cross?.title ||
    (spot.title && spot.title.length > 5 ? spot.title : null) ||
    inferTitleFromText(pdfInfo.text) ||
    fname.title ||
    basename(fileName, extname(fileName))
  const journal = cross?.journal || (fname.title && fname.title.length > 3 ? fname.title : null)
  const authors =
    (cross?.authors && cross.authors.length
      ? cross.authors.join(', ')
      : spot.authors && spot.authors.length
        ? spot.authors.join(', ')
        : null) ||
    inferAuthorsFromText(pdfInfo.text, title).join(', ') ||
    fname.authors ||
    ''

  // venue 字符串
  let venue = ''
  if (journal) {
    venue = journal
    if (cross && cross.year) {
      venue += `, ${cross.year}`
      const volPage = [cross.volume, cross.issue].filter(Boolean).join('(')
      if (volPage) venue += cross.issue ? `, ${cross.volume}(${cross.issue})` : `, ${cross.volume}`
      if (cross.page) venue += `: ${cross.page}`
    } else {
      venue += `, ${year}`
    }
  }

  // 语言标签
  const isChinese = hasChinese(title) || hasChinese(authors)
  const tags = ['自动收录', isChinese ? '中文论文' : '英文论文']

  // 主题标签推断（供论文网络按标签自动连线）
  const titleLower = String(title || '').toLowerCase()
  const topicRules = [
    { tag: '机器学习', keys: ['machine learning', 'deep learning', 'neural', 'ensemble', 'random forest', 'xgboost', 'gradient boosting', 'feature engineering', '机器学习', '深度学习'] },
    { tag: '预测微生物学', keys: ['listeria', 'monocytogenes', 'microbial', 'pathogen', 'salmonella', 'growth rate', 'predictive microbiology', '预测微生物学', '李斯特'] },
    { tag: '食品安全风险预警', keys: ['food safety', 'risk assessment', 'early warning', 'warning', '风险评估', '风险预警', '食品安全'] },
    { tag: '知识图谱与大模型', keys: ['knowledge graph', 'large language', 'llm', 'semantic', '知识图谱', '大模型'] },
    { tag: '光谱分析', keys: ['spectroscop', 'nir', 'spectrum', 'soluble solids', '光谱'] },
    { tag: '基因组学', keys: ['genome', 'sequenc', 'genomic', '基因组', '测序'] },
  ]
  for (const rule of topicRules) {
    if (rule.keys.some((k) => titleLower.includes(k))) {
      if (!tags.includes(rule.tag)) tags.push(rule.tag)
    }
  }

  // 第一作者识别
  const authorsClean = authors.replace(/[*†‡#]+/g, '')
  const firstAuthor = authorsClean.split(/[,，]/).map((s) => s.trim())[0] || ''
  if (OWN_NAME_KEYS.some((k) => firstAuthor.includes(k))) {
    tags.push('第一作者')
  }

  // 期刊分类
  const journalCategory = matchJournalCategory(journal) || matchJournalCategory(cross?.journal)

  // 合作单位
  const collabText = `${pdfInfo.text} ${authors}`
  const collaboratingInstitutions = inferCollaboratingInstitutions(collabText)

  // DOI 链接
  const link = doi ? `https://doi.org/${doi}` : undefined

  // 复制后的文件名（保留原标题，若缺年份前缀则补上，便于排序）
  let destName = fileName
  if (!/^(19|20)\d{2}/.test(destName)) {
    destName = `${year}-${destName}`
  }
  // 避免目标已存在同名文件
  if (existsSync(join(PAPER_DIR, destName)) && destName !== fileName) {
    const baseName = basename(destName, extname(destName))
    destName = `${baseName}-${fileHash.slice(0, 6)}${extname(destName)}`
  }

  const idBase = doi ? slugify(doi) : slugify(title) || 'paper'
  const id = `auto-${idBase}-${fileHash.slice(0, 6)}`

  const entry = {
    id,
    title,
    authors: authorsClean || '',
    venue: venue || `${year}`,
    year,
    type: 'journal',
    link,
    pdfPath: `论文/${destName}`,
    tags,
    journalCategory,
    collaboratingInstitutions,
    sourceFile: fileName,
    destFile: destName,
    autoDate: now(),
    hash: fileHash,
  }
  return entry
}

// ---------------------------------------------------------------------------
// 主入口
// ---------------------------------------------------------------------------
export async function checkForNewPapers({ silent = false } = {}) {
  try {
    await ensureReferencesDir()

    // 已知信息
    let content = ''
    try {
      content = readFileSync(DATA_FILE, 'utf-8')
    } catch {
      content = ''
    }
    const known = parseExistingPublications(content)
    const knownHashes = await knownHashesInPaperDir()

    const registry = await loadRegistry()

    const pdfs = await listPdfFiles(REFERENCES_DIR)
    const newFiles = []

    for (const fileName of pdfs) {
      const src = join(REFERENCES_DIR, fileName)
      let hash
      try {
        const b = await readFile(src)
        hash = sha1(b)
      } catch {
        continue
      }
      const pdfNames = known.get('pdfNames') || new Set()
      const titles = known.get('titles') || new Set()
      const regFile = registry.files[fileName]

      const alreadyKnown =
        (regFile && regFile.processed) ||
        pdfNames.has(fileName) ||
        knownHashes.has(hash)

      if (!alreadyKnown) {
        newFiles.push(fileName)
      }
    }

    if (newFiles.length === 0) {
      if (!silent) {
        console.log(`[check-papers] 未发现新增论文（${pdfs.length} 个 PDF 已全部收录）`)
      }
      return { added: 0, skipped: pdfs.length, newFiles: [] }
    }

    console.log(`[check-papers] 发现 ${newFiles.length} 个新增 PDF，正在抽取元数据...`)
    const entries = []
    const added = []

    for (const fileName of newFiles) {
      try {
        const entry = await processPdf(fileName, false)
        if (!entry) continue
        entries.push(entry)
        added.push(fileName)
        if (!silent) {
          console.log(`  ✓ ${fileName}`)
          console.log(`    → 标题：${entry.title}`)
          console.log(`    → 期刊：${entry.venue || '(未识别)'}（${entry.year}）`)
          if (entry.link) console.log(`    → DOI：${entry.link}`)
        }
      } catch (e) {
        console.warn(`  ✗ 处理失败 ${fileName}: ${e.message}`)
      }
    }

    if (entries.length === 0) {
      console.log('[check-papers] 本次没有成功新增的条目')
      return { added: 0, skipped: pdfs.length, newFiles: [] }
    }

    // 复制 PDF 到 public/论文
    for (const e of entries) {
      await mkdir(PAPER_DIR, { recursive: true })
      await copyFile(join(REFERENCES_DIR, e.sourceFile), join(PAPER_DIR, e.destFile))
    }

    // 追加数据条目
    await appendPublications(entries)

    // 更新 registry
    for (const e of entries) {
      registry.files[e.sourceFile] = {
        processed: true,
        processedAt: e.autoDate,
        id: e.id,
        year: e.year,
        title: e.title,
        hash: e.hash,
      }
    }
    await saveRegistry(registry)

    console.log(`[check-papers] 成功新增 ${entries.length} 篇论文，已更新成果数据。`)
    return { added: entries.length, skipped: pdfs.length - added.length, newFiles: added }
  } catch (e) {
    console.warn(`[check-papers] 自检过程出错（不影响构建）：${e.message}`)
    return { added: 0, skipped: 0, newFiles: [], error: e.message }
  }
}

// 直接运行入口（node scripts/check-papers.mjs）
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await checkForNewPapers()
}
