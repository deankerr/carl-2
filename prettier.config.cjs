/** @type {import("prettier").Config} */

module.exports = {
  trailingComma: 'es5',
  semi: false,
  singleQuote: true,
  plugins: [require('@trivago/prettier-plugin-sort-imports')],
  importOrder: ['^@?[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
