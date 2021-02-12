import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTransition, animated } from 'react-spring'
import { Button } from '@i/components'
import { Color } from '../../ThemeValues'
import { ColorGrid } from '../../ColorGrid'
import { ValuesContainer } from '../ValuesContainer'
import { RightToolbar } from '../RightToolbar'
import { CreateOverlay } from '../CreateOverlay'
import { EditColor } from './EditColor'
import { CreateColor } from './CreateColor'
import { sortColors } from '../../ImportModal/Colors'

const Colors = () => {
	const values = useSelector((state) => state.theme.values.colors)
	const transition = useTransition(values, {
		keys: (value: typeof values[number]) => value.id,
		sort: sortColors,
		trail: 400 / values.length,
		from: { opacity: 0, transform: 'scale3d(0, 0, 0)' },
		enter: { opacity: 1, transform: 'scale3d(1, 1, 1)' },
		leave: { opacity: 0, transform: 'scale3d(0, 0, 0)' },
	})
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
				<ColorGrid
					flexGrow={1}
					maxWidth="860px"
					margin="auto"
					gridGap={3}
					padding={6}
				>
					{transition((style, value) => (
						<animated.div style={style as any}>
							<Button
								invisible
								key={value.id}
								position="relative"
								width="100%"
								height="0"
								paddingBottom="100%"
								backgroundColor={value.id === selectedId ? 'Primary Light' : 'transparent'}
								borderRadius={3}
								flexGrow={1}
								onClick={() => setSelectedId(value.id)}
							>
								<Color
									selected={value.id === selectedId}
									{...value}
								/>
							</Button>
						</animated.div>
					))}
				</ColorGrid>
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
