import type { Message } from '../../sketchApi'

export type BannerPrompt = {
	title?: string
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
	title: '',
	message: '',
	confirmText: undefined,
	cancelText: undefined,
	onConfirm: undefined,
	onCancel: undefined,
}
