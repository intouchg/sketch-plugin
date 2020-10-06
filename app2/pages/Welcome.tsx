import React from 'react'
import { Box, Stack, Flex, Heading, Text, Button } from '@i/components'
import { AccentText } from '../components'
import pkg from '../../package.json'

const Welcome = () => {
	return (
		<Box>
			<Stack>
				<Heading>
					IDS Editor
				</Heading>
				<AccentText>
					{pkg.version}
				</AccentText>
			</Stack>
			<Stack>
				<Text>
					Open Project
				</Text>
				<Button>
					https://github.com/codynova/tarot
				</Button>
			</Stack>
			<Flex>
				<Stack>
					<Text>
						Recent
					</Text>
					<Stack>
						<Text>
							IDS Plugin
						</Text>
						<Text>
							Exec Demo
						</Text>
						<Text>
							More...
						</Text>
					</Stack>
				</Stack>
				<Stack>
					<Text>
						Resources
					</Text>
					<Stack>
						<Text>
							Getting Started
						</Text>
						<Text>
							Coming Soon
						</Text>
						<Text>
							Support
						</Text>
					</Stack>
				</Stack>
			</Flex>
		</Box>
	)
}

export { Welcome }
