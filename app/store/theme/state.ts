import type { ThemeValue, ThemeComponent, ThemeVariant } from '@i/theme'
import type { RecentProject, ParsedImportedSketchValues, SystemFontsDictionary } from '../../sketchApi'

export type ThemeState = {
	canUndo: boolean
	canRedo: boolean
	values: ThemeValue[]
	components: ThemeComponent[]
	variants: ThemeVariant[]
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
