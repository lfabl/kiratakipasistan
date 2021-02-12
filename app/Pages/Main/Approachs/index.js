import React, {
    Component
} from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    FlatList,
    View,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
class Approachs extends Component {
    static navigationOptions = ({ navigation }) => {
        let options = {
            headerLeft: <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Home");
                }}
                style={{
                    padding: 20
                }}
            >
                <Icon
                    name="chevron-left"
                    size={22}
                    color="black"
                />
            </TouchableOpacity>,
            headerTitle: <Text
                style={{
                    flex: 1,
                    textAlign: "center",
                    fontWeight: "700",
                    color: "black"
                }}
            >
                Bitmeye Yaklaşan Sözleşmeler
            </Text>,
            headerRight: <View
                style={{
                    width: 60,
                    height: "100%"
                }}
            ></View>
        };
        return options;
    }
    render() {
        const data = this.props.navigation.dangerouslyGetParent().state.params.approachs;
        console.warn(data);
        return <View
            style={styles.container}
        >
            <FlatList
                data={data}
                renderItem={({ item, index }) => {
                    console.log((new Date() - new Date(item.contract.contractDate)))
                    return <TouchableOpacity
                        key={index}
                        onPress={() => {
                            this.props.navigation.navigate("RealEstateInformation", {
                                realEstateID: item.id
                            });
                        }}
                        style={{
                            padding: 10,
                            backgroundColor: "white",
                            elevation: 4,
                            marginHorizontal: 4,
                            marginVertical: 4,
                            borderRadius: 5
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            <Text
                                style={{
                                    flex: 1
                                }}
                            >
                                {item.title}
                            </Text>
                            <Text
                                style={{
                                    
                                }}
                            >
                                {Math.floor((new Date() - new Date(item.contract.contractDate)) / (1000 * 3600 * 24))} gün
                            </Text>
                        </View>
                    </TouchableOpacity>
                }}
            />
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    }
});
export default Approachs;