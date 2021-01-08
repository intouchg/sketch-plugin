import { stopDevServer, closeGitRepo } from '../services'
import { initialState } from '../index'

export const closeLocalProject = async (state, payload) => {
	stopDevServer()
	closeGitRepo()
	state = initialState
	return true
}
