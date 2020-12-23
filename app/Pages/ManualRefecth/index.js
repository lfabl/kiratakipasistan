import React, { Component } from "react";
import {
    ActivityIndicator,
    View,
} from "react-native";


class ManualRefecth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refetchPageName: this.props.navigation.getParam("refetchPageName")
        }
    }
    componentDidMount() {
        this.props.navigation.navigate(this.state.refetchPageName)
    }
    render() {
        return <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <ActivityIndicator size="large" style={{ flex: 1 }} color={"#1A2430"} />
        </View>
    }
}

export default ManualRefecth;