const { exec, spawn } = require('child_process')
const path = require('path')


/** @typedef {import('child_process').ChildProcessWithoutNullStreams} ChildProcessWithoutNullStreams */

const utils = {
  Sleep: (ms) => (new Promise(res => setTimeout(res, ms))),
  Exec: (cmd, cwd) => {
    cwd = cwd || path.resolve('./')
    return new Promise((res, rej) => {
      console.log(`> \x1b[2m${cmd}\x1b[0m`)
      exec(cmd, { cwd }, (error, stdout, stderr) => {
        if (error) { console.error(`error: ${error}`); rej(error); return }
        if (stdout) console.log(stdout)
        if (stderr) console.log(stderr)
        res()
      })
    })
  },
  /** @type {ChildProcessWithoutNullStreams[]} */
  processList: [],
  /**
   * 
   * @param {string} cmd 
   * @param {string} cwd 
   * @returns 
   */
  Spawn(cmd, cwd = path.resolve('./')) {
    const prefix = cwd === path.resolve('./')
      ? '> '
      : `> ${path.relative(path.resolve('./'), cwd)} -> `
    console.log(`${prefix}\x1b[2m${cmd}\x1b[0m`)
    return new Promise((resolve, reject) => {
      let spawnProcess = spawn(cmd, {
        shell: true,
        windowsHide: true,
        env: {
          ...process.env,
          FORCE_COLOR: '1',
        },
        cwd,
      })
      spawnProcess.on('close', (code) => {
        spawnProcess = null
        if (code) {
          console.log(`${prefix}process exited with code ${code}`)
          reject(new Error(`process exited with code ${code}`))
          return
        }
        resolve(true)
      })
      process.stdin.pipe(spawnProcess.stdin)
      spawnProcess.stdout.pipe(process.stdout)
      spawnProcess.stderr.pipe(process.stderr)
      const checkStop = () => {
        if (!spawnProcess) return
        try {
          spawnProcess.kill()
        } catch (error) {
          spawnProcess = null
        }
      }
      process.on('SIGINT', checkStop)
      process.on('SIGTERM', checkStop)
      process.on('message', msg => { if (msg == 'shutdown') checkStop() })
    })
  },
}

module.exports = utils
