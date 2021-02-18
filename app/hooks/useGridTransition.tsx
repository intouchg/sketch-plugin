import { useTransition, useSpring } from 'react-spring'
import type { ThemeValue } from '@i/theme'

export const useGridTransition = (
	values: ThemeValue[],
	gridWidth: number,
	gridItemRect: { width: number, height: number },
	sortFunction: (a: any, b: any) => number,
) => {
	const { width, height } = gridItemRect
	const columns = Math.floor(gridWidth / width)

	let containerHeight = 0

	const transition = useTransition(
		values.slice().sort(sortFunction).map((value, index) => {
			const column = index % columns

			if (column === 0) {
				containerHeight += height
			}

			return { ...value, width, height, x: width * column, y: containerHeight - height }
		}),
		{
			keys: (value: any) => value.id,
			// trail: 400 / values.length,
			initial: ({ width, height, x, y }) => ({ opacity: 1, scaler: 1, width, height, x, y }),
			from: { opacity: 0, scaler: 0, width: 0, height: 0 },
			enter: ({ width, height, x, y }: any) => ({ opacity: 1, scaler: 1, width, height, x, y }),
			update: ({ width, height, x, y }: any) => ({ width, height, x, y }),
			leave: { opacity: 0, scaler: 0, width: 0, height: 0 },
		},
	)

	const [ containerSizeSpring ] = useSpring({
		width: columns * width,
		height: containerHeight,
	}, [ columns, width, containerHeight ])

	return [ transition, containerSizeSpring ] as [ typeof transition, typeof containerSizeSpring ]
}
