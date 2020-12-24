import React, { Component } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    ScrollView,
    ActivityIndicator,
    BackHandler
} from "react-native";

import Toast from "react-native-simple-toast";

//Graphql Apollo
import { Query, Mutation } from "react-apollo";
import { getAllTenants } from "../../../Server/graphql/Queries/getAllTenants";
import { newContract } from "../../../Server/graphql/Mutation/newContract";
import { deleteContract } from "../../../Server/graphql/Mutation/deleteContract";

//Font Awesome Icons
import Icon from 'react-native-vector-icons/FontAwesome5';

//NCore Components
import Text from "../../../NCore/Components/Text";
import TouchableHighlight from "../../../NCore/Components/TouchableHighlight";
import TentantCard from "../../../NCore/Components/TenantCard";
import Undefined from "../../../NCore/Components/Undefined";
import RealEstateContractModal from "../../../NCore/Components/RealEstateContractModal";
import SearchBar from "../../../NCore/Components/SearchBar";
import ChoiceModal from "../../../NCore/Components/ChoiceModal";

//NCore Theme
import {
    GeneralPadding,
    Shadow
} from "../../../NCore";

import { typeValidMessageConverter } from "../../../NCore/Tools/typeValidMessageConverter";

class TenantPortfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            contractModalVisible: false,
            contractModalTitle: "",
            contractModalID: "",
            contractModalTenants: [],
            contractModalContent: false,
            selectRealEstateID: "",
            rentalDate: null,
            rentalPrice: null,
            paymentType: "cash",
            paymentPeriod: "monthly",
            saveStatus: false,
            contractControlStatus: false,
            deleteContractModalVisible: false,
            deleteContractModalID: "",
            deleteContractStatus: false,
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate("Home", {
                backPopUpVisible: false
            })
            BackHandler.removeEventListener('hardwareBackPress');
        });
        this.props.navigation.setParams({ pageName: "Kiracı Portfoyüm" });

    }
    async toastMessage({ data }) {
        const message = await data.newContract.message;
        const title = "Sözleşme";
        const errorMessage = await typeValidMessageConverter({ message, title });
        return Toast.show(errorMessage, Toast.LONG, [
            'UIAlertController',
        ]);
    }

    mapTentantsCard(datas) {
        let renderData = datas;
        if (this.state.search !== "") {
            renderData = datas.filter((data) => {
                let activeApartment = data.activeApartment.length !== 0 ? data.activeApartment[0].title.toLowerCase() : "";
                let phoneNumber1 = data.phoneNumber1.toLowerCase();
                let suretyFullName = data.suretyFullName.toLowerCase();
                let suretyPhoneNumber = data.suretyPhoneNumber.toLowerCase();
                return data.fullName.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || phoneNumber1.indexOf(this.state.search.toLowerCase()) > -1 || suretyFullName.indexOf(this.state.search.toLowerCase()) > -1 || suretyPhoneNumber.indexOf(this.state.search.toLowerCase()) > -1 || activeApartment.indexOf(this.state.search.toLowerCase()) > -1
            });
        }
        return renderData !== [] ? <FlatList
            data={renderData}
            renderItem={({ item }) => {
                return <TentantCard
                    profileImageUrl={item.profileImageName}
                    name={item.fullName}
                    phoneNumber={item.phoneNumber1}
                    activeApartment={item.activeApartment.length !== 0 ? item.activeApartment[0].title : ""}
                    surety={item.suretyFullName}
                    suretyPhoneNumber={item.suretyPhoneNumber}
                    style={Shadow}
                    onPress={() => {
                        this.props.navigation.navigate("TentantInformation", {
                            tenantID: item.id
                        });
                    }}
                    onLongPress={() => { }}
                    onContractPress={(val) => {
                        if (val === false) {
                            this.setState({
                                contractModalVisible: true,
                                contractModalTitle: item.fullName,
                                contractModalID: item.id
                            })
                        }
                        else {
                            this.setState({
                                deleteContractModalVisible: true,
                                deleteContractModalID: item.id
                            })
                        }
                    }}
                    key={item.id}
                />
            }}
            keyExtractor={item => item.id}
        /> : null
    }
    render() {
        return <Mutation mutation={newContract}>
            {
                (newContractData, { loading, error, data }) => {
                    if (loading) {
                        return (
                            <ActivityIndicator size="large" style={{ flex: 1 }} color={"#1A2430"} />
                        )
                    }
                    else if (error) {
                        return (
                            <View>
                                {
                                    alert("Bir hata oluştu" + error)
                                }
                            </View>
                        )
                    }
                    else {
                        if (data) {
                            if (this.state.saveStatus === false) {
                                if (data.newContract.code === 200) {
                                    Toast.show(data.newContract.message, Toast.LONG, [
                                        'UIAlertController',
                                    ]);
                                    this.props.navigation.navigate("ManualRefetch", {
                                        refetchPageName: "TenantPortfolio"
                                    })
                                }
                                else {
                                    this.toastMessage({ data });
                                }
                                this.setState({
                                    saveStatus: true
                                })
                            }
                        }
                        return <Mutation mutation={deleteContract}>
                            {
                                (deleteContract, { loading, error, data }) => {
                                    if (loading) {
                                        return (
                                            <View
                                                style={{
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <ActivityIndicator size="large" style={{ flex: 1 }} color={"#1A2430"} />
                                            </View>
                                        )
                                    }
                                    else if (error) {
                                        return (
                                            <View>
                                                {
                                                    alert("Bir hata oluştu" + error)
                                                }
                                            </View>
                                        )
                                    }
                                    else {
                                        if (data) {
                                            if (this.state.saveStatus === false) {
                                                if (data.deleteContract.code === 200) {
                                                    Toast.show(data.deleteContract.message, Toast.LONG, [
                                                        'UIAlertController',
                                                    ]);
                                                    this.props.navigation.navigate("ManualRefetch", {
                                                        refetchPageName: "TenantPortfolio"
                                                    })
                                                }
                                                else {
                                                    Toast.show(data.deleteContract.message, Toast.LONG, [
                                                        'UIAlertController',
                                                    ]);
                                                }
                                                this.setState({
                                                    saveStatus: true
                                                })
                                            }
                                        }
                                        return <Query
                                            query={getAllTenants}
                                            fetchPolicy="cache-and-network"
                                        >
                                            {
                                                ({ loading, error, data }) => {

                                                    if (loading) {
                                                        return (
                                                            <ActivityIndicator size="large" style={{ flex: 1 }} color={"#1A2430"} />
                                                        )
                                                    }
                                                    else if (error) {
                                                        return (
                                                            <Undefined
                                                                text={"Bir hata ile karşılaşıldı : " + error}
                                                                type={"error"}
                                                            />
                                                        )
                                                    }
                                                    else {
                                                        if (data.getAllTenants.response.code === 200) {
                                                            return <View style={styles.container}>
                                                                {
                                                                    this.state.contractModalVisible === true ? <RealEstateContractModal
                                                                        contractModalVisible={this.state.contractModalVisible}
                                                                        onChangeContractModalVisible={(val) => {
                                                                            this.setState({
                                                                                contractModalVisible: val
                                                                            })
                                                                        }}
                                                                        contractModalTitle={this.state.contractModalTitle}
                                                                        contractModalID={this.state.contractModalID}
                                                                        contractControlStatus={(status) => {
                                                                            this.setState({
                                                                                contractControlStatus: status
                                                                            })
                                                                        }}
                                                                        newContract={async (datas) => {
                                                                            const { tenantID, realEstateID, rentalDate, contractPeriod, rentalPrice, paymentType, paymentPeriod } = datas
                                                                            this.setState({
                                                                                saveStatus: false
                                                                            })
                                                                            this.state.contractControlStatus === true ?
                                                                                tenantID && tenantID !== "" &&
                                                                                    realEstateID && realEstateID !== "" &&
                                                                                    rentalDate && rentalDate !== "" &&
                                                                                    contractPeriod && contractPeriod !== "" &&
                                                                                    rentalPrice && rentalPrice !== "" &&
                                                                                    paymentType && paymentType !== "" &&
                                                                                    paymentPeriod.type && paymentPeriod.type !== "" &&
                                                                                    paymentPeriod.date && paymentPeriod.date !== "" ? await newContractData({ variables: datas }) :
                                                                                    Toast.show("Lütfen sözleşme verilerini tam giriniz.", Toast.LONG, [
                                                                                        'UIAlertController',
                                                                                    ])
                                                                                : null
                                                                        }}
                                                                    /> : null
                                                                }
                                                                <ChoiceModal
                                                                    modalVisible={this.state.deleteContractModalVisible}
                                                                    title={"Sözleşme İptali"}
                                                                    setModalVisible={(val) => {
                                                                        this.setState({
                                                                            deleteContractModalVisible: val
                                                                        })
                                                                    }}
                                                                    onSubmitPress={() => {
                                                                        this.setState({
                                                                            deleteContractModalVisible: false
                                                                        });
                                                                        deleteContract({
                                                                            variables: {
                                                                                tenantID: this.state.deleteContractModalID,
                                                                                realEstateID: ""
                                                                            }
                                                                        })
                                                                    }}
                                                                >
                                                                    <Text style={{
                                                                        textAlign: "center"
                                                                    }}>
                                                                        Bu işlem aktif sözleşmeyi iptal edecetir.
                                                                        Onaylıyormusunuz ?
                                                                    </Text>
                                                                </ChoiceModal>
                                                                <SearchBar
                                                                    placeholder={"Ara"}
                                                                    style={{
                                                                        width: "100%"
                                                                    }}
                                                                    value={this.state.search}
                                                                    onChangeText={(val) => this.setState({ search: val })}
                                                                />

                                                                <TouchableHighlight onPress={() => this.props.navigation.navigate("CreateNewTenant")}>
                                                                    <View style={styles.newTenantContainer}>
                                                                        <Icon
                                                                            name={"user-plus"}
                                                                            color={"white"}
                                                                            size={20}
                                                                        >
                                                                        </Icon>
                                                                        <Text style={styles.newTenantText}>
                                                                            Yeni Kiracı Oluştur
                                                                        </Text>
                                                                    </View>
                                                                </TouchableHighlight>
                                                                {
                                                                    data.getAllTenants.data !== [] && data.getAllTenants.data.length !== 0 ?
                                                                        <ScrollView
                                                                            style={styles.components}
                                                                            showsVerticalScrollIndicator={false}
                                                                        >
                                                                            {
                                                                                this.mapTentantsCard(data.getAllTenants.data)
                                                                            }
                                                                        </ScrollView> : <Undefined
                                                                            iconName={"users"}
                                                                            text={"Henüz bir kiracı oluşturulmamıştır. Lütfen kiracı oluşturmak Yeni Kiracı Oluştur'a tıklayınız"}
                                                                            type={"message"}
                                                                        />

                                                                }
                                                            </View>
                                                        }
                                                        else {
                                                            return (
                                                                <Undefined
                                                                    text={"Bir sorun ile karşılaşıldı " + data.getAllTenants.response.message}
                                                                    type={"error"}
                                                                />
                                                            )
                                                        }
                                                    }
                                                }
                                            }
                                        </Query>
                                    }
                                }
                            }
                        </Mutation>
                    }
                }
            }
        </Mutation>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
        paddingTop: GeneralPadding,
        paddingHorizontal: GeneralPadding,
        marginTop: 20
    },
    newTenantContainer: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center"
    },
    newTenantText: {
        fontFamily: "Exo2.0-Bold",
        color: "white",
        marginLeft: 10
    },
    components: {
        marginTop: 20,
        flex: 1,
    }
});

export default TenantPortfolio;