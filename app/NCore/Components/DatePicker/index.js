import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Platform,

} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';

import Text from "../Text";
import Normalize from "../Normalize";
import { isoStringToDate } from "../../Tools/isoStringToDate";

const DatePicker = ({ titleView, titleText, onChangeDateValue, style, value, disabled }) => {
    const [show, setShow] = useState(false);
    const [dateText, setDateText] = useState("");

    useEffect(() => {
        setDateTextFunction();
    }, [value])


    const setDateTextFunction = async () => {
        const convertDate = await isoStringToDate(value,"date");
        setDateText(convertDate)
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || value;
        setShow(Platform.OS === 'ios');
        onChangeDateValue(currentDate);
    };

    return (
        <View style={[{ marginBottom: 20 }, style]}>
            {
                show === true ? < DateTimePicker
                    testID="dateTimePicker"
                    value={value}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                /> : null
            }
            <TouchableOpacity
                disabled={disabled && disabled === true ? true : false}
                onPress={() => {
                    setShow(true)
                }}
            >
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
                    <View style={styles.selectSection}>
                        <Text style={{
                            color: "gray"
                        }}>
                            {
                                dateText
                            }
                        </Text>
                        <Icon
                            name={"calendar-alt"}
                            color={"#656565"}
                            size={20}
                            style={{
                                padding: 2
                            }}
                        >
                        </Icon>
                    </View>
                </View>
            </TouchableOpacity>
        </View >
    );
}
const styles = StyleSheet.create({
    selectSection: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'gray',
        alignItems: "flex-end",
        justifyContent: "space-between"
    }
})
export default DatePicker