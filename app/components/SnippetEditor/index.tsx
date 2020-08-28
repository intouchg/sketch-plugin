import React from 'react'
import { Box } from '@i/components'
import { LeftNavigation } from '../LeftNavigation'
import { topNavHeight } from '../TopNavigation'
import type { ThemeSnippet } from '@i/theme'

export const patternBrowserLeftNavWidth = '160px'

const SnippetEditor = ({
	snippets,
}: {
	snippets: ThemeSnippet[]
}) => (
	<>
		<LeftNavigation
			items={[
                [ 'Colors', '/snippets/colors' ],
			]}
			width={patternBrowserLeftNavWidth}
		/>
		<Box
			position="relative"
			top={topNavHeight}
			left={patternBrowserLeftNavWidth}
			width={`calc(100vw - ${patternBrowserLeftNavWidth})`}
			height="100%"
		>
			Snippet Editor
		</Box>
	</>
)

export { SnippetEditor }
