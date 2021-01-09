import { produce } from 'immer'
import {
	SET_BANNER_STATE,
} from './actions'
import { initialBannerState } from './state'
import type { BannerActionType } from './actions'
import type { BannerState } from './state'

export const bannerReducer = (
	state: BannerState = initialBannerState,
	action: BannerActionType,
): BannerState => {
	return produce(state, (nextState) => {
		switch (action.type) {
			case SET_BANNER_STATE: {
				const { show, type, message, confirmText, cancelText, onConfirm, onCancel } = action.payload
				nextState.show = show
				nextState.type = type
				nextState.message = message
				nextState.confirmText = confirmText
				nextState.cancelText = cancelText
				nextState.onConfirm = onConfirm
				nextState.onCancel = onCancel
				break
			}

			default: {
				break
			}
		}
	})
}
