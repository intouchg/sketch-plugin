import React from 'react'
import { useDispatch } from 'react-redux'
import { Stack, Flex, Heading, Text, Button, Box } from '@i/components'
import { ModalBackground } from '../ModalBackground'
import { CloseModalButton } from '../CloseModalButton'
import { deleteThemeVariant } from '../../store'
import { titleCase } from '@i/utility'
import { Icon } from '../Icon'
import { componentVariantsPropertyMap } from '@i/theme'
import { componentConfig } from './Editor'
import type { ThemeVariant } from '@i/theme'

const DeleteModal = ({
	deleteVariant,
	setDeleteVariant,
}: {
	deleteVariant: ThemeVariant
	setDeleteVariant: React.Dispatch<React.SetStateAction<ThemeVariant | null>>
}) => {
	const dispatch = useDispatch()
	const variantKey = componentVariantsPropertyMap[deleteVariant.variantType]
	const { component: Component, children, props } = (componentConfig as any)[variantKey]

	const confirmDelete = () => {
		dispatch(deleteThemeVariant(deleteVariant))
		setDeleteVariant(null)
	}

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
						onClick={() => setDeleteVariant(null)}
					/>
				</Flex>
				<Box overflow="scroll">
					<Stack
						flexGrow={1}
						alignItems="center"
						padding={6}
						flexShrink={0}
					>
						<Icon
							icon="WarningIcon"
							width="100px"
							fill="Critical"
						/>
						<Heading
							variant="Secondary"
							paddingTop={3}
							paddingBottom={4}
							lineHeight="2.5rem"
							textAlign="center"
						>
							Warning!<br />
							Please speak with a developer before deleting this variant.
						</Heading>
						<Text
							fontSize="1.5rem"
							lineHeight={4}
							textAlign="center"
							paddingBottom={6}
						>
							Deleting a component variant is a dangerous operation.<br />
							Developers might be using this variant, even if you&apos;re not.
						</Text>
						<Stack paddingBottom={4}>
							<Flex>
								<Text
									fontSize="1.5rem"
									lineHeight={4}
								>
									Type:&nbsp;
								</Text>
								<Text
									fontSize="1.5rem"
									lineHeight={4}
								>
									{titleCase(deleteVariant.variantType)}
								</Text>
							</Flex>
							<Flex>
								<Text
									fontSize="1.5rem"
									lineHeight={4}
								>
									Name:&nbsp;
								</Text>
								<Text
									fontSize="1.5rem"
									lineHeight={4}
								>
									{deleteVariant.name}
								</Text>
							</Flex>
						</Stack>
						<Stack
							width="90%"
							alignItems="center"
							justifyContent="center"
							padding={6}
							marginX="auto"
							marginBottom={6}
							backgroundColor="Background"
							border="1px solid"
							borderColor="Accent"
							borderRadius={3}
						>
							<Flex
								alignItems="center"
								justifyContent="center"
							>
								<Component
									variant={deleteVariant.name}
									{...props}
								>
									{children}
								</Component>
							</Flex>
						</Stack>
						<Button
							backgroundColor="Critical"
							borderColor="Critical"
							onClick={confirmDelete}
						>
							Delete
						</Button>
					</Stack>
				</Box>
			</Stack>
		</ModalBackground>
	)
}

export { DeleteModal }
