import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { Flex } from '@i/components'
import { RightToolbar } from './RightToolbar'
import { VariantsList } from './VariantsList'
import { topToolbarHeight } from '../TopToolbar'
import { componentVariantsPropertyMap, defaultVariantName } from '@i/theme'

const Editor = () => {
	const { variantKey } = useParams()
	const variants = useSelector((state) => state.theme.variants)
	const variantType = Object.entries(componentVariantsPropertyMap).find((e) => e[1] === variantKey)![0]
	const filteredVariants = variants.filter((v) => v.variantType === variantType)
	const [ selectedId, setSelectedId ] = useState<string | null>(null)
	const selectedVariant = selectedId ? filteredVariants.find((value) => value.id === selectedId)! : null

	useEffect(() => setSelectedId(filteredVariants.find((v) => v.name === defaultVariantName)?.id || null), [ filteredVariants ])

	return (
		<>
			<Flex
				width="100%"
				height={`calc(100vh - ${topToolbarHeight}px)`}
				overflow="scroll"
			>
				Test
			</Flex>
			<RightToolbar>
				<VariantsList
					variants={filteredVariants}
					selectedId={selectedId}
					setSelectedId={setSelectedId}
				/>
			</RightToolbar>
		</>
	)
}

export { Editor }
