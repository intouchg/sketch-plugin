import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { animated, to } from 'react-spring'
import { Button, Flex, Text } from '@i/components'
import { LineHeight } from '../../ThemeValues'
import { ValuesContainer } from '../ValuesContainer'
import { RightToolbar } from '../RightToolbar'
import { CreateOverlay } from '../CreateOverlay'
import { EditLineHeight } from './EditLineHeight'
import { CreateLineHeight } from './CreateLineHeight'
import { useListTransition } from '../../../hooks'
import { sortLineHeights } from '../../ImportModal/LineHeights'
import type { ThemeValue, ThemeLineHeight } from '@i/theme'

const NUMBER_OF_LINES = 3 // magic number
const ELEMENT_MIN_HEIGHT = 44
const ELEMENT_PADDING_Y = 8
const ELEMENT_BORDER_Y = 2
const ELEMENT_MARGIN_Y = 0

const getHeight = (value: ThemeLineHeight) => {
	const baseHeight = Math.max(
		Math.floor(Number(value.value.split('rem')[0]) * 16 * NUMBER_OF_LINES),
		ELEMENT_MIN_HEIGHT,
	)
	return baseHeight + (2 * ELEMENT_PADDING_Y) + (2 * ELEMENT_BORDER_Y) + (2 * ELEMENT_MARGIN_Y)
}

const LineHeights = ({
	setDeleteValue,
}: {
	setDeleteValue: React.Dispatch<React.SetStateAction<ThemeValue | null>>
}) => {
	const values = useSelector((state) => state.theme.values.lineHeights)
	const [ selectedId, setSelectedId ] = useState<string | null>(null)
	const selectedValue = selectedId ? values.find((value) => value.id === selectedId)! : null
	const [ creating, setCreating ] = useState(false)
	const [ transition, containerHeight ] = useListTransition(values, getHeight, sortLineHeights)

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
					<CreateLineHeight
						setCreating={setCreating}
						setSelectedId={setSelectedId}
					/>
                )}
				{selectedValue && (
					<EditLineHeight
						lineHeight={selectedValue}
						setDeleteValue={setDeleteValue}
					/>
                )}
			</RightToolbar>
		</>
	)
}

export { LineHeights }
