import { combineReducers, createStore } from 'redux'
import { themeReducer } from './theme'

export * from './theme'

const rootReducer = combineReducers({
	theme: themeReducer,
})

export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>
