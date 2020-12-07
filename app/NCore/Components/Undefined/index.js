import React from "react";
import {
    StyleSheet,
    View,
    UIManager,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Text from "../Text";
import Normalize from "../Normalize";
import { BetweenObjectsMargin } from "../..";
const Undefined = ({ iconName, text, type }) => {
    const color = type ?
        type === "error" ? "#C60202" :
            type === "message" ? "#EA8510" :
                "#272727" : "#192430"
    return <View style={[styles.container]}>
        <Icon
            name={iconName ? iconName : "exclamation-triangle"}
            style={[styles.icon, {
                color: color
            }]}
        >
        </Icon>
        <Text
            style={[styles.text, {
                color: color
            }]}
        >
            {
                text ? text : "BİR HATA OLUŞTU"
            }
        </Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        padding: 20
    },
    icon: {
        fontSize: Normalize(48),
        marginBottom: BetweenObjectsMargin / 2
    },
    text: {
        fontSize: Normalize(18),
        marginBottom: BetweenObjectsMargin / 2,
        textAlign: "center"
    }
});

export default Undefined;