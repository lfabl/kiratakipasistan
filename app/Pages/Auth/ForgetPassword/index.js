import React, { Component } from "react";
import {
    View,
    StyleSheet,
    UIManager,
    LayoutAnimation,
    Text
} from "react-native";

// NCore Components
import TouchableHighlight from "../../../NCore/Components/TouchableHighlight";
import TextInput from "../../../NCore/Components/TextInput";
import BottomImage from "../../../NCore/Components/BottomImage";
import Modal from "../../../NCore/Components/Modal";

//NCore Theme 
import {
    BetweenObjectsMargin,
    GeneralPadding
} from "../../../NCore";

//Fetchs
import forgetPassword from "../../../Server/fetchs/forgetPassword";

class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            errorMessage: "",
            modalVisible: false
        }
    }
    
    componentDidMount() {
        this.props.navigation.setParams({
            pageName: "Şifreni Sıfırla",
            goBackFunction: () => this.props.navigation.navigate("Signin")
        })
    }

    async forgetPassword() {
        const { mail } = this.state;
        if (mail === "") {
            UIManager.setLayoutAnimationEnabledExperimental(true)
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.setState({
                errorMessage: "Lütfen bir mail giriniz."
            })
        }
        else {
            const forgetPasswordResult = await forgetPassword({
                mail: mail,
            });
            if (forgetPasswordResult.code === 200) {
                this.setState({
                    modalVisible: true,
                    mail: ""
                })
            }
            else {
                UIManager.setLayoutAnimationEnabledExperimental(true)
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                this.setState({
                    errorMessage: forgetPasswordResult.message,
                    mail: ""
                })
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    modalVisible={this.state.modalVisible}
                    modelText={"Şifre sıfırlama isteğiniz için mailinize bir link gönderilmiştir."}
                    setModelVisible={(val) => this.setState({ modalVisible: val })}
                >
                </Modal>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={"Mail"}
                        value={this.state.mail}
                        onChangeText={(val) => this.setState({ mail: val ,errorMessage: ""})}
                        style={{ flex: 1 }}
                    ></TextInput>

                    <TouchableHighlight
                        text={"Gönder"}
                        onPress={() => this.forgetPassword()}
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
    errorMessageContainer: {
        width: "100%",
        alignItems: "center",
        marginBottom: BetweenObjectsMargin / 2,
    },
    errorMessageText: {
        fontFamily: "Exo2.0-Regular",
        color: "#C60202",
    },
    buttonStyle: {
        marginBottom: BetweenObjectsMargin
    },
    buttonTextStyle: {
        fontFamily: "Exo2.0-Bold"
    }
})
export default ForgetPassword;