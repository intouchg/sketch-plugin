import React from 'react'
import styled from 'styled-components'
import { Grid } from '@intouchg/components'

const ColorGrid = styled(Grid)`
	width: 100%;
	grid-template-columns: repeat(auto-fill, minmax(max(min(156px, 23%), 136px), 1fr));
	justify-content: center;
`

export { ColorGrid }
