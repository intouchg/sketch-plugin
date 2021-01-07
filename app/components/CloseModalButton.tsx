import React from 'react'
import { InvisibleButton } from './Buttons'
import { CloseIcon } from './Icons'

const CloseModalButton = ({
    onClick,
}: {
    onClick: () => void
}) => (
    <InvisibleButton
        position="absolute"
        top="0"
        right="0"
        padding={2}
        zIndex={3}
        onClick={onClick}
    >
        <CloseIcon
            width="13px"
            fill="Accent"
        />
    </InvisibleButton>
)

export { CloseModalButton }