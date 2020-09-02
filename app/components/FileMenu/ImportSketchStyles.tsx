import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Button, Flex, Text } from '@i/components'
import { importSketchDocumentStyles } from '../../store'
import { sketchRequest } from '../../sketchApi'

const startSketchStyleImport = () => sketchRequest('extractSketchDocumentStyles')

const ImportSketchStyles = () => {
	const dispatch = useDispatch()
	const [ importResult, setImportResult ] = useState<boolean | null>(null)

	useEffect(() => {
		window.receiveImportedSketchStyles = (styles) => dispatch(importSketchDocumentStyles(styles))

		window.setImportSketchStylesResult = (result) => {
			setImportResult(result)
			setTimeout(() => setImportResult(null), 3000)
		}

		return () => {
			delete window.receiveImportedSketchStyles
			delete window.setImportSketchStylesResult
		}
	}, [])

	return (
		<Box padding={4}>
			<Button
				padding={2}
				color="white"
				backgroundColor="blue"
				activeColor="white"
				onClick={startSketchStyleImport}
			>
				Import Sketch Document Styles
			</Button>
			{importResult !== null && (
				<Flex
					display="inline-flex"
					paddingX={4}
				>
					<Flex
						width={26}
						height={26}
						marginX={2}
						color="white"
						backgroundColor={importResult ? 'green' : 'red'}
						borderRadius="100%"
					>
						{importResult ? '✓' : '✗'}
					</Flex>
					<Text color={importResult ? 'green' : 'red'}>
						{importResult ? 'Import Successful' : 'Import Failed'}
					</Text>
				</Flex>
			)}
		</Box>
	)
}

export { ImportSketchStyles }
