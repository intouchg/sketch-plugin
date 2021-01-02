import type { Message } from '../../sketchApi'

export type BannerState =
	& { show: boolean }
	& Message

export const initialBannerState: BannerState = {
	show: false,
	type: 'info',
	message: '',
}
