import type { ThemeValue, ThemeComponent, ThemeVariant, ThemeColor } from '@i/theme'
import type { RecentProject, ParsedImportedSketchValues, SystemFontsDictionary } from '../../sketchApi'

export type ThemeState = {
	canUndo: boolean
	canRedo: boolean
	values: ThemeValue[]
	components: ThemeComponent[]
	variants: ThemeVariant[]
	selectedColor: ThemeColor
	deletingValue: { id: string, message?: string }
	selectedComponent: { id: string }
	recentProjects: RecentProject[]
	sketchDocumentNames: string[]
	importedSketchValues: ParsedImportedSketchValues
	systemFonts: SystemFontsDictionary
}

export const initialState: ThemeState = {
	canUndo: false,
	canRedo: false,
	values: [] as ThemeValue[],
	components: [] as ThemeComponent[],
	variants: [] as ThemeVariant[],
	selectedColor: {} as ThemeColor,
	deletingValue: { id: '', message: '' },
	selectedComponent: { id: '' },
	recentProjects: [],
	sketchDocumentNames: [],
	importedSketchValues: {
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
