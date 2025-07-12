import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavigation } from '../components/navigation';
import { SearchHeader } from '../components/common';
import { BuySellItem } from '../types/item';

interface ItemsScreenProps {
  navigation?: {
    navigate: (screen: string, params?: any) => void;
  };
}

const ItemsScreen: React.FC<ItemsScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const communityItems: BuySellItem[] = [
    {
      id: 1,
      title: 'iPhone 14 Pro - Excellent Condition',
      price: '৳85,000',
      location: 'Gulshan 2',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
      type: 'sell',
      category: 'Electronics',
      description: 'Used for 6 months only. All accessories included. No scratches.',
      condition: 'Excellent',
      postedBy: 'Ahmed Khan',
      postedDate: '2 days ago',
      contact: {
        name: 'Ahmed Khan',
        phone: '01711-123456'
      }
    },
    {
      id: 2,
      title: '2 Bedroom Apartment for Rent',
      price: '৳25,000/month',
      location: 'Banani',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=300&fit=crop',
      type: 'rent',
      category: 'Real Estate',
      description: 'Fully furnished apartment with balcony. Family preferred.',
      postedBy: 'Fatima Rahman',
      postedDate: '1 day ago',
      contact: {
        name: 'Fatima Rahman',
        phone: '01812-654321'
      }
    },
    {
      id: 3,
      title: 'Study Table with Chair',
      price: '৳8,000',
      location: 'Dhanmondi',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
      type: 'sell',
      category: 'Furniture',
      description: 'Solid wood table, perfect for students. Chair included.',
      condition: 'Good',
      postedBy: 'Karim Uddin',
      postedDate: '3 days ago',
      contact: {
        name: 'Karim Uddin',
        phone: '01911-789012'
      }
    },
    {
      id: 4,
      title: 'Honda Civic for Rent',
      price: '৳3,500/day',
      location: 'Uttara',
      image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=300&h=300&fit=crop',
      type: 'rent',
      category: 'Vehicles',
      description: 'Well maintained car for daily rent. Driver available on request.',
      postedBy: 'Rashid Mia',
      postedDate: '5 hours ago',
      contact: {
        name: 'Rashid Mia',
        phone: '01711-345678'
      }
    },
    {
      id: 5,
      title: 'Gaming Laptop - MSI',
      price: '৳95,000',
      location: 'Mirpur',
      image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=300&h=300&fit=crop',
      type: 'sell',
      category: 'Electronics',
      description: 'High-end gaming laptop. RTX 3060, 16GB RAM. Perfect for gaming.',
      condition: 'Like New',
      postedBy: 'Nazrul Islam',
      postedDate: '1 week ago',
      contact: {
        name: 'Nazrul Islam',
        phone: '01812-987654'
      }
    },
    {
      id: 6,
      title: 'Dining Set - 6 Chairs',
      price: '৳25,000',
      location: 'Gulshan 1',
      image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=300&h=300&fit=crop',
      type: 'sell',
      category: 'Furniture',
      description: 'Beautiful wooden dining set. Moving abroad, must sell.',
      condition: 'Excellent',
      postedBy: 'Sarah Ahmed',
      postedDate: '4 days ago',
      contact: {
        name: 'Sarah Ahmed',
        phone: '01711-456789'
      }
    },
  ];

  const handleNavigationPress = (tab: string) => {
    if (!navigation) return;
    
    switch (tab) {
      case 'Home':
        navigation.navigate('Home');
        break;
      case 'Items':
        // Already on Items screen
        break;
      case 'Post':
        navigation.navigate('CreatePost');
        break;
      case 'Experts':
        navigation.navigate('Experts');
        break;
      case 'Profile':
        navigation.navigate('Profile');
        break;
      default:
        console.log('Navigate to:', tab);
    }
  };

  const handleItemPress = (item: BuySellItem) => {
    console.log('Opening item details:', item.title);
    if (navigation) {
      navigation.navigate('ItemDetails', { item });
    }
  };



  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderItemCard = (item: BuySellItem) => (
    <View style={styles.itemWrapper} key={item.id}>
      <TouchableOpacity
        style={styles.itemCard}
        onPress={() => handleItemPress(item)}
        activeOpacity={0.7}
      >
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.itemPrice}>{item.price}</Text>
          <Text style={styles.itemLocation}>{item.location}</Text>
        </View>
        {item.type === 'rent' && (
          <View style={styles.typeTag}>
            <Text style={styles.typeText}>RENT</Text>
          </View>
        )}
      </TouchableOpacity>
      

    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      <View style={styles.container}>
        <SearchHeader
          navigation={navigation || { navigate: () => {}, goBack: () => {} }}
          searchText={searchText}
          onSearchChange={setSearchText}
          placeholder="Search items for sale or rent..."
          showBackButton={false}
          variant="home"
        />

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.headerSection}>
            <Text style={styles.headerTitle}>Community Items</Text>
            <Text style={styles.headerSubtitle}>
              Local items for sale and rent from your neighbors
            </Text>
          </View>

          <View style={styles.itemsContainer}>
            {communityItems.map(renderItemCard)}
          </View>
        </ScrollView>

        <BottomNavigation 
          activeTab="Items" 
          onTabPress={handleNavigationPress} 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 20,
  },
  itemsContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemWrapper: {
    width: '48%',
    marginBottom: 20,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    position: 'relative',
    marginBottom: 12,
    height: 200, // Fixed height for consistent card sizes
    overflow: 'hidden', // Prevent content overflow
  },
  itemImage: {
    width: '100%',
    height: 100, // Reduced from 120 to fit better
    backgroundColor: '#F3F4F6',
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
  },
  itemContent: {
    padding: 10, // Reduced from 12 to save space
    flex: 1, // Take remaining space
    justifyContent: 'space-between', // Distribute content evenly
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 6,
    lineHeight: 17,
    height: 34, // Fixed height for 2 lines (17 * 2)
    textAlignVertical: 'top',
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  itemLocation: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '400',
  },
  typeTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  typeText: {
    fontSize: 9,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.5,
  },

});

export default ItemsScreen; 