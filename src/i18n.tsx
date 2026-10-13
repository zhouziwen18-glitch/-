/**
 * @file i18n.tsx
 * @description Lightweight bilingual (中文 / English) context + dictionary.
 *              Papers' titles/authors/venues stay bilingual in the data layer;
 *              this module covers all descriptive UI text.
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react'

export type Lang = 'zh' | 'en'

type Entry = { zh: string; en: string }

const t = (zh: string, en: string): Entry => ({ zh, en })

/**
 * Flat dictionary of all translatable UI strings, keyed by dotted names.
 */
export const L: Record<string, Entry> = {
  // ---- Navigation ----
  'nav.home': t('首页', 'Home'),
  'nav.profile': t('简介与经历', 'Profile & Experience'),
  'nav.research': t('研究主线', 'Research Focus'),
  'nav.network': t('论文网络', 'Paper Network'),
  'nav.publications': t('成果列表', 'Publications'),
  'nav.contact': t('联系', 'Contact'),
  'nav.toggle': t('切换语言', 'Toggle language'),
  'nav.foot.nav': t('页面导航', 'Page Navigation'),
  'nav.foot.links': t('学术链接', 'Academic Links'),
  'nav.foot.bio':
    t(
      '上海理工大学健康科学与工程学院 · 食品科学与工程博士研究生。研究聚焦食品安全风险评估、预测微生物学与 AI 建模，构建可解释、可验证、可部署的智能预警方法。',
      'PhD candidate in Food Science and Engineering, School of Health Science and Engineering, USST. Research focuses on food safety risk assessment, predictive microbiology, and AI modeling toward interpretable, verifiable, and deployable early-warning methods.',
    ),
  'nav.foot.copyright': t('食品安全风险评估 · 预测微生物学 · AI 建模', 'Food Safety Risk Assessment · Predictive Microbiology · AI Modeling'),
  'nav.foot.top': t('回到顶部', 'Back to top'),
  'nav.brand.tagline': t('食品安全 · AI 研究', 'Food Safety · AI Research'),

  // ---- Hero ----
  'hero.badge.qmra': t('食品安全风险评估', 'Food Safety Risk Assessment'),
  'hero.badge.pm': t('预测微生物学', 'Predictive Microbiology'),
  'hero.badge.ai': t('AI 建模与智能预警', 'AI Modeling & Early Warning'),
  'hero.tagline.pipeline': t('食品数据 → AI 建模 → 智能预警', 'Food Data → AI Modeling → Smart Early Warning'),
  'hero.intro.p1':
    t(
      '上海理工大学食品科学与工程博士研究生。研究方向聚焦食品安全风险评估、食品微生物生长与交叉污染建模、机器学习驱动的智能预警，以及知识图谱与大模型在食品安全中的应用。',
      'PhD candidate in Food Science and Engineering at the University of Shanghai for Science and Technology. Research centers on food safety risk assessment, predictive microbiology and cross-contamination modeling, machine-learning-driven early warning, and knowledge-graph / LLM applications in food safety.',
    ),
  'hero.intro.p2':
    t(
      '我的研究以真实食品安全数据和微生物风险情景为基础，结合定量微生物风险评估（QMRA）、预测微生物学、机器学习与不确定性分析，构建可解释、可验证、可部署的风险评估与决策支持方法。',
      'My work builds on real food safety data and microbial risk scenarios, combining Quantitative Microbial Risk Assessment (QMRA), predictive microbiology, machine learning, and uncertainty analysis into interpretable, verifiable, and deployable risk-assessment and decision-support methods.',
    ),
  'hero.btn.email': t('邮件联系', 'Contact me'),
  'hero.btn.papers': t('查看论文', 'View Publications'),
  'hero.metric.peer': t('同行评议论文', 'Peer-Reviewed Papers'),
  'hero.metric.sci': t('SCI 论文', 'SCI Papers'),
  'hero.metric.sci.helper': t('含一区多篇', 'incl. multiple Q1'),
  'hero.metric.q1': t('中科院一区', 'CAS Q1'),
  'hero.metric.lead': t('第一/通讯作者', 'First/Corresponding'),
  'hero.latest': t('最新', 'Latest'),
  'hero.latest.title': t('最新成果', 'Latest Work'),
  'hero.univ.name': t('上海理工大学', 'University of Shanghai for Science and Technology'),
  'hero.univ.school': t('健康科学与工程学院', 'School of Health Science and Engineering'),
  'hero.portrait.alt': t('周子文的证件照肖像', 'Portrait of Ziwen Zhou'),
  'hero.campus.alt': t('上海理工大学校园风景', 'USST campus'),
  'hero.sidebio':
    t(
      '研究训练横跨信息安全、生物与医学工程、食品科学与工程，强调将算法建模能力与食品安全领域问题结合，形成从数据整理、风险建模、机制解释到决策支持的完整研究链条。',
      'Research training spans information security, bio-medical engineering, and food science, bridging algorithm modeling with food safety problems into a full chain from data curation and risk modeling to mechanism interpretation and decision support.',
    ),

  // ---- Academic Profile ----
  'profile.title': t('学术简介与经历', 'Academic Profile & Experience'),
  'profile.desc':
    t(
      '跨越信息安全、生物与医药、食品科学与工程的训练背景，服务于食品安全风险评估和智能预警方法学研究。',
      'A training background spanning information security, biology & medicine, and food science, in service of food safety risk assessment and intelligent early-warning methodology.',
    ),
  'profile.bio.title': t('研究者简介', 'About'),
  'profile.bio.p1':
    t(
      '我是上海理工大学健康科学与工程学院食品科学与工程专业博士研究生，研究方向聚焦食品安全风险早期预警、定量微生物风险评估（QMRA）与预测微生物学。我的核心兴趣在于把食品科学中的真实风险问题转化为可建模、可解释、可部署的数据科学问题。',
      'I am a PhD candidate in Food Science and Engineering at the University of Shanghai for Science and Technology, focusing on food safety early warning, QMRA, and predictive microbiology. My core interest is turning real food-science risk problems into modelable, interpretable, and deployable data-science problems.',
    ),
  'profile.bio.p2':
    t(
      '依托信息安全本科与生物与医药硕士阶段的交叉训练，我将机器学习、深度学习、不确定性建模、知识图谱与大模型等方法引入食品安全研究，面向不同数据类型和研究场景建立定制化模型。研究主题覆盖致病菌生长动力学、食品加工交叉污染、风险抽检结果预测、近红外光谱小样本建模，以及食源性疾病负担与食品系统因素分析。',
      'Building on cross-disciplinary training from an Information Security bachelor and a Biology & Medicine master, I apply machine learning, deep learning, uncertainty modeling, knowledge graphs, and LLMs to food safety research, building tailored models for heterogeneous data and scenarios — covering pathogen growth kinetics, cross-contamination, sampling-result prediction, small-sample NIR spectroscopy, and foodborne disease burden attribution.',
    ),
  'profile.bio.p3':
    t(
      '我的研究以真实食品安全数据和微生物风险情景为基础，构建可解释、可验证、可部署的风险评估与智能预警方法。',
      'My research grounds itself in real food safety data and microbial risk scenarios to build interpretable, verifiable, and deployable risk-assessment and early-warning methods.',
    ),
  'profile.cap.qmra.title': t('定量食品安全风险评估', 'Quantitative Food Safety Risk Assessment'),
  'profile.cap.qmra.desc':
    t(
      '使用结构化证据、暴露情景与不确定性建模，构建食品安全危害的风险评估与预警工作流。',
      'Constructing risk-assessment and early-warning workflows for food safety hazards using structured evidence, exposure scenarios, and uncertainty-aware modeling.',
    ),
  'profile.cap.micro.title': t('食品微生物学与预测微生物学', 'Food Microbiology & Predictive Microbiology'),
  'profile.cap.micro.desc':
    t(
      '对致病菌生长、转移与污染过程建模，重点关注单增李斯特菌与食品加工实际场景。',
      'Modeling pathogen growth, transfer, and contamination, with emphasis on Listeria monocytogenes and real food-processing scenarios.',
    ),
  'profile.cap.ml.title': t('机器学习与深度学习', 'Machine Learning & Deep Learning'),
  'profile.cap.ml.desc':
    t(
      '针对抽检记录、微生物数据集、光谱与多源公开数据等异构食品数据设计定制化模型。',
      'Designing tailored models for heterogeneous food data, including regulatory sampling records, microbial datasets, spectroscopy, and multi-source public databases.',
    ),
  'profile.cap.kg.title': t('知识图谱与大模型食品安全应用', 'Knowledge Graph & LLM for Food Safety'),
  'profile.cap.kg.desc':
    t(
      '探索知识组织、语义推理与大模型辅助证据整合，服务下一代食品安全决策支持。',
      'Exploring knowledge organization, semantic reasoning, and LLM-assisted evidence integration for next-generation food safety decision support.',
    ),
  'profile.edu.title': t('教育背景', 'Education'),
  'profile.exp.title': t('科研经历', 'Research Experience'),
  'profile.exp.role': t('研究实习生', 'Research Intern'),
  'profile.exp.org': t('上海市市场监督管理局信息应用研究中心', 'Information Application Research Center of Shanghai Municipal Administration for Market Regulation'),
  'profile.exp.detail': t('参与食品安全风险评估与数据驱动的监管决策支持工作。', 'Participated in applied food safety risk assessment and data-driven regulatory decision-support work.'),
  'profile.edu.phd.degree': t('食品科学与工程博士研究生', 'PhD Candidate in Food Science and Engineering'),
  'profile.edu.phd.org': t('上海理工大学', 'University of Shanghai for Science and Technology'),
  'profile.edu.phd.detail': t('健康科学与工程学院', 'School of Health Science and Engineering'),
  'profile.edu.ms.degree': t('生物与医药硕士', 'Master of Biology and Medicine'),
  'profile.edu.ms.org': t('福建农林大学', 'Fujian Agriculture and Forestry University'),
  'profile.edu.ms.detail': t('生命科学、工程与食品相关研究的交叉训练。', 'Interdisciplinary training in life science, engineering, and food-related research.'),
  'profile.edu.bs.degree': t('信息安全学士', 'Bachelor of Information Security'),
  'profile.edu.bs.org': t('海南大学', 'Hainan University'),
  'profile.edu.bs.detail': t('计算机科学、信息安全与面向数据的工程背景。', 'Engineering background in computer science, information security, and data-oriented problem solving.'),
  'profile.keywords': t('研究关键词', 'Research Keywords'),

  // ---- Research Overview ----
  'research.title': t('研究主线', 'Research Focus'),
  'research.desc':
    t(
      '围绕食品安全风险识别、风险量化、机制解释与预警应用，形成从实验数据到智能决策支持的连续研究链条。',
      'A continuous research chain from experimental data to intelligent decision support, spanning risk identification, quantification, mechanism interpretation, and early warning.',
    ),
  'research.output.label': t('研究产出：', 'Output: '),
  'research.cat.ra': t('风险评估', 'Risk Assessment'),
  'research.t.ra': t('食品安全风险评估与早期预警', 'Food Safety Risk Assessment & Early Warning'),
  'research.d.ra':
    t(
      '面向监管抽检、食品系统数据和健康风险情景，建立可量化、可解释的风险识别与预警模型，服务食品安全治理和资源配置。',
      'Building quantitative, interpretable risk-identification and early-warning models for regulatory sampling, food-system data, and health-risk scenarios.',
    ),
  'research.o.ra': t('风险评分、预警模型、监管决策支持指标。', 'Risk scores, early-warning models, regulatory decision-support metrics.'),
  'research.cat.pm': t('预测微生物学', 'Predictive Microbiology'),
  'research.t.pm': t('致病菌生长与交叉污染建模', 'Pathogen Growth & Cross-Contamination Modeling'),
  'research.d.pm':
    t(
      '聚焦 Listeria monocytogenes 等关键食品致病菌，研究其在加工、贮藏和流通过程中的生长动态、转移规律与控制策略。',
      'Focusing on key foodborne pathogens such as Listeria monocytogenes — growth dynamics, transfer, and control during processing, storage, and distribution.',
    ),
  'research.o.pm': t('生长动力学模型、转移预测模型、风险控制建议。', 'Growth-kinetics models, transfer-prediction models, risk-control recommendations.'),
  'research.cat.ai': t('AI 建模', 'AI Modeling'),
  'research.t.ai': t('机器学习与不确定性建模', 'Machine Learning & Uncertainty Modeling'),
  'research.d.ai':
    t(
      '针对小样本、异构数据和复杂非线性关系，构建机器学习、深度学习和特征工程方法，并强调模型泛化能力与不确定性评估。',
      'Building machine-learning, deep-learning, and feature-engineering methods for small samples, heterogeneous data, and complex nonlinearity, with emphasis on generalization and uncertainty.',
    ),
  'research.o.ai': t('定制化算法、特征体系、可解释预测框架。', 'Tailored algorithms, feature systems, interpretable prediction frameworks.'),
  'research.cat.ki': t('知识智能', 'Knowledge Intelligence'),
  'research.t.ki': t('知识图谱与大模型辅助食品安全', 'Knowledge Graph & LLM for Food Safety'),
  'research.d.ki':
    t(
      '探索食品安全知识组织、证据融合和语义推理方法，将知识图谱和大模型用于风险信息整合、文献证据挖掘与智能问答。',
      'Exploring knowledge organization, evidence fusion, and semantic reasoning, applying KG and LLMs to risk-information integration, evidence mining, and intelligent Q&A.',
    ),
  'research.o.ki': t('知识框架、证据整合流程、智能分析原型。', 'Knowledge frameworks, evidence-integration pipelines, intelligent analysis prototypes.'),
  'research.data.title': t('数据来源', 'Data Sources'),
  'research.data.body':
    t(
      '食品安全抽检数据、ComBase 数据库、可见/近红外光谱数据、GBD 与 FAO 等多源公开数据库。',
      'Food safety sampling data, the ComBase database, Vis/NIR spectral data, and multi-source public databases such as GBD and FAO.',
    ),
  'research.method.title': t('方法体系', 'Method Stack'),
  'research.method.body':
    t(
      'QMRA、预测微生物学、机器学习、深度学习、特征工程、贝叶斯优化、不确定性评估。',
      'QMRA, predictive microbiology, machine learning, deep learning, feature engineering, Bayesian optimization, uncertainty evaluation.',
    ),
  'research.value.title': t('应用价值', 'Application Value'),
  'research.value.body':
    t(
      '支持风险分级、过程控制、抽检策略优化和企业质量管理，为食品安全智能监管提供方法基础。',
      'Supporting risk grading, process control, sampling-strategy optimization, and quality management, providing a methodological basis for intelligent food safety regulation.',
    ),

  // ---- Publication Stats ----
  'stats.title': t('发表概览', 'Publication Overview'),
  'stats.desc':
    t(
      '基于页面收录成果生成的年度发表概览，展示中英文论文分布与近期研究产出趋势。',
      'An annual overview generated from the publications on this page, showing Chinese/English distribution and recent output trends.',
    ),
  'stats.intro':
    t(
      '研究成果从食品微生物学与交叉污染建模逐步扩展到风险预警、光谱智能检测、知识图谱与全球食源性疾病负担分析，体现出从单一场景建模到多源数据智能分析的研究推进。',
      'Research progresses from food microbiology and cross-contamination modeling toward early warning, intelligent spectroscopy, knowledge graphs, and global foodborne-disease-burden analysis — a shift from single-scenario modeling to multi-source intelligent analysis.',
    ),
  'stats.total': t('总论文数', 'Total Papers'),
  'stats.years': t('覆盖年份', 'Year Range'),
  'stats.english': t('英文', 'English'),
  'stats.chinese': t('中文', 'Chinese'),
  'stats.tooltip.year': t('发表年份', 'Publication Year'),
  'stats.tooltip.english': t('英文论文', 'English papers'),
  'stats.tooltip.chinese': t('中文论文', 'Chinese papers'),
  'stats.tooltip.total': t('总计', 'Total'),
  'stats.legend.english': t('英文论文', 'English papers'),
  'stats.legend.chinese': t('中文论文', 'Chinese papers'),
  'stats.legend.total': t('年度总数', 'Total per Year'),
  'stats.piece': t('篇', 'papers'),

  // ---- Publications ----
  'pubs.title': t('论文与成果', 'Publications'),
  'pubs.desc': t('涵盖食品安全、机器学习、预测微生物学等研究方向', 'Covering food safety, machine learning, predictive microbiology, and more'),
  'pubs.all': t('全部', 'All'),
  'pubs.chinese': t('中文', 'Chinese'),
  'pubs.english': t('English', 'English'),
  'pubs.type.all': t('全部类型', 'All Types'),
  'pubs.type.journal': t('期刊论文', 'Journal'),
  'pubs.type.conference': t('会议论文', 'Conference'),
  'pubs.type.preprint': t('预印本', 'Preprint'),
  'pubs.type.patent': t('专利', 'Patent'),
  'pubs.search.placeholder': t('搜索论文标题或期刊名称...', 'Search by title or journal...'),
  'pubs.featured': t('代表性成果', 'Featured Work'),
  'pubs.newest': t('最新', 'Newest'),
  'pubs.representative': t('代表作', 'Highlight'),
  'pubs.count.suffix': t('篇', 'papers'),

  // ---- Paper Network ----
  'net.title': t('论文网络', 'Paper Network'),
  'net.desc':
    t(
      '从研究主题的角度梳理论文之间的知识关联，帮助读者快速理解成果谱系与研究聚焦。',
      'Mapping knowledge links among papers by research topic, helping readers grasp the research lineage and focus.',
    ),
  'net.topic.food-safety': t('食品安全', 'Food Safety'),
  'net.topic.microbiology': t('食品微生物', 'Food Microbiology'),
  'net.topic.ai-ml': t('机器学习', 'Machine Learning'),
  'net.topic.risk-assessment': t('风险评估', 'Risk Assessment'),
  'net.topic.health-cross': t('交叉健康', 'Health & Cross'),
  'net.topic.spectroscopy': t('光谱分析', 'Spectroscopy'),
  'net.topic.genomics': t('基因组学', 'Genomics'),
  'net.topic.sensors': t('智能传感', 'Smart Sensing'),
  'net.all': t('全部', 'All'),
  'net.related.title': t('主题关联论文', 'Related Papers'),
  'net.current': t('当前主题', 'Current topic'),
  'net.all.papers': t('全部论文', 'All papers'),
  'net.collab.title': t('合作单位', 'Collaborators'),
  'net.collab.empty': t('暂无外部合作单位数据', 'No external collaborators yet'),
  'net.hover.title': t('悬停预览', 'Hover Preview'),
  'net.collab.none': t('无外部合作', 'No external collaborators'),
  'net.detail.title': t('论文详情', 'Paper Details'),
  'net.author': t('作者', 'Authors'),
  'net.venue': t('期刊', 'Journal'),
  'net.year': t('年份', 'Year'),
  'net.collab.label': t('合作单位', 'Collaborators'),
  'net.category': t('期刊分类', 'Journal Category'),
  'net.view.source': t('查看期刊原文', 'View Journal Article'),

  // ---- Contact ----
  'contact.title': t('联系与学术主页', 'Contact & Profiles'),
  'contact.desc':
    t(
      '欢迎就食品安全风险评估、预测微生物学、AI 建模、论文全文与学术合作等事宜联系。',
      'Welcome to reach out regarding food safety risk assessment, predictive microbiology, AI modeling, full-text access, or academic collaboration.',
    ),
  'contact.location': t('上海理工大学 · 健康科学与工程学院 · 上海，中国', 'USST · School of Health Science and Engineering · Shanghai, China'),
  'contact.body':
    t(
      '如果您关注食品安全风险早期预警、食品微生物建模、机器学习与深度学习在食品领域的应用，或希望交流论文全文、数据建模与合作研究，请通过邮件联系。涉及完整简历、项目材料或敏感个人信息的文件，建议通过邮件单独发送。',
      'If you are interested in food safety early warning, food microbiology modeling, machine-learning applications in food, or full-text / collaboration exchange, please email. Files with full CVs, project materials, or sensitive personal information are best sent separately by email.',
    ),
  'contact.orcid.helper': t('完整的学术成果与作者标识：0009-0000-3319-7303。', 'Complete record and author ID: 0009-0000-3319-7303.'),
  'contact.github.helper': t('用于维护个人主页与后续开放研究代码、数据处理脚本。', 'For this homepage and future open research code and data-processing scripts.'),
  'contact.cnki.title': t('知网学术主页', 'CNKI Academic Profile'),
  'contact.cnki.body': t('使用微信扫描二维码，可在移动端访问我的知网学术主页，查看更多中文论文与引用情况。', 'Scan with WeChat to view my CNKI profile on mobile, including more Chinese papers and citations.'),
  'contact.cnki.alt': t('知网学术主页二维码', 'CNKI QR code'),
  'contact.copy.email': t('复制邮箱', 'Copy email'),
  'contact.email.copied': t('邮箱已复制', 'Email copied'),
}

/**
 * Get a translated entry for a language.
 */
export function tr(key: string, lang: Lang): string {
  const entry = L[key]
  return entry ? entry[lang] : key
}

/**
 * I18n context.
 */
interface I18nContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
  /** Translate a dictionary key into the current language. */
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue>({
  lang: 'zh',
  setLang: () => {},
  toggle: () => {},
  t: (key) => key,
})

/**
 * Hook to read language state and translate strings.
 */
export function useI18n(): I18nContextValue {
  return useContext(I18nContext)
}

/**
 * Provider that holds the current language and provides the t() helper.
 * Defaults to 中文; persists choice in localStorage.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'zh'
    return (localStorage.getItem('homepage-lang') as Lang) || 'zh'
  })

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem('homepage-lang', next)
    } catch {
      /* ignore */
    }
  }, [])

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next = prev === 'zh' ? 'en' : 'zh'
      try {
        localStorage.setItem('homepage-lang', next)
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  const t = useCallback((key: string) => tr(key, lang), [lang])

  const value = useMemo(
    () => ({ lang, setLang, toggle, t }),
    [lang, setLang, toggle, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
