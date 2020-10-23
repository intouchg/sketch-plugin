import React from 'react'
import { InvisibleButton } from '../Buttons'
import { AccentText } from '../Texts'
import { SketchIcon } from '../Icons'

const ImportButton = ({
	openImportModal,
}: {
    openImportModal: () => void
}) => (
	<InvisibleButton
		display="inline-flex"
		marginRight={4}
		paddingY={3}
		onClick={openImportModal}
	>
		<AccentText
			color="Text"
			marginRight={1}
		>
			Import
		</AccentText>
		<SketchIcon
			width="16px"
			height="16px"
		/>
	</InvisibleButton>
)

export { ImportButton }
