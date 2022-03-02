import React from 'react'
import { Stack, Flex, Heading, Text, Button } from '@intouchg/components'
import { routeTitles } from './index'
import type { ImportModalRoute } from './index'

const ImportSummary = ({
	numberOfNewValuesByType,
	selectedImportCategories,
	setShowImportModal,
}: {
	numberOfNewValuesByType: { [key in ImportModalRoute]: number }
	selectedImportCategories: ImportModalRoute[]
    setShowImportModal: React.Dispatch<React.SetStateAction<boolean>>
}) => (
	<Flex
		alignItems="center"
		justifyContent="center"
		flexGrow={1}
		padding={6}
		backgroundColor="Background"
		overflowY="scroll"
	>
		<Stack
			height="100%"
			maxHeight="500px"
			justifyContent="space-around"
		>
			<Heading textAlign="center">
				Import Successful!
			</Heading>
			<Stack
				minWidth="220px"
				padding={3}
				borderRadius={3}
				backgroundColor="Card"
			>
				<Flex>
					<Stack marginRight={3}>
						{Object.entries(numberOfNewValuesByType).map(([ key, number ]: [ keyof typeof routeTitles, number ]) => (
							<Flex
								key={key}
								minWidth="24px"
								height="24px"
								paddingX={1}
								marginBottom={1}
								alignItems="center"
								justifyContent="center"
								backgroundColor="Primary Lighter"
								borderRadius={2}
							>
								<Text
									fontSize={1}
									fontWeight={4}
									color="Primary"
								>
									{selectedImportCategories.includes(key) ? number : 0}
								</Text>
							</Flex>
						))}
					</Stack>
					<Stack>
						{Object.keys(numberOfNewValuesByType).map((key: keyof typeof routeTitles) => (
							<Flex
								key={key}
								height="24px"
								marginBottom={1}
								alignItems="center"
							>
								<Text fontSize={3}>
									{routeTitles[key]}
								</Text>
							</Flex>
						))}
					</Stack>
				</Flex>
			</Stack>
			<Button onClick={() => setShowImportModal(false)}>
				Done
			</Button>
		</Stack>
	</Flex>
)

export { ImportSummary }
