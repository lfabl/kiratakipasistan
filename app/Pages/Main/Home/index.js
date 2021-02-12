import React, {
	Component
} from 'react';
import {
	ActivityIndicator,
	TouchableOpacity,
	ImageBackground,
	BackHandler,
	StyleSheet,
	ScrollView,
	Image,
	Alert,
	View,
	Text
} from 'react-native';
import {
	Query
} from 'react-apollo';
import {
	home
} from '../../../Server/graphql/Queries/home';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OneSignal from "react-native-onesignal";
import { withNavigationFocus } from 'react-navigation';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageIsFocused: "did"
		};

	}

	handleBackButton = () => {
		if (this.state.pageIsFocused === "did") {
			Alert.alert(
				'Uygulamadan Çık',
				'Uygulamadan çıkılsın mı?',
				[
					{
						text: 'İptal Et',
						onPress: () => console.log('Cancel Pressed'),
						style: 'cancel'
					},
					{
						text: 'Tamam',
						onPress: () => BackHandler.exitApp()
					}
				],
				{
					cancelable: true
				}
			);
			return true;
		}
		else {

		}
	}

	async componentDidMount() {
		OneSignal.addEventListener("opened", (openedEvent) => {
			const { action, notification } = openedEvent;

			if (notification.payload && notification.payload.additionalData && notification.payload.additionalData) {
				const data = notification.payload.additionalData;
				if (data.pageName) {
					if (data.pageName === "RealEstateInformation") {
						this.props.navigation.navigate(data.pageName, {
							realEstateID: data.pageID
						});
					}

				}
			}
		});

		BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
		this.props.navigation.setParams({
			pageName: 'Ana Sayfa'
		});

		const refetchPageName = this.props.navigation.getParam('refetchPageName');
		if (typeof refetchPageName !== 'undefined' && refetchPageName !== '') {
			this.setState({
				pageIsFocused: "blur"
			}, () => {
				console.log("burada 2")
				this.props.navigation.navigate(refetchPageName);
			})
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.isFocused !== this.props.isFocused && nextProps.isFocused) {
			this.setState({
				pageIsFocused: "focus"
			}, () => {
				setTimeout(() => {
					if (this.state.pageIsFocused === "focus") {
						this.setState({
							pageIsFocused: "did"
						}, () => {
							BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
						})
					}

				}, 300);
			})
		}
		else if (nextProps.isFocused !== this.props.isFocused && !nextProps.isFocused) {
			this.setState({
				pageIsFocused: "blur"
			}, () => {
				BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
			})
		}
	}


	render() {
		const {
			navigation
		} = this.props;
		return <ScrollView>
			<Query
				query={home}
				fetchPolicy="cache-and-network"
			>
				{({
					loading,
					error,
					data
				}) => {
					const originalData = data && data.home ? data.home : {
						approaching: [],
						pastEstateData: []
					};
					if (loading) {
						return <ActivityIndicator size="large" style={{ flex: 1 }} color={'#1A2430'} />;
					} else if (error) {
						return <View>{alert('Bir hata oluştu ' + error)}</View>;
					} else {
						console.log("orginialData", originalData)
						return <View
							style={{
								flex: 1,
								paddingHorizontal: 20,
							}}
						>
							<Text style={{ textAlign: "center", marginBottom: 10 }}>Hoş geldiniz.</Text>
							{
								originalData.approaching.length ?
									<TouchableOpacity
										onPress={() => {
											navigation.navigate("Approachs", {
												approachs: originalData.approaching
											})
										}}
										style={[
											styles.privateButton,
											{
												backgroundColor: "#DB8352",
												marginBottom: 10,
												alignItems: "center",
												borderRadius: 14,
												paddingTop: 16,
												paddingBottom: 16,
												paddingLeft: 14,
												paddingRight: 14
											}
										]}
									>
										<Text
											style={styles.privateButtonTitle}
										>
											Bitmeye Yaklaşan Sözleşmeler
										</Text>
										<Text
											style={styles.privateButtonCount}
										>
											{originalData.approaching.length > 99 ? "99+" : originalData.approaching.length}
										</Text>
										<Icon
											name="chevron-right"
											size={18}
											color="white"
											style={{
												marginHorizontal: 4
											}}
										/>
									</TouchableOpacity>
									:
									null
							}
							{
								originalData.pastEstateData.length ?
									<TouchableOpacity
										onPress={() => {
											navigation.navigate("PastEstates", {
												pastEstateData: originalData.pastEstateData
											});
										}}
										style={[
											styles.privateButton,
											{
												backgroundColor: "#DB5252",
												alignItems: "center",
												borderRadius: 14,
												paddingTop: 16,
												paddingBottom: 16,
												paddingLeft: 14,
												paddingRight: 14
											}
										]}
									>
										<Text
											style={styles.privateButtonTitle}
										>
											Gecikmiş Sözleşmeler
										</Text>
										<Text
											style={styles.privateButtonCount}
										>
											{originalData.pastEstateData.length > 99 ? "99+" : originalData.pastEstateData.length}
										</Text>
										<Icon
											name="chevron-right"
											size={18}
											color="white"
											style={{
												marginHorizontal: 4
											}}
										/>
									</TouchableOpacity>
									:
									null
							}
							<View
								style={{
									flexDirection: "column",
									marginTop: 20,
									borderRadius: 12,
									elevation: 10,
									marginLeft: 8,
									marginRight: 8,

								}}
							>
								<TouchableOpacity
									onPress={() => this.props.navigation.navigate("RealEstatePortfolio")}
								>
									<View
										style={{
											flexDirection: "row",
											backgroundColor: "aliceblue",
											borderTopLeftRadius: 12,
											borderTopRightRadius: 12
										}}
									>
										<ImageBackground
											source={require("../../../Assets/Images/bg.png")}
											imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
											resizeMode="cover"
											style={{
												flex: 1,
												padding: 10,
												paddingTop: 18,
												paddingBottom: 18
											}}
										>
											<View
												style={{
													paddingRight: 14,
													flexDirection: "row",
													borderRadius: 12,
													justifyContent: "space-between"
												}}
											>
												<Icon
													name="office-building"
													size={55}
													color="#ffffff"
													style={{
														marginRight: 5
													}}
												/>
												<Text
													style={{
														fontSize: 44,
														fontWeight: "400",
														color: "#ffffff"
													}}
												>
													{originalData.totalEstatesCount}
												</Text>
											</View>
											<View
												style={{
													flexDirection: "column",
													paddingLeft: 10
												}}
											>
												<Text
													style={{
														color: "white",
														fontSize: 20
													}}
												>
													Pasif: <Text style={{ color: "#FF4545", fontSize: 22, fontWeight: "700" }}>{originalData.totalPassiveEstateCount}</Text>
												</Text>
												<Text
													style={{
														color: "white",
														fontSize: 20
													}}
												>
													Aktif: <Text style={{ color: "#24F220", fontSize: 22, fontWeight: "700" }}>{originalData.totalActiveEstateCount}</Text>
												</Text>
											</View>
										</ImageBackground>
									</View>
									<View
										style={{
											borderBottomLeftRadius: 12,
											borderBottomRightRadius: 12,
											backgroundColor: "white",
											paddingLeft: 20,
											paddingRight: 20,
											paddingTop: 10,
											paddingBottom: 10
										}}
									>
										<Text
											style={{
												fontSize: 18,
												fontWeight: "600",
												color: "#212121"
											}}
										>
											Dairelerim
									</Text>
									</View>
								</TouchableOpacity>
							</View>
							<TouchableOpacity
								onPress={() => this.props.navigation.navigate("TenantPortfolio")}
							>
								<View
									style={{
										flexDirection: "column",
										backgroundColor: "aliceblue",
										marginTop: 20,
										marginBottom: 20,
										borderRadius: 12,
										marginLeft: 8,
										marginRight: 8,
										elevation: 10
									}}
									onPress={() => this.props.navigation.navigate("Profile")}
								>
									<ImageBackground
										source={require("../../../Assets/Images/bg.png")}
										imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
										resizeMode="cover"
										style={{
											flex: 1,
											padding: 10,
											paddingLeft: 14
										}}
									>
										<View
											style={{
												paddingRight: 14,
												flexDirection: "row",
												borderRadius: 12,
												justifyContent: "space-between"
											}}
										>
											<Icon
												name="account-supervisor"
												size={55}
												color="#ffffff"
												style={{
													marginRight: 5
												}}
											/>
											<Text
												style={{
													fontSize: 44,
													fontWeight: "400",
													color: "#ffffff"
												}}
											>
												{originalData.totalTenantCount}
											</Text>
										</View>
									</ImageBackground>
									<View
										style={{
											borderBottomLeftRadius: 12,
											borderBottomRightRadius: 12,
											backgroundColor: "white",
											paddingLeft: 20,
											paddingRight: 20,
											paddingTop: 10,
											paddingBottom: 10
										}}
									>
										<Text
											style={{
												fontSize: 18,
												fontWeight: "600",
												color: "#212121"
											}}
										>
											Kiracılarım - <Text style={{ color: "#088E05" }}>Aktif</Text>
										</Text>
									</View>
								</View>
							</TouchableOpacity>
						</View>
					}
				}}
			</Query>
		</ScrollView>
	}
}
const styles = StyleSheet.create({
	privateButton: {
		flexDirection: "row",
		padding: 10,
		borderRadius: 8
	},
	privateButtonTitle: {
		flex: 1,
		color: "white",
		fontWeight: "600",
		fontSize: 16
	},
	privateButtonCount: {
		marginHorizontal: 5,
		fontWeight: "bold",
		color: "white",
		fontSize: 18
	}
});
export default withNavigationFocus(Home);