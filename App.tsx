import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredStocks = [
    { name: 'Palantir', symbol: 'PLTR', price: 15.50, change: '+0.50' },
    { name: 'Anduril', symbol: 'ANDU', price: 22.00, change: '-0.20' },

  ];

  const newsAndAnalysis = [
    { title: 'New Policy May Boost Defense Spending', date: '2025-03-08' },
    { title: 'Palantir Wins Major Government Contract', date: '2025-03-07' },

  ];

  const renderStockItem = ({ item }) => (
    <TouchableOpacity style={styles.stockItem}>
      <Text style={styles.stockName}>{item.name} ({item.symbol})</Text>
      <View style={styles.stockMetrics}>
        <Text style={styles.stockPrice}>{item.price}</Text>
        <Text style={[styles.stockChange, item.change.startsWith('+') ? styles.positiveChange : styles.negativeChange]}>
          {item.change}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderNewsItem = ({ item }) => (
    <View style={styles.newsItem}>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsDate}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* App Title */}
      <Text style={styles.title}>Defense Stocks Tracker</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for defense stocks..."
        placeholderTextColor="#FFFFFF"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Featured Stocks */}
      <FlatList
        data={featuredStocks}
        renderItem={renderStockItem}
        keyExtractor={(item) => item.symbol}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.stockList}
      />

      {/* Stock Charts */}

      {/* <View style={styles.container}>
        <StockChart symbol="PLTR"/>
      </View> */}


      {/* News & Analysis */}
      <View style={styles.newsSection}>
        <Text style={styles.newsHeading}>News & Analysis</Text>
        <FlatList
          data={newsAndAnalysis}
          renderItem={renderNewsItem}
          keyExtractor={(item) => item.title}
        />
      </View>

      {/* Stock Predictor */}
      <View style={styles.predictorSection}>
        <Text style={styles.predictorHeading}>Stock Predictor</Text>
        <Text style={styles.predictorResult}>
          <Text style={styles.predictorSymbol}>PLTR: </Text>
          <Text style={styles.positiveChange}>▲</Text> 
          <Text style={styles.predictorConfidence}>(80% Confidence)</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
    padding: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: '#242424', 
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    color: '#FFFFFF',
  },
  stockList: {
    marginBottom: 20,
  },
  stockItem: {
    backgroundColor: '#1E1E1E', 
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    alignItems: 'center',
  },
  stockName: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 5,
  },
  stockMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockPrice: {
    color: '#FFFFFF',
    fontSize: 18,
    marginRight: 10,
  },
  stockChange: {
    fontSize: 16,
  },
  positiveChange: {
    color: '#00FF00', 
  },
  negativeChange: {
    color: '#FF0000', 
  },
  newsSection: {
    marginBottom: 20,
  },
  newsHeading: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  newsItem: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  newsTitle: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  newsDate: {
    color: '#AAAAAA', 
    fontSize: 14,
  },
  predictorSection: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  predictorHeading: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  predictorResult: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  predictorSymbol: {
    color: '#FFFFFF',
    fontSize: 18,
    marginRight: 5,
  },
  predictorConfidence: {
    color: '#AAAAAA',
    fontSize: 16,
  },
});