import React, { useState, useRef, useCallback } from 'react'
import { useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Stack, Button } from '@i/components'
import { Icon } from '../Icon'
import { topToolbarHeight } from './index'
import { resetThemeState, resetProjectState, setShowSettingsModal } from '../../store'
import { useOutsideClickListener, useDisplayErrorBanner } from '../../hooks'
import { sendSketchCommand, openBrowserWindow } from '../../sketchApi'

const MoreMenu = ({
	showProjectOptions,
}: {
	showProjectOptions?: boolean
}) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const menuButtonElement = useRef<HTMLDivElement>(null)
	const [ showMenu, setShowMenu ] = useState(false)
	const hideMenu = useCallback(() => setShowMenu(false), [ setShowMenu ])
	const displayErrorBanner = useDisplayErrorBanner()
	useOutsideClickListener(menuButtonElement, hideMenu)

	const closeProject = () => sendSketchCommand('closeLocalProject', {})
		.then(() => batch(() => {
			navigate('/')
			dispatch(resetThemeState())
			dispatch(resetProjectState())
		}))
		.catch((error) => displayErrorBanner(error))

	return (
		<Box
			display="inline-block"
			ref={menuButtonElement}
		>
			<Button
				invisible
				paddingX={2}
				paddingY={3}
				onClick={() => setShowMenu((state) => !state)}
			>
				<Icon
					icon="EllipsesIcon"
					fill="Text Light"
					width="16px"
					height="8px"
				/>
			</Button>
			{showMenu && (
				<Box
					position="fixed"
					top={topToolbarHeight}
					right="0"
					overflow="hidden"
				>
					<Stack
						alignItems="flex-start"
						padding={3}
						backgroundColor="Card"
						borderWidth="1px"
						borderStyle="solid"
						borderColor="Accent"
						borderRadius={3}
						borderTopLeftRadius="0"
						borderTopRightRadius="0"
						boxShadow="Downward Accent"
					>
						<Button
							variant="Tertiary"
							padding={2}
							onClick={() => dispatch(setShowSettingsModal(true))}
						>
							Settings
						</Button>
						{showProjectOptions && (
							<>
								<Button
									variant="Tertiary"
									padding={2}
									onClick={() => openBrowserWindow('https://google.com')}
								>
									Support
								</Button>
								<Button
									variant="Tertiary"
									padding={2}
									onClick={closeProject}
								>
									Close Project
								</Button>
							</>
						)}
					</Stack>
				</Box>
			)}
		</Box>
	)
}

export { MoreMenu }
