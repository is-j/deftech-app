import React from "react";
import { StyleSheet, View, Text } from "react-native";


const NewsScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>News Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});

export default NewsScreen