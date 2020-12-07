import React from "react";
import {
    TouchableHighlight as NativeTouchableHighlight,
    StyleSheet,
} from "react-native";

//NCoreComponents
import Text from "../Text";

//NCore theme
import {
    GeneralPadding
} from "../../index";

const TouchableHighlight = ({ style, text, textStyle, onPress, children }) => {
    return (
        <NativeTouchableHighlight
            style={[styles.touchableHighlight, style]}
            onPress={onPress}
        >
            {
                text ? <Text style={[styles.touchableHighlightText, textStyle]}>
                    {text}
                </Text> :
                    children !== undefined ? children : null
            }
        </NativeTouchableHighlight>
    )
}

const styles = StyleSheet.create({
    touchableHighlight: {
        alignItems: "center",
        backgroundColor: "#192430",
        borderRadius: 5,
        padding: GeneralPadding / 2.4
    },
    touchableHighlightText: {
        fontFamily: "Exo2-Bold",
        color: "white"
    }
})
export default TouchableHighlight