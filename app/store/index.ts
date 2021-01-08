import { combineReducers, createStore } from 'redux'
import { themeReducer } from './theme'
import { azureReducer } from './azure'
import { bannerReducer } from './banner'
import { loadingReducer } from './loading'
import { settingsReducer } from './settings'

export * from './theme'
export * from './azure'
export * from './banner'
export * from './loading'
export * from './settings'

const rootReducer = combineReducers({
	theme: themeReducer,
	azure: azureReducer,
	banner: bannerReducer,
	loading: loadingReducer,
	settings: settingsReducer,
})

export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>
