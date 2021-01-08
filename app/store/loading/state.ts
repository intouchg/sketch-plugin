export type LoadingState = {
	show: boolean
	message?: string
}

export const initialLoadingState: LoadingState = {
	show: false,
	message: '',
}
