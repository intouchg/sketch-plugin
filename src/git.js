import fs from '@skpm/fs'
import path from '@skpm/path'
import { spawn, exec } from '@skpm/child_process'

let gitRunning = false
let gitProcess = null

export const killGit = () => {
	if (gitProcess) {
		gitProcess.kill()
	}

	gitProcess = null
	gitRunning = false
}

export const cloneAzureGitRepo = async (remoteUrl, targetDirectory, webContents, displayErrorInWebview) => {
	try {
		webContents.executeJavaScript('window.cloningAzureGitRepo()')
		gitRunning = true
		gitProcess = spawn('cd', [ targetDirectory, '&&', 'git', 'clone', remoteUrl ], { shell: true, cwd: process.cwd() })

		gitProcess.on('error', (error) => {
			gitProcess = null
			gitRunning = false
			throw new Error('Error spawning new gitProcess: ', error)
		})

		gitProcess.stdout.on('data', (data) => console.log(data.toString('utf-8')))

		gitProcess.stderr.on('data', (data) => console.log(data.toString('utf-8')))

		gitProcess.on('close', (code) => {
			gitProcess = null
			gitRunning = false
			console.info('"gitProcess" child process exited with code ' + code)
			webContents.executeJavaScript('window.clonedAzureGitRepo()')
			webContents.executeJavaScript(`window.displaySuccess('Downloaded Azure project.')`)
		})
	}
	catch (error) {
		displayErrorInWebview(`Could not clone git repo: ${error}`)
	}
}
