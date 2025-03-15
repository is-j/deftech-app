import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";

const {width : screenWidth} = Dimensions.get('window');

const StockDetailsScreen = ({route, navigation}) => {
    const {stock} = route.params || {};
    const [stockData, setStockData] = useState(null);
    const [companyData, setCompanyData] = useState(null);
    const [historicalData, setHistoricalData] =useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [time, setTimeRange] = useState('1W');

    useEffect(() => {
        const fetchData = async () => {
            if(!stock) {
                navigation.goBack();
                return;
            }

            if(stock.symbol === 'PRIVATE'){
                setLoading(false);
                return;
            }

            try{
                setLoading(true);
                setError(null);

                const today = new Date();
                const oneYearAgo = new Date();
                oneYearAgo.setFullYear(today.getFullYear() -1);

                const todayStr = today.toISOString().split('T')[0];
                const oneYearAgoStr = oneYearAgo.toISOString().split('T')[0];

                const[quoteResult, companyResult, historicalResult] = await Promise.all([
                    getStockQuote(stock.symbol),
                    getComputedDetails(stocks.symbol),
                    getHistoricalData(stock.symbol, oneYearAgoStr, todayStr)
                ]);
                setStockData(quoteResult);
                setCompanyData(companyResult);
                setHistoricalData(historicalResult);
                setLoading(false);
            } catch (error){
                console.error('Error fetching stock details: ', error);
                setError('Failed to load stock details, try again later');
                setLoading(false);
            }
        };

        fetchData();

    }, [stock, navigation]);

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

