import { spawnSync as ss } from '@skpm/child_process'

/**
 * This exists to solve the issues mentioned in ./ChildProcess.js,
 * but it's much slower. Try to use ./ChildProcess.js if possible...
 **/

export const spawnSync = (command) => {
	const commandStrings = command.split(' ')
	const { status, stdout, stderr } = ss(commandStrings.shift(), commandStrings, { shell: true })
	return { status, stdout, stderr }
}

export const escapeStringForShell = (string) => `"${string.replace(/"/g, '\\"')}"`
