import React, { Component } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    FlatList,
    ActivityIndicator
} from "react-native";

import Toast from "react-native-simple-toast";

//Graphql Apollo
import { Query, Mutation } from "react-apollo";
import { getAllRealEstates } from "../../../Server/graphql/Queries/getAllRealEstates";
import { newContract } from "../../../Server/graphql/Mutation/newContract";
import { deleteContract } from "../../../Server/graphql/Mutation/deleteContract";

//FontAwesome Icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//NCore Components
import Text from "../../../NCore/Components/Text";
import TouchableHighlight from "../../../NCore/Components/TouchableHighlight";
import RealEstateCard from "../../../NCore/Components/RealEstateCard";
import TenantContractModal from "../../../NCore/Components/TenantContractModal";
import Undefined from "../../../NCore/Components/Undefined";
import SearchBar from "../../../NCore/Components/SearchBar";
import ChoiceModal from "../../../NCore/Components/ChoiceModal";

//NCore Theme
import {
    GeneralPadding,
    Shadow
} from "../../../NCore";

//NCore Tools
import { typeValidMessageConverter } from "../../../NCore/Tools/typeValidMessageConverter";
import { paymentPeriodConverter } from "../../../NCore/Tools/paymentPeriodConverter";


class RealEstateProtfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            realEstateDatas: [],
            contractModalVisible: false,
            contractModalTitle: "",
            contractModalID: "",
            contractModalTenants: [],
            contractModalContent: false,
            selectTenantID: "",
            rentalDate: null,
            rentalPrice: null,
            paymentType: "cash",
            paymentPeriod: "monthly",
            saveStatus: false,
            contractControlStatus: false,
            deleteContractModalVisible: false,
            deleteContractModalID: "",
            deleteContractStatus: false,
            refetch: false
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ pageName: "Emlak Portfoyüm" });
    }

    async toastMessage({ data }) {
        const message = await data.newContract.message;
        const title = "Sözleşme";
        const errorMessage = await typeValidMessageConverter({ message, title });
        return Toast.show(errorMessage, Toast.LONG, [
            'UIAlertController',
        ]);
    }

    mapRealEstateCard(datas) {
        let renderData = datas
        if (this.state.search !== "") {
            renderData = datas.filter((data) => {
                let acitveTenant = data.activeTenant.length !== 0 ? data.activeTenant[0].fullName.toLowerCase() : "";
                let ownerNameSurname = data.ownerNameSurname.toLowerCase();
                let ownerManagerPhoneNumber = data.ownerManagerPhoneNumber.toLowerCase();
                return data.title.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 || acitveTenant.indexOf(this.state.search.toLowerCase()) > -1 || ownerNameSurname.indexOf(this.state.search.toLowerCase()) > -1 || ownerManagerPhoneNumber.indexOf(this.state.search.toLowerCase()) > -1
            });
        }

        return renderData !== [] ? <FlatList
            data={renderData}
            renderItem={({ item }) => {
                const paymentPeriodConverted = paymentPeriodConverter(item.paymentPeriod);
                console.warn(item);
                return <RealEstateCard
                    name={item.title}
                    status={item.rentalType.length !== 0 && item.rentalType[0].status === "continuation" ? true : false}
                    type={item.type}
                    rentalDate={"Her " + paymentPeriodConverted.type + " " + paymentPeriodConverted.date}
                    phoneNumber={item.ownerManagerPhoneNumber}
                    owner={item.ownerNameSurname}
                    tenant={item.activeTenant && item.activeTenant.length !== 0 ? item.activeTenant[0].fullName : ""}
                    detailRent={item.detailRent}
                    style={Shadow}
                    onPress={() => this.props.navigation.navigate("RealEstateInformation", {
                        realEstateID: item.id
                    })}
                    onLongPress={() => { }}
                    onContractPress={(val) => {
                        if (val === false) {
                            this.setState({
                                contractModalVisible: true,
                                contractModalTitle: item.title,
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
        /> : null;
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
                                        refetchPageName: "RealEstatePortfolio"
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
                                                if (data.deleteContract.code === 200) {
                                                    Toast.show(data.deleteContract.message, Toast.LONG, [
                                                        'UIAlertController',
                                                    ]);
                                                    this.props.navigation.navigate("ManualRefetch", {
                                                        refetchPageName: "RealEstatePortfolio"
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
                                            query={getAllRealEstates}
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
                                                        if (data.getAllRealEstates.response.code === 200) {
                                                            return <View style={styles.container}>
                                                                <TenantContractModal
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
                                                                />
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
                                                                                tenantID: "",
                                                                                realEstateID: this.state.deleteContractModalID
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
                                                                    value={this.state.search}
                                                                    style={{
                                                                        width: "100%",
                                                                    }}
                                                                    onChangeText={(val) => this.setState({ search: val })}
                                                                />
                                                                <TouchableHighlight onPress={() => this.props.navigation.navigate("CreateNewRealEstate")}>
                                                                    <View style={styles.newTenantContainer}>
                                                                        <Icon
                                                                            name={"home-plus"}
                                                                            color={"white"}
                                                                            size={20}
                                                                        >
                                                                        </Icon>
                                                                        <Text style={styles.newTenantText}>
                                                                            Yeni Emlak Oluştur
                                                                        </Text>
                                                                    </View>
                                                                </TouchableHighlight>

                                                                {
                                                                    data.getAllRealEstates.data !== [] && data.getAllRealEstates.data.length !== 0 ?
                                                                        <ScrollView
                                                                            style={styles.components}
                                                                            showsVerticalScrollIndicator={false}
                                                                        >
                                                                            {
                                                                                this.mapRealEstateCard(data.getAllRealEstates.data)
                                                                            }
                                                                        </ScrollView> : <Undefined
                                                                            iconName={"home"}
                                                                            text={"Henüz bir emlak oluşturulmamıştır. Lütfen yeni emlak oluşturmak için, Yeni Emlak Oluştur'a tıklayınız"}
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

export default RealEstateProtfolio;