import React, { useState, useEffect, useRef } from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	TouchableHighlight,
	Image,
	Dimensions,
	Animated,
	Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';

//Ncore Components
import Text from '../../../NCore/Components/Text';
import Normalize from '../../../NCore/Components/Normalize';

//NCore THeme
import { Shadow } from '../../../NCore';

import OneSignal from 'react-native-onesignal';

const menuSort = (a) => {
	switch (a) {
		case 'Ana Sayfa':
			return 0;
		case 'Profil':
			return 3;
		case 'Emlak Portfoyüm':
			return 1;
		case 'Kiracı Portfoyüm':
			return 2;
	}
};
const SwipeableTopTabBar = (props) => {
	let test = JSON.parse(JSON.stringify(props.navigationState.routes));
	test = test.sort((a, b) => {
		if (a && a.params && a.params.routeName && b && b.params && b.params.routeName) {
			return menuSort(b.params.routeName) - menuSort(a.params.routeName);
		}
	});
	const routes = test;
	const index = props.navigationState.index;
	const routeName = routes[index].routeName;
	const { params = {} } = routes[index];

	const screenWidth = Dimensions.get('screen').width;
	const animation = useRef(new Animated.Value(0)).current;
	const [ animat, setAnimat ] = useState(true);
	useEffect(() => {
		setAnimat(false);
	}, []);
	const startAnimation = () => {
		Animated.timing(animation, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true
		}).start(({ finished }) => {
			if (finished) setAnimat(true);
		});
	};
	const finishAnimation = () => {
		Animated.timing(animation, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true
		}).start(({ finished }) => {
			if (finished) setAnimat(false);
		});
	};
	const animationHeight = Dimensions.get('screen').width * 1.25;

	const trans = animation.interpolate({
		inputRange: [ 0, 1 ],
		outputRange: [ -animationHeight + 175, -animationHeight + 310 ]
	});
	return (
		<View style={styles.container}>
			<View
				style={[
					Shadow,
					{
						height: 140,
						zIndex: 702
					}
				]}
			>
				<View
					style={[
						Shadow,
						styles.defaultCompanentSize,
						{
							position: 'absolute',
							bottom: 0,
							left: -((screenWidth * 1.25 - screenWidth) / 2),
							zIndex: 702,
							backgroundColor: 'rgb(0,0,0,0.2)',
							justifyContent: 'flex-end',
							alignItems: 'center',
							paddingBottom: screenWidth / 6
						}
					]}
				>
					<View
						style={{
							width: screenWidth,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							zIndex: 702
						}}
					>
						<View
							style={{
								width: 44,
								zIndex: 702
							}}
						/>
						<Text
							style={{
								color: 'white',
								fontFamily: 'Exo2.0-ExtraBold',
								fontSize: Normalize(18),
								zIndex: 702
							}}
						>
							{params.pageName}
						</Text>
						<View
							style={{
								width: 44,
								zIndex: 702
							}}
						>
							{params.pageName === 'Profil' ? (
								<TouchableOpacity
									onPress={async () => {
										Alert.alert(
											'Heptan Çık',
											'Hesaptan çıkılsın mı?',
											[
												{
													text: 'İptal Et',
													onPress: () => console.log('Cancel Pressed'),
													style: 'cancel'
												},
												{
													text: 'Tamam',
													onPress: async () => {
														OneSignal.deleteTag('user_id');
														OneSignal.setSubscription(false);
														await AsyncStorage.setItem('userToken', '');
														props.navigation.navigate('Loading');
													}
												}
											],
											{
												cancelable: true
											}
										);
									}}
									style={{
										width: 44
									}}
								>
									<Icon
										name={'sign-out-alt'}
										color={'white'}
										size={20}
										style={{
											alignSelf: 'center',
											bottom: 5,
											right: 5
										}}
									/>
								</TouchableOpacity>
							) : null}
						</View>
					</View>
				</View>
				<Image
					source={require('../../../Source/Images/TopImage.jpg')}
					style={[
						styles.defaultCompanentSize,
						{
							position: 'absolute',
							bottom: 0,
							left: -((screenWidth * 1.25 - screenWidth) / 2),
							zIndex: 701
						}
					]}
				/>
			</View>

			<Animated.View
				style={[
					Shadow,
					styles.defaultCompanentSize,
					{
						left: -((screenWidth * 1.25 - screenWidth) / 2),
						position: 'absolute',
						overflow: 'hidden',
						backgroundColor: '#F5F5F5',
						transform: [
							{
								translateY: trans
							}
						],
						zIndex: 700,
						flexDirection: 'column-reverse'
					}
				]}
			>
				<TouchableOpacity
					style={{
						width: '100%',
						alignItems: 'center',
						flexDirection: 'column',
						height: 35,
						justifyContent: 'center',
						zIndex: 700
					}}
					onPress={animat ? () => finishAnimation() : () => startAnimation()}
				>
					<Icon
						name={animat ? 'angle-double-up' : 'angle-double-down'}
						size={16}
						style={{
							color: '#272727'
						}}
						onPress={animat ? () => finishAnimation() : () => startAnimation()}
					/>
				</TouchableOpacity>
				{routes.map((item, index) => {
					const { params = {} } = item;
					return (
						<TouchableOpacity
							style={{
								heigt: 35,
								backgroundColor: '#F5F5F5',
								justifyContent: 'center',
								flexDirection: 'column',
								alignItems: 'center',
								paddingVertical: 5,
								zIndex: 700
							}}
							onPress={() => {
								finishAnimation();
								props.navigation.navigate(item.routeName);
							}}
						>
							<Text
								style={{
									color: routeName === item.routeName ? '#428FD7' : '#272727',
									zIndex: 700
								}}
							>
								{params.pageName}
							</Text>
						</TouchableOpacity>
					);
				})}
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		zIndex: 9999,
		backgroundColor: "white"
	},
	defaultCompanentSize: {
		width: Dimensions.get('screen').width * 1.25,
		height: Dimensions.get('screen').width * 1.25,
		borderRadius: Dimensions.get('screen').width / 2
	}
});
export default SwipeableTopTabBar;
