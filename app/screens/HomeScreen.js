import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {getDailyStockData, getCompanyOverview, getQuote} from '../services/alphaVantageService'


const DEFENSE_STOCKS=[
  {
    id: '1',
    name: 'Palantir Technologies Inc.',
    symbol: 'PLTR',
    category: 'established',
    description: 'Software company specializing in big data analytics for AI for defense and intelligence agencies ',

  },
  {
    id: '2',
    name: 'Lockheed Martin Corp.',
    symbol: 'LMT',
    category: 'established',
    description: 'Aerospace, defense, security, and advanced technlogies company.',
  },
  {
    id: '3',
    name: 'Raytheon Technologies Corp.',
    symbol: 'RTX',
    category: 'established',
    description: 'Aerospace and defense company specializing in missle systems, sensors, and cybersecurity',
  },
  {
    id: '4',
    name: 'Anduril Industries',
    symbol: 'PRIVATE',
    category: 'upcoming',
    description: 'Defense technology startup focusing on autonomous systems and AI for security',
  },
  {
    id: '5',
    name: 'Northrop Grumman Corp.',
    symbol: 'NOC',
    category: 'established',
    description: 'Global aerospace and defense technology company specializing in autonomous systems and space',
  },
];
const HomeScreen = ({navigation}) => {

  const[searchQuery, setSearchQuery] = useState('');
  const[selectedCategory, setSelectedCategory] = useState('all');
  const[stocksData, setStocksData] = useState([]);
  const[loading, setLoading] = useState(true);
  const[error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try{
        setLoading(true);
        setError(null);

        const publicStocks = DEFENSE_STOCKS.filter(stock => stock.symbol !=='PRIVATE');

        const promises = publicStocks.map(stock => getQuote(stock.symbol));

        const results = await Promise.all(promises);

        const updatedStocks = DEFENSE_STOCKS.map(stock => {

          if(stock.symbol == 'PRIVATE'){
            return {...stock, price: 'N/A', change: 'N/A', changePercent: 'N/A'};
          }

          const index = publicStocks.findIndex(s => s.symbol === stock.symbol);
          const quoteData = results[index]['Global Quote'];

          if(quoteData){
            const price = parseFloat(quoteData['0.5. price']).toFixed(2);
            const change = parseFloat(quoteData['0.9. change']).toFixed(2);
            const changePercent = quoteData['10. change percent'].replace('%', '');

            return{
              ...stock,
              price,
              change: change >= 0 ? '\${change}' : change,
              changePercent: '${changePercent}%'
            };

          }

          return{...stock, price: 'N/A', change: 'N/A', changePercent: 'N/A'};
        });

        setStocksData(updatedStocks);
        setLoading(false);

      } catch (error){
        console.error('error fetching stock data: ', error);
        setError('Failed to fetch stock data, try again later');
        setLoading(false);

        setStocksData(DEFENSE_STOCKS.map(stock => ({
          ...stock,
          price: 'N/A',
          change: 'N/A',
          changePercent: 'N/A'
        })));
      }
    };

    fetchStockData();

    const intervalId = setInterval(fetchStockData, 5*60*1000);

    return () => clearInterval(intervalId);

  },[]);

  const filteredStocks = stocksData.filter(stock  => {

    const matchesSearch = stock.name.toLowerCase().includes(searchQuery.toLowerCase()) || stock.symbol.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || stock.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const renderStockItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.stockCard}
      onPress={() => navigation.navigate('Details', { stock: item })}
    >
      <View style={styles.stockHeader}>
        <Text style={styles.stockName}>{item.name}</Text>
        <Text style={styles.stockSymbol}>{item.symbol}</Text>
      </View>
      
      <Text style={styles.stockDescription} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.stockMetrics}>
        {item.symbol !== 'PRIVATE' ? (
          item.price !== 'N/A' ? (
            <>
              <Text style={styles.stockPrice}>${item.price}</Text>
              <Text
                style={[
                  styles.stockChange,
                  item.change.startsWith('+') ? styles.positiveChange : styles.negativeChange
                ]}
              >
                {item.change} ({item.changePercent})
              </Text>
            </>
          ) : (
            <Text style={styles.loadingPrice}>Loading price data...</Text>
          )
        ) : (
          <Text style={styles.privateStock}>Private Company</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const renderCategoryFilter = () => (
  <View style={styles.categoryFilter}>
    <TouchableOpacity stle={[styles.categoryButton, selectedCategory === 'all' && styles.activeCategoryButton]} onPress={() => setSelectedCategory('all')}>
      <Text style={styles.categoryButtonText}>All</Text>
    </TouchableOpacity>

    <TouchableOpacity style={[styles.categoryButton, selectedCategory === 'established' && styles.activeCategoryButton]} onPress={() => setSelectedCategory('established')}>
      <Text style={styles.categoryButtonText}>Established</Text>
    </TouchableOpacity>

  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  text:{
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default HomeScreen;