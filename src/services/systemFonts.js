import ChildProcess from '../ChildProcess'
import { exec } from '@skpm/child_process'

const systemFontsProcess = null

export const stopSystemFontsProcess = () => systemFontsProcess && systemFontsProcess.stop()

export const getSystemFonts = () => new Promise((resolve, reject) => {
	// const chunks = []

	const onStdOut = (data) => console.log(data.toString())

	// const onClose = () => {
	// 	console.log('length1 = ', chunks.length)
	// 	setTimeout(() => console.log('length2 = ', chunks.length), 1)
	// 	const data = chunks.concat().toString('utf-8')
	// 	resolve(data)
	// }

	exec('system_profiler -json SPFontsDataType', { shell: true, cwd: process.cwd(), maxBuffer: 1024 * 5000 }, (err, stdout, stderr) => {
		console.log('error', err)
		console.log('stdout', stdout)
		console.log(JSON.parse(stdout.toString()))
		console.log(JSON.parse(stdout))
	})

	// systemFontsProcess = new ChildProcess('system_profiler -json SPFontsDataType', { onStdOut }, true)

	// resolve({ SPFontsDataType: [] })
})
