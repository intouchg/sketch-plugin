import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { animated, to } from 'react-spring'
import { Button } from '@i/components'
import { Color } from '../../ThemeValues'
import { ValuesContainer } from '../ValuesContainer'
import { RightToolbar } from '../RightToolbar'
import { CreateOverlay } from '../CreateOverlay'
import { EditColor } from './EditColor'
import { CreateColor } from './CreateColor'
import { sortColors } from '../../ImportModal/Colors'
import { useGridTransition } from '../../../hooks'

const colorsContainerMaxWidth = 860
const colorsContainerPaddingX = 48
const colorSwatchWidth = 186
const colorsContainerMinWidth = colorSwatchWidth + (2 * colorsContainerPaddingX)

const Colors = ({
	containerWidth,
}: {
	containerWidth: number
}) => {
	const values = useSelector((state) => state.theme.values.colors)
	const [ selectedId, setSelectedId ] = useState<string | null>(null)
	const selectedValue = selectedId ? values.find((value) => value.id === selectedId)! : null
	const [ creating, setCreating ] = useState(false)
	const gridWidth = Math.min(Math.max(colorsContainerMinWidth, containerWidth), colorsContainerMaxWidth) - (2 * colorsContainerPaddingX)

	const [ transition, containerSize ] = useGridTransition(
		values,
		gridWidth,
		{ width: colorSwatchWidth, height: colorSwatchWidth },
		sortColors,
	)

	const toggleCreating = () => {
		setSelectedId(null)
		setCreating((s) => !s)
	}

	return (
		<>
			<ValuesContainer>
				<div
					style={{
						boxSizing: 'content-box',
						width: '100%',
						minWidth: colorSwatchWidth,
						maxWidth: colorsContainerMaxWidth,
						padding: colorsContainerPaddingX,
						margin: 'auto',
					}}
				>
					<animated.div
						style={{
							marginLeft: 'auto',
							marginRight: 'auto',
							...containerSize,
						}}
					>
						{transition(({ x, y, scaler, ...styles }, value) => (
							<animated.div
								style={{
									position: 'absolute',
									left: '0',
									right: '0',
									padding: '8px',
									willChange: 'transform, width, height, opacity',
									transform: to([ x, y, scaler ], (x, y, s) => `translate3d(${x}px, ${y}px, 0) scale3d(${s}, ${s}, ${s})`),
									...styles as any,
								}}
							>
								<Button
									invisible
									key={value.id}
									position="relative"
									width="178px"
									height="178px"
									backgroundColor={value.id === selectedId ? 'Primary Light' : 'transparent'}
									borderRadius={3}
									onClick={() => setSelectedId(value.id)}
								>
									<Color
										selected={value.id === selectedId}
										{...value}
									/>
								</Button>
							</animated.div>
						))}
					</animated.div>
				</div>
				<CreateOverlay
					active={creating}
					onClick={toggleCreating}
				/>
			</ValuesContainer>
			<RightToolbar>
				{creating && (
					<CreateColor
						setCreating={setCreating}
						setSelectedId={setSelectedId}
					/>
                )}
				{selectedValue && (
					<EditColor color={selectedValue} />
                )}
			</RightToolbar>
		</>
	)
}

export { Colors }
