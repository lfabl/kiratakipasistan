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

const AuthStackTopBar = (props) => {
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
                    paddingBottom: screenWidth / 10
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
                                >
                                    <Icon
                                        name={"chevron-left"}
                                        color={"white"}
                                        size={Normalize(20)}
                                        style={{
                                            alignSelf: "flex-end",
                                            zIndex: 702
                                        }}
                                    />
                                </TouchableOpacity> : null
                            }
                        </View>
                        <View style={{
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                            alignSelf: "flex-end",
                            height: Normalize(70)
                        }}>
                            {
                                params.logo && params.logo === true ?
                                    <View style={{
                                        width: Normalize(56),
                                        height: Normalize(50),
                                    }}>
                                        <Icon
                                            name={"home"}
                                            color={"white"}
                                            size={Normalize(46)}
                                            style={{
                                                position: "absolute",
                                                alignSelf: "flex-start",
                                            }}
                                        />
                                        <View style={{
                                            width: 50,
                                            alignSelf: "flex-end"
                                        }}>
                                            <Icon
                                                name={"search"}
                                                color={"white"}
                                                size={Normalize(30)}
                                                style={{
                                                    alignSelf: "flex-end",
                                                    marginTop: 8,
                                                    fontWeight: "400",
                                                    textShadowColor: 'rgba(0, 0, 0, 0.75)',
                                                    textShadowOffset: { width: 1, height: 1 },
                                                    textShadowRadius: 4

                                                }}
                                            />
                                        </View>

                                    </View> 
                                    : null
                            }
                            <Text style={{
                                color: "white",
                                fontFamily: "Exo2.0-ExtraBold",
                                fontSize: Normalize(18),
                                flexWrap: "wrap",
                                width: params.logo ? Normalize(100): "auto",
                                textAlign: "center"
                            }}>
                                {
                                    params.pageName
                                }
                            </Text>
                        </View>
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
export default AuthStackTopBar;