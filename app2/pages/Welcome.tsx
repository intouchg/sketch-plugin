import React from 'react'
import { Box, Stack, Flex, Heading, Button, Input } from '@i/components'
import { AccentText, TertiaryButton } from '../components'
import pkg from '../../package.json'

const Welcome = () => {
	return (
		<Box>
			<Stack>
				<Heading variant="secondary">
					IDS Editor
				</Heading>
				<AccentText>
					{pkg.version}
				</AccentText>
			</Stack>
			<Stack>
				<AccentText>
					Open Project
				</AccentText>
				<Input value="https://github.com/codynova/tarot" />
			</Stack>
			<Flex>
				<Stack>
					<AccentText>
						Recent
					</AccentText>
					<Stack>
						<TertiaryButton>
							IDS Plugin
						</TertiaryButton>
						<TertiaryButton>
							Exec Demo
						</TertiaryButton>
						<TertiaryButton>
							More...
						</TertiaryButton>
					</Stack>
				</Stack>
				<Stack>
					<AccentText>
						Resources
					</AccentText>
					<Stack>
						<TertiaryButton>
							Getting Started
						</TertiaryButton>
						<TertiaryButton>
							Coming Soon
						</TertiaryButton>
						<TertiaryButton>
							Support
						</TertiaryButton>
					</Stack>
				</Stack>
			</Flex>
		</Box>
	)
}

export { Welcome }
