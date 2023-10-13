import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  markdown: false,
  ignores: [
    '!src/.vuepress/',
    'src/.vuepress/.temp/',
    'src/.vuepress/.cache/',
    'src/.vuepress/dist/',
  ],
})
