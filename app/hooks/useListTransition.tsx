import { useTransition, useSpring } from 'react-spring'
import type { ThemeValue } from '@intouchg/theme'

export const useListTransition = (
	values: ThemeValue[],
	height: number | ((value: ThemeValue) => number),
	sortFunction: (a: any, b: any) => number,

) => {
	let containerHeight = 0

	const transition = useTransition(
		values.slice().sort(sortFunction).map((value) => {
			const h = typeof height === 'number' ? height : height(value)
			return { ...value, height: h, y: (containerHeight += h) - h }
		}),
		{
			keys: (value: any) => value.id,
			// trail: 400 / values.length,
			initial: ({ height, y }) => ({ opacity: 1, scaler: 1, height, y }),
			from: { opacity: 0, scaler: 0, height: 0 },
			enter: ({ height, y }: any) => ({ opacity: 1, scaler: 1, height, y }),
			update: ({ height, y }: any) => ({ height, y }),
			leave: { opacity: 0, scaler: 0, height: 0 },
		},
	)

	const [ containerHeightSpring ] = useSpring({ height: containerHeight }, [ containerHeight ])

	return [ transition, containerHeightSpring ] as [ typeof transition, typeof containerHeightSpring ]
}
