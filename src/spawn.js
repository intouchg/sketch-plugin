import { spawnSync as ss } from '@skpm/child_process'

export const spawnSync = (command) => {
	const commandStrings = command.split(' ')
	const process = ss(commandStrings.shift(), commandStrings, { shell: true })

	if (process.status !== 0) {
		throw Error(`Spawned process "${command}" exited with code ${process.status}`)
	}

	return process.stdout
}
