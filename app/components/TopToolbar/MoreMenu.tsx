import React, { useState, useRef, useCallback } from 'react'
import { useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import { Stack } from '@i/components'
import { InvisibleButton, TertiaryButton } from '../Buttons'
import { EllipsesIcon } from '../Icons'
import { topToolbarHeight } from './index'
import { resetThemeState, resetProjectState } from '../../store'
import { useOutsideClickListener, useDisplayErrorBanner } from '../../hooks'
import { sendSketchCommand } from '../../sketchApi'

const MoreMenu = ({
	showProjectOptions,
	setShowSettingsModal,
}: {
	showProjectOptions?: boolean
	setShowSettingsModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const menuButtonElement = useRef<HTMLDivElement>(null)
	const [ showMenu, setShowMenu ] = useState(false)
	const spring = useSpring({ maxHeight: showMenu ? '340px' : '0px' })
	const hideMenu = useCallback(() => setShowMenu(false), [ setShowMenu ])
	const displayErrorBanner = useDisplayErrorBanner()
	useOutsideClickListener(menuButtonElement, hideMenu)

	const closeProject = () => {
		sendSketchCommand('closeLocalProject', {})
			.then(() => batch(() => {
				navigate('/')
				dispatch(resetThemeState())
				dispatch(resetProjectState())
			}))
			.catch((error) => displayErrorBanner(error))
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
				<Stack
					alignItems="flex-start"
					padding={3}
					backgroundColor="Card"
					borderWidth="1px"
					borderStyle="solid"
					borderColor="Accent"
					borderRadius="Medium"
					boxShadow="Medium"
				>
					<TertiaryButton
						padding={2}
						onClick={() => setShowSettingsModal(true)}
					>
						Settings
					</TertiaryButton>
					{showProjectOptions && (
						<TertiaryButton
							padding={2}
							onClick={closeProject}
						>
							Close Project
						</TertiaryButton>
					)}
				</Stack>
			</animated.div>
		</div>
	)
}

export { MoreMenu }
