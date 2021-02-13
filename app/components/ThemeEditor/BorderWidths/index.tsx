import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTransition, useSpring, animated, to } from 'react-spring'
import { Button, Flex, Text } from '@i/components'
import { BorderWidth } from '../../ThemeValues'
import { ValuesContainer } from '../ValuesContainer'
import { RightToolbar } from '../RightToolbar'
import { CreateOverlay } from '../CreateOverlay'
import { EditBorderWidth } from './EditBorderWidth'
import { CreateBorderWidth } from './CreateBorderWidth'
import { sortBorderWidths } from '../../ImportModal/BorderWidths'
import type { ThemeBorderWidth } from '@i/theme'

const ELEMENT_MIN_HEIGHT = 44 // in pixels
const ELEMENT_PADDING_Y = 20 // magic number, in pixels

const getHeight = (value: ThemeBorderWidth) =>
	Math.max(Number(value.value.split('px')[0]), ELEMENT_MIN_HEIGHT) + ELEMENT_PADDING_Y

const BorderWidths = () => {
	const values = useSelector((state) => state.theme.values.borderWidths)
	const [ selectedId, setSelectedId ] = useState<string | null>(null)
	const selectedValue = selectedId ? values.find((value) => value.id === selectedId)! : null
	const [ creating, setCreating ] = useState(false)

	let containerHeight = 0

	const transition = useTransition(
		values.slice().sort(sortBorderWidths).map((value) => {
			const height = getHeight(value)
			return { ...value, height, y: (containerHeight += height) - height }
		}),
		{
			keys: (value: any) => value.id,
			// trail: 400 / values.length,
			initial: ({ height, y }) => ({ opacity: 1, size: 1, height, y }),
			from: { opacity: 0, size: 0, height: 0 },
			enter: ({ height, y }: any) => ({ opacity: 1, size: 1, height, y }),
			update: ({ height, y }: any) => ({ height, y }),
			leave: { opacity: 0, size: 0, height: 0 },
		},
	)

	const [ containerHeightSpring ] = useSpring({ height: containerHeight }, [ containerHeight ])

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
						...containerHeightSpring,
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
								<BorderWidth {...value} />
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
