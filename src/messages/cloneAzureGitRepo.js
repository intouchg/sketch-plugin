import { cloneGitRepo } from '../services'

export const cloneAzureGitRepo = async (state, payload) => {
    try {
        const { filepath, remoteUrl, branchName } = payload
        return await cloneGitRepo(remoteUrl, filepath, branchName)
	}
	catch (error) {
		throw Error('Failed to clone Azure git repo: ' + error)
	}
}
