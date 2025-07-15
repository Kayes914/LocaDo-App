import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { 
  HomeScreen, 
  ItemsScreen,
  ItemDetailsScreen, 
  ChatListScreen, 
  ChatDetailScreen, 
  SearchScreen,
  ExpertsScreen,
  PostsScreen,
  ProfileScreen,
  CreatePostScreen
} from '../screens';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { BuySellItem } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

// This is a simplified navigation demo
// In a real app, you'd use React Navigation or similar

interface AppNavigatorProps {}

interface NavigationStackItem {
  screen: 'Home' | 'Items' | 'ItemDetails' | 'ChatList' | 'ChatDetail' | 'Search' | 'Experts' | 'Posts' | 'Profile' | 'CreatePost' | 'Login' | 'Register';
  params?: {
    item?: BuySellItem;
    conversation?: any;
    searchQuery?: string;
  };
}

const AppNavigator: React.FC<AppNavigatorProps> = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { colors } = useTheme();
  
  const [navigationStack, setNavigationStack] = React.useState<NavigationStackItem[]>([
    { screen: 'Home' } // Default to Home, allowing guest browsing
  ]);

  const navigate = (screen: string, params?: any) => {
    const newScreen = screen as 'Home' | 'Items' | 'ItemDetails' | 'ChatList' | 'ChatDetail' | 'Search' | 'Experts' | 'Posts' | 'Profile' | 'CreatePost' | 'Login' | 'Register';
    
    setNavigationStack(prevStack => [
      ...prevStack,
      { screen: newScreen, params }
    ]);
  };

  const replace = (screen: string, params?: any) => {
    const newScreen = screen as 'Home' | 'Items' | 'ItemDetails' | 'ChatList' | 'ChatDetail' | 'Search' | 'Experts' | 'Posts' | 'Profile' | 'CreatePost' | 'Login' | 'Register';
    
    // Replace the current screen instead of adding to stack
    setNavigationStack(prevStack => {
      const newStack = [...prevStack];
      newStack[newStack.length - 1] = { screen: newScreen, params };
      return newStack;
    });
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
    replace,
    goBack
  };

  const getCurrentScreen = (): NavigationStackItem => {
    return navigationStack[navigationStack.length - 1] || { screen: 'Home' };
  };

  // Update navigation stack when auth state changes
  React.useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // If user is authenticated but on auth screens, go to Home
        const currentScreen = getCurrentScreen();
        if (currentScreen.screen === 'Login' || currentScreen.screen === 'Register') {
          setNavigationStack([{ screen: 'Home' }]);
        }
      } else {
        // If user is not authenticated, allow guest browsing but handle explicit logout
        const currentScreen = getCurrentScreen();
        const mainScreens = ['Home', 'Items', 'Search', 'Experts', 'Posts', 'Profile', 'CreatePost'];
        
        // Only force redirect to Login if we're not on a main screen
        // This allows guest browsing while still handling logout properly
        if (!mainScreens.includes(currentScreen.screen)) {
          setNavigationStack([{ screen: 'Login' }]);
        }
      }
    }
  }, [isAuthenticated, isLoading]);

  // Show loading spinner while checking auth status
  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const renderScreen = () => {
    const currentScreen = getCurrentScreen();
    
    switch (currentScreen.screen) {
      case 'Home':
        return <HomeScreen navigation={mockNavigation} />;
      case 'Items':
        return <ItemsScreen navigation={mockNavigation} />;
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
      case 'Experts':
        return <ExpertsScreen navigation={mockNavigation} />;
      case 'Posts':
        return <PostsScreen navigation={mockNavigation} />;
      case 'Profile':
        return <ProfileScreen navigation={mockNavigation} />;
      case 'CreatePost':
        return <CreatePostScreen navigation={mockNavigation} />;
      case 'Login':
        return <LoginScreen navigation={mockNavigation} />;
      case 'Register':
        return <RegisterScreen navigation={mockNavigation} />;
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator; 