import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { getStockQuote, getCompanyDetails } from "../services/polygonAPI";


const USE_MOCK_DATA = false;

const DEFENSE_STOCKS = [
  {
    id: "1",
    name: "Palantir Technologies Inc.",
    symbol: "PLTR",
    category: "established",
    description:
      "Software company specializing in big data analytics for AI for defense and intelligence agencies ",
  },
  {
    id: "2",
    name: "Lockheed Martin Corp.",
    symbol: "LMT",
    category: "established",
    description:
      "Aerospace, defense, security, and advanced technlogies company.",
  },
  {
    id: "3",
    name: "Raytheon Technologies Corp.",
    symbol: "RTX",
    category: "established",
    description:
      "Aerospace and defense company specializing in missle systems, sensors, and cybersecurity",
  },
  {
    id: "4",
    name: "Anduril Industries",
    symbol: "PRIVATE",
    category: "upcoming",
    description:
      "Defense technology startup focusing on autonomous systems and AI for security",
  },
  {
    id: "5",
    name: "Northrop Grumman Corp.",
    symbol: "NOC",
    category: "established",
    description:
      "Global aerospace and defense technology company specializing in autonomous systems and space",
  },
];
const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [stocksData, setStocksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (USE_MOCK_DATA) {
          const mockData = DEFENSE_STOCKS.map((stock) => {
            if (stock.symbol === "PRIVATE") {
              return {
                ...stock,
                price: "N/A",
                change: "N/A",
                changePercent: "N/A",
              };
            }
            const price = (Math.random() * 100 + 50).toFixed(2);
            const change = (Math.random() * 100 + 50).toFixed(2);
            const isPositive = parseFloat(change) >= 0;
            const changePercent = ((change / price) * 100).toFixed(2);

            return {
              ...stock,
              price,
              change: isPositive ? `+${change}` : `${change}`,
              changePercent: `${isPositive ? '+' : ''}${changePercent}%`,
            };
          });

          setStocksData(mockData);
          setLoading(false);
          return;
        }

        const publicStocks = DEFENSE_STOCKS.filter(
          (stock) => stock.symbol !== "PRIVATE"
        );

        const promises = publicStocks.map((stock) => getStockQuote(stock.symbol));

        const results = await Promise.all(promises);

        const updatedStocks = DEFENSE_STOCKS.map((stock) => {
          if (stock.symbol == "PRIVATE") {
            return {
              ...stock,
              price: "N/A",
              change: "N/A",
              changePercent: "N/A",
            };
          }

          const index = publicStocks.findIndex(
            (s) => s.symbol === stock.symbol
          );
          const quoteData = results[index];
          console.log(`Response data structure for ${stock.symbol}:`, JSON.stringify(quoteData));

          if (quoteData && quoteData.results && quoteData.results.length > 0) {
            const result = quoteData.results[0];
            const price = result.c.toFixed(2);
            const change = (result.c - result.o).toFixed(2);
            const changePercent = ((change / result.o) * 100).toFixed(2);

            return {
              ...stock,
              price,
              change: change >= 0 ? `${change}` : change,
              changePercent: `${changePercent}%`,
            };
          }

          return {
            ...stock,
            price: "N/A",
            change: "N/A",
            changePercent: "N/A",
          };
        });

        console.log("updating stocks data: ", updatedStocks);

        setStocksData(updatedStocks);
        console.log("settling loading to false")
        setLoading(true);
      } catch (error) {
        console.error("error fetching stock data: ", error);
        setError("Failed to fetch stock data, try again later");
        setLoading(false);

        setStocksData(
          DEFENSE_STOCKS.map((stock) => ({
            ...stock,
            price: "N/A",
            change: "N/A",
            changePercent: "N/A",
          }))
        );
      }
    };

    fetchStockData();

    const intervalId = setInterval(fetchStockData, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const filteredStocks = stocksData.filter((stock) => {
    const matchesSearch =
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || stock.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const renderStockItem = ({ item }) => (
    <TouchableOpacity
      style={styles.stockCard}
      onPress={() => navigation.navigate("Details", { stock: item })}
    >
      <View style={styles.stockHeader}>
        <Text style={styles.stockName}>{item.name}</Text>
        {item.symbol !== "PRIVATE" ? (
        <Text style={[styles.stockSymbol, parseFloat(item.change) >= 0 ? styles.positiveChange : styles.negativeChange]}>{item.symbol}
        </Text>
        ) : (
          <Text style={styles.privateSymbol}>PRIVATE</Text>
        )}
      </View>

      <Text style={styles.stockDescription} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.stockMetrics}>
        {item.symbol !== "PRIVATE" ? ( 
          item.price !== "N/A" ? (
            <>
              <Text style={styles.stockPrice}>${item.price}</Text>
              <Text
                style={[
                  styles.stockChange,
                  parseFloat(item.change) >= 0 ?  styles.positiveChange : styles.negativeChange

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

  const renderCategoryFilter = () => (
    <View style={styles.categoryFilter}>
      <TouchableOpacity
        style={[
          styles.categoryButton,
          selectedCategory === "all" && styles.activeCategoryButton,
        ]}
        onPress={() => setSelectedCategory("all")}
      >
        <Text style={styles.categoryButtonText}>All</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.categoryButton,
          selectedCategory === "established" && styles.activeCategoryButton,
        ]}
        onPress={() => setSelectedCategory("established")}
      >
        <Text style={styles.categoryButtonText}>Established</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.categoryButton,
          selectedCategory === "upcoming" && styles.activeCategoryButton,
        ]}
        onPress={() => setSelectedCategory("upcoming")}
      >
        <Text style={styles.categoryButtonText}>Upcoming</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search defense stocks..."
        placeholderTextColor="#999999"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {renderCategoryFilter()}

      {loading && stocksData.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00FF00" />
          <Text style={styles.loadingText}>Loading defense stocks...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredStocks}
          renderItem={renderStockItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.stockList}
          refreshing={loading}
          onRefresh={() => {
            setLoading(true);
            setStocksData([]);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
  },
  searchBar: {
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    padding: 12,
    color: "#FFFFFF",
    marginBottom: 16,
  },
  categoryFilter: {
    flexDirection: "row",
    marginBottom: 16,
  },
  categoryButton:{
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16, 
    backgroundColor: '#2A2A2A', 
    marginRight: 8,
  },
  activeCategoryButton: {
    backgroundColor: '#006600',
  },
  categoryButtonText:{
    color: "#FFFFFF"
  },
  stockList:{
    paddingBottom: 16,
  },
  stockCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12, 
    padding: 16,
    marginBottom: 12,
  },
  stockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stockName: {
    color: "#FFFFFF", 
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  stockSymbol: {
    fontSize: 14, 
    fontWeight: 'bold',
    marginLeft: 8,
  },
  stockDescription: {
    color: '#CCCCCC',
    fontSize: 14, 
    marginBottom: 12,
  },
  stockMetrics:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockPrice: {
    color: "#FFFFFF", 
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 12,
  },
  stockChange: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  positiveChange: {
    color: '#00FF00',
  },
  negativeChange: {
    color: '#FF4444',
  },
  privateStock: {
    color: '#BBBBBB',
    fontStyle: 'italic',
  },
  loadingPrice: {
    color: '#AAAAAA',
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16, 
    marginTop: 18,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FF4444',
    textAlign: 'center'
  },
  privateSymbol: {
    color: '#BBBBBB',
    fontSize: 14, 
    fontWeight: 'bold',
    marginLeft: 8,
  },
  
});

export default HomeScreen;
