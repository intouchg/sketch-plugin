/**
 * These types describe fonts retrieved from Mac System Profiler
 * using the terminal command: `system_profiler -json SPFontsDataType`
 */

export type SPFontTypeface = {
    _name: string
    // eslint-disable-next-line camelcase
    copy_protected: string
    copyright?: string | null
    description?: string | null
    designer?: string | null
    duplicate: string
    embeddable: string
    enabled: string
    family: string
    fullname: string
    outline: string
    style: string
    trademark?: string | null
    unique: string
    valid: string
    vendor?: string | null
    version: string
}

export type SPFontsDataType = {
    _name: string
    enabled: string
    path: string
    type: string
    typefaces?: SPFontTypeface[] | null
    valid: string
}

export type SPFontData = {
    SPFontsDataType: SPFontsDataType[]
}

// The theme reducer transforms the raw JSON
// data from system_profiler into this type
export type SystemFontsDictionary = {
    [fontFamily: string]: {
        name: string
        path: string
        typefaces: SPFontTypeface[]
    }
}
