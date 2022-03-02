import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { animated, to } from 'react-spring'
import { Button, Box } from '@intouchg/components'
import { Shadow } from '../../ThemeValues'
import { ValuesContainer } from '../ValuesContainer'
import { RightToolbar } from '../RightToolbar'
import { CreateOverlay } from '../CreateOverlay'
import { EditShadow } from './EditShadow'
import { CreateShadow } from './CreateShadow'
import { useListTransition } from '../../../hooks'
import { sortShadows } from '../../ImportModal/Shadows'
import type { ThemeValue } from '@intouchg/theme'

const ELEMENT_BASE_HEIGHT = 152 // in pixels, magic number
const ELEMENT_PADDING_Y = 8
const ELEMENT_BORDER_Y = 2
const ELEMENT_MARGIN_Y = 0
const ELEMENT_HEIGHT = ELEMENT_BASE_HEIGHT + (2 * ELEMENT_PADDING_Y) + (2 * ELEMENT_BORDER_Y) + (2 * ELEMENT_MARGIN_Y)

const Shadows = ({
	setDeleteValue,
}: {
	setDeleteValue: React.Dispatch<React.SetStateAction<ThemeValue | null>>
}) => {
	const values = useSelector((state) => state.theme.values.shadows)
	const [ selectedId, setSelectedId ] = useState<string | null>(null)
	const selectedValue = selectedId ? values.find((value) => value.id === selectedId)! : null
	const [ creating, setCreating ] = useState(false)
	const [ transition, containerHeight ] = useListTransition(values, ELEMENT_HEIGHT, sortShadows)

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
								justifyContent="center"
								width="100%"
								paddingY={2}
								paddingX={3}
								backgroundColor={value.id === selectedId ? 'Card' : 'transparent'}
								borderWidth="2px"
								borderColor={value.id === selectedId ? 'Primary Light' : 'transparent'}
								borderStyle="solid"
								borderRadius={4}
								onClick={() => setSelectedId(value.id)}
							>
								<Box
									flexGrow={1}
									maxWidth="500px"
									paddingY={3}
								>
									<Shadow {...value} />
								</Box>
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
					<CreateShadow
						setCreating={setCreating}
						setSelectedId={setSelectedId}
					/>
                )}
				{selectedValue && (
					<EditShadow
						shadow={selectedValue}
						setDeleteValue={setDeleteValue}
					/>
                )}
			</RightToolbar>
		</>
	)
}

export { Shadows }
