module.exports = api => {
  const isTest = api.env('test')

  if (isTest) {
    return {
      presets: [
        ['@babel/preset-env'],
        '@babel/preset-typescript',
      ],
      plugins: [
        '@vue/babel-plugin-jsx',
        '@babel/plugin-proposal-class-properties',
      ],
    }
  }
  return {}
}
