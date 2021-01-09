import type { Message } from '../../sketchApi'

export type BannerPrompt = {
	confirmText?: string
	cancelText?: string
	onConfirm?: () => void
	onCancel?: () => void
}

export type BannerState =
	& { show: boolean }
	& Message
	& BannerPrompt

export const initialBannerState: BannerState = {
	show: false,
	type: 'info',
	message: '',
	confirmText: undefined,
	cancelText: undefined,
	onConfirm: undefined,
	onCancel: undefined,
}
