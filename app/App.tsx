import React, { useMemo, useState, useEffect } from 'react'
import { useHistory, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { setThemeData, undoAction, redoAction } from './store'
import { ErrorBanner, SuccessBanner, TopNavigation, FileMenu, ThemeEditor, ComponentEditor, SnippetEditor, StyleGuide, SettingsMenu, ProjectBrowser, DeletingModal, StorybookLoading } from './components'
import { Box } from '@i/components'
import { themeProcessor } from '@i/theme'
import pluginTheme from './theme.json'

const App = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const { values, groups, components, variants, snippets } = useSelector((state) => state.theme)
	const theme = useMemo(() => values.length ? themeProcessor({ values, groups, components, variants }) : undefined, [ values, groups, components ])
	const [ error, setError ] = useState<string | null>(null)
	const [ success, setSuccess ] = useState<string | null>(null)
	const [ showStorybookLoading, setShowStorybookLoading ] = useState(false)

	useEffect(() => {
		window.setThemeData = (data) => dispatch(setThemeData(data)) && history.push('/theme/colors')
		window.displayError = (message) => setError(message)
		window.displaySuccess = (message) => setSuccess(message)
		window.showStorybookLoading = (show) => setShowStorybookLoading(show)

		const undoRedoListener = (event: KeyboardEvent) => {
			if (event.metaKey && event.key === 'z') {
				// preventDefault stops the undo/redo keybinds from
				// unintentionally affecting native text inputs
				event.preventDefault()

				if (event.shiftKey) {
					dispatch(redoAction())
				}
				else {
					dispatch(undoAction())
				}
			}
		}

		window.addEventListener('keydown', undoRedoListener)

		return () => {
			delete window.setThemeData
			delete window.displayError
			delete window.displaySuccess
			delete window.showStorybookLoading
			window.removeEventListener('keydown', undoRedoListener)
		}
	}, [])

	const resetError = () => setError(null)
	const resetSuccess = () => setSuccess(null)

	return (
		<ThemeProvider theme={pluginTheme}>
			{error && (
				<ErrorBanner
					message={error}
					resetError={resetError}
				/>
			)}
			{success && (
				<SuccessBanner
					message={success}
					resetSuccess={resetSuccess}
				/>
			)}
			{theme && (
				<TopNavigation
					items={{
						file: '/file',
						theme: '/theme/colors',
						components: '/components',
						snippets: '/snippets',
						styleGuide: '/guide',
						settings: '/settings',
					}}
				/>
			)}
			<Box
				width={1}
				height="100%"
				paddingBottom={4}
			>
				<Switch>
					<Route path="/file">
						<FileMenu />
					</Route>
					<Route path="/theme">
						<ThemeEditor
							values={values}
							groups={groups}
						/>
					</Route>
					<Route path="/components">
						<ComponentEditor theme={theme} />
					</Route>
					<Route path="/snippets">
						<SnippetEditor snippets={snippets} />
					</Route>
					<Route path="/guide">
						<StyleGuide theme={theme} />
					</Route>
					<Route path="/settings">
						<SettingsMenu />
					</Route>
					<Route path="/">
						<ProjectBrowser />
					</Route>
				</Switch>
			</Box>
			{showStorybookLoading && (
				<StorybookLoading />
			)}
			<DeletingModal />
		</ThemeProvider>
	)
}

export default App
