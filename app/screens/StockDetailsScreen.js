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

    const getChartData = () => {
        if(!historicalData || !historicalData.results){
            return null;
        }
        const results = [...historicalData.results].reverse();

        let filteredResults;
        const now = new Date();

        switch(timeRange){
            case '1D':
                filteredResults = results.slice(-1);
                break;
            case '1W':
                filteredResults = results.slice(-5);
                break;
            case '1M':
                filteredResults = results.slice(-22);
                break;
            case '3M':
                filteredResults = results.slice(-66)
                break;
            case '1Y':
                filteredResults = results;
                break;
            default:
                filteredResults = results.slice(-5);
        }

        //extracting closing price/date
        const prices = filteredResults.map(day => day.c);

        //labels
        const dates = filteredResults.map(day => {
            const date = new Date(day.t);
            return `${date.getMonth() + 1}/${date.getDate()}`;
        });
        
        //make sure no overcrowd
        const labelCount = Math.min(5, dates.length);
        const step = Math.floor(dates.length/labelCount);
        const labels = dates.filter((_, i) => i % step === 0);

        return{
            labels, 
            datasets: [
                {
                    data: prices,
                    color: (opacity = 1) => prices[0] < prices[prices.length - 1] ? 
                    `rgba(0,255,0 ${opacity})` : `rgba(255, 0,0 ${opacity})`,
                    strokeWidth: 2
                }
            ]
        };
    };

    //function to render time range selector
    const renderTimeRangeSelector = () => (
        <View style={style.timeRangeContainer}>

        </View>
    )

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

