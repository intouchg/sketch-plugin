import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSpring, animated } from 'react-spring'
import { Stack, Flex, Heading, Button, Text, Input } from '@i/components'
import { Icon } from '../Icon'
import { createThemeVariant } from '../../store'
import { createUuid } from '@i/utility'
import type { ThemeVariant } from '@i/theme'

const MISSING_VARIANT_NAME_ERROR = 'Input a variant name to create a new variant.'
const DUPLICATE_NAME_ERROR = 'This variant name is already in use.'

const VariantsList = ({
	variants,
	variantType,
	selectedId,
	setSelectedId,
	creating,
	setCreating,
}: {
	variants: ThemeVariant[]
	variantType: ThemeVariant['variantType']
	selectedId: string | null
	setSelectedId: React.Dispatch<React.SetStateAction<string | null>>
	creating: boolean
	setCreating: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const dispatch = useDispatch()
	const nameInputRef = useRef<HTMLInputElement | null>(null)
	const [ newVariantName, setNewVariantName ] = useState('')
	const [ error, setError ] = useState('')

	const [ spring ] = useSpring({ transform: `rotate(${creating ? '45' : '0'}deg)` }, [ creating ])

	const toggleCreating = () => {
		if (creating) {
			setCreating(false)
			setNewVariantName('')
			setError('')
		}
		else {
			setCreating(true)
			setSelectedId(null)
			setTimeout(() => nameInputRef.current?.focus(), 1)
		}
	}

	const updateNewVariantName = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (error === MISSING_VARIANT_NAME_ERROR || error === DUPLICATE_NAME_ERROR) {
			setError('')
		}

		setNewVariantName(event.target.value)
	}

	const createVariant = () => {
		const duplicateNameVariant = variants.find((variant) => variant.name === newVariantName)

		if (!newVariantName) {
			return setError(MISSING_VARIANT_NAME_ERROR)
		}

		if (duplicateNameVariant) {
			return setError(DUPLICATE_NAME_ERROR)
		}

		const id = createUuid()

		dispatch(createThemeVariant({
			id,
			variantType,
			name: newVariantName,
		}))

		setCreating(false)
		setNewVariantName('')
		setSelectedId(id)
	}

	return (
		<Stack>
			<Flex
				justifyContent="space-between"
				padding={3}
				paddingBottom={2}
			>
				<Heading>
					Variants
				</Heading>
				<animated.div style={spring}>
					<Button
						invisible
						onClick={toggleCreating}
					>
						<Icon
							icon="Plus"
							fill="Text Light"
							width="16px"
						/>
					</Button>
				</animated.div>
			</Flex>
			{creating && (
				<Stack>
					<Input
						borderColor={error ? 'Critical' : 'Accent'}
						borderStyle="solid"
						style={{ transform: 'scale3d(1, 1, 1)' }}
						autoCorrect="off"
						autoCapitalize="off"
						autoComplete="off"
						spellCheck="false"
						ref={nameInputRef}
						placeholder="New Variant Name"
						value={newVariantName}
						onChange={updateNewVariantName}
						onKeyPress={(event) => event.key === 'Enter' && createVariant()}
					/>
					{(error === MISSING_VARIANT_NAME_ERROR || error === DUPLICATE_NAME_ERROR) && (
						<Text
							paddingTop={2}
							color="Critical"
						>
							{error}
						</Text>
					)}
				</Stack>
			)}
			{variants.map(({ id, name }) => (
				<Button
					invisible
					key={id}
					paddingX={3}
					paddingY={1}
					backgroundColor={id === selectedId ? 'Primary Lighter' : 'transparent'}
					textAlign="left"
					onClick={() => setSelectedId(id)}
				>
					<Text color={id === selectedId ? 'Primary' : 'Text'}>
						{name}
					</Text>
				</Button>
            ))}
		</Stack>
	)
}

export { VariantsList }
