import React from "react";
import { StyleSheet, View, Text } from "react-native";
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
const HomeScreen = () => {
  return(
    <View style={styles.container}>
      <Text style={styles.text}>Defense Stock Home Screen</Text>
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
  text:{
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default HomeScreen;