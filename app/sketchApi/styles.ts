import type { ThemeColor, ThemeFont, ThemeFontSize, ThemeFontWeight, ThemeLineHeight, ThemeLetterSpacing, ThemeBorderWidth, ThemeShadow, ThemeRadius } from '@i/theme'

export type RawImportedSketchStyles = {
    colors: [ string, string ][]
    fonts: string[]
    fontSizes: number[]
    fontWeights: number[]
    lineHeights: number[]
    letterSpacings: number[]
    borderWidths: string[]
    shadows: string[]
    radii: string[]
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
    radii: ThemeRadius[]
}
