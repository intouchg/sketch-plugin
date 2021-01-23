import React from 'react'
import { useSpring, animated, config } from 'react-spring'
import { Box, Flex } from '@i/components'
import { CheckmarkIcon, OverwriteIcon, NotInSketchIcon } from '../Icons'

const ImportIcon = ({
	imported,
	selected,
	alreadySaved,
}: {
	imported: boolean | undefined
	selected: boolean | undefined
	alreadySaved?: boolean
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
				width="24px"
				height="24px"
				margin={1}
				title="Not In Sketch"
			>
				<NotInSketchIcon />
			</Box>
		)
	}

	return (
		<animated.div style={spring}>
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
					backgroundColor="Primary"
					borderWidth="2px"
					borderStyle="solid"
					borderColor="Card"
					borderRadius="50%"
					boxShadow="Medium"
					opacity={selected ? 1 : 0.55}
				>
					<CheckmarkIcon
						fill="Card"
						width="16px"
						style={{
							stroke: 'white',
							strokeWidth: '0.25',
						}}
					/>
				</Flex>
			</Box>
		</animated.div>
	)
}

export { ImportIcon }
