// 外观颜色显示区域
import material from "../../../common/services/car/material"

const {main} = material

const OutColors = ({front,car}) => {
	const [selectColor, setSelectColor] = useState('white')
	// 选中
	const select = (color) => {
		setSelectColor(color.name)
		car.updateMaterials(color)
	}
	return (<div style={{display: front}} id="out-colors">
		{main.map(color => {
			let className = color.name
			if (color.name === selectColor) {
				className += ' active'
			}
			// 判断是否选中
			return (<span className={className} onClick={() => select(color)}/>)
		})}
	</div>)
}

export {OutColors}

