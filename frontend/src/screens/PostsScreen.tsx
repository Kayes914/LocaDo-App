import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomNavigation } from '../components/navigation';

interface PostsScreenProps {
  navigation?: {
    navigate: (screen: string, params?: any) => void;
  };
}

const PostsScreen: React.FC<PostsScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const handleNavigationPress = (tab: string) => {
    if (!navigation) return;
    
    switch (tab) {
      case 'Home':
        navigation.navigate('Home');
        break;
      case 'Experts':
        navigation.navigate('Experts');
        break;
      case 'Post':
        navigation.navigate('CreatePost');
        break;
      case 'MyPosts':
        // Already on Posts screen
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
        <Text style={styles.title}>My Posts</Text>
        <Text style={styles.subtitle}>Manage your listings and requests</Text>
      </View>

      <BottomNavigation 
        activeTab="MyPosts" 
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

export default PostsScreen;