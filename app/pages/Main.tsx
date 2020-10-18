import React, { useState } from 'react'
import { Route, Redirect, useRouteMatch } from 'react-router-dom'
import { Button, Flex } from '@i/components'
import { TopToolbar, LeftNavbar, ThemeEditor, ComponentEditor, ImportModal } from '../components'

const Main = () => {
	const { url, path } = useRouteMatch()
	const [ showImportModal, setShowImportModal ] = useState(false)

	return (
		<>
			<TopToolbar openImportModal={() => setShowImportModal(true)} />
			<Flex>
				<LeftNavbar url={url} />
				<ThemeEditor path={path} />
				<ComponentEditor path={path} />
				<Route path={path}>
					<Redirect to={`${path}/theme`} />
				</Route>
			</Flex>
			{showImportModal && (
				<ImportModal closeImportModal={() => setShowImportModal(false)} />
			)}
		</>
	)
}

export { Main }
