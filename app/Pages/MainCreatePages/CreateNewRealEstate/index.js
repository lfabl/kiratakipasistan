import React, { Component } from "react";
import {
    View,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    BackHandler
} from "react-native";

import Toast from "react-native-simple-toast";

//Apolo
import { Mutation } from "react-apollo";
import { newRealEstate } from "../../../Server/graphql/Mutation/newRealEstate";

//NCore theme
import {
    GeneralPadding,
    Shadow,
    BetweenObjectsMargin
} from "../../../NCore";

//NCore Components
import DescriptionCard from "../../../NCore/Components/DescriptionCard";
import Text from "../../../NCore/Components/Text";
import Normalize from "../../../NCore/Components/Normalize";
import MultipleChoice from "../../../NCore/Components/MultipleChoice";
import TextInput from "../../../NCore/Components/TextInput";
import ComboBox from "../../../NCore/Components/ComboBox";
import ComponentsDemonstrator from "../../../NCore/Components/ComponentsDemonstrator";
import TouchableHighlight from "../../../NCore/Components/TouchableHighlight";
import DatePicker from "../../../NCore/Components/DatePicker";

//NCore Tools
import { typeValidMessageConverter } from "../../../NCore/Tools/typeValidMessageConverter";

//Types
import {
    realEstateTypes,
    usageTypes,
    rentalTypes,
    numberOfRoomTypes,
    paymentPeriodTypes
} from "../../../NCore/Tools/realEstateTypes";

