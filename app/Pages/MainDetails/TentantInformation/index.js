import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	LayoutAnimation,
	UIManager,
	ActivityIndicator,
	TouchableOpacity,
	Platform,
	BackHandler,
	Alert
} from 'react-native';

import Toast from 'react-native-simple-toast';
import ImageCropPicker from 'react-native-image-crop-picker';

//Font Awsome Icon
import Icon from 'react-native-vector-icons/FontAwesome5';

//NCore Theme
import { Shadow, GeneralPadding, BetweenObjectsMargin, SuccessfulColor } from '../../../NCore';

//Graphql Apollo
import { Query } from 'react-apollo';
import { Mutation } from 'react-apollo';
import { getTenant } from '../../../Server/graphql/Queries/getTenant';
import { updateTenant } from '../../../Server/graphql/Mutation/updateTenant';
import { updateTenantImage } from '../../../Server/graphql/Mutation/updateTenantImage';
import { deleteTenant } from '../../../Server/graphql/Mutation/deleteTenant';
import { serverAdres } from '../../../Server/config';
import { ReactNativeFile } from 'apollo-upload-client';

//NCore Components
import DescriptionCard from '../../../NCore/Components/DescriptionCard';
import Text from '../../../NCore/Components/Text';
import Normalize from '../../../NCore/Components/Normalize';
import ProfileImage from '../../../NCore/Components/ProfileImage';
import TextInput from '../../../NCore/Components/TextInput';
import TouchableHighlight from '../../../NCore/Components/TouchableHighlight';
import ImagePicker from "../../../NCore/Components/ImagePicker";

//NCore Tools
import { typeValidMessageConverter } from '../../../NCore/Tools/typeValidMessageConverter';
import { isoStringToDate } from '../../../NCore/Tools/isoStringToDate';

