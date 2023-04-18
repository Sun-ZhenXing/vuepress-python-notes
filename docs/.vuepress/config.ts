import process from 'node:process'
import { getDirname, path } from '@vuepress/utils'
import { defineUserConfig, defaultTheme } from 'vuepress'
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance'
import { copyCodePlugin } from 'vuepress-plugin-copy-code2'
import { searchProPlugin } from 'vuepress-plugin-search-pro'
import { autoCatalogPlugin } from 'vuepress-plugin-auto-catalog'

const __dirname = getDirname(import.meta.url)
// const isProd = process.env.NODE_ENV === 'production'
const USER_NAME = 'Sun-ZhenXing'
const BASE_PATH = '/vuepress-python-notes/'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'Python 笔记',
  description: 'Python 笔记',
  head: [
    ['link', { rel: 'icon', href: `${BASE_PATH}favicon.svg` }]
  ],
  base: BASE_PATH,
  markdown: {
    code: {
      lineNumbers: 10
    }
  },
  theme: defaultTheme({
    logo: '/favicon.svg',
    repo: `${USER_NAME}${BASE_PATH}`,
    docsDir: 'docs',
    editLinkText: '在 GitHub 上编辑此页',
    contributorsText: '贡献者',
    lastUpdatedText: '上次更新',
    openInNewWindow: '在新窗口打开',
    toggleColorMode: '切换深色模式',
    toggleSidebar: '切换侧边栏',
    navbar: [
    ],
    sidebar: 'auto',
  }),
  plugins: [
    mdEnhancePlugin({
      gfm: true,
      container: true,
      linkCheck: true,
      vPre: true,
      tabs: true,
      codetabs: true,
      align: true,
      attrs: true,
      sub: true,
      sup: true,
      footnote: true,
      mark: true,
      imgLazyload: true,
      include: true,
      tasklist: true,
      katex: true,
      mermaid: true,
      delay: 200,
      stylize: [
        {
          matcher: '@def',
          replacer: ({ tag }) => {
            if (tag === 'em') return {
              tag: 'Badge',
              attrs: { type: 'tip' },
              content: '定义'
            }
          }
        },
        {
          matcher: /@3.[0-9]+\+/,
          replacer: ({ tag, content }) => {
            if (tag === 'em') return {
              tag: 'Badge',
              attrs: { type: 'tip' },
              content: content.replace('@', '')
            }
          }
        },
        {
          matcher: '@TODO',
          replacer: ({ tag }) => {
            if (tag === 'em') return {
              tag: 'Badge',
              attrs: { type: 'danger' },
              content: 'TODO'
            }
          }
        }
      ]
    }, false),
    searchProPlugin({}),
    autoCatalogPlugin({
      orderGetter: ({ title, routeMeta }) => {
        if (routeMeta.order) return routeMeta.order as number
        const prefix = title.match(/^\d+. /)
        if (prefix) return parseInt(prefix[0])
        const suffix = title.match(/\d+$/)
        if (suffix) return parseInt(suffix[0])
        return 0
      }
    }),
    copyCodePlugin({
      showInMobile: true
    }),
  ],
  alias: {
    '@': path.resolve(
      __dirname,
      '.',
    )
  },
})
