import React from 'react'
import styled from 'styled-components'
import { Grid } from '@i/components'

const ColorContainerGrid = styled(Grid)`
	flex-grow: 1;
	margin-top: auto;
	margin-bottom: auto;
	grid-template-columns: repeat(auto-fill, minmax(196px, 1fr));
	justify-content: center;
`

export { ColorContainerGrid }
