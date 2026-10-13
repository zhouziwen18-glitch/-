# 周子文 · 学术主页（Ziwen Zhou Academic Homepage）

个人学术主页，基于 React + Vite(esbuild) + Tailwind + Recharts 构建的静态网站，展示研究简介、研究方向、论文网络、发表统计、论文成果与联系信息，并部署到 GitHub Pages。

## 目录结构

```
学术主页/                  ← 网站源码 + GitHub 仓库（含自动部署）
├── 参考文献/              ← 【论文自动收录文件夹】把新发表的论文 PDF 放这里
│   ├── 使用说明.md
│   └── .papers-registry.json  ← 已处理记录（本地缓存，自动维护，已 gitignore）
├── scripts/
│   ├── build.mjs          ← 构建脚本（启动时自动运行论文自检）
│   └── check-papers.mjs   ← 论文自检/自动收录脚本
├── src/
│   ├── data/publications.ts  ← 论文数据（自检脚本会自动追加新条目）
│   └── components/…       ← 页面组件
├── public/论文/           ← 网站可访问的论文 PDF（自检自动复制到此）
├── .github/workflows/deploy.yml ← GitHub Pages 自动构建 + 自动提交 + 部署
└── dist/                  ← 构建产物（部署到 GitHub Pages 的内容）
```

> 项目根目录：`README.md`（本说明）、`启动主页.command`（一键本地启动）。

## 新论文自动更新（核心功能）

把新发表的论文 **PDF 文件**放进 `学术主页/参考文献/` 文件夹，然后**任选一种启动方式**，都会自动自检并收录：

- 本地：双击 `启动主页.command`，或 `cd 学术主页 && npm run build` / `npm run dev`
- 线上（GitHub Pages）：把 `参考文献/` 里的新 PDF 一并 `git push`，CI 会自动构建并上线

自动收录流程：

1. 扫描 `参考文献/` 下的所有 PDF；
2. 与已收录记录比对，识别 **新增** PDF（按文件名 / 内容哈希 / DOI 三重去重）；
3. 自动抽取元数据：标题、作者、年份、期刊、DOI（优先 Crossref 权威数据）；
4. 将 PDF 复制到 `public/论文/`；
5. 在 `src/data/publications.ts` 末尾追加展示条目（含「最新」标记）；
6. 更新注册表，已处理过的文件不会重复收录。

> 文件名建议（非必须）：`2026-论文标题-作者.pdf`。年份前缀能帮助准确识别发表年份。
> 个别论文的期刊分区 / 影响因子若未被自动识别，可在 `src/data/publications.ts` 中补全。

单独运行自检（不构建）：
```bash
cd 学术主页
node scripts/check-papers.mjs
```

## 一键启动（本地预览）

在项目根目录双击 **`启动主页.command`**，自动完成：自检新增论文 → 构建 → 启动本地预览（`http://localhost:4173`）→ 打开浏览器。

> 首次使用会安装依赖；端口被占用可 `PORT=8080 bash 启动主页.command`。

## 线上自动更新（GitHub Pages）

当你往 `参考文献/` 放入新 PDF 后，只需把它一起提交并推送：

```bash
cd 学术主页
git add -A
git commit -m "feat: 新增论文"
git push origin main
```

推送后 `.github/workflows/deploy.yml` 会自动：

1. 运行自检，收录 `参考文献/` 新增论文（生成 `publications.ts` 条目 + 复制 PDF）；
2. **自动把生成的数据改动提交回 main**（带 `[skip ci]` 防止循环）；
3. 构建并部署到 GitHub Pages —— 线上主页随即更新。

> 说明：CI 中的自动提交需要仓库 `Actions` 权限允许写入（`contents: write` 已在工作流中声明）；若你的仓库开启了「分支保护」限制直接推送，需在分支保护中放行 `github-actions[bot]` 或改用个人访问令牌。
