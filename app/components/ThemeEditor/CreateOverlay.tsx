import React from 'react'
import { useSpring, animated } from 'react-spring'
import { Button, Box } from '@intouchg/components'
import { Icon } from '../Icon'
import { rightToolbarWidth } from './RightToolbar'

const CreateOverlay = ({
	active,
	onClick,
}: {
    active: boolean
    onClick: () => void
}) => {
	const [ { opacity, transform } ] = useSpring({
		opacity: active ? '1' : '0',
		transform: `rotate(${active ? '45' : '0'}deg)`,
	}, [ active ])

	return (
		<>
			<animated.div
				style={{
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    pointerEvents: active ? 'auto' : 'none',
                    opacity,
                } as any}
			/>
			<animated.div
				style={{
					position: 'fixed',
					bottom: '24px',
					right: `calc(${rightToolbarWidth}px + 24px)`,
					transform,
				}}
			>
				<Button
					display="flex"
					alignItems="center"
					justifyContent="center"
					width="48px"
					height="48px"
					padding="0"
					backgroundColor={active ? 'Critical' : 'Primary'}
					borderStyle="none"
					borderRadius="9999px"
					onClick={onClick}
				>
					<Icon
						width="22px"
						icon="PlusIcon"
						fill="Card"
					/>
				</Button>
			</animated.div>
		</>
	)
}

export { CreateOverlay }
