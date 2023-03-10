import process from 'node:process'
import { getDirname, path } from '@vuepress/utils'
import { defineUserConfig, defaultTheme } from 'vuepress'
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance'
import { copyCodePlugin } from 'vuepress-plugin-copy-code2'
import { searchProPlugin } from 'vuepress-plugin-search-pro'
import { autoCatalogPlugin } from 'vuepress-plugin-auto-catalog'
// import { shikiPlugin } from '@vuepress/plugin-shiki'

const __dirname = getDirname(import.meta.url)
const isProd = process.env.NODE_ENV === 'production'

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
    navbar: [
    ],
    sidebar: {
      '/pypi-package/pyside6': [
        '/pypi-package/pyside6/chapter01/',
        '/pypi-package/pyside6/chapter02/',
        '/pypi-package/pyside6/chapter03/',
        '/pypi-package/pyside6/chapter04/',
        '/pypi-package/pyside6/chapter05/',
        '/pypi-package/pyside6/chapter06/',
        '/pypi-package/pyside6/chapter07/',
        '/pypi-package/pyside6/chapter08/',
      ]
    },
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
    autoCatalogPlugin({}),
    copyCodePlugin({
      showInMobile: true
    }),
    // isProd ? shikiPlugin({ theme: 'dark-plus' }) : [],
  ],
  alias: {
    '@': path.resolve(
      __dirname,
      '.',
    )
  },
})
