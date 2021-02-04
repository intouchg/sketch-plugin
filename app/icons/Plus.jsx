import * as React from 'react'
import { Icon } from '@i/components'

const Plus = (props) => (
	<Icon
		viewBox="0 0 13 12"
		{...props}
	><path
		d="M6 12a.53.53 0 00.398-.172.55.55 0 00.165-.39V6.561h4.968c.156 0 .29-.054.399-.164A.542.542 0 0012.094 6a.542.542 0 00-.164-.398.542.542 0 00-.399-.165H6.562V.595a.542.542 0 00-.164-.399A.542.542 0 006 .031a.542.542 0 00-.398.164.542.542 0 00-.165.399v4.843H.563a.55.55 0 00-.39.165A.53.53 0 000 6c0 .156.057.29.172.398a.55.55 0 00.39.165h4.875v4.875a.55.55 0 00.165.39A.53.53 0 006 12z"
		fill="#DDD"
		fillRule="nonzero"
	/>
	</Icon>
)

export default Plus
