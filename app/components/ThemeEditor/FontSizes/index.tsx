import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Stack, Flex, Text } from '@i/components'
import { FontSize } from '../../ThemeValues'
import { ValuesContainer } from '../ValuesContainer'
import { RightToolbar } from '../RightToolbar'
import { CreateOverlay } from '../CreateOverlay'
import { EditFontSize } from './EditFontSize'
import { CreateFontSize } from './CreateFontSize'
import { sortFontSizes } from '../../ImportModal/FontSizes'

const FontSizes = () => {
	const values = useSelector((state) => state.theme.values.fontSizes)
	const [ selectedId, setSelectedId ] = useState<string | null>(null)
	const selectedValue = selectedId ? values.find((value) => value.id === selectedId)! : null
	const [ creating, setCreating ] = useState(false)

	const toggleCreating = () => {
		setSelectedId(null)
		setCreating((s) => !s)
	}

	return (
		<>
			<ValuesContainer>
				<Stack
					flexGrow={1}
					minWidth="560px"
					maxWidth="860px"
					margin="auto"
					gridGap={3}
					padding={6}
				>
					{values.slice().sort(sortFontSizes).map((value) => (
						<Button
							invisible
							key={value.id}
							display="flex"
							alignItems="stretch"
							paddingY={2}
							paddingRight={3}
							backgroundColor={value.id === selectedId ? 'Card' : 'transparent'}
							borderWidth="2px"
							borderColor={value.id === selectedId ? 'Primary Light' : 'transparent'}
							borderStyle="solid"
							borderRadius="Extra Large"
							onClick={() => setSelectedId(value.id)}
						>
							<Flex
								minWidth="72px"
								minHeight="44px"
								padding={2}
								marginRight={3}
								alignItems="center"
								justifyContent="center"
								backgroundColor="Card"
								borderRadius="Large"
								flexShrink={0}
							>
								<Text
									fontWeight="Demibold"
									color={value.id === selectedId ? 'Primary' : 'Text'}
								>
									{Number(value.value.split('rem')[0]) * 16}
								</Text>
							</Flex>
							<FontSize {...value} />
						</Button>
					))}
				</Stack>
				<CreateOverlay
					active={creating}
					onClick={toggleCreating}
				/>
			</ValuesContainer>
			<RightToolbar>
				{creating && (
					<CreateFontSize
						setCreating={setCreating}
						setSelectedId={setSelectedId}
					/>
                )}
				{selectedValue && (
					<EditFontSize fontSize={selectedValue} />
                )}
			</RightToolbar>
		</>
	)
}

export { FontSizes }
