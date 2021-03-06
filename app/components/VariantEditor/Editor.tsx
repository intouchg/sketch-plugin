import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { Flex, Button, Text, Paragraph, Heading, Link, Label, Input, Radio, Checkbox, Select, Slider, Toggle, Textarea } from '@intouchg/components'
import { RightToolbar } from './RightToolbar'
import { VariantsList } from './VariantsList'
import { StyleEditor } from './StyleEditor'
import { topToolbarHeight } from '../TopToolbar'
import { DeleteModal } from './DeleteModal'
import { themeProcessor, componentVariantsPropertyMap, defaultVariantName } from '@intouchg/theme'
import type { ThemeVariant, SelectorProperty, ComponentVariantProperty } from '@intouchg/theme'

export const componentConfig = {
	buttons: {
		component: Button,
		children: 'Click me',
		props: {
			onClick: () => {},
		},
	},
	texts: {
		component: Text,
		children: (<>Lorem ipsum dolor sit amet<br />consectetur adipisicing elit</>),
		props: {},
	},
	paragraphs: {
		component: Paragraph,
		children: (<>Lorem ipsum dolor sit amet<br />consectetur adipisicing elit</>),
		props: {},
	},
	headings: {
		component: Heading,
		children: (<>Lorem ipsum dolor sit amet<br />consectetur adipisicing elit</>),
		props: {},
	},
	links: {
		component: Link,
		children: 'Link',
		props: {},
	},
	icons: {
		component: null,
		children: undefined,
		props: {
			width: '30px',
		},
	},
	labels: {
		component: Label,
		children: 'Label',
		props: {},
	},
	inputs: {
		component: Input,
		children: undefined,
		props: {
			placeholder: 'Search...',
		},
	},
	radios: {
		component: Radio,
		children: undefined,
		props: {
			checked: true,
			onChange: () => {},
		},
	},
	checkboxes: {
		component: Checkbox,
		children: undefined,
		props: {
			checked: true,
			onChange: () => {},
		},
	},
	selects: {
		component: Select,
		children: (
			<>
				<option value="1">Option one</option>
				<option value="2">Option two</option>
				<option value="3">Option three</option>
			</>
		),
		props: {},
	},
	sliders: {
		component: Slider,
		children: undefined,
		props: {},
	},
	toggles: {
		component: Toggle,
		children: undefined,
		props: {
			checked: true,
		},
	},
	textareas: {
		component: Textarea,
		children: undefined,
		props: {},
	},
}

const Editor = () => {
	const { variantKey } = useParams()
	const values = useSelector((state) => state.theme.values)
	const variants = useSelector((state) => state.theme.variants)
	const variantType = Object.entries(componentVariantsPropertyMap).find((e) => e[1] === variantKey)![0] as ThemeVariant['variantType']
	const [ filteredVariants, setFilteredVariants ] = useState(variants.filter((v) => v.variantType === variantType))
	const [ selectedId, setSelectedId ] = useState<string | null>(filteredVariants.find((v) => v.name === defaultVariantName)?.id || null)
	const selectedVariant = selectedId ? filteredVariants.find((value) => value.id === selectedId)! : null
	const [ creating, setCreating ] = useState(false)
	const [ selectorProperty, setSelectorProperty ] = useState<SelectorProperty | ''>('')
	const [ deleteVariant, setDeleteVariant ] = useState<ThemeVariant | null>(null)

	const { component: Component, children, props } = (componentConfig as any)[variantKey]

	useEffect(() => setSelectedId(null), [ variantType ])

	useEffect(() => {
		setFilteredVariants(variants.filter((v) => v.variantType === variantType))
	}, [ variants, variantType ])

	useEffect(() => {
		if (!selectedId && filteredVariants.length) {
			const primaryVariant = filteredVariants.find((v) => v.name === 'Primary')

			if (primaryVariant) {
				setSelectedId(primaryVariant.id)
			}
			else {
				setSelectedId(filteredVariants[0].id)
			}
		}
	}, [ variantType, selectedId, filteredVariants ])

	const theme = themeProcessor({ values: Object.values(values).flat(), variants })

	const selectedVariantStyles = !selectedVariant ? {} : theme[variantKey as ComponentVariantProperty][selectedVariant.name]

	const previewStyles = {
		...selectedVariantStyles,
		...!selectorProperty ? {} : (selectedVariantStyles[selectorProperty] || {}),
	}

	return (
		<>
			<Flex
				width="100%"
				height={`calc(100vh - ${topToolbarHeight}px)`}
				flexGrow={1}
				alignItems="center"
				justifyContent="center"
				overflow="scroll"
			>
				<ThemeProvider theme={theme as any}>
					{selectedVariant && (
						<Component
							variant={selectedVariant.name}
							{...props}
							{...previewStyles}
						>
							{children}
						</Component>
					)}
				</ThemeProvider>
			</Flex>
			<RightToolbar>
				<VariantsList
					variants={filteredVariants}
					variantType={variantType}
					selectedId={selectedId}
					setSelectedId={setSelectedId}
					creating={creating}
					setCreating={setCreating}
				/>
				<StyleEditor
					variant={selectedVariant}
					selectorProperty={selectorProperty}
					setSelectorProperty={setSelectorProperty}
					setDeleteVariant={setDeleteVariant}
				/>
			</RightToolbar>
			{deleteVariant && (
				<DeleteModal
					deleteVariant={deleteVariant}
					setDeleteVariant={setDeleteVariant}
				/>
			)}
		</>
	)
}

export { Editor }
