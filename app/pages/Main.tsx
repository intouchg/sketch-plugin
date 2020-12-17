import React, { useState } from 'react'
import { Route, Redirect, useRouteMatch } from 'react-router-dom'
import { Flex } from '@i/components'
import { TopToolbar, LeftNavbar, ThemeEditor, ComponentEditor, ImportModal, AzureStatusModal, AzureLoginModal } from '../components'

const Main = () => {
	const { url, path } = useRouteMatch()
	const [ showImportModal, setShowImportModal ] = useState(false)
	const [ showAzureStatusModal, setShowAzureStatusModal ] = useState(false)
	const [ showAzureLoginModal, setShowAzureLoginModal ] = useState(false)

	return (
		<>
			<TopToolbar
				openImportModal={() => setShowImportModal(true)}
				openAzureStatusModal={() => setShowAzureStatusModal(true)}
				openAzureLoginModal={() => setShowAzureLoginModal(true)}
			/>
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
			{showAzureStatusModal && (
				<AzureStatusModal closeAzureStatusModal={() => setShowAzureStatusModal(false)} />
			)}
			{showAzureLoginModal && (
				<AzureLoginModal
					path={path}
					closeAzureLoginModal={() => setShowAzureLoginModal(false)}
					openAzureStatusModal={() => setShowAzureStatusModal(true)}
				/>
			)}
		</>
	)
}

export { Main }
