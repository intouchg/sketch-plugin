import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createUuid, randomHexColor } from '@i/utility'
import { Box, Flex, Heading, Input, Button, Accordion, AccordionCollapse, AccordionToggle } from '@i/components'
import { createThemeValue, setSelectedColor, updateThemeGroup, deleteThemeGroup } from '../../../store'
import { ColorSwatch } from './ColorSwatch'
import { PencilIcon } from '../../PencilIcon'
import { CheckIcon } from '../../CheckIcon'
import type { ThemeGroup, ThemeColor } from '@i/theme'

const ColorSwatches = ({
	id,
	name,
	colors,
	type,
	groupType,
	members,
}: Partial<ThemeGroup> & {
	name: string
	colors: ThemeColor[]
}) => {
	const dispatch = useDispatch()
	const [ groupName, setGroupName ] = useState(name)
	const [ hoveringName, setHoveringName ] = useState(false)
	const [ editName, setEditName ] = useState(false)

	useEffect(() => void setGroupName(name), [ name ])

	const createColor = () => {
		const colorId = createUuid()
		const value = randomHexColor()

		dispatch(createThemeValue({
			type: 'color',
			id: colorId,
			value,
			groups: id ? [ id ] : [],
		}))

		dispatch(setSelectedColor({ id: colorId, value }))
	}

	const updateGroupName = (event: React.ChangeEvent<HTMLInputElement>) => setGroupName(event.target.value)

	const commitGroupNameUpdate = () => {
		if (groupName !== name) {
			dispatch(updateThemeGroup({
				type: type!,
				groupType: groupType!,
				id: id!,
				name: groupName,
				members: members!,
			}))
		}
	}

	const updateHoveringName = (event: React.MouseEvent<HTMLElement>) => setHoveringName(event.type === 'mouseover')

	const toggleEditName = () => {
		setEditName((state) => !state)
		setHoveringName(false)
	}

	const deleteGroup = () => id && dispatch(deleteThemeGroup({ id }))

	return (
		<Box paddingBottom={2}>
			<Accordion defaultActiveId={name}>
				<Flex
					alignItems="center"
					justifyContent="flex-start"
					paddingY={3}
				>
					<AccordionToggle id={name}>
						{(active) => (
							<Box
								onMouseOver={updateHoveringName}
								onMouseOut={updateHoveringName}
							>
								<Button
									padding={2}
									fontSize={3}
									color="blue"
									backgroundColor="transparent"
									style={{
										transform: `rotate(${active ? 90 : 0}deg)`,
									}}
								>
									{'>'}
								</Button>
								{(!id || !editName) && (
									<Heading
										display="inline-block"
										padding={2}
									>
										{groupName}
									</Heading>
								)}
							</Box>
						)}
					</AccordionToggle>
					<Box
						onMouseOver={updateHoveringName}
						onMouseOut={updateHoveringName}
					>
						{id && editName && (
							<Heading
								as={Input}
								display="inline-block"
								width="auto"
								padding={2}
								fontSize="1.17em"
								border="1px solid"
								borderColor="grey.3"
								borderRadius="small"
								value={groupName}
								onChange={updateGroupName}
								onBlur={commitGroupNameUpdate}
							/>
						)}
						<Button
							padding={2}
							backgroundColor="transparent"
							onClick={toggleEditName}
						>
							{id && editName ? (
								<CheckIcon
									width={24}
									height={18}
								/>
							) : id && (
								<PencilIcon
									width={24}
									height={18}
									style={{
										visibility: hoveringName ? 'visible' : 'hidden',
									}}
								/>
							)}
						</Button>
					</Box>
					{editName && (
						<Button
							position="absolute"
							right="calc(26px + 0.75em)"
							width={26}
							height={26}
							borderRadius="100%"
							boxShadow="small"
							color="red"
							backgroundColor="white"
							hoverColor="white"
							hoverBackgroundColor="red"
							activeColor="white"
							border="2px solid"
							borderColor="red"
							onClick={deleteGroup}
						>
							x
						</Button>
					)}
					<Button
						position="absolute"
						right={0}
						width={26}
						height={26}
						paddingTop="1px"
						color="green"
						backgroundColor="white"
						hoverColor="white"
						hoverBackgroundColor="green"
						activeColor="white"
						border="2px solid"
						borderColor="green"
						borderRadius="100%"
						fontSize="17px"
						onClick={createColor}
					>
						+
					</Button>
				</Flex>
				<AccordionCollapse id={name}>
					{(active) => (
						<div
							style={{
								height: active ? '100%' : 0,
								overflow: 'hidden',
							}}
						>
							<Flex
								padding={3}
								paddingBottom={4}
								flexWrap="wrap"
								alignItems="center"
								justifyContent="center"
							>
								{colors.map(({ id, name, value }) => (
									<ColorSwatch
										key={id}
										id={id}
										name={name}
										value={value}
									/>
								))}
							</Flex>
						</div>
					)}
				</AccordionCollapse>
			</Accordion>
		</Box>
	)
}

export { ColorSwatches }
