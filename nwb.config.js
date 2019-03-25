module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'riug',
      externals: {
        react: 'React'
      }
    }
  }
}
