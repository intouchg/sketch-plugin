import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Flex, Text, Button } from '@i/components'
import { titleCase } from '@i/utility'

export const topNavHeight = '38px'

const TopNavigation = ({
	items,
}: {
	items: { [key: string]: string }
}) => {
	const { pathname } = useLocation()
	const history = useHistory()
	const entries = Object.entries(items)

	return (
		<Flex
			width={1}
			position="fixed"
			zIndex={10}
			alignItems="center"
			justifyContent="space-evenly"
		>
			{entries.map(([ title, path ], index) => (
				<Button
					key={path}
					width={index === 0 || index === entries.length - 1 ? 1 / 7 : 1 / 4}
					padding={11}
					color={pathname === path ? 'blue' : 'black'}
					backgroundColor="grey.1"
					hoverColor="blue"
					activeColor="blue"
					boxShadow="small"
					borderRight={index === entries.length - 1 ? '0' : '1px solid'}
					borderRightColor="grey.2"
					borderRadius={0}
					style={{ whiteSpace: 'nowrap' }}
					onClick={() => history.push(path)}
				>
					<Text
						textAlign="center"
						fontWeight={pathname === path ? 600 : 400}
					>
						{titleCase(title)}
					</Text>
				</Button>
            ))}
		</Flex>
	)
}

export { TopNavigation }
