import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HomeScreen, ItemDetailsScreen, ChatListScreen, ChatDetailScreen, SearchScreen } from '../screens';
import { BuySellItem } from '../types';

// This is a simplified navigation demo
// In a real app, you'd use React Navigation or similar

interface AppNavigatorProps {}

interface NavigationStackItem {
  screen: 'Home' | 'ItemDetails' | 'ChatList' | 'ChatDetail' | 'Search';
  params?: {
    item?: BuySellItem;
    conversation?: any;
    searchQuery?: string;
  };
}

const AppNavigator: React.FC<AppNavigatorProps> = () => {
  const [navigationStack, setNavigationStack] = React.useState<NavigationStackItem[]>([
    { screen: 'Home' }
  ]);

  const navigate = (screen: string, params?: any) => {
    const newScreen = screen as 'Home' | 'ItemDetails' | 'ChatList' | 'ChatDetail' | 'Search';
    
    setNavigationStack(prevStack => [
      ...prevStack,
      { screen: newScreen, params }
    ]);
  };

  const goBack = () => {
    setNavigationStack(prevStack => {
      if (prevStack.length > 1) {
        // Remove the current screen and go back to previous one
        return prevStack.slice(0, -1);
      }
      // If only one screen in stack, stay on it
      return prevStack;
    });
  };

  const mockNavigation = {
    navigate,
    goBack
  };

  const getCurrentScreen = (): NavigationStackItem => {
    return navigationStack[navigationStack.length - 1] || { screen: 'Home' };
  };

  const renderScreen = () => {
    const currentScreen = getCurrentScreen();
    
    switch (currentScreen.screen) {
      case 'Home':
        return <HomeScreen navigation={mockNavigation} />;
      case 'ItemDetails':
        if (currentScreen.params?.item) {
          return (
            <ItemDetailsScreen 
              route={{ params: { item: currentScreen.params.item } }}
              navigation={mockNavigation}
            />
          );
        }
        return <HomeScreen navigation={mockNavigation} />;
      case 'ChatList':
        return <ChatListScreen navigation={mockNavigation} />;
      case 'ChatDetail':
        if (currentScreen.params?.conversation) {
          return (
            <ChatDetailScreen 
              route={{ params: { conversation: currentScreen.params.conversation } }}
              navigation={mockNavigation}
            />
          );
        }
        return <ChatListScreen navigation={mockNavigation} />;
      case 'Search':
        return <SearchScreen navigation={mockNavigation} route={{ params: currentScreen.params }} />;
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