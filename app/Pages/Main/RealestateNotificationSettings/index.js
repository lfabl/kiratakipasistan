import React, {
    Component
} from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import {
    NOTIFICATION_SETTINGS
} from '../../../Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RealestateNotificationSettingsGQL from '../../../GraphQL/Queries/RealestateNotificationSettingsGQL';
import UpdateRealestateNotificationGQL from '../../../GraphQL/Mutations/UpdateRealestateNotificationGQL';
import {
    Mutation, Query
} from "react-apollo";

class RealestateNotificationSettings extends Component {
    static navigationOptions = {
        headerLeft: <Text>Merhaba</Text>
    };
    constructor(props) {
        super(props);
        this.state = {
            id: props.navigation.getParam("realestateID")
        };
    }
    componentDidMount() {
        this.props.navigation.setParams({
			pageName: 'Emlak Bildirimleri',
			goBackFunction: () => this.props.navigation.goBack()
        });
    }
    getLoadingComponent() {
        return <View
            style={styles.loadingContainer}
        >
            <ActivityIndicator
                size="large"
            />
        </View>;
    }
    render() {
        const {
            id
        } = this.state;
        return <Query
            query={RealestateNotificationSettingsGQL}
            fetchPolicy="cache-and-network"
            variables={{
                id
            }}
        >
            {
                ({
                    loading,
                    error,
                    data
                }) => {
                    if(loading) {
                        return this.getLoadingComponent();
                    } else if(error) {
                        return <View
                            style={styles.loadingContainer}
                        >
                            <Text>Bir hata meydana geldi. Hata: </Text>
                            <Text>{error.toString()}</Text>
                        </View>
                    } else {
                        if(
                            data && 
                            data.realestateNotificationSettings && 
                            data.realestateNotificationSettings.code && 
                            data.realestateNotificationSettings.code === 200
                        ) {
                            return NOTIFICATION_SETTINGS.map((item, index) => {
                                const setting = data.realestateNotificationSettings.data[item.key];
                                const qData = data;
                                return <Mutation
                                    mutation={UpdateRealestateNotificationGQL}
                                    variables={{
                                        id: id,
                                        openNotifications: data.realestateNotificationSettings.openNotifications
                                    }}
                                >
                                    {
                                        (
                                            onMutate,
                                            {
                                                loading,
                                                error,
                                                data
                                            }
                                        ) => {
                                            if(loading) {
                                                return <View
                                                    style={{
                                                        width: "100%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        padding: 20
                                                    }}
                                                >
                                                    <ActivityIndicator
                                                        color="black"
                                                        size={25}
                                                    />
                                                </View>
                                            } else if(error) {
                                                alert(error);
                                            } else {
                                                const newState = data ? 
                                                    !data.updateRealestateNotificationGQL.data.openNotifications
                                                :
                                                    !qData.realestateNotificationSettings.data.openNotifications;
                                                return <TouchableOpacity
                                                    style={styles.settingContainer}
                                                    onPress={() => {
                                                        onMutate({
                                                            variables: {
                                                                id: id,
                                                                openNotifications: newState
                                                            }
                                                        });
                                                    }}
                                                >
                                                    <Text
                                                        style={styles.settingTitle}
                                                    >
                                                        {item.title}
                                                    </Text>
                                                    <Icon
                                                        name={newState ? "check-circle-outline" : "checkbox-blank-circle-outline"}
                                                        color="black"
                                                        size={28}
                                                    />
                                                </TouchableOpacity>
                                            }
                                        }
                                    }
                                </Mutation>
                            });
                        } else {
                            return this.getLoadingComponent();
                        }
                    }
                }
            }
        </Query>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    settingContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        padding: 20
    },
    settingTitle: {
        flex: 1,
        color: "black"
    }
});

export default RealestateNotificationSettings;