const { alias } = require('react-app-rewire-alias')

module.exports = function override(config, env) {
  alias({
    '@components': 'src/components',
    '@helpers': 'src/helpers',
    '@modules': 'src/modules',
    '@consts': 'src/consts',
    '@assets': 'src/assets',
    '@hooks': 'src/hooks',
    '@ui': 'src/ui',
  })(config)

  return config
}