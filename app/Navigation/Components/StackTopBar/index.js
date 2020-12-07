import React, { useState, useEffect, useRef } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    Dimensions,
    Animated
} from "react-native";

import Text from "../../../NCore/Components/Text";
import Normalize from "../../../NCore/Components/Normalize";

import Icon from 'react-native-vector-icons/FontAwesome5';

import {
    Shadow
} from "../../../NCore";

const StackTopBar = (props) => {
    const { params = {} } = props.navigation.state;

    const screenWidth = Dimensions.get("screen").width;
    return (
        <View style={styles.container}>
            <View style={[Shadow, {
                height: 140,
                zIndex: 702,
            }]}>
                <View style={[Shadow, styles.defaultCompanentSize, {
                    position: "absolute",
                    bottom: 0,
                    left: -((screenWidth * 1.25 - screenWidth) / 2),
                    zIndex: 702,
                    backgroundColor: "rgb(0,0,0,0.2)",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    paddingBottom: screenWidth / 6
                }]}>
                    <View style={{
                        width: screenWidth,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        zIndex: 702,
                        position: "relative"
                    }}>
                        <View
                            style={[{
                                width: Normalize(44),
                                zIndex: 702,
                            }]}
                        >
                            {

                                params.goBackFunction ? <TouchableOpacity
                                    onPress={() => params.goBackFunction()}
                                    style={{
                                        width: 44,
                                    }}
                                >
                                    <Icon
                                        name={"chevron-left"}
                                        color={"white"}
                                        size={Normalize(20)}
                                        style={{
                                            alignSelf: "center",
                                            zIndex: 702,
                                            bottom: 5
                                        }}
                                    />
                                </TouchableOpacity> : null
                            }
                        </View>
                        <Text style={{
                            color: "white",
                            fontFamily: "Exo2.0-ExtraBold",
                            fontSize: Normalize(18)
                        }}>
                            {
                                params.pageName
                            }
                        </Text>
                        <View style={{
                            width: Normalize(44)
                        }}>

                        </View>
                    </View>
                </View>
                <Image
                    source={require("../../../Source/Images/TopImage.jpg")}

                    style={[
                        styles.defaultCompanentSize,
                        {
                            position: "absolute",
                            bottom: 0,
                            left: -((screenWidth * 1.25 - screenWidth) / 2),
                            zIndex: 701
                        }
                    ]}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    defaultCompanentSize: {
        width: Dimensions.get("screen").width * 1.25,
        minHeight: Dimensions.get("screen").width * 1.25,
        borderRadius: Dimensions.get("screen").width / 2,
    }
});
export default StackTopBar;