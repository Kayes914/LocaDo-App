import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomNavigation } from '../components/navigation';

interface ExpertsScreenProps {
  navigation?: {
    navigate: (screen: string, params?: any) => void;
  };
}

const ExpertsScreen: React.FC<ExpertsScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const handleNavigationPress = (tab: string) => {
    if (!navigation) return;
    
    switch (tab) {
      case 'Home':
        navigation.navigate('Home');
        break;
      case 'Experts':
        // Already on Experts screen
        break;
      case 'Post':
        navigation.navigate('CreatePost');
        break;
      case 'MyPosts':
        navigation.navigate('Posts');
        break;
      case 'Profile':
        navigation.navigate('Profile');
        break;
      default:
        console.log('Navigate to:', tab);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={[styles.content, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.title}>Experts</Text>
        <Text style={styles.subtitle}>Find skilled professionals for your needs</Text>
      </View>

      <BottomNavigation 
        activeTab="Experts" 
        onTabPress={handleNavigationPress} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default ExpertsScreen; 