import type { ThemeBorder, ThemeBorderStyle, ThemeBorderWidth, ThemeBreakpoint, ThemeColor, ThemeFont, ThemeFontSize, ThemeFontWeight, ThemeLetterSpacing, ThemeLineHeight, ThemeRadius, ThemeShadow, ThemeSize, ThemeSpace, ThemeValue, ThemeVariant, ThemeZIndex } from '@i/theme'
import type { DirectoryFilepath, ParsedImportedSketchValues, SystemFontsDictionary } from '../../sketchApi'

export type ThemeData = {
	values: ThemeValue[]
	variants: ThemeVariant[]
}

export type ThemeState = {
	canUndo: boolean
	canRedo: boolean
	recentProjects: DirectoryFilepath[]
	sketchDocumentNames: string[]
	systemFonts: SystemFontsDictionary
	values: {
		breakpoints: ThemeBreakpoint[]
		space: ThemeSpace[]
		sizes: ThemeSize[]
		colors: ThemeColor[]
		fonts: ThemeFont[]
		fontSizes: ThemeFontSize[]
		fontWeights: ThemeFontWeight[]
		lineHeights: ThemeLineHeight[]
		letterSpacings: ThemeLetterSpacing[]
		borders: ThemeBorder[]
		borderStyles: ThemeBorderStyle[]
		borderWidths: ThemeBorderWidth[]
		radii: ThemeRadius[]
		shadows: ThemeShadow[]
		zIndices: ThemeZIndex[]
	}
	variants: ThemeVariant[]
	importedSketchValues: ParsedImportedSketchValues
	importedSketchFontFamilyNames: string[]
}

export const initialThemeState: ThemeState = {
	canUndo: false,
	canRedo: false,
	recentProjects: [],
	sketchDocumentNames: [],
	systemFonts: {},
	values: {
		breakpoints: [],
		space: [],
		sizes: [],
		colors: [],
		fonts: [],
		fontSizes: [],
		fontWeights: [],
		lineHeights: [],
		letterSpacings: [],
		borders: [],
		borderStyles: [],
		borderWidths: [],
		radii: [],
		shadows: [],
		zIndices: [],
	},
	variants: [] as ThemeVariant[],
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
}
