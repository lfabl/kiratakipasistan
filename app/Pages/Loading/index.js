import React, { Component } from "react";
import {
    View,
    Text,
    ActivityIndicator
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import userTokenControl from "../../Server/fetchs/userTokenControl";
import OneSignal from 'react-native-onesignal';

const onesignalInitID = "1d31bfb2-0b68-4283-90bc-8892ce855405";

class Loading extends Component {
    constructor(props) {
        super(props);
        this.params = this.props && this.props.navigation
    }
    async componentDidMount() {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken !== null) {
            if (userToken !== "") {
                const userTokenControlResult = await userTokenControl({
                    token: userToken
                })
                if (userTokenControlResult.code === 200) {
                    setTimeout(() => {
                        OneSignal.init(onesignalInitID, { kOSSettingsKeyAutoPrompt: true });
                        OneSignal.inFocusDisplaying(2);
                        OneSignal.sendTag("user_id", userTokenControlResult.userID);
                        this.props.navigation.navigate("Home");
                    }, 500)
                }
                else {
                    this.props.navigation.navigate("Signin");
                }
            }
        }
        else {
            this.props.navigation.navigate("Signin");
        }
    };
    render() {
        const { navigation } = this.props;
        console.log(navigation)
        return <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        }}>
            <ActivityIndicator size="large" color={"#1A2430"}>
            </ActivityIndicator>
        </View>
    }
}

export default Loading;