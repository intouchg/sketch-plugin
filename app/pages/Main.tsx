import React, { useState } from 'react'
import { Button, Flex } from '@i/components'
import { TopToolbar, LeftNavbar, ImportModal } from '../components'

const Main = () => {
	const [ showImportModal, setShowImportModal ] = useState(false)

	const toggleImportModal = () => setShowImportModal((show) => !show)

	return (
		<>
			<TopToolbar />
			<Flex>
				<LeftNavbar />
				<Button onClick={toggleImportModal}>
					Main
				</Button>
			</Flex>
			{showImportModal && (
				<ImportModal closeImportModal={toggleImportModal} />
			)}
		</>
	)
}

export { Main }
