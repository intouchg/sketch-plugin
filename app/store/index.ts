import { combineReducers, createStore } from 'redux'
import { themeReducer } from './theme'
import { azureReducer } from './azure'

export * from './theme'
export * from './azure'

const rootReducer = combineReducers({
	theme: themeReducer,
	azure: azureReducer,
})

export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>
