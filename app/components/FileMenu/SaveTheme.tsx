import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Button, Flex, Text } from '@i/components'
import { saveThemeData } from '../../store'

const SaveTheme = () => {
	const dispatch = useDispatch()
	const saveTheme = () => dispatch(saveThemeData())
	const [ saveResult, setSaveResult ] = useState<boolean | null>(null)

	useEffect(() => {
		window.setSaveThemeDataResult = (result) => {
			setSaveResult(result)
			setTimeout(() => setSaveResult(null), 3000)
		}

		return () => void delete window.setSaveThemeDataResult
	}, [])

	return (
		<Box padding={4}>
			<Button
				padding={2}
				color="white"
				backgroundColor="blue"
				activeColor="white"
				onClick={saveTheme}
			>
				Save Theme Data
			</Button>
			{saveResult !== null && (
				<Flex
					display="inline-flex"
					paddingX={4}
				>
					<Flex
						width={26}
						height={26}
						marginX={2}
						color="white"
						backgroundColor={saveResult ? 'green' : 'red'}
						borderRadius="100%"
					>
						{saveResult ? '✓' : '✗'}
					</Flex>
					<Text color={saveResult ? 'green' : 'red'}>
						{saveResult ? 'Save Successful' : 'Save Failed'}
					</Text>
				</Flex>
			)}
		</Box>
	)
}

export { SaveTheme }
