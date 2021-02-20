import React from 'react'
import { useDispatch } from 'react-redux'
import { Stack, Flex, Heading } from '@i/components'
import { ModalBackground } from '../ModalBackground'
import { CloseModalButton } from '../CloseModalButton'
import { deleteThemeValue } from '../../store'
import type { ThemeValue } from '@i/theme'

const DeleteModal = ({
	deleteValue,
	setDeleteValue,
}: {
	deleteValue: ThemeValue
	setDeleteValue: React.Dispatch<React.SetStateAction<ThemeValue | null>>
}) => {
	const dispatch = useDispatch()

	const confirmDelete = () => dispatch(deleteThemeValue(deleteValue))

	return (
		<ModalBackground>
			<Stack
				width="calc(100vw - 308px)"
				minWidth="800px"
				height="calc(100vh - 100px)"
				minHeight="500px"
				backgroundColor="Card"
				boxShadow="Downward Accent"
				borderRadius={3}
				overflow="hidden"
			>
				<Flex
					width="100%"
					height="48px"
					alignItems="center"
					justifyContent="space-between"
					flexShrink={0}
					boxShadow="Inset X Accent"
				>
					<Heading paddingX={3}>
						Delete confirmation
					</Heading>
					<CloseModalButton
						position="relative"
						width="16px"
						padding={2}
						marginRight={2}
						onClick={() => setDeleteValue(null)}
					/>
				</Flex>
			</Stack>
		</ModalBackground>
	)
}

export { DeleteModal }
