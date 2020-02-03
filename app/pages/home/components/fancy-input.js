import {useImperativeMethods,forwardRef} from 'react'
function FancyInput(props, ref) {
	const inputRef = useRef()
	useImperativeMethods(ref, () => ({
		focus: () => {
			inputRef.current.focus()
		}
	}))
	return <input ref={inputRef} />
}

export default forwardRef(FancyInput)
