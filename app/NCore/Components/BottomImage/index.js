import React from "react";
import {
    View,
    ImageBackground,
    StyleSheet,
    Dimensions
} from "react-native";

const BottomImage = ({ style, imageStyle, children }) => {
    return (
        <View style={[styles.bottomContainer, style]}>
            <ImageBackground
                source={require("../../../Source/Images/bottomImage.png")}
                style={[styles.bottomImage, imageStyle]}
            >
                {
                    children
                }
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomContainer: {
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        marginBottom: 0
    },
    bottomImage: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").width / 2.6,
        alignItems: "center",
        justifyContent: "flex-end"
    },
})
export default BottomImage;