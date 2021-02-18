import { useRef, useState, useEffect } from 'react'

export const useMeasure = <T extends HTMLElement>() => {
	const ref = useRef<T>(null)
	const [ bounds, setBounds ] = useState({ left: 0, top: 0, width: 0, height: 0 })
	const [ resizeObserver ] = useState(() => new ResizeObserver(([ entry ]) => setBounds(entry.contentRect)))

	useEffect(() => {
		resizeObserver.observe(ref.current!)
		return resizeObserver.disconnect
	}, [ resizeObserver ])

	return [ ref, bounds ] as [ typeof ref, typeof bounds ]
}
