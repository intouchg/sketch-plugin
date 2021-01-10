import { getAzureGitRepos as get } from '../services'

export const getAzureGitRepos = async (state, payload) => {
	try {
		const gitRepos = await get()
		return gitRepos
	}
	catch (error) {
		throw Error('Failed getting Azure git repos: ' + error)
	}
}
