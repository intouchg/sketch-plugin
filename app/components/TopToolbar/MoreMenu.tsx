import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import { Box } from '@i/components'
import { InvisibleButton, TertiaryButton } from '../Buttons'
import { EllipsesIcon } from '../Icons'
import { topToolbarHeight } from './index'
import { initialAzureState, setThemeData, setLocalProject, setBranchName } from '../../store'

const MoreMenu = ({
	showProjectOptions,
}: {
	showProjectOptions?: boolean
}) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [ showMenu, setShowMenu ] = useState(false)
	const spring = useSpring({ maxHeight: showMenu ? '340px' : '0px' })

	const closeProject = () => {
		navigate('/')
		dispatch(setThemeData({ values: [], variants: [] }))
		dispatch(setLocalProject(initialAzureState.localProject))
		dispatch(setBranchName(initialAzureState.branchName))
	}

	return (
		<>
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
                    ...spring,
                }}
			>
				<Box
					padding={3}
					backgroundColor="Card"
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
		</>
	)
}

export { MoreMenu }
