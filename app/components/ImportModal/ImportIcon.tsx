import React from 'react'
import { useSpring, animated, config } from 'react-spring'
import { Box, Flex } from '@intouchg/components'
import { Icon } from '../Icon'
import { NotInSketchIcon } from './NotInSketchIcon'

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

	// alreadySaved means the same value exists in the state.theme.values
	// and the importedSketchValues, so we just return a placeholder box
	if (alreadySaved) {
		return (
			<Box
				width="36px"
				height="36px"
			/>
		)
	}

	if (!imported) {
		return (
			<Flex
				position="relative"
				alignItems="center"
				justifyContent="center"
				width="36px"
				height="36px"
				title="Not In Sketch"
			>
				<Box
					width="24px"
					height="24px"
				>
					<NotInSketchIcon />
				</Box>
			</Flex>
		)
	}

	return (
		<animated.div style={spring}>
			<Box
				backgroundColor="Card"
				borderRadius="9999px"
				margin={1}
			>
				<Flex
					width="28px"
					height="28px"
					alignItems="center"
					justifyContent="center"
					backgroundColor={selected ? 'Primary' : 'Card'}
					borderWidth="2px"
					borderStyle="solid"
					borderColor="Card"
					borderRadius="9999px"
					boxShadow="Downward Accent"
				>
					<Icon
						icon="CheckmarkIcon"
						fill="Card"
						width="16px"
						stroke="Card"
						strokeWidth="0.25"
					/>
				</Flex>
			</Box>
		</animated.div>
	)
}

export { ImportIcon }
