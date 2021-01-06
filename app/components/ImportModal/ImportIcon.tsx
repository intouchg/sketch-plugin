import React from 'react'
import { useSpring, animated, config } from 'react-spring'
import { Box, Flex } from '@i/components'
import { CheckmarkIcon, OverwriteIcon, SketchIcon, CloseIcon } from '../Icons'

const ImportIcon = ({
	imported,
	selected,
	alreadySaved,
	willOverwrite,
}: {
	imported: boolean | undefined
	selected: boolean | undefined
	alreadySaved: boolean
	willOverwrite?: boolean
}) => {
	const spring = useSpring({ config: config.wobbly, transform: `scale3d(${selected ? '1.25, 1.25, 1.25' : '0.9, 0.9, 0.9'})` })

	// alreadySaved means the same value exists in the state.theme.values and the importedSketchValues
	if (alreadySaved) {
		return null
	}

	if (!imported) {
		return (
			<Box
				position="relative"
				width="26px"
				height="26px"
				margin={1}
			>
				<Box position="absolute">
					<SketchIcon
						width="26px"
						height="26px"
					/>
				</Box>
				<Box position="absolute">
					<CloseIcon
						fill="Critical"
						width="26px"
					/>
				</Box>
			</Box>
		)
	}

	return (
		<animated.div
			style={spring}
			title={willOverwrite ? 'Update Color' : imported ? 'Add Color' : 'Not In Sketch'}
		>
			<Box
				backgroundColor="Card"
				borderRadius="50%"
				margin={1}
			>
				<Flex
					width="28px"
					height="28px"
					alignItems="center"
					justifyContent="center"
					backgroundColor={willOverwrite ? '#ffcb05' : imported ? 'Positive' : 'Critical'}
					borderWidth="2px"
					borderStyle="solid"
					borderColor="Card"
					borderRadius="50%"
					boxShadow="Medium"
					opacity={selected || !imported ? 1 : willOverwrite ? 0.7 : 0.55}
				>
					{imported && !willOverwrite && (
						<CheckmarkIcon
							fill="Card"
							width="16px"
							style={{
								stroke: 'white',
								strokeWidth: '0.5',
							}}
						/>
					)}
					{imported && willOverwrite && (
						<OverwriteIcon
							fill="Card"
							width="16px"
							style={{
								stroke: 'white',
								strokeWidth: '0.5',
							}}
						/>
					)}
				</Flex>
			</Box>
		</animated.div>
	)
}

export { ImportIcon }
