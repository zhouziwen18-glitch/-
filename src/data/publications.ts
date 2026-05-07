/**
 * @file publications.ts
 * @description Structured publication data for Ziwen Zhou, shared across list and visualization components.
 */

export type PublicationType = 'journal' | 'conference' | 'preprint' | 'patent'

/**
 * @description Journal category information.
 */
export interface JournalCategory {
  /** Journal name for display. */
  name: string
  /** SCI, SSCI, EI, 北大核心, 南大核心, CSCD, etc. */
  categories: string[]
  /** CAS partition for SCI journals (1-4区). */
  casPartition?: string
  /** Latest impact factor. */
  impactFactor?: number
}

/**
 * @description Single publication item structure.
 */
export interface Publication {
  /** Unique identifier used for anchors and networks. */
  id: string
  /** Full paper title. */
  title: string
  /** Author list string. */
  authors: string
  /** Journal / conference and volume information. */
  venue: string
  /** Publication year. */
  year: number
  /** Type of publication. */
  type: PublicationType
  /** Optional external link (DOI / journal page). */
  link?: string
  /** Local PDF file path for full text access. */
  pdfPath?: string
  /** Tag list such as "First author". */
  tags?: string[]
  /** Whether this is highlighted as a representative work. */
  highlight?: boolean
  /** Journal category information. */
  journalCategory?: JournalCategory
  /** Institutions collaborated with in this paper (excluding own institutions). */
  collaboratingInstitutions?: string[]
}

export const ALL_INSTITUTIONS = [
  '上海理工大学',
  '福建农林大学',
  '宁德师范学院生命科学学院',
  '上海市市场监督管理局信息应用研究中心',
  '复旦大学公共卫生学院',
  '中国北京市放射医学研究所',
  '青海大学高原医学研究中心',
  '河南中医药大学中医药学院',
  '天津中医药大学',
  '青海大学药学院',
  '中国人民解放军总医院肾脏疾病国家重点实验室',
  '希腊农业科学院',
  '上海海洋大学',
]

/**
 * @description Current list of peer-reviewed publications and related outputs by Ziwen Zhou.
 * To add a new item in the future, simply append a new entry here.
 */
