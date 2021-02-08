import React from 'react'
import { useSpring, animated } from 'react-spring'
import { Button } from '@i/components'
import { Icon } from '../Icon'

const NewButton = ({
	active,
	onClick,
}: {
    active: boolean
    onClick: () => void
}) => {
	const spring = useSpring({ transform: `rotate(${active ? '22.5' : '0'}deg)` })

	return (
		<animated.div
			style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                ...spring,
            }}
		>
			<Button
				display="flex"
				alignItems="center"
				justifyContent="center"
				width="48px"
				height="48px"
				padding="0"
				margin={4}
				backgroundColor={active ? 'Critical' : 'Primary'}
				borderRadius="9999px"
			>
				<Icon
					width="22px"
					icon="Plus"
					fill="Card"
				/>
			</Button>
		</animated.div>
	)
}

export { NewButton }
