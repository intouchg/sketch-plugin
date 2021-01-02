import { combineReducers, createStore } from 'redux'
import { themeReducer } from './theme'
import { azureReducer } from './azure'
import { bannerReducer } from './banner'

export * from './theme'
export * from './azure'
export * from './banner'

const rootReducer = combineReducers({
	theme: themeReducer,
	azure: azureReducer,
	banner: bannerReducer,
})

export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>
