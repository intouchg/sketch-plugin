import React, { useState, useEffect } from 'react'
import { Box, Button, Stack } from '@i/components'
import { sketchRequest } from '../../sketchApi'
import { AzureLogin } from './AzureLogin'
import { AzureRepos } from './AzureRepos'
import { Loading } from '../Loading'

const openProject = () => sketchRequest('selectGitRepo')

const ProjectBrowser = () => {
	const [ showAzureRepos, setShowAzureRepos ] = useState(false)
	const [ showAzureLogin, setShowAzureLogin ] = useState(false)
	const [ showLoading, setShowLoading ] = useState(false)
	const [ azureGitRepos, setAzureGitRepos ] = useState([])

	useEffect(() => {
		window.azureRequestError = ({ status }) => {
			setShowLoading(false)
			window.displayError!(`Failed to login to Azure${status === 401 ? ' with status code 401 unauthorized.' : '.'}`)
		}

		window.setGitRepos = (repos) => {
			setAzureGitRepos(repos)
			setShowAzureRepos(true)
			setShowLoading(false)
		}

		window.cloningAzureGitRepo = () => {
			setShowAzureRepos(false)
			setShowLoading(true)
		}

		window.clonedAzureGitRepo = () => {
			setShowLoading(false)
		}

		return () => {
			delete window.azureRequestError
			delete window.setGitRepos
		}
	}, [])

	const toggleShowAzureLogin = () => setShowAzureLogin((state) => !state)

	const getAzureProjects = (credentials: { username: string, accessToken: string }) => {
		setShowAzureLogin(false)
		setShowLoading(true)
		sketchRequest('getAzureGitRepos', credentials)
	}

	const resetView = () => {
		setShowAzureLogin(false)
		setShowLoading(false)
		setAzureGitRepos([])
		setShowAzureRepos(false)
	}

	return (
		<Box padding={4}>
			{!showAzureRepos && (
				<>
					<Box
						display="inline-block"
						padding={4}
					>
						<Button
							padding={2}
							color="blue"
							backgroundColor="white"
							hoverColor="white"
							hoverBackgroundColor="blue"
							activeColor="white"
							border="2px solid"
							borderColor="blue"
							onClick={openProject}
						>
							Open Local Project
						</Button>
					</Box>
					<Box
						display="inline-block"
						padding={4}
					>
						<Button
							padding={2}
							color="blue"
							backgroundColor="white"
							hoverColor="white"
							hoverBackgroundColor="blue"
							activeColor="white"
							border="2px solid"
							borderColor="blue"
							onClick={toggleShowAzureLogin}
						>
							Download Azure Project
						</Button>
					</Box>
				</>
			)}
			{showAzureRepos && (
				<AzureRepos
					gitRepos={azureGitRepos}
					resetParentView={resetView}
				/>
			)}
			{showAzureLogin && (
				<AzureLogin
					onSubmit={getAzureProjects}
					onCancel={toggleShowAzureLogin}
				/>
			)}
			{showLoading && (
				<Stack
					width={1}
					height="50vh"
					alignItems="center"
					justifyContent="space-evenly"
				>
					<Loading
						borderColor="grey.2"
						borderTopColor="blue"
					/>
				</Stack>
			)}
		</Box>
	)
}

export { ProjectBrowser }