class TentantInformation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			saveStatus: false,
			deleteTenantStatus: false,
			profileEditMode: false,
			tenantID: this.props.navigation.getParam('tenantID'),
			fullName: '',
			tcIdentity: '',
			phoneNumber1: '',
			phoneNumber2: '',
			tenantAdress: '',
			activeApartment: '',
			suretyFullName: '',
			suretyTcIdentity: '',
			suretyPhoneNumber: '',
			suretyAdress: '',
			registerDate: '',
			profileImageName: '',
			profileImage: null,
			deleteProfileImage: false,
			modalVisible: false,
			tempDatas: {
				fullName: '',
				tcIdentity: '',
				phoneNumber1: '',
				phoneNumber2: '',
				tenantAdress: '',
				activeApartmenTitle: '',
				activeApartment: '',
				suretyFullName: '',
				suretyTcIdentity: '',
				suretyPhoneNumber: '',
				suretyAdress: '',
				registerDate: '',
				profileImageName: '',
				profileImage: null,
				deleteProfileImage: false,
			}
		};
		this.changeEditMode = this.changeEditMode.bind(this);
	}

	componentDidMount() {
		if(Platform.OS === "android") UIManager.setLayoutAnimationEnabledExperimental(true);
		LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
		this.props.navigation.setParams({
			pageName: 'Kiracı Bilgileri',
			goBackFunction: () => this.props.navigation.navigate('TenantPortfolio')
		});
	}
	UNSAFE_componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', async () => {
			await this.props.navigation.setParams({
				refetchPageName: ''
			});
			this.props.navigation.navigate('Home', {
				refetchPageName: 'TenantPortfolio'
			});
			return false;
		});
	}

	changeEditMode(revertTempStatus) {
		const { profileEditMode } = this.state;
		if(Platform.OS === "android") UIManager.setLayoutAnimationEnabledExperimental(true);
		LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);

		/* Edit Mode Control */
		if (profileEditMode === true) {
			/* Datas */
			const newData = Object.assign({}, this.state);
			const tempData = Object.assign({}, this.state.tempDatas);
			/* Delete Another Key in new Data */
			["saveStatus", "deleteTenantStatus", "profileEditMode", "profileEditMode", "tenantID", "tempDatas", "modalVisible"].forEach((val) => delete newData[val])

			console.log(newData);
			console.log(tempData)
			if (JSON.stringify(newData) !== JSON.stringify(tempData) && revertTempStatus !== false) {
				Alert.alert(
					'Düzenlemeden Çık',
					'Düzenleme modundan çıkarsanız yaptığınız değişiklikler kayıt altına alınmayacaktır eminmisiniz?',
					[
						{
							text: 'İptal Et',
							onPress: () => console.log('Cancel Pressed'),
							style: 'cancel'
						},
						{
							text: 'Tamam',
							onPress: () => this.revertTempData()
						}
					],
					{
						cancelable: true
					}
				);
			}
			else {
				this.setState({
					profileEditMode: !profileEditMode
				});
				this.props.navigation.setParams(
					profileEditMode ? { pageName: 'Kiracı Bilgileri' } : { pageName: 'Kiracı Bilgilerini Düzenle' }
				);
			}
		}
		else {
			this.setState({
				profileEditMode: !profileEditMode
			});
			this.props.navigation.setParams(
				profileEditMode ? { pageName: 'Kiracı Bilgileri' } : { pageName: 'Kiracı Bilgilerini Düzenle' }
			);
		}

	}
	revertTempData = () => {
		const { tempDatas, profileEditMode } = this.state;
		this.props.navigation.setParams(
			profileEditMode ? { pageName: 'Kiracı Bilgileri' } : { pageName: 'Kiracı Bilgilerini Düzenle' }
		);
		this.setState({
			fullName: tempDatas.fullName,
			tcIdentity: tempDatas.tcIdentity,
			phoneNumber1: tempDatas.phoneNumber1,
			phoneNumber2: tempDatas.phoneNumber2,
			tenantAdress: tempDatas.tenantAdress,
			activeApartment: tempDatas.activeApartment,
			suretyFullName: tempDatas.suretyFullName,
			suretyTcIdentity: tempDatas.suretyTcIdentity,
			suretyPhoneNumber: tempDatas.suretyPhoneNumber,
			suretyAdress: tempDatas.suretyAdress,
			registerDate: tempDatas.registerDate,
			profileImageName: tempDatas.profileImageName,
			profileImage: tempDatas.profileImage,
			deleteProfileImage: false,
			profileEditMode: false
		})
	}
	async toastMessage({ data }) {
		const message = await data.updateTenant.message;
		const title = 'Kiracı';
		const errorMessage = await typeValidMessageConverter({ message, title });
		return Toast.show(errorMessage, Toast.LONG, ['UIAlertController']);
	}
	render() {
		const ProfileImageSize = 100;
		const { profileEditMode } = this.state;
		return (
			<Mutation mutation={deleteTenant} refetchQueries={[`getAvailableTenantsForContract`]}>
				{(deleteTenantData, { loading, error, data }) => {
					if (loading) {
						return <ActivityIndicator size="large" style={{ flex: 1 }} color={'#1A2430'} />;
					} else if (error) {
						return <View>{alert('Bir hata oluştu' + error)}</View>;
					} else {
						if (data) {
							if (this.state.deleteTenantStatus === false) {
								if (data.deleteTenant.code === 200) {
									Toast.show(data.deleteTenant.message, Toast.LONG, ['UIAlertController']);
									this.props.navigation.navigate('TenantPortfolio');
								} else {
									Toast.show(data.deleteTenant.message, Toast.LONG, ['UIAlertController']);
								}
								this.setState({
									deleteTenantStatus: true
								});
							}
						}
						return (

							<Mutation mutation={updateTenant}>
								{(updateTenantData, { loading, error, data }) => {
									if (loading) {
										return (
											<View
												style={{
													flex: 1,
													justifyContent: 'center',
													alignItems: 'center'
												}}
											>
												<ActivityIndicator
													size="large"
													style={{ flex: 1 }}
													color={'#1A2430'}
												/>
											</View>
										);
									} else if (error) {
										return <View>{alert('Bir hata oluştu' + error)}</View>;
									} else {
										if (data) {
											if (this.state.saveStatus === false) {
												if (data.updateTenant.code === 200) {
													Toast.show(data.updateTenant.message, Toast.LONG, [
														'UIAlertController'
													]);
													this.changeEditMode(false);
													this.setState({ profileEditMode: false })
												} else {
													this.toastMessage({ data });
												}
												this.setState({
													saveStatus: true
												});
											}
										}
										return (
											<Query
												query={getTenant}
												variables={{
													tenantID: this.state.tenantID
												}}
												fetchPolicy="cache-and-network"
												onCompleted={async (data) => {
													if (data.getTenant.response.code === 200) {
														const getTenantData = data.getTenant.data;
														const registerDate = await isoStringToDate(
															getTenantData.registerDate,
															'date'
														);
														this.setState({
															fullName: getTenantData.fullName,
															tcIdentity: getTenantData.tcIdentity,
															phoneNumber1: getTenantData.phoneNumber1,
															phoneNumber2: getTenantData.phoneNumber2,
															tenantAdress: getTenantData.tenantAdress,
															activeApartment: getTenantData.activeApartment,
															suretyFullName: getTenantData.suretyFullName,
															suretyTcIdentity: getTenantData.suretyTcIdentity,
															suretyPhoneNumber: getTenantData.suretyPhoneNumber,
															suretyAdress: getTenantData.suretyAdress,
															registerDate: registerDate,
															profileImageName: getTenantData.profileImageName,
															profileImage: null,
															deleteProfileImage: false,
															tempDatas: {
																fullName: getTenantData.fullName,
																tcIdentity: getTenantData.tcIdentity,
																phoneNumber1: getTenantData.phoneNumber1,
																phoneNumber2: getTenantData.phoneNumber2,
																tenantAdress: getTenantData.tenantAdress,
																activeApartment: getTenantData.activeApartment,
																suretyFullName: getTenantData.suretyFullName,
																suretyTcIdentity: getTenantData.suretyTcIdentity,
																suretyPhoneNumber: getTenantData.suretyPhoneNumber,
																suretyAdress: getTenantData.suretyAdress,
																registerDate: registerDate,
																profileImageName: getTenantData.profileImageName,
																profileImage: null,
																deleteProfileImage: false,
															}
														});
													}
												}}
											>
												{({ loading, error, data }) => {
													if (loading) {
														return (
															<ActivityIndicator
																size="large"
																style={{ flex: 1 }}
																color={'#1A2430'}
															/>
														);
													} else if (error) {
														return (
															<View>
																{alert('Bir hata oluştu' + error)}
															</View>
														);
													} else {
														if (data.getTenant.response.code === 200) {
															return (
																<View style={{ flex: 1 }}>
																	<ImagePicker
																		visible={this.state.modalVisible}
																		setVisible={(val) => {
																			this.setState({
																				modalVisible: val
																			})
																		}}
																		onModalHide={async(prop)=>{
																			setTimeout(() => {
																				if(prop === "phoneCamera"){																					
																					ImageCropPicker.openCamera({
																						multiple: false,
																						maxFiles: 1,
																						mediaType: "photo",
		
																					}).then((response) => {
																						if (response.didCancel === true) {
																						}
																						else {
																							this.setState({
																								saveStatus: true
																							})
																							this.setState({
																								deleteProfileImage: false,
																								profileImageName: response.path,
																								profileImage: response
																							});
																						}
																					})
																				}
																				else if(prop === "gallery"){
																					ImageCropPicker.openPicker({
																						multiple: false,
																						maxFiles: 1,
																						mediaType: "photo",
		
																					}).then((response) => {
																						if (response.didCancel === true) {
																						}
																						else {
																							this.setState({
																								saveStatus: true
																							})
																							this.setState({
																								deleteProfileImage: false,
																								profileImageName: response.path,
																								profileImage: response
																							});
																						}
																					});
																				}
																			}, 400);
																		}}
																		onPressPhoneCamera={() => {
																			this.setState({
																				modalVisible: false
																			})
																			ImageCropPicker.openCamera({
																				mediaType: "photo",

																			}).then((response) => {
																				if (response.didCancel === true) {
																				}
																				else {
																					this.setState({
																						saveStatus: true
																					})
																					this.setState({
																						deleteProfileImage: false,
																						profileImageName: response.path,
																						profileImage: response
																					});
																				}
																			});
																		}}
																		onPressGalery={() => {
																			this.setState({
																				modalVisible: false
																			})
																			ImageCropPicker.openPicker({
																				multiple: false,
																				maxFiles: 1,
																				mediaType: "photo",

																			}).then((response) => {
																				if (response.didCancel === true) {
																				}
																				else {
																					this.setState({
																						saveStatus: true
																					})
																					this.setState({
																						deleteProfileImage: false,
																						profileImageName: response.path,
																						profileImage: response
																					});
																				}
																			});

																		}}
																		onPressDelete={() => {
																			this.setState({
																				modalVisible: false
																			})
																			Alert.alert(
																				'Kiracı Resmini Sil',
																				'Kiracı resmini silmek istediğinize eminmisiniz?',
																				[
																					{
																						text: 'İptal Et',
																						onPress: () => console.log('Cancel Pressed'),
																						style: 'cancel'
																					},
																					{
																						text: 'Tamam',
																						onPress: () => {
																							this.setState({
																								deleteProfileImage: true,
																								profileImageName: "",
																								profileImage: null
																							})
																						}
																					}
																				],
																				{
																					cancelable: true
																				}
																			);

																		}}
																	>

																	</ImagePicker>
																	<ScrollView
																		style={styles.container}
																		showsVerticalScrollIndicator={false}
																		keyboardShouldPersistTaps='always'
																	>
																		<View
																			style={[
																				Shadow,
																				styles.profileContainer,
																				{
																					paddingHorizontal: 6
																				}
																			]}
																		>
																			<View
																				style={[
																					Shadow,
																					styles.headerContainer
																				]}
																			>
																				<View
																					style={[
																						styles.headerControler,
																						{
																							position:
																								'absolute',
																							top:
																								ProfileImageSize /
																								2
																						}
																					]}
																				>
																					<TouchableOpacity
																						onPress={() =>
																							this.changeEditMode()}
																						style={{
																							padding: Normalize(
																								10
																							),
																							paddingBottom: 10,
																							paddingLeft: 20
																						}}
																					>
																						<Icon
																							name={
																								profileEditMode ? (
																									'times-circle'
																								) : (
																										'edit'
																									)
																							}
																							color={
																								'#272727'
																							}
																							size={Normalize(
																								20
																							)}
																							style={{
																								alignSelf:
																									'flex-start'
																							}}
																						/>
																					</TouchableOpacity>
																					{!profileEditMode ? null : (
																						<TouchableOpacity
																							onPress={async () => {
																								const variables = {};
																								this.setState(
																									{
																										saveStatus: false
																									}
																								);
																								if (this.state.deleteProfileImage !== false) {
																									variables.deleteProfileImage = true;
																									variables.profileImageName = "";

																								}
																								else if (this.state.profileImage !== null) {
																									const pathArray = this.state.profileImage.path.toString().split("/");
																									const name = pathArray[pathArray.length - 1];
																									const file = new ReactNativeFile({
																										uri: this.state.profileImage.path,
																										name: name,
																										type: this.state.profileImage.mime,
																									});
																									variables.profileImage = file
																								}
																								updateTenantData(
																									{
																										variables: {
																											tenantID: this
																												.state
																												.tenantID,
																											fullName: this
																												.state
																												.fullName,
																											tcIdentity: this
																												.state
																												.tcIdentity,
																											phoneNumber1: this
																												.state
																												.phoneNumber1,
																											phoneNumber2: this
																												.state
																												.phoneNumber2,
																											tenantAdress: this
																												.state
																												.tenantAdress,
																											profileImageName: this
																												.state
																												.profileImageName,
																											suretyFullName: this
																												.state
																												.suretyFullName,
																											suretyTcIdentity: this
																												.state
																												.suretyTcIdentity,
																											suretyPhoneNumber: this
																												.state
																												.suretyPhoneNumber,
																											suretyAdress: this
																												.state
																												.suretyAdress,
																											profileImage: variables.profileImage,
																											deleteProfileImage: variables.deleteProfileImage
																										}
																									}
																								);
																							}}
																							style={{
																								padding: Normalize(
																									10
																								),
																								paddingBottom: Normalize(
																									10
																								),
																								paddingRight: Normalize(
																									10
																								)
																							}}
																						>
																							<Icon
																								name={
																									'save'
																								}
																								color={
																									'#272727'
																								}
																								size={Normalize(
																									20
																								)}
																								style={{
																									alignSelf:
																										'flex-start',
																									paddingLeft: 12
																								}}
																							/>
																						</TouchableOpacity>
																					)}
																				</View>
																				<ProfileImage
																					src={
																						this.state
																							.profileImage !==
																							null ? (
																								this.state
																									.profileImageName
																							) : this.state
																								.profileImageName !==
																								'' ? (
																									serverAdres +
																									'/profileImages/' +
																									this.state
																										.profileImageName
																								) : (
																									this.state
																										.profileImageName
																								)
																					}
																					style={
																						(Shadow,
																							{ flex: 1 })
																					}
																					size={
																						ProfileImageSize
																					}
																					profileEditMode={this.state.profileEditMode}
																					onEditLongPress={() => {

																					}}
																					editOnPress={async () => {
																						this.setState({
																							modalVisible: true
																						})
																					}}
																				/>
																			</View>

																			<DescriptionCard
																				style={[
																					Shadow,
																					{
																						marginTop:
																							ProfileImageSize /
																							2,
																						marginBottom: BetweenObjectsMargin
																					}
																				]}
																			>
																				<View
																					style={[
																						styles.profileContentDescriptionCard,
																						{
																							marginTop:
																								BetweenObjectsMargin *
																								(ProfileImageSize /
																									2 /
																									BetweenObjectsMargin) *
																								1.5,
																							padding:
																								GeneralPadding /
																								2
																						}
																					]}
																				>
																					<TextInput
																						titleText={
																							'Kiracı İsmi'
																						}
																						titleView={true}
																						value={
																							this.state
																								.fullName
																						}
																						onChangeText={(
																							val
																						) =>
																							this.setState(
																								{
																									fullName: val
																								}
																							)}
																						style={{
																							flex: 1
																						}}
																						editable={
																							this.state
																								.profileEditMode
																						}
																					/>
																					<TextInput
																						titleText={
																							'Tc NO '
																						}
																						titleView={true}
																						value={
																							this.state
																								.tcIdentity
																						}
																						onChangeText={(
																							val
																						) =>
																							this.setState(
																								{
																									tcIdentity: val
																								}
																							)}
																						style={{
																							flex: 1
																						}}
																						editable={
																							this.state
																								.profileEditMode
																						}
																						inputMaskType={
																							'tc'
																						}
																					/>
																					<TextInput
																						titleText={
																							'Kiracı Telefon Numarası'
																						}
																						titleView={true}
																						value={
																							this.state
																								.phoneNumber1
																						}
																						onChangeText={(
																							val
																						) =>
																							this.setState(
																								{
																									phoneNumber1: val
																								}
																							)}
																						isPhoneNumber={
																							true
																						}
																						style={{
																							flex: 1
																						}}
																						editable={
																							this.state
																								.profileEditMode
																						}
																						inputMaskType={
																							'phoneNumber'
																						}
																					/>
																					<TextInput
																						titleText={
																							'Kiracı Telefon Numarası 2'
																						}
																						titleView={true}
																						value={
																							this.state
																								.phoneNumber2
																						}
																						onChangeText={(
																							val
																						) =>
																							this.setState(
																								{
																									phoneNumber2: val
																								}
																							)}
																						style={{
																							flex: 1
																						}}
																						editable={
																							this.state
																								.profileEditMode
																						}
																						isPhoneNumber={
																							true
																						}
																						inputMaskType={
																							'phoneNumber'
																						}
																					/>
																					<TextInput
																						titleText={
																							'Kiracı Adresi'
																						}
																						titleView={true}
																						value={
																							this.state
																								.tenantAdress
																						}
																						onChangeText={(
																							val
																						) =>
																							this.setState(
																								{
																									tenantAdress: val
																								}
																							)}
																						style={{
																							flex: 1
																						}}
																						editable={
																							this.state
																								.profileEditMode
																						}
																					/>
																					<TextInput
																						titleText={
																							'Kefil Adı'
																						}
																						titleView={true}
																						value={
																							this.state
																								.suretyFullName
																						}
																						onChangeText={(
																							val
																						) =>
																							this.setState(
																								{
																									suretyFullName: val
																								}
																							)}
																						style={{
																							flex: 1
																						}}
																						editable={
																							this.state
																								.profileEditMode
																						}
																					/>
																					<TextInput
																						titleText={
																							'Kefil TC No'
																						}
																						titleView={true}
																						value={
																							this.state
																								.suretyTcIdentity
																						}
																						onChangeText={(
																							val
																						) =>
																							this.setState(
																								{
																									suretyTcIdentity: val
																								}
																							)}
																						style={{
																							flex: 1
																						}}
																						editable={
																							this.state
																								.profileEditMode
																						}
																						inputMaskType={
																							'tc'
																						}
																					/>
																					<TextInput
																						titleText={
																							'Kefil Telefon'
																						}
																						titleView={true}
																						value={
																							this.state
																								.suretyPhoneNumber
																						}
																						onChangeText={(
																							val
																						) =>
																							this.setState(
																								{
																									suretyPhoneNumber: val
																								}
																							)}
																						style={{
																							flex: 1
																						}}
																						editable={
																							this.state
																								.profileEditMode
																						}
																						isPhoneNumber={
																							true
																						}
																						inputMaskType={
																							'phoneNumber'
																						}
																					/>
																					<TextInput
																						titleText={
																							'Kefil Adresi'
																						}
																						titleView={true}
																						value={
																							this.state
																								.suretyAdress
																						}
																						onChangeText={(
																							val
																						) =>
																							this.setState(
																								{
																									suretyAdress: val
																								}
																							)}
																						style={{
																							flex: 1
																						}}
																						editable={
																							this.state
																								.profileEditMode
																						}
																					/>
																				</View>
																			</DescriptionCard>

																			<DescriptionCard
																				style={[
																					Shadow,
																					styles.subDescriptionCard
																				]}
																			>
																				<View
																					style={{
																						flexDirection:
																							'row',
																						marginBottom: 3
																					}}
																				>
																					<Text
																						style={
																							styles.subTitleDescriptionText
																						}
																					>
																						Kayıt Tarihi :
																									</Text>
																					<Text
																						style={
																							styles.subContentDescriptionText
																						}
																					>
																						{
																							this.state
																								.registerDate
																						}
																					</Text>
																				</View>

																				<View
																					style={{
																						flexDirection:
																							'row',
																						marginBottom: 3
																					}}
																				>
																					<Text
																						style={
																							styles.subTitleDescriptionText
																						}
																					>
																						Aktif Dairesi :
																									</Text>
																					<TouchableOpacity
																						onPress={() =>
																							this.state
																								.activeApartment &&
																								this.state
																									.activeApartment
																									.length !==
																								0 &&
																								this.state
																									.activeApartment[0]
																									.id !==
																								''
																								? this.props.navigation.navigate(
																									'RealEstateInformation',
																									{
																										realEstateID: this
																											.state
																											.activeApartment[0]
																											.id
																									}
																								)
																								: null}
																					>
																						<Text
																							style={
																								(styles.subContentDescriptionText,
																								{
																									color: SuccessfulColor,
																									marginLeft: 5
																								})
																							}
																						>
																							{this.state
																								.activeApartment &&
																								this.state
																									.activeApartment
																									.length !==
																								0 &&
																								this.state
																									.activeApartment[0]
																									.title &&
																								this.state
																									.activeApartment[0]
																									.title !==
																								'' ? (
																									this
																										.state
																										.activeApartment[0]
																										.title
																								) : (
																									''
																								)}
																						</Text>
																					</TouchableOpacity>
																				</View>
																			</DescriptionCard>

																			{profileEditMode ? null : (
																				<TouchableHighlight
																					style={[
																						Shadow,
																						{
																							marginBottom: BetweenObjectsMargin,
																							backgroundColor:
																								'#CD0909'
																						}
																					]}
																					onPress={async () => {
																						Alert.alert(
																							'Kiracı Sil',
																							'Kiracı silinsin mi?',
																							[
																								{
																									text:
																										'Hayır',
																									onPress: () =>
																										console.log(
																											'Cancel Pressed'
																										),
																									style:
																										'cancel'
																								},
																								{
																									text:
																										'Evet',
																									onPress: async () => {
																										this.setState(
																											{
																												deleteTenantStatus: false
																											}
																										);
																										await deleteTenantData(
																											{
																												variables: {
																													tenantID: this
																														.state
																														.tenantID
																												}
																											}
																										);
																									}
																								}
																							],
																							{
																								cancelable: true
																							}
																						);
																					}}
																				>
																					<Text
																						style={{
																							color:
																								'white'
																						}}
																					>
																						Kiracıyı Sil
																									</Text>
																				</TouchableHighlight>
																			)}
																		</View>
																	</ScrollView>
																</View>
															);
														} else {
															return (
																<Undefined
																	iconName={'exclamation-triangle'}
																	text={
																		'Üzgünüz bir hata ile karşılaşıldı lütfen daha sonra tekrar deneyin!'
																	}
																	type={'error'}
																/>
															);
														}
													}
												}}
											</Query>
										);
									}
								}}
							</Mutation>
						);
					}
				}}
			</Mutation >
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: GeneralPadding,
		flex: 1,
		flexDirection: 'column'
	},
	profileContainer: {
		flex: 1,
		flexDirection: 'column',
		marginBottom: BetweenObjectsMargin
	},
	headerContainer: {
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		position: 'absolute',
		zIndex: 2
	},
	headerControler: {
		width: '100%',
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
		alignItems: 'baseline',
		position: 'relative',
		padding: 2
	},
	profileContentDescriptionCard: {
		marginBottom: BetweenObjectsMargin
	},
	profileConentTextDescriptionCard: {
		fontFamily: 'Exo2.0-Medium',
		color: '#272727',
		fontSize: Normalize(22),
		textAlign: 'center',
		borderBottomWidth: 1,
		marginBottom: 2
	},
	subDescriptionCard: {
		padding: GeneralPadding / 2,
		flexDirection: 'column',
		marginBottom: BetweenObjectsMargin
	},
	subTitleDescriptionText: {
		color: '#272727',
		fontFamily: 'Exo2.0-Bold'
	},
	subContentDescriptionText: {
		color: '#272727',
		fontFamily: 'Exo2.0-Medium'
	},
	editContainer: {
		marginBottom: BetweenObjectsMargin,
		padding: GeneralPadding / 2
	}
});
export default TentantInformation;
