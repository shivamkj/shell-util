import { spawnSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'

const defaultTimeout = 6000

export const $ = (command) => {
  console.log(command)
  const { stdout, stderr, status, error } = spawnSync(command, {
    shell: true,
    timeout: defaultTimeout,
    stdio: ['pipe', 'pipe', 'pipe'],
    windowsHide: true,
  })

  if (error) throw error
  if (status != 0) {
    const combinedOutput = stderr?.toString() + stdout?.toString()
    const error = new Error(`Exit Code: ${status} \nCommand: ${command} \nError: ${combinedOutput}`)
    error.stack = ``
    throw error
  }

  return {
    stdout: stdout?.toString(),
    stderr: stderr?.toString(),
    exitCode: status,
    error,
  }
}

export function read(filePath) {
  try {
    return readFileSync(filePath, 'utf-8')
  } catch (error) {
    console.error(`Error reading file: ${filePath}`)
    console.error(error.message)
    process.exit(1)
  }
}

export function write(filePath, data) {
  try {
    return writeFileSync(filePath, data, 'utf-8')
  } catch (error) {
    console.error(`Error writing file: ${filePath}`)
    console.error(error.message)
    process.exit(1)
  }
}

export function exitWithError(error) {
  console.error(error)
  process.exit(1)
}

export { default as minimist } from 'minimist'
export { default as fg } from 'fast-glob'
export { default as fetch } from 'node-fetch'
