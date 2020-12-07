import React, { useState } from "react";
import {
    View,
    TouchableHighlight,
    StyleSheet,
    UIManager,
    LayoutAnimation
} from "react-native";

//NCore Components
import Text from "../Text";
import Normalize from "../Normalize";

//Ncore Theme 
import {
    GeneralPadding, Shadow
} from "../../index";

const MultipleChoice = ({ types, defaultSelectTypeKey, onSelectType, disabled, style, selectColor, unSelectColor, titleText, titleView }) => {
    const defaultRadiusValue = 10;
    const defaultRadiusWidthValue = 0.5;
    const defaultSelectColor = selectColor ? selectColor : "#303030";
    const defaultUnselectColor = unSelectColor ? unSelectColor : "white"
    return (
        <View style={{
            flex: 1,
            flexDirection: "column",
            marginBottom: 20
        }}>
            {
                titleView ? <Text
                    style={{
                        fontFamily: "Exo2.0-Black",
                        color: "#CACACA",
                        fontSize: Normalize(13),
                        marginBottom: 5
                    }}
                >{titleText}</Text>
                    : null
            }
            <View style={[styles.container, style, Shadow]}>
                {
                    types && types !== [] && types.length !== 0 ?
                        types.map((item, key) => {

                            return <TouchableHighlight
                                key={key}
                                style={{
                                    flexGrow: 1,
                                    backgroundColor: defaultSelectTypeKey === item.key ? defaultSelectColor : defaultUnselectColor,
                                    padding: GeneralPadding / 2,
                                    alignItems: "center",
                                    borderTopLeftRadius: key === 0 ? defaultRadiusValue : 0,
                                    borderBottomLeftRadius: key === 0 ? defaultRadiusValue : 0,
                                    borderTopRightRadius: key === types.length - 1 ? defaultRadiusValue : 0,
                                    borderBottomRightRadius: key === types.length - 1 ? defaultRadiusValue : 0,
                                    borderRightWidth: key === 0 || key !== types.length - 1 ? defaultRadiusWidthValue : 0,
                                    borderLeftWidth: key === types.length - 1 ? defaultRadiusWidthValue : 0,
                                    borderColor: defaultSelectColor
                                }}
                                onPress={() => {
                                    onSelectType(item.key)
                                }}
                                disabled={disabled}
                            >
                                <Text style={{
                                    fontFamily: "Exo2.0-Medium",
                                    color: defaultSelectTypeKey === item.key ? defaultUnselectColor : defaultSelectColor
                                }}>
                                    {item.name}
                                </Text>
                            </TouchableHighlight>
                        })
                        : null
                }
            </View >
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
    },
});
export default MultipleChoice;