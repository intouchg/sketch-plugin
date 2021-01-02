import type { BannerState } from './state'

export const SET_BANNER_MESSAGE = 'SET_BANNER_MESSAGE'
export type SetBannerMessageAction = {
    type: typeof SET_BANNER_MESSAGE
    payload: BannerState
}
export const setBannerMessage = (bannerState: SetBannerMessageAction['payload']): SetBannerMessageAction => ({
	type: SET_BANNER_MESSAGE,
	payload: bannerState,
})

export type BannerActionType =
    | SetBannerMessageAction
