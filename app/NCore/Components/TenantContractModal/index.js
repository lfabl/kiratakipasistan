import React, { useState, useEffect } from "react";
import {
    ActivityIndicator,
    View,
    ScrollView,
    LayoutAnimation,
    UIManager
} from "react-native";

//NCore Theme
import {
    Shadow,
} from "../../index";

import {
    paymentTypes,
    paymentPeriodTypes,
    contractPeriodTypes
} from "../../Tools/realEstateTypes";

//Graphql Apollo
import { Query } from "react-apollo";
import { contractControl } from "../../../Server/graphql/Queries/contractControl";
import { getAvailableTenantsForContract } from "../../../Server/graphql/Queries/getAvailableTenantsForContract";
import { getRealEstate } from "../../../Server/graphql/Queries/getRealEstate";

//NCore Components
import ChoiceModal from "../ChoiceModal";
import ComboBox from "../ComboBox";
import TextInput from "../TextInput";
import Undefined from "../Undefined";
import DatePicker from "../DatePicker";
import MultipleChoice from "../MultipleChoice";

const TenantContractModal = ({ contractModalVisible, onChangeContractModalVisible, contractModalTitle, contractModalID, newContract, contractControlStatus }) => {
    const [selectID, setselectID] = useState("");
    const [tenantTypes, setTenantTypes] = useState(0);
    const [rentalDate, setRentalDate] = useState(new Date());
    const [contractPeriod, setContractPeriod] = useState("0");
    const [rentalPrice, setRentalPrice] = useState(null);
    const [paymentType, setPaymentType] = useState("cash");
    const [paymentPeriodType, setPaymentPeriodType] = useState("monthly");
    const [paymentPeriodDate, setPaymentPeriodDate] = useState(new Date());
    const [availibleControl, setAvailibleControl] = useState(false);
    const TenantTypeConverter = (args) => {
        let converterTypes = [];
        for (let index = 0; index < args.length; index++) {
            const element = args[index];
            converterTypes.push({
                name: element.fullName,
                key: element.id
            })
            if (index === args.length - 1) {
                setTenantTypes(converterTypes)
            }
        }

    }

    return <ChoiceModal
        modalVisible={contractModalVisible}
        title={contractModalTitle}
        setModalVisible={(val) => onChangeContractModalVisible(val)}
        onSubmitPress={() => {
            onChangeContractModalVisible(false);
            if (availibleControl === true) {
                const newContractData = {
                    tenantID: selectID,
                    realEstateID: contractModalID,
                    rentalDate: rentalDate,
                    contractPeriod: contractPeriod,
                    rentalPrice: rentalPrice,
                    paymentType: paymentType,
                    paymentPeriod: {
                        type: paymentPeriodType,
                        date: paymentPeriodDate
                    },

                }
                newContract(newContractData)
            }
        }}
    >
        <Query
            query={contractControl}
            fetchPolicy="network-only"
            variables={{
                realEstateID: contractModalID
            }}
            onCompleted={(data) => {
                const status = data.contractControl.code !== 200 ? false : true
                contractControlStatus(status)
            }}
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
                        if (data.contractControl.code === 200) {
                            return <Query
                                query={getAvailableTenantsForContract}
                                fetchPolicy="network-only"
                                notifyOnNetworkStatusChange
                            >
                                {
                                    ({ loading, error, data, networkStatus }) => {
                                        if (loading || networkStatus === 4) {
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
                                            if (data.getAvailableTenantsForContract.response.code === 200) {
                                                if (data.getAvailableTenantsForContract.data.length !== 0) {
                                                    tenantTypes === 0 ? TenantTypeConverter(data.getAvailableTenantsForContract.data) : null
                                                    setAvailibleControl(true)
                                                    return <ScrollView style={{
                                                        padding: 10
                                                    }}>
                                                        <ComboBox
                                                            types={tenantTypes === 0 ? [] : tenantTypes}
                                                            defaultSelectTypeKey={selectID}
                                                            onSelectType={(type) => {
                                                                UIManager.setLayoutAnimationEnabledExperimental(true)
                                                                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                                                                setselectID(type)
                                                            }}
                                                            disabled={contractModalVisible}
                                                            title={"Kiraci Ata"}
                                                            style={{
                                                                marginBottom: 20
                                                            }}
                                                        />
                                                        {
                                                            selectID !== "" ? <View>
                                                                <Query
                                                                    query={getRealEstate}
                                                                    variables={{
                                                                        realEstateID: contractModalID
                                                                    }}
                                                                    fetchPolicy="network-only"
                                                                    onCompleted={(data) => {
                                                                        if (data.getRealEstate.response.code === 200) {
                                                                            setRentalPrice(data.getRealEstate.data.detailRent)
                                                                            setPaymentPeriodType(data.getRealEstate.data.paymentPeriod.type)
                                                                            setPaymentPeriodDate(new Date(data.getRealEstate.data.paymentPeriod.date))
                                                                        }
                                                                    }}
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
                                                                                if (data.getRealEstate.response.code === 200) {
                                                                                    return <View>
                                                                                        <DatePicker
                                                                                            titleText={"Kiralama Tarihi"}
                                                                                            titleView={true}
                                                                                            onChangeDateValue={(val) => setRentalDate(val)}
                                                                                            value={rentalDate}
                                                                                        />
                                                                                        <ComboBox
                                                                                            types={contractPeriodTypes}
                                                                                            defaultSelectTypeKey={contractPeriod}
                                                                                            onSelectType={(type) => {
                                                                                                setContractPeriod(type)
                                                                                            }}
                                                                                            disabled={contractModalVisible}
                                                                                            title={"Sözleşme Süresi"}
                                                                                            style={{
                                                                                                marginBottom: 20
                                                                                            }}
                                                                                        />
                                                                                        <TextInput
                                                                                            titleText={"Kiralama Fiyatı"}
                                                                                            titleView={true}
                                                                                            placeholder={"0"}
                                                                                            value={rentalPrice}
                                                                                            onChangeText={(val) => setRentalPrice(val)}

                                                                                        />
                                                                                        <ComboBox
                                                                                            types={paymentTypes}
                                                                                            defaultSelectTypeKey={paymentType}
                                                                                            onSelectType={(type) => setPaymentType(type)}
                                                                                            disabled={contractModalVisible}
                                                                                            title={"Ödeme Türü"}
                                                                                            style={{
                                                                                                marginBottom: 20
                                                                                            }}
                                                                                        />
                                                                                        <MultipleChoice
                                                                                            titleView={true}
                                                                                            titleText={"Ödeme Periyodu"}
                                                                                            types={paymentPeriodTypes}
                                                                                            defaultSelectTypeKey={paymentPeriodType}
                                                                                            onSelectType={(type) => setPaymentPeriodType(type)}
                                                                                            selectColor={"#30D5C8"}
                                                                                            unSelectColor={"#F9F9F9"}
                                                                                            style={Shadow}
                                                                                        />
                                                                                        <DatePicker
                                                                                            titleText={"Ödeme Periyodu Zamanı"}
                                                                                            titleView={true}
                                                                                            onChangeDateValue={(val) => setPaymentPeriodDate(val)}
                                                                                            value={paymentPeriodDate}
                                                                                        />
                                                                                    </View>
                                                                                }
                                                                                else {
                                                                                    return <View style={{
                                                                                        marginTop: 40,
                                                                                        marginBottom: 40
                                                                                    }}>
                                                                                        <Undefined
                                                                                            iconName={"file-contract"}
                                                                                            text={data.getRealEstate.response.message}
                                                                                            type={"message"}
                                                                                        />
                                                                                    </View>
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                </Query>
                                                            </View> : null
                                                        }
                                                    </ScrollView>
                                                }
                                                else {
                                                    return <View style={{
                                                        marginTop: 40,
                                                        marginBottom: 40
                                                    }}>
                                                        <Undefined
                                                            iconName={"users"}
                                                            text={"Boşta bir kiracı bulunamadı"}
                                                            type={"message"}
                                                        />
                                                    </View>
                                                }
                                            }
                                            else {
                                                return <View style={{
                                                    marginTop: 40,
                                                    marginBottom: 40
                                                }}>
                                                    <Undefined
                                                        iconName={"file-contract"}
                                                        text={data.getAvailableTenantsForContract.response.message}
                                                        type={"message"}
                                                    />
                                                </View>
                                            }
                                        }
                                    }
                                }
                            </Query>
                        }
                        else {
                            return <View style={{
                                marginTop: 40,
                                marginBottom: 40
                            }}>
                                <Undefined
                                    iconName={"file-contract"}
                                    text={data.contractControl.message}
                                    type={"message"}
                                />
                            </View>
                        }
                    }
                }
            }
        </Query>
    </ChoiceModal>
}

export default TenantContractModal;