class CreateNewRealEstate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveStatus: false,
            realEstateType: "store",
            usageType: "null",
            fixtureDatas: [],
            title: "",
            adress: "",
            rentalType: false,
            electricity: "",
            water: "",
            naturalGas: "",
            TCIPNo: "",
            ownerNameSurname: "",
            ownerManagerPhoneNumber: "",
            ownerTcIdentity: "",
            ownerIban: "",
            detailDues: "",
            detailManagerPhoneNumber: "",
            detailAdditionalInformation: "",
            numberOfRoom: "",
            purposeOfUsage: "",
            detailRent: "",
            paymentPeriodType: "monthly",
            paymentPeriodDate: new Date(),
            deposit: ""
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            pageName: "Yeni Emlak Oluştur",
            goBackFunction: () => this.props.navigation.navigate("RealEstatePortfolio")
        })
    }

    componentWillMount() {
        BackHandler.addEventListener("hardwareBackPress", async () => {
            await this.props.navigation.setParams({
                refetchPageName: ""
            })
            this.props.navigation.navigate("Home", {
                refetchPageName: "RealEstatePortfolio"
            })
            return false
        })
    }

    async toastMessage({ data }) {
        const message = await data.newRealEstate.message;
        const title = "Emlak";
        const errorMessage = await typeValidMessageConverter({ message, title });
        return Toast.show(errorMessage, Toast.LONG, [
            'UIAlertController',
        ]);
    }

    render() {
        const {
            editMode, realEstateType, usageType, title, adress, rentalType,
            electricity, water, naturalGas, TCIPNo, fixtureDatas,
            ownerNameSurname, ownerManagerPhoneNumber, ownerTcIdentity, ownerIban,
            detailDues, detailManagerPhoneNumber, detailAdditionalInformation, numberOfRoom, purposeOfUsage, detailRent, deposit
        } = this.state

        return <Mutation mutation={newRealEstate}>
            {
                (createNewRealEstate, { loading, error, data }) => {
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
                                console.warn(data.newRealEstate)
                                if (data.newRealEstate.code === 200) {
                                    Toast.show(data.newRealEstate.message, Toast.LONG, [
                                        'UIAlertController',
                                    ]);
                                    this.props.navigation.navigate("RealEstatePortfolio")
                                }
                                else {
                                    this.toastMessage({ data });
                                }
                                this.setState({
                                    saveStatus: true
                                })
                            }
                        }
                        return <View style={styles.container}>
                            <ScrollView
                                style={styles.scrollContainer}
                                contentContainerStyle={{ padding: 20 }}
                                showsVerticalScrollIndicator={false}
                            >
                                <DescriptionCard style={[Shadow, styles.descriptionContainers]}>
                                    <View style={{ flex: 1, alignItems: "center" }}>
                                        <Text style={styles.generalInformationTitle}>
                                            Genel Bilgiler
                                        </Text>
                                    </View>

                                    <MultipleChoice
                                        types={realEstateTypes}
                                        defaultSelectTypeKey={realEstateType}
                                        onSelectType={(type) => this.setState({ realEstateType: type })}
                                        style={Shadow, { padding: GeneralPadding / 4, marginBottom: BetweenObjectsMargin / 2 }}
                                    />
                                    {
                                        realEstateType === "other" ?
                                            < ComboBox
                                                types={usageTypes}
                                                defaultSelectTypeKey={usageType}
                                                onSelectType={(type) => this.setState({ usageType: type })}
                                                disabled={true}
                                                title={"Kullanım Türü"}
                                                style={{
                                                    marginBottom: BetweenObjectsMargin / 2
                                                }}
                                            /> : null
                                    }
                                    <TextInput
                                        titleText={"Başlık"}
                                        titleView={true}
                                        value={title}
                                        onChangeText={(val) => this.setState({ title: val })}
                                        style={{ flex: 1 }}

                                    />

                                    <TextInput
                                        titleText={"Adres"}
                                        titleView={true}
                                        value={adress}
                                        onChangeText={(val) => this.setState({ adress: val })}
                                        style={{ flex: 1 }}

                                    />
                                    {
                                        realEstateType !== "other" ?
                                            <ComponentsDemonstrator
                                                title={"Demirbas"}
                                                disabled={true}
                                                items={this.state.fixtureDatas}
                                                onDeleteItem={(indexnew) => {
                                                    const newFixtureDatas = [];
                                                    this.state.fixtureDatas.map((item, index) => {
                                                        index === indexnew ?
                                                            null
                                                            : newFixtureDatas.push(item)
                                                    })
                                                    this.setState({
                                                        fixtureDatas: newFixtureDatas
                                                    })
                                                }}
                                                onAddItem={(name) => {
                                                    let newFixtureDatas = this.state.fixtureDatas;
                                                    newFixtureDatas.push({ name: name.itemName, images: name.images })
                                                    this.setState({
                                                        fixtureDatas: newFixtureDatas
                                                    })

                                                }}

                                                onEditItem={(data) => {
                                                    const newFixtureDatas = [];
                                                    this.state.fixtureDatas.map((item, index) => {
                                                        index === data.index ?
                                                            newFixtureDatas.push({ name: data.itemName, images: data.images })
                                                            : newFixtureDatas.push(item)
                                                    })
                                                    this.setState({
                                                        fixtureDatas: newFixtureDatas
                                                    })
                                                    console.warn(this.state.fixtureDatas)
                                                }}
                                                style={{
                                                    marginBottom: BetweenObjectsMargin / 2
                                                }}
                                            /> : null
                                    }

                                </DescriptionCard>
                                {
                                    realEstateType !== "other" ?
                                        <DescriptionCard style={[Shadow, styles.descriptionContainers]}>
                                            <View style={{ flex: 1, alignItems: "center" }}>
                                                <Text style={styles.generalInformationTitle}>
                                                    Tesisat/Dask No
                                                </Text>
                                            </View>

                                            <TextInput
                                                titleText={"Elektrik"}
                                                titleView={true}
                                                value={electricity}
                                                onChangeText={(val) => this.setState({ electricity: val })}
                                                style={{ flex: 1 }}
                                                inputMaskType={"number"}
                                            />

                                            <TextInput
                                                titleText={"Su"}
                                                titleView={true}
                                                value={water}
                                                onChangeText={(val) => this.setState({ water: val })}
                                                style={{ flex: 1 }}
                                                inputMaskType={"number"}
                                            />

                                            <TextInput
                                                titleText={"Doğal Gaz"}
                                                titleView={true}
                                                value={naturalGas}
                                                onChangeText={(val) => this.setState({ naturalGas: val })}
                                                style={{ flex: 1 }}
                                                inputMaskType={"number"}
                                            />

                                            <TextInput
                                                titleText={"Dask No"}
                                                titleView={true}
                                                value={TCIPNo}
                                                onChangeText={(val) => this.setState({ TCIPNo: val })}
                                                style={{ flex: 1 }}
                                                inputMaskType={"number"}
                                            />
                                        </DescriptionCard> : null
                                }
                                <DescriptionCard style={[Shadow, styles.descriptionContainers]}>
                                    <View style={{ flex: 1, alignItems: "center" }}>
                                        <Text style={styles.generalInformationTitle}>
                                            Mal Sahibi Bilgileri
                                        </Text>
                                    </View>

                                    <TextInput
                                        titleText={"Ad Soyad"}
                                        titleView={true}
                                        value={ownerNameSurname}
                                        onChangeText={(val) => this.setState({ ownerNameSurname: val })}
                                        style={{ flex: 1 }}

                                    />

                                    <TextInput
                                        titleText={"Mal Sahibi Telefon No"}
                                        titleView={true}
                                        value={ownerManagerPhoneNumber}
                                        onChangeText={(val) => this.setState({ ownerManagerPhoneNumber: val })}
                                        style={{ flex: 1 }}
                                        isPhoneNumber={true}
                                        inputMaskType={"phoneNumber"}
                                    />

                                    <TextInput
                                        titleText={"T.C No"}
                                        titleView={true}
                                        value={ownerTcIdentity}
                                        onChangeText={(val) => this.setState({ ownerTcIdentity: val })}
                                        style={{ flex: 1 }}
                                        inputMaskType={"tc"}
                                    />


                                    <TextInput
                                        titleText={"İban"}
                                        titleView={true}
                                        value={ownerIban}
                                        onChangeText={(val) => { this.setState({ ownerIban: val }) }}
                                        style={{ flex: 1 }}
                                        inputMaskType={"iban"}

                                    />
                                </DescriptionCard>

                                <DescriptionCard style={[Shadow, styles.descriptionContainers]}>
                                    <View style={{ flex: 1, alignItems: "center" }}>
                                        <Text style={styles.generalInformationTitle}>
                                            Detaylar
                                        </Text>
                                    </View>
                                    {
                                        realEstateType !== "other" ?
                                            <TextInput
                                                titleText={"Aidat"}
                                                titleView={true}
                                                value={detailDues}
                                                onChangeText={(val) => this.setState({ detailDues: val })}
                                                style={{ flex: 1 }}
                                                editable={true}
                                                inputMaskType={"number"}
                                            /> :
                                            null
                                    }
                                    <TextInput
                                        titleText={"Depozito"}
                                        titleView={true}
                                        value={deposit}
                                        onChangeText={(val) => this.setState({ deposit: val })}
                                        style={{ flex: 1 }}
                                        editable={editMode}
                                        inputMaskType={"number"}
                                    />
                                    {
                                        realEstateType !== "other" ?
                                            <TextInput
                                                titleText={"Yönetici Telefon No"}
                                                titleView={true}
                                                value={detailManagerPhoneNumber}
                                                onChangeText={(val) => this.setState({ detailManagerPhoneNumber: val })}
                                                style={{ flex: 1 }}
                                                isPhoneNumber={true}
                                                inputMaskType={"phoneNumber"}

                                            /> : null
                                    }
                                    <TextInput
                                        titleText={realEstateType !== "other" ? "Ek Bilgiler" : "Açıklama"}
                                        titleView={true}
                                        value={detailAdditionalInformation}
                                        onChangeText={(val) => this.setState({ detailAdditionalInformation: val })}
                                        style={{ flex: 1 }}

                                        multiline={true}
                                    />

                                    {
                                        realEstateType === "apartment" ?
                                            <ComboBox
                                                types={numberOfRoomTypes}
                                                defaultSelectTypeKey={numberOfRoom}
                                                onSelectType={(type) => this.setState({ numberOfRoom: type })}
                                                title={"Oda sayısı"}
                                                disabled={true}
                                                style={{
                                                    marginBottom: BetweenObjectsMargin / 2
                                                }}
                                            /> : null
                                    }
                                    {
                                        realEstateType !== "other" ?
                                            <TextInput
                                                titleText={"Kullanım Amacı"}
                                                titleView={true}
                                                value={purposeOfUsage}
                                                onChangeText={(val) => this.setState({ purposeOfUsage: val })}
                                                style={{ flex: 1 }}

                                            /> : null
                                    }
                                    <TextInput
                                        titleText={"Kira Bedeli"}
                                        titleView={true}
                                        value={detailRent}
                                        onChangeText={(val) => this.setState({ detailRent: val })}
                                        style={{ flex: 1 }}
                                        editable={editMode}
                                        inputMaskType={"number"}
                                    />

                                    <MultipleChoice
                                        titleView={true}
                                        titleText={"Ödeme Periyodu"}
                                        types={paymentPeriodTypes}
                                        defaultSelectTypeKey={this.state.paymentPeriodType}
                                        onSelectType={(type) => this.setState({
                                            paymentPeriodType: type
                                        })}
                                        selectColor={"#303030"}
                                        unSelectColor={"white"}
                                        style={Shadow}
                                        disabled={editMode}
                                    />
                                    <DatePicker
                                        titleText={"Ödeme Periyodu Zamanı"}
                                        titleView={true}
                                        onChangeDateValue={(val) => this.setState({
                                            paymentPeriodDate: val
                                        })}
                                        value={this.state.paymentPeriodDate}
                                    />
                                </DescriptionCard>
                                <TouchableHighlight
                                    style={[Shadow, {
                                        marginBottom: BetweenObjectsMargin,
                                        backgroundColor: "#192430",
                                    }]}
                                    onPress={() => {
                                        this.setState({
                                            saveStatus: false
                                        })
                                        createNewRealEstate({
                                            variables: {
                                                type: realEstateType,
                                                usageType: usageType,
                                                fixtureDatas: fixtureDatas,
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
                                                    type: this.state.paymentPeriodType,
                                                    date: this.state.paymentPeriodDate
                                                },
                                                deposit: deposit
                                            }
                                        });
                                    }}
                                >
                                    <Text style={{
                                        color: "white"
                                    }}>Oluştur</Text>
                                </TouchableHighlight>
                            </ScrollView>
                        </View>
                    }
                }
            }
        </Mutation>
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
        flexDirection: "column",
        justifyContent: "center"
    },
    generalInformationTitle: {
        fontFamily: "Exo2.0-SemiBold",
        fontSize: Normalize(16),
        color: "#272727",
        marginBottom: BetweenObjectsMargin / 2
    }
});
export default CreateNewRealEstate;