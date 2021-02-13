import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useSpring, animated, to } from 'react-spring'
import { Button, Stack, Flex, Text } from '@i/components'
import { LetterSpacing } from '../../ThemeValues'
import { ValuesContainer } from '../ValuesContainer'
import { RightToolbar } from '../RightToolbar'
import { CreateOverlay } from '../CreateOverlay'
import { EditLetterSpacing } from './EditLetterSpacing'
import { CreateLetterSpacing } from './CreateLetterSpacing'
import { useListTransition } from '../../../hooks'
import { sortLetterSpacings } from '../../ImportModal/LetterSpacings'
import type { ThemeLetterSpacing } from '@i/theme'

const ELEMENT_MIN_HEIGHT = 44
const ELEMENT_PADDING_Y = 8
const ELEMENT_BORDER_Y = 2
const ELEMENT_MARGIN_Y = 0

const getHeight = (value: ThemeLetterSpacing) => {
	const baseHeight = Math.max(Number(value.value.split('px')[0]), ELEMENT_MIN_HEIGHT)
	return baseHeight + (2 * ELEMENT_PADDING_Y) + (2 * ELEMENT_BORDER_Y) + (2 * ELEMENT_MARGIN_Y)
}

const LetterSpacings = () => {
	const values = useSelector((state) => state.theme.values.letterSpacings)
	const [ selectedId, setSelectedId ] = useState<string | null>(null)
	const selectedValue = selectedId ? values.find((value) => value.id === selectedId)! : null
	const [ creating, setCreating ] = useState(false)
	const [ transition, containerHeight ] = useListTransition(values, getHeight, sortLetterSpacings)

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
					{transition(({ y, size, ...styles }, value, transition, index) => (
						<animated.div
							style={{
								position: 'absolute',
								left: '0',
								right: '0',
								paddingLeft: 'inherit',
								paddingRight: 'inherit',
								willChange: 'transform, height, opacity',
								zIndex: index + 1,
								transform: to([ y, size ], (y, s) => `translate3d(0, ${y}px, 0) scale3d(${s}, ${s}, ${s})`),
								...styles as any,
							}}
						>
							<Button
								invisible
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
									minHeight={ELEMENT_MIN_HEIGHT}
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
								<LetterSpacing {...value} />
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
					<CreateLetterSpacing
						setCreating={setCreating}
						setSelectedId={setSelectedId}
					/>
                )}
				{selectedValue && (
					<EditLetterSpacing letterSpacing={selectedValue} />
                )}
			</RightToolbar>
		</>
	)
}

export { LetterSpacings }
