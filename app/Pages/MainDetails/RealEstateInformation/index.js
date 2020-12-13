import React, { Component } from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	ActivityIndicator,
	LayoutAnimation,
	UIManager,
	BackHandler,
	Alert,
	TouchableOpacity
} from 'react-native';

import Toast from 'react-native-simple-toast';

//Font Awsome Icon
import Icon from 'react-native-vector-icons/FontAwesome5';

//NCore theme
import { GeneralPadding, Shadow, BetweenObjectsMargin } from '../../../NCore';

//Graphql Apollo
import { Query } from 'react-apollo';
import { Mutation } from 'react-apollo';
import { updateRealEstate } from '../../../Server/graphql/Mutation/updateRealEstate';
import { deleteRealEstate } from '../../../Server/graphql/Mutation/deleteRealEstate';
import { getRealEstate } from '../../../Server/graphql/Queries/getRealEstate';

//NCore Components
import DescriptionCard from '../../../NCore/Components/DescriptionCard';
import Text from '../../../NCore/Components/Text';
import Normalize from '../../../NCore/Components/Normalize';
import MultipleChoice from '../../../NCore/Components/MultipleChoice';
import TextInput from '../../../NCore/Components/TextInput';
import ComboBox from '../../../NCore/Components/ComboBox';
import ComponentsDemonstrator from '../../../NCore/Components/ComponentsDemonstrator';
import DatePicker from '../../../NCore/Components/DatePicker';
import TouchableHighlight from '../../../NCore/Components/TouchableHighlight';
import TenantContractModal from '../../../NCore/Components/TenantContractModal';

//NCore Tools
import { typeValidMessageConverter } from '../../../NCore/Tools/typeValidMessageConverter';

//Types
import {
	realEstateTypes,
	usageTypes,
	rentalTypes,
	numberOfRoomTypes,
	paymentPeriodTypes
} from '../../../NCore/Tools/realEstateTypes';

