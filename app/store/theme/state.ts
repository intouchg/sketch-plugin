import type { ThemeValue, ThemeComponent, ThemeVariant } from '@i/theme'
import type { RecentProject, ParsedImportedSketchValues, SystemFontsDictionary } from '../../sketchApi'

export type ThemeData = {
	values: ThemeValue[]
	variants: ThemeVariant[]
}

export type ThemeState =
	& ThemeData
	& {
		canUndo: boolean
		canRedo: boolean
		recentProjects: RecentProject[]
		sketchDocumentNames: string[]
		importedSketchValues: ParsedImportedSketchValues
		importedSketchFontFamilyNames: string[]
		systemFonts: SystemFontsDictionary
	}

export const initialThemeState: ThemeState = {
	canUndo: false,
	canRedo: false,
	values: [] as ThemeValue[],
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
	importedSketchFontFamilyNames: [],
	systemFonts: {},
}
