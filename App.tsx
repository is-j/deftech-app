import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
//test
// import all the screens
import HomeScreen from './app/screens/HomeScreen';
import NewsScreen from './app/screens/NewsScreen';
import PolicyImpactScreen from './app/screens/PolicyImpactScreen';
import PredictorScreen from './app/screens/PredictorScreen';
import StockDetailScreen from './app/screens/PredictorScreen';
import { NavigationContainer } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Tabs.Navigator 
        screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if(route.name == 'Home'){
            iconName = focused ? 'home' : 'home-outline';
          } else if(route.name == 'Details'){
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name == "News"){
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if(route.name == 'Policy'){
            iconName = focused ? 'shield' : 'shield-outline';
          } else if (route.name == 'Predictor'){
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          }
          return <Ionicons name={iconName} size={size} color={color}/>;
        },
        tabBarActiveTintColor: '00FF00',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle:{backgroundColor: '121212', borderTopColor: '#333333'},
        headerStyle: {backgroundColor: '#121212'},
        headerTintColor: '#FFFFFF',
      })}
      >
        <Tabs.Screen name="Home" component={HomeScreen} options={{title: "Defense Stocks"}} />
        <Tabs.Screen name="Details" component={StockDetailScreen} options={{title: "Stock Details"}} />
        <Tabs.Screen name="News" component={NewsScreen} options={{title: "News & Updates"}}/>
        <Tabs.Screen name="Policy" component={PolicyImpactScreen} options={{title: "Policy Impact"}}/>
        <Tabs.Screen name="Predicor" component={PredictorScreen} options={{title: "Stock Predictor"}} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

