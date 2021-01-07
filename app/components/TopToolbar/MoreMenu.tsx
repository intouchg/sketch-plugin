import React, { useState, useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import { Box } from '@i/components'
import { InvisibleButton, TertiaryButton } from '../Buttons'
import { EllipsesIcon } from '../Icons'
import { topToolbarHeight } from './index'
import { initialAzureState, setThemeData, setLocalProject, setBranchName } from '../../store'
import { useOutsideClickListener } from '../../hooks'

const MoreMenu = ({
	showProjectOptions,
}: {
	showProjectOptions?: boolean
}) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const menuButtonElement = useRef<HTMLDivElement>(null)
	const [ showMenu, setShowMenu ] = useState(false)
	const spring = useSpring({ maxHeight: showMenu ? '340px' : '0px' })
	const hideMenu = useCallback(() => setShowMenu(false), [ setShowMenu ])
	useOutsideClickListener(menuButtonElement, hideMenu)

	const closeProject = () => {
		navigate('/')
		dispatch(setThemeData({ values: [], variants: [] }))
		dispatch(setLocalProject(initialAzureState.localProject))
		dispatch(setBranchName(initialAzureState.branchName))
	}

	return (
		<div
			ref={menuButtonElement}
			style={{ display: 'inline-block' }}
		>
			<InvisibleButton
				paddingX={2}
				paddingY={3}
				onClick={() => setShowMenu((state) => !state)}
			>
				<EllipsesIcon
					fill="Text Light"
					width="16px"
					height="8px"
				/>
			</InvisibleButton>
			<animated.div
				style={{
                    position: 'fixed',
                    top: topToolbarHeight,
                    right: 0,
					overflow: 'hidden',
					transform: 'scale3d(1, 1, 1)',
                    ...spring,
				}}
			>
				<Box
					padding={3}
					backgroundColor="Card"
					borderWidth="1px"
					borderStyle="solid"
					borderColor="Accent"
					borderRadius="Medium"
					boxShadow="Medium"
				>
					{showProjectOptions && (
						<TertiaryButton onClick={closeProject}>
							Close Project
						</TertiaryButton>
					)}
				</Box>
			</animated.div>
		</div>
	)
}

export { MoreMenu }
