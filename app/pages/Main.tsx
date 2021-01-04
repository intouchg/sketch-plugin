import React, { useState } from 'react'
import { Route, Redirect, useRouteMatch } from 'react-router-dom'
import { Flex } from '@i/components'
import { TopToolbar, LeftNavbar, ThemeEditor, ComponentEditor, ImportModal } from '../components'

const Main = ({
	setShowAzureModal,
}: {
	setShowAzureModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const { url, path } = useRouteMatch()
	const [ showImportModal, setShowImportModal ] = useState(false)

	return (
		<>
			<TopToolbar
				setShowImportModal={setShowImportModal}
				setShowAzureModal={setShowAzureModal}
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
				<ImportModal setShowImportModal={setShowImportModal} />
			)}
		</>
	)
}

export { Main }
