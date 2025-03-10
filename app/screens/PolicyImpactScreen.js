import React from "react";
import { StyleSheet, View, Text } from "react-native";

const PolicyImpactScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Policy Impact Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#121212',
    },
    text: {
        fontSize: 18,
        color: '#FFFFFF',
    },
});

export default PolicyImpactScreen;