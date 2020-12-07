import React from "react";
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity
} from "react-native";

//NCore Components
import Text from "../../Components/Text";

//NCore Theme
import {
    GeneralPadding,
    SuccessfulColor,
    UnsuccessfulColor,
} from "../../index";

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"

const RealEstateCard = ({ houseImageUrl, name, status, rentalDate, phoneNumber, owner, tenant, detailRent, style, onPress, onLongPress, type, onContractPress }) => {
    return (
        <TouchableOpacity
            style={[styles.container, style]}
            onPress={() => onPress()}
            onLongPress={() => onLongPress()}
            activeOpacity={0.6}
        >
            <View style={{
                width: "100%",
                flexDirection: "row"
            }}>
                {
                    houseImageUrl && houseImageUrl !== "" ? <View style={styles.houseImageContainer}>
                        <Image
                            source={{ uri: houseImageUrl }}
                            style={styles.houseImage}
                        ></Image>
                    </View> : null
                }
                <View style={styles.descriptionContainer}>

                    {
                        name && name !== "" ? <Text style={styles.thereIsNameText}>{name} </Text> :
                            <Text style={styles.thereIsNoNameText}>Yok</Text>
                    }

                    <Text style={styles.thereIsDefault}>
                        Durum : {
                            status && status === true ?
                                <Text style={[styles.contentDefault, { color: SuccessfulColor }]}>
                                    Kullanımda
                            </Text> :
                                <Text style={styles.thereIsNoDefault}>Boş</Text>
                        }
                    </Text>

                    <Text style={styles.thereIsDefault}>
                        Kira Tarihi : {
                            rentalDate && rentalDate !== "" ?
                                <Text style={styles.contentDefault}>
                                    {rentalDate}
                                </Text> :
                                <Text style={styles.thereIsNoDefault}>Belirtilmemiş</Text>
                        }
                    </Text>
                    
                    <Text style={styles.thereIsDefault}>
                        Kira Bedeli : {
                            detailRent && detailRent !== 0 ?
                                <Text style={styles.contentDefault}>
                                    {detailRent} ₺
                                </Text> :
                                <Text style={styles.thereIsNoDefault}>Belirtilmemiş</Text>
                        }
                    </Text>

                    <Text style={styles.thereIsDefault}>
                        Telefon Numarası : {
                            phoneNumber && phoneNumber !== "" ?
                                <Text style={styles.phoneNumberDefault}>
                                    {phoneNumber}
                                </Text> :
                                <Text style={styles.thereIsNoDefault}>Yok</Text>
                        }
                    </Text>

                    <Text style={styles.thereIsDefault}>
                        Mal Sahibi : {
                            owner && owner !== "" ?
                                <Text style={styles.contentDefault}>
                                    {owner}
                                </Text> :
                                <Text style={styles.thereIsNoDefault}>Belirtilmemiş</Text>
                        }
                    </Text>

                    <Text style={styles.thereIsDefault}>
                        Kiracı : {
                            tenant && tenant !== "" ?
                                <Text style={styles.contentDefault, { color: SuccessfulColor }}>
                                    {tenant}
                                </Text> :
                                <Text style={styles.thereIsNoDefault}>Belirtilmemiş</Text>
                        }
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => onContractPress(status)}
                >
                    <View style={{
                        width: 30,
                        height: 30,
                        backgroundColor: status === true ? "#192430" : "white",
                        borderBottomLeftRadius: 10,
                        alignItems: "center",
                        justifyContent: 'center',
                        borderTopRightRadius: 10
                    }}>
                        <FontAwesomeIcon
                            name={status === true ? "chain-broken" : "chain"}
                            color={status === true ? "white" : "#192430"}
                            size={18}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{
                width: "100%",
                height: 8,
                top: 1,
                backgroundColor: status && status === true ? SuccessfulColor : UnsuccessfulColor,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
            }}>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 10,
        flexDirection: "column",
        backgroundColor: "#F4F4F4",
        marginVertical: 4,
        marginHorizontal: 4,
        marginBottom: 10
    },
    //Image Container
    houseImageContainer: {
        padding: GeneralPadding / 2,
        alignItems: "center",
        justifyContent: "center",
    },
    houseImage: {
        borderRadius: 10,
        width: 100,
        height: 100
    },
    //Description Container 
    descriptionContainer: {
        flex: 1,
        padding: GeneralPadding / 2,
        flexDirection: "column",
        alignContent: "space-between",
        flexWrap: "wrap"
    },
    //Name
    thereIsNameText: {
        fontFamily: "Exo2.0-ExtraBold",
        color: "#272727",
        flexWrap: "wrap"

    },
    thereIsNoNameText: {
        fontFamily: "Exo2.0-ExtraBold",
        color: UnsuccessfulColor,
        flexWrap: "wrap"

    },
    //Phone Number
    thereIsDefault: {
        fontSize: 11,
        fontFamily: "Exo2.0-Bold",
        color: "#272727",
        flexWrap: "wrap"

    },
    thereIsNoDefault: {
        fontFamily: "Exo2.0-Regular",
        color: UnsuccessfulColor,
        flexWrap: "wrap",
        fontWeight: "900"

    },
    //Phone Number Default
    phoneNumberDefault: {
        fontFamily: "Exo2.0-Regular",
        color: "blue",
        textDecorationLine: "underline",
        flexWrap: "wrap"

    },
    // Content Default
    contentDefault: {
        fontFamily: "Exo2.0-Regular",
        color: "#272727",
        flexWrap: "wrap",
        fontWeight: "900"
    },

});
export default RealEstateCard;