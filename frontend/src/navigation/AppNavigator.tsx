import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HomeScreen, ItemDetailsScreen } from '../screens';
import { BuySellItem } from '../types';

// This is a simplified navigation demo
// In a real app, you'd use React Navigation or similar

interface AppNavigatorProps {}

interface NavigationState {
  currentScreen: 'Home' | 'ItemDetails';
  params?: {
    item?: BuySellItem;
  };
}

const AppNavigator: React.FC<AppNavigatorProps> = () => {
  const [navigationState, setNavigationState] = React.useState<NavigationState>({
    currentScreen: 'Home'
  });

  const navigate = (screen: string, params?: any) => {
    setNavigationState({
      currentScreen: screen as 'Home' | 'ItemDetails',
      params
    });
  };

  const goBack = () => {
    setNavigationState({
      currentScreen: 'Home'
    });
  };

  const mockNavigation = {
    navigate,
    goBack
  };

  const renderScreen = () => {
    switch (navigationState.currentScreen) {
      case 'Home':
        return <HomeScreen navigation={mockNavigation} />;
      case 'ItemDetails':
        if (navigationState.params?.item) {
          return (
            <ItemDetailsScreen 
              route={{ params: { item: navigationState.params.item } }}
              navigation={mockNavigation}
            />
          );
        }
        return <HomeScreen navigation={mockNavigation} />;
      default:
        return <HomeScreen navigation={mockNavigation} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppNavigator; 