import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import { ThemeProvider } from 'styled-components'
import { Flex, Stack, Box, Button, Text, Heading, Link, Icon, Input } from '@i/components'
import { componentNames } from '@i/theme'
import type { Theme } from '@i/theme'

const INITIAL_WIDTH = 600
const INITIAL_HEIGHT = 600

const components = {
	button: Button,
	heading: Heading,
	text: Text,
	link: Link,
	icon: Icon,
	input: Input,
} as const

const ComponentView = ({
	name,
	theme,
}: {
	name: keyof typeof components
	theme: Theme
}) => {
	const [ { x, y }, setSpring ] = useSpring(() => ({ x: 0, y: 0 }))
	const bindDragGesture = useDrag(({ down, movement: [ x, y ] }) => {
		if (down) {
			setSpring({ x, y })
		}
	}, { initial: () => [ x.get(), y.get() ] })

	const handleDoubleClick = () => setSpring({ x: 0, y: 0 })

	const Component = components[name] as any

	return (
		<Box padding={4}>
			<Flex
				position="absolute"
				top={0}
				left={0}
				padding={2}
				alignItems="center"
				justifyContent="space-evenly"
			>
				<Heading paddingX={2}>
					<animated.span>
						{x.to((x) => `W ${(x + INITIAL_WIDTH).toFixed(0)}`)}
					</animated.span>
				</Heading>
				<Heading paddingX={2}>
					<animated.span>
						{y.to((y) => `H ${(y + INITIAL_HEIGHT).toFixed(0)}`)}
					</animated.span>
				</Heading>
			</Flex>
			<Box padding={4}>
				<Flex
					flexDirection="column"
					alignItems="center"
					justifyContent="space-evenly"
				>
					<Stack
						backgroundColor="white"
						boxShadow="small"
						alignItems="center"
						justifyContent="space-evenly"
					>
						<animated.div
							{...bindDragGesture()}
							style={{
								width: x.to((x) => x + INITIAL_WIDTH),
								height: y.to((y) => y + INITIAL_HEIGHT),
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								cursor: 'pointer',
							}}
							onDoubleClick={handleDoubleClick}
						>
							<ThemeProvider theme={theme}>
								<Component>
									Test Value
								</Component>
							</ThemeProvider>
						</animated.div>
					</Stack>
				</Flex>
			</Box>
		</Box>
	)
}

export { ComponentView }
