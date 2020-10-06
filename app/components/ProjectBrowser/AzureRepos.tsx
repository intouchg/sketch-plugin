import React, { useRef, useState, useEffect } from 'react'
import { Box, Flex, Heading, Button, Accordion, AccordionToggle, AccordionCollapse } from '@i/components'
import { AzureToolbar } from './AzureToolbar'
import { AzureRepo } from './AzureRepo'
import type { AzureUserConnection, AzureGitRepo } from '@i/azure'

export const gitRepoProp = { 'data-repo': true }

const isGitRepoElement = (element: HTMLElement) =>
	element && element.getAttribute(Object.keys(gitRepoProp)[0])

const AzureRepos = ({
	gitRepos,
	resetParentView,
}: {
	gitRepos: AzureUserConnection['gitRepos']
	resetParentView: () => void
}) => {
	const azureToolbarContainer = useRef<HTMLDivElement>(null)
	const [ repos, setRepos ] = useState(gitRepos)
	const [ selectedRepo, setSelectedRepo ] = useState<AzureGitRepo | undefined>(undefined)

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			const element = event.target as HTMLElement

			if (
				!isGitRepoElement(element)
				&& !azureToolbarContainer.current!.contains(element)
			) {
				setSelectedRepo(undefined)
			}
		}

		window.addEventListener('mousedown', handleOutsideClick)
		return () => window.removeEventListener('mousedown', handleOutsideClick)
	}, [])

	const searchRepos = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
		const filteredRepos: typeof repos = []

		gitRepos.forEach(([ orgName, repos ]) => {
			const filteredOrgRepos = repos.filter(({ name }) => {
				return name.toLowerCase().includes(
					value.toLowerCase().replace(/\s/g, ''),
				)
			})

			if (filteredOrgRepos.length > 0) {
				filteredRepos.push([ orgName, filteredOrgRepos ])
			}
		})

		setRepos(filteredRepos)
	}

	const updateSelectedRepo = (id: string) => {
		let repo: typeof selectedRepo

		gitRepos.find(([ , repos ]) => {
			repo = repos.find((repo) => repo.id === id)
			return repo
		})

		setSelectedRepo(repo)
	}

	return (
		<Box padding={6}>
			{repos.map(([ organizationName, repos ]) => (
				<Box
					key={organizationName}
					padding={3}
				>
					<Accordion defaultActiveId={organizationName}>
						<AccordionToggle id={organizationName}>
							{(active) => (
								<>
									<Button
										padding={2}
										fontSize={3}
										color="blue"
										backgroundColor="transparent"
										style={{
											transform: `rotate(${active ? 90 : 0}deg)`,
										}}
									>
										{'>'}
									</Button>
									<Heading
										display="inline-block"
										padding={2}
									>
										{organizationName}
									</Heading>
								</>
							)}
						</AccordionToggle>
						<AccordionCollapse id={organizationName}>
							{(active) => (
								<Flex
									height={active ? '100%' : 0}
									flexWrap="wrap"
									alignItems="center"
									justifyContent="flex-start"
									style={{
										overflow: 'hidden',
									}}
								>
									{repos.map(({ id, name }) => (
										<AzureRepo
											key={id}
											id={id}
											name={name}
											selected={Boolean(selectedRepo && id === selectedRepo.id)}
											onClick={updateSelectedRepo}
										/>
									))}
								</Flex>
							)}
						</AccordionCollapse>
					</Accordion>
				</Box>
			))}
			<Box
				position="fixed"
				top={0}
				left={0}
				width={1}
				height={51}
				paddingX={3}
				paddingY="10px"
				backgroundColor="grey.1"
				boxShadow="small"
			>
				<Button
					position="absolute"
					padding="0.35em"
					color="black"
					zIndex={10}
					style={{ textDecoration: 'none' }}
					onClick={resetParentView}
				>
					Back
				</Button>
				<Box ref={azureToolbarContainer}>
					<AzureToolbar
						searchRepos={searchRepos}
						selectedRepo={selectedRepo}
					/>
				</Box>
			</Box>
		</Box>
	)
}

export { AzureRepos }
