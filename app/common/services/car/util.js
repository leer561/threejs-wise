// 车玻璃窗饰条
export const glassMoulding = {
	'Door_LF_Chrome': true,
	'Door_LB_Chrome': true,
	'Body_Chrome': true,
	'Door_RB_Chrome': true,
	'Door_RF_Chrome': true
}

// 定义车身渲染颜色
export const carBody = {
	'Carpaint': true,
	'chehoumen': true,
	'cheqianmen': true,
	'houbeixiang': true,
	'PostSiege_A_Paint': true,
	'Trunk_Paint': true,
	'Door_LB_Paint': true,
	'Door_LF_Paint': true,
	'Door_RF_Paint': true,
	'Door_RB_Paint': true

}

// 定义玻璃
export const carGlass = {
	'Door_RF_Glass': true,
	'Door_RB_Glass': true,
	'Body_Glass1': true,
	'Door_LB_Glass': true,
	'Door_LF_Glass': true,
	'Body_Glass': true,
	'Door_RF_MirrorGlass': true,
	'Door_LF_MirrorGlass': true,
	'Door_Last_Grass': true
}

// 白色的金属相关附件
export const whiteParts = {
	'Trunk_Chrome': true,
	'FrontGrille_A_Chrome': true,
	//'Wheel_FRO_Plastic':true,
	'Wheel_FRO_Chrome': true,
	//'Wheel_BRO_Plastic':true,
	'Wheel_BRO_Chrome': true,
	//'Wheel_BLO_Plastic':true,
	'Wheel_BLO_Chrome': true,
	'Wheel_FLO_Chrome': true,
	//'Wheel_FLO_Plastic':true,

}

// 灰色的相关附件
export const grayParts = {
	'Wheel_FRO_Plastic': true,
	'Wheel_BRO_Plastic': true,
	'Wheel_BLO_Plastic': true,
	'Wheel_FLO_Plastic': true,
	'FrontGrille_A_FrostedPlastic': true,
	'Body_Plastic': true,
	'Door_RB_FrostedPlastic': true,
	'Door_RF_FrostedPlastic': true,
	'Door_L_FrostedPlastic': true,
	'Door_LB_FrostedPlastic': true,
	'chewei': true,
	'Body_PlasticW': true
}

// 不反光材质
export const grayWhiteParts = {
	'Wheel_Other_FRO_Chrome': true,
	'Wheel_Other_BRO_Chrome': true,
	'Wheel_Other_BLO_Chrome': true,
	'Wheel_Other_FL_Chrome': true
}

// 轮子
export const carWheels = {
	'Wheel_BLO_Chrome': true,
	'Wheel_BLO_Plastic': true,
	'Wheel_BLO_Tire': true,
	'Wheel_BRO_Chrome': true,
	'Wheel_BRO_Plastic': true,
	'Wheel_BRO_Tire': true,
	'Wheel_FLO_Chrome': true,
	'Wheel_FLO_Plastic': true,
	'Wheel_FLO_Tire': true,
	'Wheel_FRO_Chrome': true,
	'Wheel_FRO_Plastic': true,
	'Wheel_FRO_Tire': true
}

// 轮胎
export const carTire = {
	'Wheel_BLO_Tire': true,
	'Wheel_FLO_Tire': true,
	'Wheel_FRO_Tire': true,
	'Wheel_BRO_Tire': true
}

// light
export const carLight = {
	'Trunk_Light': true,
	'Body_Light': true,
	'Light_A_Light': true
}

// 点击开门的部件
export const touchParts = {
	// 左前门
	'Door_LF_Glass': 'leftDoor',
	'Door_LF_Chrome': 'leftDoor',
	'Door_LF_Paint': 'leftDoor',
	'Door_LF_MirrorGlass': 'leftDoor',
	'Door_L_FrostedPlastic': 'leftDoor',
	'cheqianmen_left': 'leftDoor',

	// 车位
	'Trunk_Paint': 'trunk',
	'Trunk_Light': 'trunk',
	'Trunk_Chrome': 'trunk',
	'Trunk_Body_Plate': 'trunk'
}

export const partsArray = {
	body: [],
	rims: [],
	glass: [],
	glassMoulding: [],
	wheels: [],
	tire: [],
	lights: [],
	leftDoor: [],
	trunk: []
}
