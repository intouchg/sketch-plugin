import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTransition, animated } from 'react-spring'
import { Button, Stack, Flex, Text } from '@i/components'
import { BorderWidth } from '../../ThemeValues'
import { ValuesContainer } from '../ValuesContainer'
import { RightToolbar } from '../RightToolbar'
import { CreateOverlay } from '../CreateOverlay'
import { EditBorderWidth } from './EditBorderWidth'
import { CreateBorderWidth } from './CreateBorderWidth'
import { sortBorderWidths } from '../../ImportModal/BorderWidths'

const BorderWidths = () => {
	const values = useSelector((state) => state.theme.values.borderWidths)
	const [ selectedId, setSelectedId ] = useState<string | null>(null)
	const selectedValue = selectedId ? values.find((value) => value.id === selectedId)! : null
	const [ creating, setCreating ] = useState(false)

	const transition = useTransition(values, {
		keys: (value: typeof values[number]) => value.id,
		sort: sortBorderWidths,
		trail: 400 / values.length,
		initial: { opacity: 1, transform: 'scale3d(1, 1, 1)' },
		from: { opacity: 0, transform: 'scale3d(0, 0, 0)' },
		enter: { opacity: 1, transform: 'scale3d(1, 1, 1)' },
		leave: { opacity: 0, transform: 'scale3d(0, 0, 0)' },
	})

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
					maxWidth="680px"
					margin="auto"
					gridGap={3}
					padding={6}
				>
					{transition((style, value) => (
						<animated.div style={style as any}>
							<Button
								invisible
								key={value.id}
								display="flex"
								alignItems="stretch"
								width="100%"
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
										{value.value.split('px')[0]}
									</Text>
								</Flex>
								<BorderWidth {...value} />
							</Button>
						</animated.div>
					))}
				</Stack>
				<CreateOverlay
					active={creating}
					onClick={toggleCreating}
				/>
			</ValuesContainer>
			<RightToolbar>
				{creating && (
					<CreateBorderWidth
						setCreating={setCreating}
						setSelectedId={setSelectedId}
					/>
                )}
				{selectedValue && (
					<EditBorderWidth borderWidth={selectedValue} />
                )}
			</RightToolbar>
		</>
	)
}

export { BorderWidths }