export const publications: Publication[] = [
  {
    id: 'kg-llm-food-safety-2026',
    title:
      'Knowledge graph and large language model synergy for food safety: Approaches and perspectives',
    authors:
      'An Haoxin, Dong Qingli, Doulgeraki A, Nychas G-J, Zhou Ziwen, Liu Yangtai*',
    venue: 'Trends in Food Science and Technology, 2026, 170: 105592',
    year: 2026,
    type: 'journal',
    tags: ['食品安全', '知识图谱', '大模型'],
    highlight: true,
    link: 'https://doi.org/10.1016/j.tifs.2026.105592',
    pdfPath: '/论文/2026-Knowledge graph and large language model synergy for food safety - Approaches and perspectives-安澔鑫.pdf',
    journalCategory: {
      name: 'Trends in Food Science and Technology',
      categories: ['SCI'],
      casPartition: '中科院1区',
      impactFactor: 16.0,
    },
    collaboratingInstitutions: ['希腊农业科学院'],
  },
  {
    id: 'dl-spectroscopy-mandarin-2026',
    title:
      'Deep learning method of visible and near-infrared spectroscopy considering small sample learning and prediction uncertainty assessment to detect soluble solids content of mandarin',
    authors: 'Jiang T, Fang T, Zhou Ziwen*',
    venue: 'LWT, 2026, 241: 119089',
    year: 2026,
    type: 'journal',
    tags: ['通讯作者', '深度学习', '小样本学习'],
    highlight: true,
    link: 'https://doi.org/10.1016/j.lwt.2026.119089',
    pdfPath: '/论文/2026-Deep learning method of visible and near-infrared spectroscopy considering small sample learning and prediction uncertainty assessment to detect soluble solids content of mandarin-江涛-周子文.pdf',
    journalCategory: {
      name: 'LWT - Food Science and Technology',
      categories: ['SCI'],
      casPartition: '中科院2区',
      impactFactor: 6.0,
    },
    collaboratingInstitutions: [],
  },
  {
    id: 'ml-listeria-growth-2026',
    title:
      'Machine learning modeling for predicting growth dynamics of Listeria monocytogenes using ComBase database: A comprehensive feature engineering approach',
    authors: 'Zhou Ziwen, An H, Li Z, Liu Y, Dong Q*',
    venue: 'Food Research International, 2026, 230: 118585',
    year: 2026,
    type: 'journal',
    tags: ['第一作者', '机器学习', '预测微生物学'],
    highlight: true,
    link: 'https://doi.org/10.1016/j.foodres.2026.118585',
    pdfPath: '/论文/2026-机器学习驱动的李斯特菌生长动态预测框架：基于ComBase数据库的应力生理学特征工程方法-周子文-董庆利.pdf',
    journalCategory: {
      name: 'Food Research International',
      categories: ['SCI'],
      casPartition: '中科院2区',
      impactFactor: 8.0,
    },
    collaboratingInstitutions: [],
  },
  {
    id: 'ugfs-net-tg-2025',
    title:
      'An uncertainty-driven gated feature selection network (UGFS-Net) for TG level prediction: linking high-altitude exposure to lipid metabolism disorder via elevated TG',
    authors:
      'Li Gaofu#, Zhou Ziwen#, Wang N, Yan N, Sun D, Huang C, Zhou L, Sun Y, Zhou W, Gao Y*',
    venue: 'Lipids in Health and Disease, 2025, 25: 14',
    year: 2025,
    type: 'journal',
    tags: ['共同第一作者', '交叉学科'],
    link: 'https://doi.org/10.1186/s12944-025-02401-3',
    pdfPath: '/论文/2025 An uncertainty-driven gated feature selectionnetwork (UGFS-Net) for TG level prediction linking high-altitude exposure to lipidmetabolism disorder via elevated TG-李高芾-周子文.pdf',
    journalCategory: {
      name: 'Lipids in Health and Disease',
      categories: ['SCI'],
      casPartition: '中科院3区',
      impactFactor: 4.5,
    },
    collaboratingInstitutions: [],
  },
  {
    id: 'salmon-sashimi-listeria-2024',
    title:
      'Assessment of salmon sashimi processing conditions for Listeria monocytogenes cross-contamination and effectiveness of CLPSO-BP neural network model constructed for predicting microbial transfer',
    authors:
      'Zhou Ziwen, Tian M, Liu B, Zhong X, Zhu X, Li C, Fang T, Zhang C*',
    venue: 'LWT, 2024, 201: 116252',
    year: 2024,
    type: 'journal',
    tags: ['第一作者', '交叉污染', '神经网络'],
    highlight: true,
    link: 'https://doi.org/10.1016/j.lwt.2024.116252',
    pdfPath: '/论文/2024-Assessment of salmon sashimi processing conditions for Listeria monocytogenes cross-contamination and effectiveness of CLPSO-BP neural network model constructed for predicting microbial transfer 周子文 方婷.pdf',
    journalCategory: {
      name: 'LWT - Food Science and Technology',
      categories: ['SCI'],
      casPartition: '中科院2区',
      impactFactor: 6.0,
    },
    collaboratingInstitutions: [],
  },
  {
    id: 'cfhtf2-tea-anthracnose-2023',
    title:
      'CFHTF2 Is Needed for Vegetative Growth, Conidial Morphogenesis and the Osmotic Stress Response in the Tea Plant Anthracnose (Colletotrichum fructicola)',
    authors:
      'Zhang C, Zhou Ziwen, Guo T, Huang X, Peng C, Lin Z, Chen M, Liu W*',
    venue: 'Genes, 2023, 14: 2235',
    year: 2023,
    type: 'journal',
    tags: ['合作论文'],
    link: 'https://doi.org/10.3390/genes14122235',
    pdfPath: '/论文/2024-CFHTF2 Is Needed for Vegetative Growth, Conidial Morphogenesis and the Osmotic Stress Response in the Tea Plant Anthracnose (Colletotrichum fructicola)-张承康-周子文.pdf',
    journalCategory: {
      name: 'Genes',
      categories: ['SCI'],
      casPartition: '中科院2区',
      impactFactor: 4.6,
    },
    collaboratingInstitutions: [],
  },
  {
    id: 'sdia-cronobacter-2022',
    title:
      'SdiA Enhanced the Drug Resistance of Cronobacter sakazakii and Suppressed Its Motility, Adhesion and Biofilm Formation',
    authors:
      'Cheng C, Yan X, Liu B, Jiang T, Zhou Ziwen, Guo F, Zhang Q, Li C, Fang T*',
    venue: 'Frontiers in Microbiology, 2022, 13: 901912',
    year: 2022,
    type: 'journal',
    tags: ['合作论文'],
    link: 'https://doi.org/10.3389/fmicb.2022.901912',
    pdfPath: '/论文/SdiA Enhanced the Drug Resistance of Cronobacter sakazakii and Suppressed Its Motility, Adhesion and Biofilm Formation-程传松-方婷.pdf',
    journalCategory: {
      name: 'Frontiers in Microbiology',
      categories: ['SCI'],
      casPartition: '中科院2区',
      impactFactor: 6.0,
    },
    collaboratingInstitutions: [],
  },
  {
    id: 'bo-lgbm-enrofloxacin-fish-2024',
    title:
      '基于贝叶斯优化轻量级梯度提升机模型预测淡水鱼中恩诺沙星抽检结果',
    authors: '宇盛好, 周子文, 姚烨, 等',
    venue:
      '《食品安全质量检测学报》, 2024, 15(22): 301–309. DOI: 10.19812/j.cnki.jfsq11-5956/ts.20240828001',
    year: 2024,
    type: 'journal',
    tags: ['中文论文', '食品安全', '机器学习', '抗生素残留'],
    link: 'https://doi.org/10.19812/j.cnki.jfsq11-5956/ts.20240828001',
    pdfPath: '/论文/2025-基于贝叶斯优化轻量级梯度提升机模型预测淡水鱼中恩诺沙星抽检结果-宇盛好-周子文.pdf',
    journalCategory: {
      name: '食品安全质量检测学报',
      categories: ['北大核心', 'CSCD'],
    },
    collaboratingInstitutions: [],
  },
  {
    id: 'n425-genome-tea-anthracnose-2023',
    title: '茶树炭疽菌 N425 全基因组测序与基因功能注释',
    authors: '张承康, 周子文, 郭田龙, 等',
    venue:
      '《福建农业学报》, 2023, 38(12): 1437–1444. DOI: 10.19303/j.issn.1008-0384.2023.12.007',
    year: 2023,
    type: 'journal',
    tags: ['中文论文', '植物病原真菌', '基因组学'],
    link: 'https://doi.org/10.19303/j.issn.1008-0384.2023.12.007',
    pdfPath: '/论文/2-24-茶树炭疽菌N425全基因组测序与基因功能注释_张承康.pdf',
    journalCategory: {
      name: '福建农业学报',
      categories: ['北大核心', 'CSCD'],
    },
    collaboratingInstitutions: ['福建农林大学'],
  },
  {
    id: 'pso-ensemble-vegetable-pesticide-2025',
    title:
      '基于粒子群优化集成学习算法堆叠模型预测蔬菜中倍硫磷的抽检结果',
    authors: '周子文, 范志仪, 彭少杰',
    venue:
      '《食品安全质量检测学报》, 2025, 16(05): 187–196. DOI: 10.19812/j.cnki.jfsq11-5956/ts.20241008004',
    year: 2025,
    type: 'journal',
    tags: ['中文论文', '第一作者', '食品安全风险预警', '集成学习'],
    link: 'https://doi.org/10.19812/j.cnki.jfsq11-5956/ts.20241008004',
    pdfPath: '/论文/2025-基于粒子群优化集成学习算法堆叠模型预测蔬菜中倍硫磷的抽检结果-周子文.pdf',
    journalCategory: {
      name: '食品安全质量检测学报',
      categories: ['北大核心', 'CSCD'],
    },
    collaboratingInstitutions: [],
  },
  {
    id: 'quinoa-milk-process-optimization-2023',
    title: '过热蒸汽结合酶法制备藜麦奶的工艺优化',
    authors: '钟鑫荣, 陈登元, 费帆, 等',
    venue: '《食品研究与开发》, 2023, 44(14): 125–131',
    year: 2023,
    type: 'journal',
    tags: ['中文论文', '藜麦', '加工工艺'],
    pdfPath: '/论文/过热蒸汽结合酶法制备藜麦奶的工艺优化_钟鑫荣.pdf',
    journalCategory: {
      name: '食品研究与开发',
      categories: ['北大核心'],
    },
    collaboratingInstitutions: ['福建农林大学'],
  },
  {
    id: 'quinoa-steam-process-2023',
    title: '过热蒸汽制备藜麦的工艺',
    authors: '钟鑫荣, 朱新婷, 周子文, 等',
    venue: '《食品工业》, 2023, 44(04): 96–100',
    year: 2023,
    type: 'journal',
    tags: ['中文论文', '藜麦', '加工工艺'],
    pdfPath: '/论文/过热蒸汽制备藜麦的工艺_钟鑫荣.pdf',
    journalCategory: {
      name: '食品工业',
      categories: ['北大核心'],
    },
    collaboratingInstitutions: ['福建农林大学'],
  },
  {
    id: 'ml-food-safety-warning-review-2025',
    title: '机器学习在食品安全风险预警中的应用进展',
    authors: '张露菁, 周子文, 姚烨, 等',
    venue: '《环境与职业医学》, 2025, 42(10): 1252–1259',
    year: 2025,
    type: 'journal',
    tags: ['中文论文', '综述', '食品安全风险预警', '机器学习'],
    link: 'https://doi.org/10.16476/j.pemo.2025.0123',
    pdfPath: '/论文/2025-机器学习在食品安全风险预警中的应用进展-张露菁-周子文.pdf',
    journalCategory: {
      name: '环境与职业医学',
      categories: ['北大核心', 'CSCD'],
    },
    collaboratingInstitutions: [],
  },
  {
    id: 'rf-food-safety-warning-patent-2025',
    title: '一种基于优化随机森林的食品安全风险预警方法及系统',
    authors:
      '上海市市场监督管理局信息应用研究中心(上海市食品安全技术应用中心, 上海市市场监督管理局档案馆)',
    venue: '中国发明专利, 申请号: 202411827516.3, 授权日期: 2025-04-29',
    year: 2025,
    type: 'patent',
    tags: ['专利', '食品安全风险预警', '随机森林'],
    pdfPath: '/论文/FSAP-2025-0028.pdf',
    collaboratingInstitutions: ['上海市市场监督管理局信息应用研究中心'],
  },
]