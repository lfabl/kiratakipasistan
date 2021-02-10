import React, { Component, useContext } from "react";
import {
    View,
    StyleSheet,
    Platform,
    LayoutAnimation,
    UIManager,
    TouchableOpacity,
    Keyboard
} from "react-native";

import md5 from "md5";
import AsyncStorage from "@react-native-community/async-storage";

import Normalize from "../../../NCore/Components/Normalize";
import Icon from 'react-native-vector-icons/FontAwesome5';

//Server 
import signin from "../../../Server/fetchs/signin";

// NCore Components
import TouchableHighlight from "../../../NCore/Components/TouchableHighlight";
import TextInput from "../../../NCore/Components/TextInput";
import Text from "../../../NCore/Components/Text";
import BottomImage from "../../../NCore/Components/BottomImage";

//NCore Theme 
import {
    BetweenObjectsMargin,
    GeneralPadding
} from "../../../NCore";

class Signin extends Component {
    constructor(props) {
        super(props);
        this.passwordInputRef = React.createRef();
        this.state = {
            userNameOrMail: "",
            password: "",
            errorMessage: "",
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({
            pageName: "Kira Takip Asistanı",
            logo: true
        })
    }
    async signIn() {
        const { userNameOrMail, password } = this.state;
        if (userNameOrMail !== "" && password !== "") {
            const md5Password = await md5(password);
            const signinResult = await signin({
                userNameOrMail: userNameOrMail,
                password: md5Password
            });
            if (password.length < 5 || password.length > 80) {
                if(Platform.OS === "android") UIManager.setLayoutAnimationEnabledExperimental(true)
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                this.setState({
                    errorMessage: "Gönderdiğiniz şifre gerekli kuralları sağlamıyor. Lütfen minimum 5 maximum 80 karakter girin!"
                })
            } else if (userNameOrMail.length === 0 ) {
                this.setState({
                    errorMessage: "Lütfen bir kullanıcı adı veya mail giriniz."
                })
            } else {
                if (signinResult.code === 200) {
                    await AsyncStorage.removeItem("userToken").then(async () => {
                        console.warn("token silindi")
                        await AsyncStorage.setItem("userToken", signinResult.token).then((res) => {
                            this.props.navigation.navigate("Loading")
                        })
                    })
                }
                else {
                    this.setState({
                        errorMessage: "Lütfen doğru kullanıcı adı ve şifrenizi giriniz!",
                    })
                }
            }
        }
        else {
            if(Platform.OS === "android") UIManager.setLayoutAnimationEnabledExperimental(true)
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.setState({
                errorMessage: "Lütfen kullanıcı adı ve şifrenizi eksiksiz giriniz"
            })
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={"Kullanıcı adı veya Mail"}
                        value={this.state.userNameOrMail}
                        onChangeText={(val) => {
                            if(Platform.OS === "android") UIManager.setLayoutAnimationEnabledExperimental(true)
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                            this.setState({ userNameOrMail: val, errorMessage: "" })
                        }}
                        style={{ flex: 1 }}
                        onSubmitEditing={(evt) => {
                            this.passwordInputRef.focus()
                        }}
                        autoCapitalize={"none"}
                    />

                    <TextInput
                        placeholder={"Şifre"}
                        value={this.state.password}
                        isPassword={true}
                        onChangeText={(val) => {
                            if(Platform.OS === "android") UIManager.setLayoutAnimationEnabledExperimental(true)
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                            this.setState({ password: val, errorMessage: "" })
                        }}
                        onRef={(ref) => this.passwordInputRef = ref}
                        style={{ flex: 1 }}
                        onSubmitEditing={() => {
                            this.signIn();
                            Keyboard.dismiss();
                        }}
                        autoCapitalize={"none"}
                        passIconView={true}
                    />

                    <TouchableHighlight
                        text={"Giriş Yap"}
                        onPress={() => this.signIn()}
                        textStyle={styles.buttonTextStyle}
                        style={styles.buttonStyle}
                    />
                    {
                        this.state.errorMessage !== "" ? <View style={styles.errorMessageContainer}>
                            <Text
                                style={styles.errorMessageText}
                            >
                                {
                                    this.state.errorMessage
                                }
                            </Text>
                        </View> : null
                    }
                    <View style={styles.forgetPasswordContainer}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("ForgetPassword")}
                        >
                            <Text
                                style={styles.forgetPasswordText}
                            >
                                Şifreni mi unuttun?
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <BottomImage>
                    <Text
                        style={styles.bottomTextStyle1}
                        onPress={() => this.props.navigation.navigate("Signup")}
                    >
                        Henüz bir hesabın yok mu?
                        <Text
                            style={styles.bottomTextStyle2}
                            onPress={() => this.props.navigation.navigate("Signup")}
                        > Üye ol</Text>
                    </Text>
                </BottomImage>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignContent: "space-between"
    },
    inputContainer: {
        padding: GeneralPadding,
        flex: 1,
        justifyContent: "center",
    },
    buttonStyle: {
        marginBottom: BetweenObjectsMargin
    },
    buttonTextStyle: {
        fontFamily: "Exo2.0-Bold"
    },
    errorMessageContainer: {
        width: "100%",
        alignItems: "center",
        marginBottom: BetweenObjectsMargin / 2
    },
    errorMessageText: {
        fontFamily: "Exo2.0-Regular",
        color: "#C60202"
    },
    forgetPasswordContainer: {
        width: "100%",
        alignItems: "center",
    },
    forgetPasswordText: {
        fontFamily: "Exo2.0-Regular",

    },
    bottomTextStyle1: {
        marginBottom: BetweenObjectsMargin / 4,
        fontFamily: "Exo2.0-Regular",
        color: "white",
    },
    bottomTextStyle2: {
        marginBottom: BetweenObjectsMargin / 4,
        fontFamily: "Exo2.0-Bold",
        color: "white",
    }
})
export default Signin;