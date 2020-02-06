// 用来开关灯
import lightButton from '../../../assets/images/light.png'

const LightSwitch = ({car,changeEnvironment}) => {
	const [light, setLight] = useState(false)
	// 选中
	const turn = () => {
		setLight(!light)
		car.lightSwitch(!light)
		changeEnvironment(!light)
	}
	return (<div id="light-switch" className={light?'on':'off'} onClick={()=>turn()}>
		<img src={lightButton} alt=""/>
	</div>)
}

export {LightSwitch}

