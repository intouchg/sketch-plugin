import React, { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from '@i/components'
import { setSelectedColor } from '../../../store'
import { ColorSwatches } from './ColorSwatches'
import { ColorToolbar } from './ColorToolbar'
import { ColorEditor } from './ColorEditor'
import { topNavHeight } from '../../TopNavigation'
import type { ThemeColor, ThemeGroup } from '@i/theme'

export const colorEditorRightNavWidth = '240px'

export const colorSwatchProp = { 'data-color': true }

const isColorSwatchElement = (element: HTMLElement) =>
	element && element.getAttribute(Object.keys(colorSwatchProp)[0])

const Colors = ({
	colors,
	groups,
}: {
	colors: ThemeColor[]
	groups: ThemeGroup[]
}) => {
	const dispatch = useDispatch()
	const colorEditorContainer = useRef<HTMLDivElement>(null)
	const [ colorSearchString, setColorSearchString ] = useState('')

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			const element = event.target as HTMLElement

			if (
				!isColorSwatchElement(element)
				&& !colorEditorContainer.current!.contains(element)
			) {
				dispatch(setSelectedColor({ id: '', value: '' }))
			}
		}

		window.addEventListener('mousedown', handleOutsideClick)
		return () => window.removeEventListener('mousedown', handleOutsideClick)
	}, [])

	const searchColors = (event: React.ChangeEvent<HTMLInputElement>) => setColorSearchString(event.target.value)

	const filteredColors = colors.filter(({ name }) => {
		return name.toLowerCase().includes(colorSearchString.toLowerCase().replace(/\s/g, ''))
	})

	const colorGroups = groups.map((group) => {
		const groupColors: ThemeColor[] = []

		group.members.forEach((id) => {
			const groupColor = filteredColors.find((color) => color.id === id)

			if (groupColor) {
				groupColors.push(groupColor)
			}
		})

		return { ...group, colors: groupColors }
	})

	const ungroupedColors = filteredColors.filter((color) => color.groups.length === 0)

	return (
		<Box
			width={1}
			padding={4}
		>
			<Box
				position="relative"
				paddingTop={4}
				width={`calc(100% - ${colorEditorRightNavWidth})`}
			>
				{colorSearchString !== ''
					&& ungroupedColors.length === 0 ? null : (
						<ColorSwatches
							name="Colors"
							colors={ungroupedColors}
						/>
					)
				}
				{colorGroups.map((colorGroup) => {
					return colorSearchString !== ''
						&& colorGroup.colors.length === 0 ? null : (
							<ColorSwatches
								key={colorGroup.id}
								{...colorGroup}
							/>
						)
				})}
			</Box>
			<Box
				ref={colorEditorContainer}
				position="fixed"
				width={colorEditorRightNavWidth}
				height="100%"
				top={0}
				right={0}
				backgroundColor="grey.1"
				boxShadow="small"
			>
				<ColorEditor />
			</Box>
			<Box
				position="fixed"
				top={topNavHeight}
				left={0}
				width={1}
				paddingX={3}
				paddingY="10px"
				backgroundColor="grey.1"
				boxShadow="small"
			>
				<ColorToolbar
					colorSearchString={colorSearchString}
					searchColors={searchColors}
				/>
			</Box>
		</Box>
	)
}

export { Colors }
