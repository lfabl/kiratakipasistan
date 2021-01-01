import React, { Component } from "react";
import {
    View,
    StyleSheet,
    UIManager,
    LayoutAnimation,
    Platform,
    Keyboard
} from "react-native";
import md5 from "md5";
import AsyncStorage from "@react-native-community/async-storage";

// NCore Components
import TouchableHighlight from "../../../NCore/Components/TouchableHighlight";
import TextInput from "../../../NCore/Components/TextInput";
import Text from "../../../NCore/Components/Text";
import BottomImage from "../../../NCore/Components/BottomImage";
import Modal from "../../../NCore/Components/Modal";

//NCore Theme 
import {
    BetweenObjectsMargin,
    GeneralPadding
} from "../../../NCore";

//Server Fetch
import signup from "../../../Server/fetchs/signup";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.officeNameInputRef = React.createRef();
        this.userNameInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
        this.state = {
            mail: "",
            officeName: "",
            userName: "",
            password: "",
            modalVisible: false
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({
            pageName: "Üye Ol",
        })
    }
    async signUp() {
        const { userName, password, officeName, mail } = this.state;

        if (userName === "" || password === "" || officeName === "" || mail === "") {
            if(Platform.OS === "android") UIManager.setLayoutAnimationEnabledExperimental(true)
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.setState({
                errorMessage: "Lütfen istenilen her bilgiyi doldurduğunuzdan emin olunuz."
            })
        } else if (password.length < 5 || password.length > 80) {
            if(Platform.OS === "android") UIManager.setLayoutAnimationEnabledExperimental(true)
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.setState({
                errorMessage: "Gönderdiğiniz şifre gerekli kuralları sağlamıyor. Lütfen minimum 5 maximum 80 karakter girin!"
            })
        }
        else {
            const md5Password = md5(password);
            const signupResult = await signup({
                userName: userName,
                mail: mail,
                password: md5Password,
                fullName: officeName
            });
            if (signupResult.code === 200) {
                await AsyncStorage.setItem("userToken", signupResult.token);
                this.props.navigation.navigate("Loading")
            }
            else {
                if(Platform.OS === "android") UIManager.setLayoutAnimationEnabledExperimental(true)
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                if (signupResult.message.indexOf("userName") !== -1) {
                    this.setState({
                        errorMessage: "Gönderdiğiniz kullanıcı adı gerekli kuralları sağlamıyor. Lütfen minimum 3 maximum 35 karakter girin!"
                    })
                }
                else if (signupResult.message.indexOf("mail") !== -1) {
                    this.setState({
                        errorMessage: "Gönderdiğiniz mail gerekli kuralları sağlamıyor. Lütfen minimum 5 maximum 80 karakter girin!"
                    })
                }
                else if (signupResult.message.indexOf("fullName") !== -1) {
                    this.setState({
                        errorMessage: "Gönderdiğiniz ofis adı gerekli kuralları sağlamıyor. Lütfen minimum 4 maximum 45 karakter girin!"
                    })
                }
                else {
                    this.setState({
                        errorMessage: signupResult.message
                    })
                }
            }
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Modal
                    modalVisible={this.state.modalVisible}
                    modelText={"Bu bilgi resmi bir vergi numarası gerektirmez. Kendiniz için sitemize özel şirket ismi oluşturabilirsiniz."}
                    setModelVisible={(val) => this.setState({ modalVisible: val })}
                >
                </Modal>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={"Mail"}
                        value={this.state.mail}
                        onChangeText={(val) => {
                            if(Platform.OS === "android") UIManager.setLayoutAnimationEnabledExperimental(true)
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                            this.setState({ mail: val, errorMessage: "" })
                        }}
                        style={{ flex: 1 }}
                        autoCapitalize={"none"}
                        onSubmitEditing={(evt) => {
                            this.officeNameInputRef.focus()
                        }}
                    ></TextInput>

                    <TextInput
                        placeholder={"Ofis Adı"}
                        value={this.state.officeName}
                        onChangeText={(val) => {
                            if(Platform.OS === "android") UIManager.setLayoutAnimationEnabledExperimental(true)
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                            this.setState({ officeName: val, errorMessage: "" })
                        }}
                        infoIconOnPress={() => this.setState({ modalVisible: true })}
                        infoIconView={true}
                        style={{ flex: 1 }}
                        onRef={(ref) => this.officeNameInputRef = ref}
                        onSubmitEditing={(evt) => {
                            this.userNameInputRef.focus()
                        }}
                    ></TextInput>

                    <TextInput
                        placeholder={"Kullanıcı Adı"}
                        value={this.state.userName}
                        onChangeText={(val) => {
                            if(Platform.OS === "android") UIManager.setLayoutAnimationEnabledExperimental(true)
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                            this.setState({ userName: val, errorMessage: "" })
                        }}
                        style={{ flex: 1 }}
                        autoCapitalize={"none"}
                        onRef={(ref) => this.userNameInputRef = ref}
                        onSubmitEditing={(evt) => {
                            this.passwordInputRef.focus()
                        }}
                    ></TextInput>

                    <TextInput
                        placeholder={"Şifre"}
                        value={this.state.password}
                        isPassword={true}
                        onChangeText={(val) => {
                            if(Platform.OS === "android") UIManager.setLayoutAnimationEnabledExperimental(true)
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                            this.setState({ password: val, errorMessage: "" })
                        }}
                        style={{ flex: 1 }}
                        autoCapitalize={"none"}
                        onRef={(ref) => this.passwordInputRef = ref}
                        onSubmitEditing={(evt) => {
                            this.signUp()
                            Keyboard.dismiss()
                        }}
                    ></TextInput>
                    <TouchableHighlight
                        text={"Kayıt Ol"}
                        onPress={() => this.signUp()}
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
                </View>
                <BottomImage>
                    <Text
                        style={styles.bottomTextStyle1}
                        onPress={() => this.props.navigation.navigate("Signin")}
                    >
                        Zaten bir hesabın var mı?
                        <Text
                            style={styles.bottomTextStyle2}
                            onPress={() => this.props.navigation.navigate("Signin")}
                        > Giriş Yap</Text>
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
        marginBottom: BetweenObjectsMargin / 2,
        textAlign: "center"
    },
    errorMessageText: {
        fontFamily: "Exo2.0-Regular",
        color: "#C60202",
        textAlign: "center"

    },
    forgetPasswordContainer: {
        width: "100%",
        alignItems: "center"
    },
    forgetPasswordText: {
        fontFamily: "Exo2.0-Regular"
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
export default Signup;