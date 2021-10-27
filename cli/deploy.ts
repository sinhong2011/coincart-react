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
// .check(argv => {
//   // console.log('argv', argv)
//   if (!ENV_TYPES.has(argv.e)) {
//     throw new Error(
//       `Incorrect environment input "${argv.e}", expect one of ${Array.from(
//         ENV_TYPES
//       ).join('|')} `
//     )
//   }
//   if (!argv.build && !argv.deploy) {
//     throw new Error('No any action executed!')
//   }
//   return true
// }).argv

const htdocsPath = '/usr/local/h3gdev/apache2/htdocs/.'
// const projectFolder = 'trader-portal'

// const commBuildCmd = `env-cmd -e ${args.env} next build && env-cmd -e ${args.env} next export`

// const serverConfig = {
//   dev: {
//     ips: ['172.22.61.31'],
//     buildCmd: commBuildCmd,
//     targetFolder: `${htdocsPath}`,
//   },
//   uat: {
//     ips: ['172.22.61.30'],
//     buildCmd: commBuildCmd,
//     targetFolder: `${htdocsPath}`,
//   },
//   ppd: {
//     ips: ['172.22.40.26'],
//     buildCmd: commBuildCmd,
//     targetFolder: `${htdocsPath}`,
//   },
// }

// async function main() {
//   // Build the deploy command
//   const { ips, targetFolder, buildCmd } = serverConfig[args.e]
//   const { deploy, build } = args

//   if (build) {
//     await utils.Spawn(buildCmd)
//   }

//   if (deploy) {
//     const folderCmds = ips.map(
//       ip => `ssh h3gdev@${ip} -vvv "mkdir -p ${targetFolder}"`
//     )

//     const deployCmds = ips.map(
//       ip => `"scp -rp out/. h3gdev@${ip}:${targetFolder}"`
//     )
//     const deployCmd = `concurrently ${deployCmds.join(' ')}`

//     await Promise.all(folderCmds.map(c => utils.Spawn(c)))
//     await utils.Spawn(deployCmd)
//   }
// }

// main()

// async function _shutdown() {
//   console.log('EXIT => RECEIVED')
//   for (const p of utils.processList) p.kill()
//   let keep = true
//   while (keep) {
//     if (!process._getActiveRequests().length) {
//       keep = true
//       break
//     }
//     await utils.Sleep(50)
//   }
//   console.log('EXIT => process.exit(0);')
//   process.exit(0)
// }

// process.on('SIGINT', _shutdown)
// process.on('SIGTERM', _shutdown)
// process.on('message', msg => {
//   if (msg == 'shutdown') _shutdown()
// })
