import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Stack, Flex, Text } from '@i/components'
import { Shadow } from '../../ThemeValues'
import { ValuesContainer } from '../ValuesContainer'
import { RightToolbar } from '../RightToolbar'
import { CreateOverlay } from '../CreateOverlay'
import { EditShadow } from './EditShadow'
import { CreateShadow } from './CreateShadow'
import { sortShadows } from '../../ImportModal/Shadows'

const Shadows = () => {
	const values = useSelector((state) => state.theme.values.shadows)
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
				<Stack
					flexGrow={1}
					maxWidth="760px"
					margin="auto"
					gridGap={3}
					padding={6}
				>
					{values.slice().sort(sortShadows).map((value) => (
						<Button
							invisible
							key={value.id}
							display="flex"
							alignItems="stretch"
							paddingY={2}
							paddingRight={3}
							backgroundColor={value.id === selectedId ? 'Card' : 'transparent'}
							borderWidth="2px"
							borderColor={value.id === selectedId ? 'Primary Light' : 'transparent'}
							borderStyle="solid"
							borderRadius="Large"
							onClick={() => setSelectedId(value.id)}
						>
							<Shadow {...value} />
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
					<CreateShadow
						setCreating={setCreating}
						setSelectedId={setSelectedId}
					/>
                )}
				{selectedValue && (
					<EditShadow shadow={selectedValue} />
                )}
			</RightToolbar>
		</>
	)
}

export { Shadows }