class RealEstateInformation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editMode: false,
			saveStatus: false,
			deleteRealEstateStatus: false,
			realEstateID: this.props.navigation.getParam('realEstateID'),
			realEstateType: 'store',
			usageType: 'null',
			fixtureDatas: [],
			title: '',
			adress: '',
			rentalType: 'unattached',
			electricity: '',
			water: '',
			naturalGas: '',
			TCIPNo: '',
			ownerNameSurname: '',
			ownerManagerPhoneNumber: '',
			ownerTcIdentity: '',
			ownerIban: '',
			detailDues: '0',
			detailManagerPhoneNumber: '',
			detailAdditionalInformation: '',
			numberOfRoom: '0+0',
			purposeOfUsage: '',
			detailRent: '0',
			paymentPeriodType: 'monthly',
			paymentPeriodDate: null,
			deposit: '0'
		};
	}

	changeEditMode() {
		const { editMode } = this.state;
		UIManager.setLayoutAnimationEnabledExperimental(true);
		LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
		this.props.navigation.setParams(
			editMode ? { pageName: 'Emlak Bilgileri' } : { pageName: 'Emlak Bilgilerini Düzenle' }
		);
		this.setState({
			editMode: !editMode
		});
	}

	componentDidMount() {
		this.props.navigation.setParams({
			pageName: 'Emlak Bilgileri',
			goBackFunction: () => this.props.navigation.navigate('RealEstatePortfolio')
		});
	}

	UNSAFE_componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', async () => {
			await this.props.navigation.setParams({
				refetchPageName: ''
			});
			this.props.navigation.navigate('Home', {
				refetchPageName: 'RealEstatePortfolio'
			});
			return false;
		});
	}

	async toastMessage({ data }) {
		const message = await data.updateRealEstate.message;
		const title = 'Emlak';
		const errorMessage = await typeValidMessageConverter({ message, title });
		return Toast.show(errorMessage, Toast.LONG, [ 'UIAlertController' ]);
	}
	async fixtureDataConvert(args) {
		return await new Promise(async (resolve, reject) => {
			if (args.length !== 0) {
				const newFixtureDatas = [];
				for (let index = 0; index < args.length; index++) {
					const element = args[index];
					if (element.images.length !== 0) {
						const newFixtureDatasImages = [];
						for (let index = 0; index < element.images.length; index++) {
							const fixTureDatas = element.images[index];
							const newDatas = {};
							newDatas.image = fixTureDatas.image;
							if (typeof fixTureDatas['newImage'] !== 'undefined') {
								newDatas.newImage = fixTureDatas.newImage;
							}
							newFixtureDatasImages.push(newDatas);
							if (element.images.length - 1 === index) {
								newFixtureDatas.push({
									name: element.name,
									images: newFixtureDatasImages
								});
							}
						}
					} else {
						newFixtureDatas.push({
							name: element.name,
							images: []
						});
					}
					if (args.length - 1 === index) {
						resolve(newFixtureDatas);
					}
				}
			} else {
				resolve([]);
			}
		});
	}
	render() {
		const {
			editMode,
			realEstateID,
			realEstateType,
			usageType,
			title,
			adress,
			rentalType,
			electricity,
			water,
			naturalGas,
			TCIPNo,
			fixtureDatas,
			ownerNameSurname,
			ownerManagerPhoneNumber,
			ownerTcIdentity,
			ownerIban,
			detailDues,
			detailManagerPhoneNumber,
			detailAdditionalInformation,
			numberOfRoom,
			purposeOfUsage,
			detailRent,
			deposit
		} = this.state;
		return (
			<Mutation mutation={deleteRealEstate} refetchQueries={[ `getAvailableRealEstatesForContract` ]}>
				{(deleteRealEstateData, { loading, error, data }) => {
					if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} color={'#1A2430'} />;
					else if (error) return <View>{alert('Bir hata oluştu' + error)}</View>;
					else {
						if (data) {
							if (this.state.deleteRealEstateStatus === false) {
								if (data.deleteRealEstate.code === 200) {
									Toast.show(data.deleteRealEstate.message, Toast.LONG, [ 'UIAlertController' ]);
									this.props.navigation.navigate('RealEstatePortfolio');
								} else {
									Toast.show(data.deleteRealEstate.message, Toast.LONG, [ 'UIAlertController' ]);
								}
								this.setState({
									deleteRealEstateStatus: true
								});
							}
						}
						return (
							<Mutation mutation={updateRealEstate}>
								{(updateRealEstateData, { loading, error, data }) => {
									if (loading)
										return <ActivityIndicator size="large" style={{ flex: 1 }} color={'#1A2430'} />;
									else if (error) return <View>{alert('Bir hata oluştu' + error)}</View>;
									else {
										if (data) {
											if (this.state.saveStatus === false) {
												if (data.updateRealEstate.code === 200) {
													Toast.show(data.updateRealEstate.message, Toast.LONG, [
														'UIAlertController'
													]);
													this.changeEditMode();
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
												query={getRealEstate}
												fetchPolicy="cache-and-network"
												variables={{
													realEstateID: realEstateID
												}}
												onCompleted={async (data) => {
													if (data.getRealEstate.response.code === 200) {
														const getRealEstate = data.getRealEstate.data;
														this.setState({
															realEstateType: getRealEstate.type,
															usageType: getRealEstate.usageType,
															fixtureDatas: getRealEstate.fixtureDatas,
															title: getRealEstate.title,
															adress: getRealEstate.adress,
															rentalType:
																getRealEstate.rentalType.length !== 0 &&
																getRealEstate.rentalType[0].status &&
																getRealEstate.rentalType[0].status === 'continuation'
																	? getRealEstate.rentalType[0].status
																	: 'unattached',
															electricity: getRealEstate.electricity,
															water: getRealEstate.water,
															naturalGas: getRealEstate.naturalGas,
															TCIPNo: getRealEstate.TCIPNo,
															ownerNameSurname: getRealEstate.ownerNameSurname,
															ownerManagerPhoneNumber:
																getRealEstate.ownerManagerPhoneNumber,
															ownerTcIdentity: getRealEstate.ownerTcIdentity,
															ownerIban: getRealEstate.ownerIban,
															detailDues: getRealEstate.detailDues,
															detailManagerPhoneNumber:
																getRealEstate.detailManagerPhoneNumber,
															detailAdditionalInformation:
																getRealEstate.detailAdditionalInformation,
															numberOfRoom: getRealEstate.numberOfRoom,
															purposeOfUsage: getRealEstate.purposeOfUsage,
															detailRent: getRealEstate.detailRent,
															paymentPeriodType: getRealEstate.paymentPeriod.type,
															paymentPeriodDate: new Date(
																getRealEstate.paymentPeriod.date
															),
															deposit:
																getRealEstate.deposit !== null
																	? getRealEstate.deposit
																	: '0'
														});
													}
												}}
											>
												{({ loading, error, data }) => {
													if (loading)
														return (
															<ActivityIndicator
																size="large"
																style={{ flex: 1 }}
																color={'#1A2430'}
															/>
														);
													else if (error)
														return <View>{alert('Bir hata oluştu' + error)}</View>;
													else {
														if (data.getRealEstate.response.code === 200) {
															return (
																<View style={styles.container}>
																	<TenantContractModal
																		contractModalVisible={
																			this.state.contractModalVisible
																		}
																		onChangeContractModalVisible={(val) => {
																			this.setState({
																				contractModalVisible: val
																			});
																		}}
																		contractModalTitle={
																			this.state.contractModalTitle
																		}
																		contractModalID={this.state.contractModalID}
																		contractControlStatus={(status) => {
																			this.setState({
																				contractControlStatus: status
																			});
																		}}
																		newContract={async (datas) => {
																			const {
																				tenantID,
																				realEstateID,
																				rentalPeriod,
																				rentalPrice,
																				paymentType,
																				paymentPeriod
																			} = datas;
																			this.setState({
																				saveStatus: false
																			});
																			this.state.contractControlStatus === true
																				? tenantID &&
																					tenantID !== '' &&
																					realEstateID &&
																					realEstateID !== '' &&
																					rentalPeriod &&
																					rentalPeriod !== '' &&
																					rentalPrice &&
																					rentalPrice !== '' &&
																					paymentType &&
																					paymentType !== '' &&
																					paymentPeriod.type &&
																					paymentPeriod.type !== '' &&
																					paymentPeriod.date &&
																					paymentPeriod.date !== ''
																					? await newContractData({
																							variables: datas
																						})
																					: Toast.show(
																							'Lütfen sözleşme verilerini tam giriniz.',
																							Toast.LONG,
																							[ 'UIAlertController' ]
																						)
																				: null;
																		}}
																	/>

																	<ScrollView
																		style={styles.scrollContainer}
																		contentContainerStyle={{ padding: 20 }}
																		showsVerticalScrollIndicator={false}
																	>
																		<DescriptionCard
																			style={[
																				Shadow,
																				styles.descriptionContainers
																			]}
																		>
																			<View
																				style={{
																					flex: 1,
																					flexDirection: 'row',
																					alignItems: 'center',
																					justifyContent: 'space-between'
																				}}
																			>
																				<View
																					style={{
																						width: Normalize(40),
																						height: Normalize(40)
																					}}
																				>
																					{!editMode ? null : (
																						<TouchableOpacity
																							style={{
																								padding: Normalize(10)
																							}}
																							onPress={async () => {
																								this.setState({
																									saveStatus: false
																								});
																								const newFixtureData = await this.fixtureDataConvert(
																									this.state
																										.fixtureDatas
																								);
																								await updateRealEstateData(
																									{
																										variables: {
																											realEstateID: this
																												.state
																												.realEstateID,
																											type: realEstateType,
																											usageType: usageType,
																											fixtureDatas: newFixtureData,
																											title: title,
																											adress: adress,
																											rentalType: rentalType,
																											electricity: electricity,
																											water: water,
																											naturalGas: naturalGas,
																											TCIPNo: TCIPNo,
																											ownerNameSurname: ownerNameSurname,
																											ownerManagerPhoneNumber: ownerManagerPhoneNumber,
																											ownerTcIdentity: ownerTcIdentity,
																											ownerIban: ownerIban,
																											detailDues: detailDues,
																											detailManagerPhoneNumber: detailManagerPhoneNumber,
																											detailAdditionalInformation: detailAdditionalInformation,
																											numberOfRoom: numberOfRoom,
																											purposeOfUsage: purposeOfUsage,
																											detailRent: detailRent,
																											paymentPeriod: {
																												type: this
																													.state
																													.paymentPeriodType,
																												date: this
																													.state
																													.paymentPeriodDate
																											},
																											deposit: deposit
																										}
																									}
																								);
																							}}
																						>
																							<Icon
																								name={'save'}
																								color={'#272727'}
																								size={Normalize(20)}
																								style={{
																									alignSelf:
																										'flex-start'
																								}}
																							/>
																						</TouchableOpacity>
																					)}
																				</View>
																				<Text
																					style={
																						styles.generalInformationTitle
																					}
																				>
																					Genel Bilgiler
																				</Text>
																				<TouchableOpacity
																					onPress={() =>
																						this.changeEditMode()}
																					style={{
																						padding: Normalize(10)
																					}}
																				>
																					<Icon
																						name={
																							editMode ? (
																								'times-circle'
																							) : (
																								'edit'
																							)
																						}
																						color={'#272727'}
																						size={Normalize(20)}
																						style={{
																							alignSelf: 'flex-start'
																						}}
																					/>
																				</TouchableOpacity>
																			</View>

																			<MultipleChoice
																				types={realEstateTypes}
																				defaultSelectTypeKey={realEstateType}
																				selectColor={'#303030'}
																				unSelectColor={'white'}
																				onSelectType={(type) => {
																					this.setState({
																						realEstateType: type
																					});
																				}}
																				disabled={!editMode}
																				style={
																					(Shadow,
																					{
																						padding: GeneralPadding / 4,
																						marginBottom:
																							BetweenObjectsMargin / 2
																					})
																				}
																			/>
																			{realEstateType === 'other' ? (
																				<ComboBox
																					types={usageTypes}
																					defaultSelectTypeKey={usageType}
																					onSelectType={(type) =>
																						this.setState({
																							usageType: type
																						})}
																					disabled={editMode}
																					title={'Kullanım Türü'}
																					style={{
																						marginBottom:
																							BetweenObjectsMargin / 2
																					}}
																				/>
																			) : null}
																			<TextInput
																				titleText={'Başlık'}
																				titleView={true}
																				value={title}
																				onChangeText={(val) =>
																					this.setState({ title: val })}
																				style={{ flex: 1 }}
																				editable={editMode}
																			/>

																			<TextInput
																				titleText={'Adres'}
																				titleView={true}
																				value={adress}
																				onChangeText={(val) =>
																					this.setState({ adress: val })}
																				style={{ flex: 1 }}
																				editable={editMode}
																			/>
																			{realEstateType !== 'other' ? (
																				<ComponentsDemonstrator
																					title={'Demirbas'}
																					disabled={editMode}
																					items={this.state.fixtureDatas}
																					onDeleteItem={(indexnew) => {
																						const newFixtureDatas = [];
																						this.state.fixtureDatas.map(
																							(item, index) => {
																								index === indexnew
																									? null
																									: newFixtureDatas.push(
																											item
																										);
																							}
																						);
																						this.setState({
																							fixtureDatas: newFixtureDatas
																						});
																					}}
																					onAddItem={(name) => {
																						let newFixtureDatas = this.state
																							.fixtureDatas;
																						newFixtureDatas.push({
																							name: name.itemName,
																							images: name.images
																						});
																						this.setState({
																							fixtureDatas: newFixtureDatas
																						});
																					}}
																					onEditItem={(data) => {
																						const newFixtureDatas = [];
																						this.state.fixtureDatas.map(
																							(item, index) => {
																								index === data.index
																									? newFixtureDatas.push(
																											{
																												name:
																													data.itemName,
																												images:
																													data.images
																											}
																										)
																									: newFixtureDatas.push(
																											item
																										);
																							}
																						);
																						this.setState({
																							fixtureDatas: newFixtureDatas
																						});
																					}}
																					style={{
																						marginBottom:
																							BetweenObjectsMargin / 2
																					}}
																				/>
																			) : null}

																			<ComboBox
																				types={rentalTypes}
																				defaultSelectTypeKey={rentalType}
																				onSelectType={(type) =>
																					this.setState({ rentalType: type })}
																				disabled={
																					rentalType === 'unattached' ? (
																						false
																					) : (
																						editMode
																					)
																				}
																				title={'Kira Durumu'}
																				style={{
																					marginBottom:
																						BetweenObjectsMargin / 2
																				}}
																			/>
																		</DescriptionCard>
																		{realEstateType !== 'other' ? (
																			<DescriptionCard
																				style={[
																					Shadow,
																					styles.descriptionContainers
																				]}
																			>
																				<View
																					style={{
																						flex: 1,
																						alignItems: 'center'
																					}}
																				>
																					<Text
																						style={
																							styles.generalInformationTitle
																						}
																					>
																						Tesisat/Dask No
																					</Text>
																				</View>

																				<TextInput
																					titleText={'Elektrik'}
																					titleView={true}
																					value={electricity}
																					onChangeText={(val) =>
																						this.setState({
																							electricity: val
																						})}
																					style={{ flex: 1 }}
																					editable={editMode}
																					inputMaskType={'number'}
																				/>

																				<TextInput
																					titleText={'Su'}
																					titleView={true}
																					value={water}
																					onChangeText={(val) =>
																						this.setState({ water: val })}
																					style={{ flex: 1 }}
																					editable={editMode}
																					inputMaskType={'number'}
																				/>

																				<TextInput
																					titleText={'Doğal Gaz'}
																					titleView={true}
																					value={naturalGas}
																					onChangeText={(val) =>
																						this.setState({
																							naturalGas: val
																						})}
																					style={{ flex: 1 }}
																					editable={editMode}
																					inputMaskType={'number'}
																				/>

																				<TextInput
																					titleText={'Dask No'}
																					titleView={true}
																					value={TCIPNo}
																					onChangeText={(val) =>
																						this.setState({ TCIPNo: val })}
																					style={{ flex: 1 }}
																					editable={editMode}
																					inputMaskType={'number'}
																				/>
																			</DescriptionCard>
																		) : null}
																		<DescriptionCard
																			style={[
																				Shadow,
																				styles.descriptionContainers
																			]}
																		>
																			<View
																				style={{
																					flex: 1,
																					alignItems: 'center'
																				}}
																			>
																				<Text
																					style={
																						styles.generalInformationTitle
																					}
																				>
																					Mal Sahibi Bilgileri
																				</Text>
																			</View>

																			<TextInput
																				titleText={'Ad Soyad'}
																				titleView={true}
																				value={ownerNameSurname}
																				onChangeText={(val) =>
																					this.setState({
																						ownerNameSurname: val
																					})}
																				style={{ flex: 1 }}
																				editable={editMode}
																			/>

																			<TextInput
																				titleText={'Mal Sahibi Telefon No'}
																				titleView={true}
																				value={ownerManagerPhoneNumber}
																				onChangeText={(val) =>
																					this.setState({
																						ownerManagerPhoneNumber: val
																					})}
																				style={{ flex: 1 }}
																				isPhoneNumber={true}
																				editable={editMode}
																				inputMaskType={'phoneNumber'}
																			/>

																			<TextInput
																				titleText={'T.C No'}
																				titleView={true}
																				value={ownerTcIdentity}
																				onChangeText={(val) =>
																					this.setState({
																						ownerTcIdentity: val
																					})}
																				style={{ flex: 1 }}
																				editable={editMode}
																				inputMaskType={'tc'}
																			/>

																			<TextInput
																				titleText={'İban'}
																				titleView={true}
																				value={ownerIban}
																				onChangeText={(val) =>
																					this.setState({ ownerIban: val })}
																				style={{ flex: 1 }}
																				editable={editMode}
																				inputMaskType={'iban'}
																			/>
																		</DescriptionCard>

																		<DescriptionCard
																			style={[
																				Shadow,
																				styles.descriptionContainers
																			]}
																		>
																			<View
																				style={{
																					flex: 1,
																					alignItems: 'center'
																				}}
																			>
																				<Text
																					style={
																						styles.generalInformationTitle
																					}
																				>
																					Detaylar
																				</Text>
																			</View>
																			{realEstateType !== 'other' ? (
																				<TextInput
																					titleText={'Aidat'}
																					titleView={true}
																					value={
																						editMode === true ? (
																							detailDues
																						) : (
																							detailDues + ' ₺'
																						)
																					}
																					onChangeText={(val) =>
																						this.setState({
																							detailDues: val
																						})}
																					style={{ flex: 1 }}
																					editable={editMode}
																					inputMaskType={'number'}
																				/>
																			) : null}

																			<TextInput
																				titleText={'Depozito'}
																				titleView={true}
																				value={
																					editMode === true ? (
																						deposit
																					) : (
																						deposit + ' ₺'
																					)
																				}
																				onChangeText={(val) =>
																					this.setState({ deposit: val })}
																				style={{ flex: 1 }}
																				editable={editMode}
																				inputMaskType={'number'}
																			/>

																			{realEstateType !== 'other' ? (
																				<TextInput
																					titleText={'Yönetici Telefon No'}
																					titleView={true}
																					value={detailManagerPhoneNumber}
																					onChangeText={(val) =>
																						this.setState({
																							detailManagerPhoneNumber: val
																						})}
																					style={{ flex: 1 }}
																					isPhoneNumber={true}
																					editable={editMode}
																					inputMaskType={'phoneNumber'}
																				/>
																			) : null}
																			<TextInput
																				titleText={
																					realEstateType !== 'other' ? (
																						'Ek Bilgiler'
																					) : (
																						'Açıklama'
																					)
																				}
																				titleView={true}
																				value={detailAdditionalInformation}
																				onChangeText={(val) =>
																					this.setState({
																						detailAdditionalInformation: val
																					})}
																				style={{ flex: 1 }}
																				editable={editMode}
																				multiline={true}
																			/>

																			{realEstateType === 'apartment' ? (
																				<ComboBox
																					types={numberOfRoomTypes}
																					defaultSelectTypeKey={numberOfRoom}
																					onSelectType={(type) =>
																						this.setState({
																							numberOfRoom: type
																						})}
																					disabled={editMode}
																					title={'Oda sayısı'}
																					style={{
																						marginBottom:
																							BetweenObjectsMargin / 2
																					}}
																				/>
																			) : null}
																			{realEstateType !== 'other' ? (
																				<TextInput
																					titleText={'Kullanım Amacı'}
																					titleView={true}
																					value={purposeOfUsage}
																					onChangeText={(val) =>
																						this.setState({
																							purposeOfUsage: val
																						})}
																					style={{ flex: 1 }}
																					editable={editMode}
																				/>
																			) : null}

																			<TextInput
																				titleText={'Kira Bedeli'}
																				titleView={true}
																				value={
																					editMode ? (
																						detailRent
																					) : (
																						detailRent + ' ₺'
																					)
																				}
																				onChangeText={(val) =>
																					this.setState({ detailRent: val })}
																				style={{ flex: 1 }}
																				editable={editMode}
																				inputMaskType={'number'}
																			/>

																			<MultipleChoice
																				titleView={true}
																				titleText={'Ödeme Periyodu'}
																				types={paymentPeriodTypes}
																				defaultSelectTypeKey={
																					this.state.paymentPeriodType
																				}
																				onSelectType={(type) =>
																					this.setState({
																						paymentPeriodType: type
																					})}
																				selectColor={'#303030'}
																				unSelectColor={'white'}
																				style={Shadow}
																				disabled={!editMode}
																			/>
																			<DatePicker
																				titleText={'Ödeme Periyodu Zamanı'}
																				titleView={true}
																				value={this.state.paymentPeriodDate}
																				onChangeDateValue={(val) =>
																					this.setState({
																						paymentPeriodDate: val
																					})}
																				disabled={!editMode}
																			/>
																		</DescriptionCard>
																		{editMode ? null : (
																			<TouchableHighlight
																				style={[
																					Shadow,
																					{
																						marginBottom: BetweenObjectsMargin,
																						backgroundColor: 'white',
																						borderWidth: 2,
																						borderColor: '#192430'
																					}
																				]}
																				onPress={() => {
																					this.props.navigation.navigate(
																						'RealestateNotificationSettings',
																						{
																							"realestateID": realEstateID
																						}
																					);
																				}}
																			>
																				<Text
																					style={{
																						color: '#192430'
																					}}
																				>
																					Emlak Bildirimlerini Düzenle
																				</Text>
																			</TouchableHighlight>
																		)}
																		{editMode ? null : (
																			<TouchableHighlight
																				style={[
																					Shadow,
																					{
																						marginBottom: BetweenObjectsMargin,
																						backgroundColor: '#CD0909'
																					}
																				]}
																				onPress={async () => {
																					Alert.alert(
																						'Emlağı Sil',
																						'Emlak silinsin mi?',
																						[
																							{
																								text: 'Hayır',
																								onPress: () =>
																									console.log(
																										'Cancel Pressed'
																									),
																								style: 'cancel'
																							},
																							{
																								text: 'Evet',
																								onPress: async () => {
																									this.setState({
																										deleteRealEstateStatus: false
																									});
																									await deleteRealEstateData(
																										{
																											variables: {
																												realEstateID: this
																													.state
																													.realEstateID
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
																						color: 'white'
																					}}
																				>
																					Emlağı Sil
																				</Text>
																			</TouchableHighlight>
																		)}
																	</ScrollView>
																</View>
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
			</Mutation>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: GeneralPadding / 2
	},
	scrollContainer: {
		flex: 1
	},
	descriptionContainers: {
		padding: GeneralPadding / 2,
		marginBottom: BetweenObjectsMargin / 2,
		flexDirection: 'column',
		justifyContent: 'center'
	},
	generalInformationTitle: {
		fontFamily: 'Exo2.0-SemiBold',
		fontSize: Normalize(16),
		color: '#272727',
		margin: 3,
		marginBottom: BetweenObjectsMargin / 2
	}
});
export default RealEstateInformation;
