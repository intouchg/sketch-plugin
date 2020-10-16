import type { ThemeColor, ThemeFont, ThemeFontSize, ThemeFontWeight, ThemeLineHeight, ThemeLetterSpacing, ThemeBorderWidth, ThemeShadow } from '@i/theme'

export type RawImportedSketchStyles = {
    colors: [ string, string ][]
    fonts: string[]
    fontSizes: string[]
    fontWeights: string[]
    lineHeights: string[]
    letterSpacings: string[]
    borderWidths: string[]
    shadows: string[]
}

export type ParsedImportedSketchStyles = {
    colors: ThemeColor[]
    fonts: ThemeFont[]
    fontSizes: ThemeFontSize[]
    fontWeights: ThemeFontWeight[]
    lineHeights: ThemeLineHeight[]
    letterSpacings: ThemeLetterSpacing[]
    borderWidths: ThemeBorderWidth[]
    shadows: ThemeShadow[]
}
