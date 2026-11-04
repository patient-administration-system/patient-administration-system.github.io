// Interface text. Page content lives in locales/<code>/. Each language is one object here; the regional variants of
// a language share it, except where spelling differs.
import type { Locale } from "./locales";

const en = {
  brand: "Patient Administration System",
  skip: "Skip to main content",
  mainNav: "Main",
  preferences: "Site preferences and tools",
  languages: "Languages",
  github: "GitHub",
  translations: "Translations:",
  draftNotice: "",
  compareNotice:
    "An independent comparison from public sources, checked on {date}. We have no connection with this company or product, and its names and trademarks belong to their owners. Corrections are welcome.",
  compareFix: "Report a correction",
  footer:
    "An open-source project, built and tested but not yet in use with real patients. This is not an official NHS website, and nothing here is clinical advice.",
  licence: "Licence",
  aiStatement: "AI statement",
  security: "Report a security problem",
  contribute: "Contribute",
  stats: {
    requirements: "Written requirements",
    tests: "Rust tests",
    routes: "API routes",
    languages: "Languages in the interface",
  },
  retrieved: "Counted from the project's main branch on {date}.",
  numbers: "Project figures",
  searchTitle: "Search",
  searchDescription: "Search the pages of the Patient Administration System website.",
  searchPrompt: "Use the search button at the top of the page to look for a word.",
  searchResults: 'Pages matching "{query}"',
  searchNone: 'No page matches "{query}".',
  searchNeedsScript: "Search needs JavaScript. Every page is also linked from the menu at the top.",
  picker: {
    link: "Pages",
    search: "Search this site",
    searchInput: "Search terms",
    searchSubmit: "Search",
    theme: "Theme",
    locale: "Language",
    timeZone: "Time zone",
    textSize: "Text size",
    share: "Share",
    email: "Email",
    copy: "Copy link",
    copied: "Copied",
    copyFailed: "Could not copy",
  },
  sizes: {
    largest: "Largest",
    larger: "Larger",
    large: "Large",
    normal: "Normal",
    small: "Small",
    smaller: "Smaller",
    smallest: "Smallest",
  },
};

export type Ui = typeof en;

const cy: Ui = {
  brand: "System Gweinyddu Cleifion",
  skip: "Neidio i'r prif gynnwys",
  mainNav: "Prif ddewislen",
  preferences: "Dewisiadau ac offer y wefan",
  languages: "Ieithoedd",
  github: "GitHub",
  translations: "Cyfieithiadau:",
  draftNotice:
    "Drafft cyntaf o'r cyfieithiad yw'r dudalen hon, wedi'i ysgrifennu gan AI. Nid yw siaradwr Cymraeg rhugl wedi'i hadolygu eto.",
  compareNotice:
    "Cymhariaeth annibynnol o ffynonellau cyhoeddus, a wiriwyd ar {date}. Nid oes gennym unrhyw gysylltiad â'r cwmni na'r cynnyrch hwn, ac mae ei enwau a'i nodau masnach yn perthyn i'w perchnogion. Croesewir cywiriadau.",
  compareFix: "Rhoi gwybod am gywiriad",
  footer:
    "Prosiect cod agored, wedi'i adeiladu a'i brofi ond heb ei ddefnyddio gyda chleifion go iawn eto. Nid yw hon yn wefan swyddogol y GIG, ac nid oes dim yma yn gyngor clinigol.",
  licence: "Trwydded",
  aiStatement: "Datganiad AI",
  security: "Rhoi gwybod am broblem ddiogelwch",
  contribute: "Cyfrannu",
  stats: {
    requirements: "Gofynion ysgrifenedig",
    tests: "Profion Rust",
    routes: "Llwybrau API",
    languages: "Ieithoedd yn y rhyngwyneb",
  },
  retrieved: "Wedi'u cyfrif o brif gangen y prosiect ar {date}.",
  numbers: "Ffigurau'r prosiect",
  searchTitle: "Chwilio",
  searchDescription: "Chwilio tudalennau gwefan y System Gweinyddu Cleifion.",
  searchPrompt: "Defnyddiwch y botwm chwilio ar frig y dudalen i chwilio am air.",
  searchResults: 'Tudalennau sy\'n cyfateb i "{query}"',
  searchNone: 'Nid oes tudalen yn cyfateb i "{query}".',
  searchNeedsScript: "Mae chwilio angen JavaScript. Mae pob tudalen hefyd wedi'i chysylltu o'r ddewislen ar y brig.",
  picker: {
    link: "Tudalennau",
    search: "Chwilio'r wefan",
    searchInput: "Geiriau chwilio",
    searchSubmit: "Chwilio",
    theme: "Thema",
    locale: "Iaith",
    timeZone: "Cylchfa amser",
    textSize: "Maint y testun",
    share: "Rhannu",
    email: "E-bost",
    copy: "Copïo'r ddolen",
    copied: "Wedi copïo",
    copyFailed: "Methu copïo",
  },
  sizes: {
    largest: "Mwyaf",
    larger: "Mwy",
    large: "Mawr",
    normal: "Arferol",
    small: "Bach",
    smaller: "Llai",
    smallest: "Lleiaf",
  },
};

