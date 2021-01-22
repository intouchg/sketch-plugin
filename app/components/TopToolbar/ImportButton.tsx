import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Text } from '@i/components'
import { SketchIcon } from '../Icons'
import { setBannerState } from '../../store'

const ImportButton = ({
	setShowImportModal,
}: {
    setShowImportModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const dispatch = useDispatch()
	const sketchDocumentNames = useSelector((state) => state.theme.sketchDocumentNames)

	const openImportModal = () => {
		if (!sketchDocumentNames.length) {
			dispatch(setBannerState({ show: true, type: 'info', title: 'No Sketch document found', message: 'Open a Sketch document to import styles.' }))
		}
		else {
			setShowImportModal(true)
		}
	}

	return (
		<Button
			variant="Invisible"
			display="inline-flex"
			marginRight={4}
			paddingY={3}
			onClick={openImportModal}
		>
			<Text
				variant="Accent"
				color="Text"
				marginRight={1}
			>
				Import
			</Text>
			<SketchIcon
				width="16px"
				height="16px"
			/>
		</Button>
	)
}

export { ImportButton }
