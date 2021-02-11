import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Stack, Flex, Text } from '@i/components'
import { LineHeight } from '../../ThemeValues'
import { ValuesContainer } from '../ValuesContainer'
import { RightToolbar } from '../RightToolbar'
import { CreateOverlay } from '../CreateOverlay'
import { EditLineHeight } from './EditLineHeight'
import { CreateLineHeight } from './CreateLineHeight'
import { sortLineHeights } from '../../ImportModal/LineHeights'

const LineHeights = () => {
	const values = useSelector((state) => state.theme.values.lineHeights)
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
					maxWidth="760px"
					margin="auto"
					gridGap={3}
					padding={6}
				>
					{values.slice().sort(sortLineHeights).map((value) => (
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
							borderRadius={4}
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
								borderRadius={3}
								flexShrink={0}
							>
								<Text
									fontWeight={3}
									color={value.id === selectedId ? 'Primary' : 'Text'}
								>
									{Number(value.value.split('rem')[0]) * 16}
								</Text>
							</Flex>
							<LineHeight {...value} />
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
					<CreateLineHeight
						setCreating={setCreating}
						setSelectedId={setSelectedId}
					/>
                )}
				{selectedValue && (
					<EditLineHeight lineHeight={selectedValue} />
                )}
			</RightToolbar>
		</>
	)
}

export { LineHeights }
