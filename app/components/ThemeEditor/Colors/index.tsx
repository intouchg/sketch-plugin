import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@i/components'
import { Color } from '../../ThemeValues'
import { ColorGrid } from '../../ColorGrid'
import { ValuesContainer } from '../ValuesContainer'
import { RightToolbar } from '../RightToolbar'
import { CreateOverlay } from '../CreateOverlay'
import { EditColor } from './EditColor'
import { CreateColor } from './CreateColor'

const Colors = () => {
	const colors = useSelector((state) => state.theme.values.colors)
	const [ selectedId, setSelectedId ] = useState<string | null>(null)
	const selectedColor = selectedId ? colors.find((color) => color.id === selectedId)! : null
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
					{colors.map((color) => (
						<Button
							invisible
							key={color.id}
							position="relative"
							height="0"
							paddingBottom="100%"
							backgroundColor={color.id === selectedId ? 'Primary Light' : 'transparent'}
							borderRadius="Medium"
							flexGrow={1}
							onClick={() => setSelectedId(color.id)}
						>
							<Color
								selected={color.id === selectedId}
								{...color}
							/>
						</Button>
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
				{selectedColor && (
					<EditColor color={selectedColor} />
                )}
			</RightToolbar>
		</>
	)
}

export { Colors }
