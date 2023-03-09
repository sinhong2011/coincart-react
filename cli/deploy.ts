import yargs from 'yargs'

const ENV_TYPES = new Set(['dev', 'uat', 'ppd', 'prod', 'dr'])

const args = yargs(process.argv.slice(2))
  .usage(
    ` 

  
yarn $0 -e {${Array.from(ENV_TYPES).join('|')}}
`
  )
  .options('env', {
    alias: 'e',
    describe: 'select a specific environment to deploy',
    demandOption: true,
  })
  .options('build', {
    alias: 'b',
    describe: 'build the project before deployment',
    demandOption: false,
    default: true,
    type: 'boolean',
  })
  .options('deploy', {
    alias: 'd',
    describe: 'execute the deploy function',
    demandOption: false,
    default: true,
    type: 'boolean',
  })
  .help('h')
  .alias('h', 'help')
