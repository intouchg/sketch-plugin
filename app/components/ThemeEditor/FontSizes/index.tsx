import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Stack } from '@i/components'
import { FontSize } from '../../ThemeValues'
import { ValuesContainer } from '../ValuesContainer'
import { RightToolbar } from '../RightToolbar'
import { CreateOverlay } from '../CreateOverlay'
import { EditFontSize } from './EditFontSize'
import { CreateFontSize } from './CreateFontSize'
import { sortFontSizes } from '../../ImportModal/FontSizes'

const FontSizes = () => {
	const fontSizes = useSelector((state) => state.theme.values.fontSizes)
	const [ selectedId, setSelectedId ] = useState<string | null>(null)
	const selectedFontSize = selectedId ? fontSizes.find((fontSizes) => fontSizes.id === selectedId)! : null
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
					maxWidth="860px"
					margin="auto"
					gridGap={3}
					padding={6}
				>
					{fontSizes.slice().sort(sortFontSizes).map((fontSize) => (
						<Button
							invisible
							key={fontSize.id}
							backgroundColor={fontSize.id === selectedId ? 'Card' : 'transparent'}
							borderWidth="2px"
							borderColor={fontSize.id === selectedId ? 'Primary Light' : 'transparent'}
							borderStyle="solid"
							borderRadius="Medium"
							onClick={() => setSelectedId(fontSize.id)}
						>
							<FontSize {...fontSize} />
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
					<CreateFontSize setCreating={setCreating} />
                )}
				{selectedFontSize && (
					<EditFontSize fontSize={selectedFontSize} />
                )}
			</RightToolbar>
		</>
	)
}

export { FontSizes }
