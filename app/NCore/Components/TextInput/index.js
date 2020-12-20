import React, { useState } from "react";
import {
    View,
    TextInput as NativeTextInput,
    StyleSheet,
    TouchableOpacity,
    Linking,
    UIManager,
    Platform,
    Button
} from "react-native";
import TextInputMask from 'react-native-text-input-mask';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Text from "../Text";
import Normalize from "../Normalize";

const validation = async ({ text, validationTypes }) => {
    let result = true;
    let errorMessage = ""
    await validationTypes.map((item, index) => {
        if (item.isEmptyString && text === "") {
            result = false;
            errorMessage = "* Bu bölge boş bırakılamaz."
        }
    })
    return {
        status: result,
        errorMessage: errorMessage
    }
}

const TextInput = ({ style, containerStyle, value, onChangeText, placeholder, infoIconView, infoIconOnPress, passIconView, titleText, titleView, isPhoneNumber, editable, editableEffect, multiline, validationTypes, isPassword, inputMaskType, onRef, onSubmitEditing, autoCapitalize }) => {
    const [errorMessageView, setErrorMessageView] = useState(true);
    const [errorMessageText, setErrorMessageText] = useState("");
    const [passVisiable, setPassVisiable] = useState(isPassword);
    const makeCall = () => {
        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = 'tel://${' + value + '}';
        } else {
            phoneNumber = 'telprompt://${' + value + '}';
        }

        Linking.openURL(phoneNumber)
    }

    return (
        <View style={[{ marginBottom: 20 }, containerStyle]}>
            <View style={{ flexDirection: "column" }}>
                {
                    titleView ? <Text
                        style={{
                            fontFamily: "Exo2.0-Black",
                            color: "#CACACA",
                            fontSize: Normalize(13)
                        }}
                    >{titleText}</Text>
                        : null
                }
                <View style={[styles.searchSection,
                typeof editableEffect !== "undefined" && editableEffect === true ? {
                    borderColor: "rgba(0,0,0,0.8)",
                    borderBotttomWidth: 1
                } : null]}>
                    {
                        editable === false && isPhoneNumber ? <TouchableOpacity
                            onPress={() => {
                                UIManager.setLayoutAnimationEnabledExperimental(false)
                                makeCall()
                            }
                            }
                            style={{
                                position: "absolute"
                            }}
                        >
                            <Text style={[
                                styles.textInput,
                                {
                                    color: isPhoneNumber ? "blue" : "gray",
                                    textDecorationLine: isPhoneNumber ? "underline" : null,
                                    margin: 5
                                }
                            ]}>
                                {
                                    value
                                }
                            </Text>
                        </TouchableOpacity> : null
                    }
                    <TextInputMask
                        onChangeText={async (text) => {
                            let validationResult = null
                            if (typeof validationTypes !== "undefined") {
                                validationResult = await validation({ text, validationTypes }).then((result) => result);
                                if (errorMessageView === false && validationResult.status === true) {
                                    setErrorMessageView(validationResult.status);
                                    setErrorMessageText("");
                                    text = text.slice(1, text.length);
                                    onChangeText(text);
                                }
                                else {
                                    setErrorMessageView(validationResult.status);
                                    setErrorMessageText(validationResult.errorMessage);
                                    validationResult.status === false ?
                                        onChangeText(value) :
                                        onChangeText(text);
                                }
                            }
                            else {
                                onChangeText(text);
                            }
                        }}

                        defaultValue={isPhoneNumber && editable === false ? null : value}
                        secureTextEntry={passVisiable}
                        keyboardType={isPhoneNumber || inputMaskType ? "numeric" : "default"}
                        autoCapitalize={autoCapitalize ? autoCapitalize : "sentences"}
                        placeholder={isPhoneNumber && editable === false ? null : placeholder}
                        style={[
                            styles.textInput,
                            style,
                            {
                                color: isPhoneNumber ? "blue" : "gray",
                            }
                        ]}
                        placeholderTextColor={typeof editableEffect !== "undefined" && editableEffect === true ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.8)"}
                        editable={typeof editable !== "undefined" ? editable : true}
                        multiline={multiline}
                        mask={
                            inputMaskType ?
                                inputMaskType === "phoneNumber" ? "0[000] [000] [00] [00]" :
                                    inputMaskType === "iban" ? "TR[00] [0000] [0000] [0000] [0000] [0000] [00]" :
                                        inputMaskType === "tc" ? "[00000000000]" :
                                            inputMaskType === "number" ? "[00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000]" : null
                                : null
                        }
                        refInput={ref => onRef ? onRef(ref) : null}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        onSubmitEditing={(e) => onSubmitEditing ? onSubmitEditing(e) : null}
                    >
                    </TextInputMask>
                    {
                        infoIconView ? <TouchableOpacity
                            onPress={() => infoIconOnPress()}
                        >
                            <Icon
                                name={"info-circle"}
                                color={"#656565"}
                                size={20}
                                style={{
                                    padding: 5
                                }}
                            >
                            </Icon>
                        </TouchableOpacity> : null
                    }
                    {
                        passIconView ? <TouchableOpacity
                            onPress={() => setPassVisiable(passVisiable === true ? false : true)}
                        >
                            <Icon
                                name={passVisiable === true ? "eye" : "eye-slash"}
                                color={"#656565"}
                                size={20}
                                style={{
                                    padding: 5
                                }}
                            >
                            </Icon>
                        </TouchableOpacity> : null
                    }

                </View>
            </View>
            {
                !errorMessageView ? <View style={{
                }}>
                    <Text style={{
                        color: "red"
                    }}>{errorMessageText}</Text>
                </View> : null
            }
        </View >
    );
}
const styles = StyleSheet.create({
    searchSection: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'gray',
        alignItems: "flex-end",
    },
    textInput: {
        padding: 0,
        fontFamily: "Exo2.0-SemiBold",
        marginLeft: 5
    }
})
export default TextInput