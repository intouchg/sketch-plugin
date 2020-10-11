import React, { useState } from 'react'
import { Route, Redirect, useRouteMatch } from 'react-router-dom'
import { Button, Flex } from '@i/components'
import { TopToolbar, LeftNavbar, ThemeEditor, ComponentEditor, ImportModal } from '../components'

const Main = () => {
	const { url, path } = useRouteMatch()
	const [ showImportModal, setShowImportModal ] = useState(false)

	const toggleImportModal = () => setShowImportModal((show) => !show)

	return (
		<>
			<TopToolbar />
			<Flex>
				<Button
					position="absolute"
					top="0"
					right="0"
					zIndex={4}
					onClick={toggleImportModal}
				>
					Main
				</Button>
				<LeftNavbar url={url} />
				<ThemeEditor path={path} />
				<ComponentEditor path={path} />
				<Route path={path}>
					<Redirect to={`${path}/theme`} />
				</Route>
			</Flex>
			{showImportModal && (
				<ImportModal closeImportModal={toggleImportModal} />
			)}
		</>
	)
}

export { Main }
