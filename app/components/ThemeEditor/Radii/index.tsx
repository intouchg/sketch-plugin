import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { animated, to } from 'react-spring'
import { Button, Flex, Text } from '@i/components'
import { Radius, themeRadiusHeight } from '../../ThemeValues'
import { ValuesContainer } from '../ValuesContainer'
import { RightToolbar } from '../RightToolbar'
import { CreateOverlay } from '../CreateOverlay'
import { EditRadius } from './EditRadius'
import { CreateRadius } from './CreateRadius'
import { useListTransition } from '../../../hooks'
import { sortBorderWidths } from '../../ImportModal/BorderWidths'

const ELEMENT_BASE_HEIGHT = themeRadiusHeight
const ELEMENT_PADDING_Y = 16
const ELEMENT_BORDER_Y = 2
const ELEMENT_MARGIN_Y = 0
const ELEMENT_HEIGHT = ELEMENT_BASE_HEIGHT + (2 * ELEMENT_PADDING_Y) + (2 * ELEMENT_BORDER_Y) + (2 * ELEMENT_MARGIN_Y)

const Radii = () => {
	const values = useSelector((state) => state.theme.values.radii)
	const [ selectedId, setSelectedId ] = useState<string | null>(null)
	const selectedValue = selectedId ? values.find((value) => value.id === selectedId)! : null
	const [ creating, setCreating ] = useState(false)
	const [ transition, containerHeight ] = useListTransition(values, ELEMENT_HEIGHT, sortBorderWidths)

	const toggleCreating = () => {
		setSelectedId(null)
		setCreating((s) => !s)
	}

	return (
		<>
			<ValuesContainer>
				<animated.div
					style={{
						boxSizing: 'content-box',
						width: '100%',
						minWidth: '420px',
						maxWidth: '680px',
						padding: '48px',
						margin: 'auto',
						...containerHeight,
					}}
				>
					{transition(({ y, scaler, ...styles }, value) => (
						<animated.div
							style={{
								position: 'absolute',
								left: '0',
								right: '0',
								paddingLeft: 'inherit',
								paddingRight: 'inherit',
								willChange: 'transform, height, opacity',
								transform: to([ y, scaler ], (y, s) => `translate3d(0, ${y}px, 0) scale3d(${s}, ${s}, ${s})`),
								...styles as any,
							}}
						>
							<Button
								invisible
								display="flex"
								alignItems="stretch"
								width="100%"
								paddingY={3}
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
								<Radius {...value} />
							</Button>
						</animated.div>
					))}
				</animated.div>
				<CreateOverlay
					active={creating}
					onClick={toggleCreating}
				/>
			</ValuesContainer>
			<RightToolbar>
				{creating && (
					<CreateRadius
						setCreating={setCreating}
						setSelectedId={setSelectedId}
					/>
                )}
				{selectedValue && (
					<EditRadius radius={selectedValue} />
                )}
			</RightToolbar>
		</>
	)
}

export { Radii }
