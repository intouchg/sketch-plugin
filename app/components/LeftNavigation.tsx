import React from 'react'
import { useLocation, Link as RouterLink } from 'react-router-dom'
import { Stack, Link } from '@i/components'

const LeftNavigation = ({
	items,
	width,
}: {
	items: [ string, string ][]
	width: string | number
}) => {
	const { pathname } = useLocation()

	return (
		<Stack
			position="fixed"
			top={0}
			left={0}
			width={width}
			height="100%"
			alignItems="center"
			justifyContent="center"
			backgroundColor="grey.1"
			boxShadow="small"
		>
			{items.map(([ text, path ]) => (
				<Link
					key={text + path}
					as={RouterLink}
					to={path}
					paddingX={4}
					paddingY={2}
					marginY={2}
					color={path === pathname ? 'blue' : 'black'}
					backgroundColor={path === pathname ? 'grey.2' : ''}
					hoverColor="blue"
					activeColor="blue"
					borderRadius="large"
					textAlign="center"
					fontWeight={path === pathname ? 600 : 400}
					style={{ textDecoration: 'none' }}
				>
					{text}
				</Link>
            ))}
		</Stack>
	)
}

export { LeftNavigation }
