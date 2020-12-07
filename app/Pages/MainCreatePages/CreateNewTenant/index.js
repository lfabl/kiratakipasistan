import React, { Component } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    BackHandler
} from "react-native";
import Toast from 'react-native-simple-toast';

//NCore Theme
import {
    Shadow,
    GeneralPadding,
    BetweenObjectsMargin,
} from "../../../NCore";

//NCore Components
import DescriptionCard from "../../../NCore/Components/DescriptionCard";
import Text from "../../../NCore/Components/Text";
import Normalize from "../../../NCore/Components/Normalize";
import ProfileImage from "../../../NCore/Components/ProfileImage";
import TextInput from "../../../NCore/Components/TextInput";
import TouchableHighlight from "../../../NCore/Components/TouchableHighlight";
//NCore Tools
import { typeValidMessageConverter } from "../../../NCore/Tools/typeValidMessageConverter";

//Graphql Apollo
import { Mutation } from "react-apollo";
import { newTenant } from "../../../Server/graphql/Mutation/newTenant";

class CreateNewTenant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            tcIdentity: "",
            phoneNumber1: "",
            phoneNumber2: "",
            tenantAdress: "",
            suretyFullName: "",
            suretyTcIdentity: "",
            suretyPhoneNumber: "",
            suretyAdress: "",
            registerDate: "",
            profileImageName: "",
            saveStatus: false
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            pageName: "Yeni Kiracı Oluştur",
            goBackFunction: () => this.props.navigation.navigate("TenantPortfolio")
        })
    }
    componentWillMount() {
        BackHandler.addEventListener("hardwareBackPress", async () => {
            await this.props.navigation.setParams({
                refetchPageName: ""
            })
            this.props.navigation.navigate("Home", {
                refetchPageName: "TenantPortfolio"
            })
            return false
        })
    }
    async toastMessage({ data }) {
        const message = await data.newTenant.message;
        const title = "Kiracı";
        const errorMessage = await typeValidMessageConverter({ message, title });
        return Toast.show(errorMessage, Toast.LONG, [
            'UIAlertController',
        ]);
    }
    render() {
        const ProfileImageSize = 100;
        return <Mutation mutation={newTenant}>
            {
                (createNewTenant, { loading, error, data }) => {
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
                        if (data) {
                            if (this.state.saveStatus === false) {
                                if (data.newTenant.code === 200) {

                                    Toast.show(data.newTenant.message, Toast.LONG, [
                                        'UIAlertController',
                                    ]);
                                    this.props.navigation.navigate("TenantPortfolio")
                                }
                                else {
                                    this.toastMessage({ data });
                                }
                                this.setState({
                                    saveStatus: true
                                })
                            }
                        }
                        return <View style={{ flex: 1 }}>
                            <ScrollView
                                style={styles.container}
                                showsVerticalScrollIndicator={false}
                            >
                                <View style={[Shadow, styles.profileContainer]}>

                                    <View style={[Shadow, styles.headerContainer]}>
                                        <ProfileImage
                                            src={this.state.profileImageUrl}
                                            style={Shadow, { flex: 1, }}
                                            size={ProfileImageSize}
                                            editOnPress={() => alert("bastılar")}
                                        />
                                    </View>

                                    <DescriptionCard style={[Shadow, { marginTop: ProfileImageSize / 2, marginBottom: BetweenObjectsMargin }]}>

                                        <View style={[styles.profileContentDescriptionCard, {
                                            marginTop: (BetweenObjectsMargin * ((ProfileImageSize / 2) / BetweenObjectsMargin)) * 1.5,
                                            padding: GeneralPadding / 2
                                        }]}>
                                            <TextInput
                                                titleText={"Kiracı İsmi"}
                                                titleView={true}
                                                value={this.state.fullName}
                                                onChangeText={(val) => this.setState({ fullName: val })}
                                                style={{ flex: 1 }}

                                            />
                                            <TextInput
                                                titleText={"Tc NO "}
                                                titleView={true}
                                                value={this.state.tcIdentity}
                                                onChangeText={(val) => this.setState({ tcIdentity: val })}
                                                style={{ flex: 1 }}
                                                inputMaskType={"tc"}
                                            />
                                            <TextInput
                                                titleText={"Kiracı Telefon Numarası"}
                                                titleView={true}
                                                value={this.state.phoneNumber1}
                                                onChangeText={(val) => this.setState({ phoneNumber1: val })}
                                                isPhoneNumber={true}
                                                style={{ flex: 1 }}
                                                inputMaskType={"phoneNumber"}
                                            />
                                            <TextInput
                                                titleText={"Kiracı Telefon Numarası 2"}
                                                titleView={true}
                                                value={this.state.phoneNumber2}
                                                onChangeText={(val) => this.setState({ phoneNumber2: val })}
                                                style={{ flex: 1 }}
                                                isPhoneNumber={true}
                                                inputMaskType={"phoneNumber"}
                                            />
                                            <TextInput
                                                titleText={"Kiracı Adresi"}
                                                titleView={true}
                                                value={this.state.tenantAdress}
                                                onChangeText={(val) => this.setState({ tenantAdress: val })}
                                                style={{ flex: 1 }}
                                            />
                                            <TextInput
                                                titleText={"Kefil Adı"}
                                                titleView={true}
                                                value={this.state.suretyFullName}
                                                onChangeText={(val) => this.setState({ suretyFullName: val })}
                                                style={{ flex: 1 }}

                                            />
                                            <TextInput
                                                titleText={"Kefil Tc NO"}
                                                titleView={true}
                                                value={this.state.suretyTcIdentity}
                                                onChangeText={(val) => this.setState({ suretyTcIdentity: val })}
                                                style={{ flex: 1 }}
                                                inputMaskType={"tc"}
                                            />
                                            <TextInput
                                                titleText={"Kefil Telefon"}
                                                titleView={true}
                                                value={this.state.suretyPhoneNumber}
                                                onChangeText={(val) => this.setState({ suretyPhoneNumber: val })}
                                                style={{ flex: 1 }}
                                                isPhoneNumber={true}
                                                inputMaskType={"phoneNumber"}
                                            />
                                            <TextInput
                                                titleText={"Kefil Adresi"}
                                                titleView={true}
                                                value={this.state.suretyAdress}
                                                onChangeText={(val) => this.setState({ suretyAdress: val })}
                                                style={{ flex: 1 }}

                                            />
                                        </View>
                                    </DescriptionCard>
                                    <TouchableHighlight
                                        style={[Shadow, {
                                            marginBottom: BetweenObjectsMargin,
                                            backgroundColor: "#192430"
                                        }]}
                                        onPress={() => {
                                            this.setState({
                                                saveStatus: false
                                            })
                                            createNewTenant({
                                                variables: this.state
                                            });
                                        }}
                                    >
                                        <Text style={{
                                            color: "white"
                                        }}>Oluştur</Text>
                                    </TouchableHighlight>
                                </View>
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
        padding: GeneralPadding,
        flex: 1,
        flexDirection: "column"
    },
    profileContainer: {
        flex: 1,
        flexDirection: "column",
        marginBottom: BetweenObjectsMargin
    },
    headerContainer: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        zIndex: 2,
    },
    headerControler: {
        width: "100%",
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "baseline",
        position: "relative",
        padding: 2,

    },
    profileContentDescriptionCard: {
        marginBottom: BetweenObjectsMargin
    },
    profileConentTextDescriptionCard: {
        fontFamily: "Exo2.0-Medium",
        color: "#272727",
        fontSize: Normalize(22),
        textAlign: "center",
        borderBottomWidth: 1,
        marginBottom: 2
    },
    subDescriptionCard: {
        padding: GeneralPadding / 2,
        flexDirection: "column",
        marginBottom: BetweenObjectsMargin
    },
    subTitleDescriptionText: {
        color: "#272727",
        fontFamily: "Exo2.0-Bold",
    },
    subContentDescriptionText: {
        color: "#272727",
        fontFamily: "Exo2.0-Medium"
    },
    editContainer: {
        marginBottom: BetweenObjectsMargin,
        padding: GeneralPadding / 2
    }
});
export default CreateNewTenant;