const zh: Ui = {
  brand: "患者管理系统",
  skip: "跳到主要内容",
  mainNav: "主菜单",
  preferences: "网站偏好设置和工具",
  languages: "语言",
  github: "GitHub",
  translations: "翻译版本：",
  draftNotice: "本页为 AI 撰写的翻译初稿，尚未经中文母语人士审校。",
  compareNotice:
    "这是一份根据公开资料撰写的独立对比，核对日期为 {date}。我们与该公司或产品没有任何关联，其名称和商标归各自所有者所有。欢迎指正。",
  compareFix: "提交更正",
  footer: "这是一个开源项目，已完成构建和测试，但尚未用于真实患者。本网站不是 NHS 官方网站，此处内容均不构成临床建议。",
  licence: "许可证",
  aiStatement: "AI 声明",
  security: "报告安全问题",
  contribute: "参与贡献",
  stats: { requirements: "书面需求", tests: "Rust 测试", routes: "API 路由", languages: "界面语言" },
  retrieved: "于 {date} 根据项目主分支统计。",
  numbers: "项目数据",
  searchTitle: "搜索",
  searchDescription: "搜索患者管理系统网站的页面。",
  searchPrompt: "使用页面顶部的搜索按钮查找词语。",
  searchResults: "与“{query}”匹配的页面",
  searchNone: "没有与“{query}”匹配的页面。",
  searchNeedsScript: "搜索需要 JavaScript。所有页面也都可以从顶部菜单进入。",
  picker: {
    link: "页面",
    search: "搜索本站",
    searchInput: "搜索词",
    searchSubmit: "搜索",
    theme: "主题",
    locale: "语言",
    timeZone: "时区",
    textSize: "文字大小",
    share: "分享",
    email: "电子邮件",
    copy: "复制链接",
    copied: "已复制",
    copyFailed: "无法复制",
  },
  sizes: {
    largest: "最大",
    larger: "更大",
    large: "大",
    normal: "标准",
    small: "小",
    smaller: "更小",
    smallest: "最小",
  },
};

const enUs: Ui = { ...en, licence: "License" };

const UI: Record<Locale, Ui> = {
  "cy-001": cy,
  "cy-gb": cy,
  "en-001": en,
  "en-gb": en,
  "en-gb-oxendict": en,
  "en-us": enUs,
  "zh-001": zh,
  "zh-cn": zh,
};

export function ui(locale: Locale): Ui {
  return UI[locale];
}

/** Fills {name} placeholders. */
export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{([^}]+)\}/g, (whole, name: string) => String(values[name] ?? whole));
}
