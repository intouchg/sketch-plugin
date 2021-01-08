import { stopDevServer } from '../services'
import { initialState } from '../index'

export const closeLocalProject = async (state, payload) => {
	stopDevServer()
	state = initialState
	return true
}
