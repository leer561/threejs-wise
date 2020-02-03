// 内饰时点击切换回外观的图标

// 样式
import carImg from '../../../assets/images/show-car.png'

const ShowCar = ({front, switchFunc})=>{

	return (<div style={{display: front}} id="show-car" onClick={()=>switchFunc()}>
		<img src={carImg} alt=""/>
	</div>)
}

export {ShowCar}
