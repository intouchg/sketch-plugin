import type { ThemeValue, ThemeGroup, ThemeComponent, ThemeVariant, ThemeColor } from '@i/theme'
import type { RecentProject, ParsedImportedSketchStyles, SystemFontsDictionary } from '../../sketchApi'

export type ThemeState = {
	canUndo: boolean
	canRedo: boolean
	values: ThemeValue[]
	groups: ThemeGroup[]
	components: ThemeComponent[]
	variants: ThemeVariant[]
	selectedColor: ThemeColor
	deletingValue: { id: string, message?: string }
	selectedComponent: { id: string }
	recentProjects: RecentProject[]
	sketchDocumentNames: string[]
	importedSketchStyles: ParsedImportedSketchStyles
	systemFonts: SystemFontsDictionary
}

export const initialState: ThemeState = {
	canUndo: false,
	canRedo: false,
	values: [] as ThemeValue[],
	groups: [] as ThemeGroup[],
	components: [] as ThemeComponent[],
	variants: [] as ThemeVariant[],
	selectedColor: {} as ThemeColor,
	deletingValue: { id: '', message: '' },
	selectedComponent: { id: '' },
	recentProjects: [],
	sketchDocumentNames: [],
	importedSketchStyles: {
		colors: [],
		fonts: [],
		fontSizes: [],
		fontWeights: [],
		lineHeights: [],
		letterSpacings: [],
		borderWidths: [],
		shadows: [],
	},
	systemFonts: {},
}
