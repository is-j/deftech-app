import React from "react";
import { StyleSheet, View, Text } from "react-native";

const StockDetailsScreen = () => {
    return(
        <View style={styles.container}>
            <Text> style={styles.text}Stock Details Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignContent: "center",
        justifyContent: 'center',
        backgroundColor: '#121212',        
    },
    text: {
        fontSize: 18,
        color: "#FFFFFF",
    },
});

export default StockDetailsScreen;

