import React from "react";
import {
    View,
    StyleSheet
} from "react-native";

const DescriptionCard = ({ style, children }) => {
    return (
        <View style={[styles.container, style]}>
            {
                children && 
                    typeof children !== "undefined" ?
                        children
                : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "auto",
        backgroundColor: "#F1F1F1",
        borderRadius: 5,
        borderWidth: 5,
        borderColor: "white",
    }
});

export default DescriptionCard;