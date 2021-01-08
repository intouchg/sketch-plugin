import type { BannerState } from './state'

export const SET_BANNER_STATE = 'SET_BANNER_STATE'
export type SetBannerStateAction = {
    type: typeof SET_BANNER_STATE
    payload: BannerState
}
export const setBannerState = (bannerState: SetBannerStateAction['payload']): SetBannerStateAction => ({
	type: SET_BANNER_STATE,
	payload: bannerState,
})

export type BannerActionType =
    | SetBannerStateAction
