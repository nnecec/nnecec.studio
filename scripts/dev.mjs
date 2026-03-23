import { access, readFile, rm } from 'node:fs/promises'
import net from 'node:net'
import path from 'node:path'
import { spawn } from 'node:child_process'

const DEFAULT_PORT = 3006
const MAX_PORT_ATTEMPTS = 20
const DEV_LOCK_PATH = path.join(process.cwd(), '.next', 'dev', 'lock')

function canListen(port, host) {
  return new Promise((resolve) => {
    const server = net.createServer()

    server.once('error', (error) => {
      resolve(error.code !== 'EADDRINUSE')
    })

    server.once('listening', () => {
      server.close(() => resolve(true))
    })

    server.listen(port, host)
  })
}

async function isPortAvailable(port) {
  for (const host of ['::', '0.0.0.0']) {
    if (!(await canListen(port, host))) {
      return false
    }
  }

  return true
}

async function findAvailablePort(startPort) {
  for (let port = startPort; port < startPort + MAX_PORT_ATTEMPTS; port += 1) {
    if (await isPortAvailable(port)) {
      return port
    }
  }

  throw new Error(`No available port found between ${startPort} and ${startPort + MAX_PORT_ATTEMPTS - 1}.`)
}

async function readDevLock() {
  try {
    await access(DEV_LOCK_PATH)
    const content = await readFile(DEV_LOCK_PATH, 'utf8')
    return JSON.parse(content)
  }
  catch {
    return null
  }
}

function isProcessRunning(pid) {
  try {
    process.kill(pid, 0)
    return true
  }
  catch {
    return false
  }
}

async function main() {
  const existingDevServer = await readDevLock()

  if (existingDevServer?.pid) {
    if (isProcessRunning(existingDevServer.pid)) {
      console.warn(
        `Next dev server is already running at ${existingDevServer.appUrl} (PID ${existingDevServer.pid}).`,
      )
      return
    }

    await rm(DEV_LOCK_PATH, { force: true })
    console.warn(`Removed stale Next dev lock for PID ${existingDevServer.pid}.`)
  }

  const preferredPort = Number.parseInt(process.env.PORT ?? `${DEFAULT_PORT}`, 10)

  if (Number.isNaN(preferredPort) || preferredPort <= 0) {
    throw new Error(`Invalid PORT value: ${process.env.PORT}`)
  }

  const port = await findAvailablePort(preferredPort)

  if (port !== preferredPort) {
    console.warn(`Port ${preferredPort} is in use, starting dev server on ${port} instead.`)
  }

  const child = spawn(
    'pnpm',
    ['exec', 'next', 'dev', '--turbo', '-p', `${port}`],
    {
      stdio: 'inherit',
      shell: process.platform === 'win32',
    },
  )

  const stopChild = (signal) => {
    if (!child.killed) {
      child.kill(signal)
    }
  }

  process.on('SIGINT', () => stopChild('SIGINT'))
  process.on('SIGTERM', () => stopChild('SIGTERM'))

  child.on('exit', (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal)
      return
    }

    process.exit(code ?? 0)
  })
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
