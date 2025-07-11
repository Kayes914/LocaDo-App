import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { BottomNavigation } from '../components/navigation';
import { SearchHeader } from '../components/common';
import { BuySellItem, HelpPost, WorkOffer } from '../types/item';

interface HomeScreenProps {
  navigation?: {
    navigate: (screen: string, params?: any) => void;
  };
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = React.useState('');
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

  // Search suggestions data
  const searchSuggestions = [
    'iPhone', 'phone', 'mobile phone', 'smartphone', 'Android phone',
    'laptop', 'computer', 'MacBook', 'gaming laptop', 'notebook',
    'apartment', 'house', 'room', 'office space', 'flat',
    'car', 'vehicle', 'bike', 'motorcycle', 'bicycle',
    'furniture', 'table', 'chair', 'sofa', 'bed',
    'electronics', 'gadgets', 'camera', 'headphones', 'speaker',
    'tutor', 'teacher', 'math help', 'english help', 'study help',
    'electrician', 'plumber', 'cleaner', 'driver', 'cook',
    'web developer', 'designer', 'programmer', 'IT support'
  ];

  const getFilteredSuggestions = (text: string) => {
    if (!text.trim()) return [];
    
    return searchSuggestions
      .filter(suggestion => 
        suggestion.toLowerCase().includes(text.toLowerCase()) ||
        text.toLowerCase().includes(suggestion.toLowerCase())
      )
      .slice(0, 5); // Limit to 5 suggestions
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    setShowSuggestions(text.length > 0);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    if (searchText.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    // Delay hiding suggestions to allow for suggestion tap
    setTimeout(() => setShowSuggestions(false), 150);
  };

  const handleSuggestionPress = (suggestion: string) => {
    setSearchText(suggestion);
    setShowSuggestions(false);
    // Navigate to search page with the selected suggestion
    navigation?.navigate('Search', { searchQuery: suggestion });
  };

  const handleSearchSubmit = () => {
    if (searchText.trim()) {
      setShowSuggestions(false);
      navigation?.navigate('Search', { searchQuery: searchText.trim() });
    }
  };

  const handleItemPress = (item: BuySellItem) => {
    // For now, we'll just show an alert since we don't have full navigation setup
    // In a real app with React Navigation, this would be:
    // navigation?.navigate('ItemDetails', { item });
    console.log('Navigate to item details:', item.title);
    
    // Simulate navigation for demo purposes
    if (navigation) {
      navigation.navigate('ItemDetails', { item });
    } else {
      alert(`Opening details for: ${item.title}`);
    }
  };

  // Extended sample data for search
  const allItems: BuySellItem[] = [
    {
      id: 1,
      title: 'iPhone 14 Pro',
      price: '৳85,000',
      location: 'Gulshan 2',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=150&h=150&fit=crop',
      type: 'sell',
      category: 'Electronics'
    },
    {
      id: 2,
      title: 'Apartment for Rent',
      price: '৳25,000/month',
      location: 'Banani',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=150&h=150&fit=crop',
      type: 'rent',
      category: 'Real Estate'
    },
    {
      id: 3,
      title: 'Study Table',
      price: '৳8,000',
      location: 'Dhanmondi',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop',
      type: 'sell',
      category: 'Furniture'
    },
    {
      id: 4,
      title: 'Samsung Galaxy S23',
      price: '৳65,000',
      location: 'Uttara',
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=150&h=150&fit=crop',
      type: 'sell',
      category: 'Electronics'
    },
    {
      id: 5,
      title: 'Office Space for Rent',
      price: '৳40,000/month',
      location: 'Gulshan 1',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=150&h=150&fit=crop',
      type: 'rent',
      category: 'Real Estate'
    },
    {
      id: 6,
      title: 'Gaming Laptop',
      price: '৳95,000',
      location: 'Banani',
      image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=150&h=150&fit=crop',
      type: 'sell',
      category: 'Electronics'
    },
    {
      id: 7,
      title: 'Dining Set',
      price: '৳25,000',
      location: 'Dhanmondi',
      image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=150&h=150&fit=crop',
      type: 'sell',
      category: 'Furniture'
    },
    {
      id: 8,
      title: 'Car for Rent',
      price: '৳3,500/day',
      location: 'Gulshan 2',
      image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=150&h=150&fit=crop',
      type: 'rent',
      category: 'Vehicles'
    },
    {
      id: 9,
      title: 'MacBook Air M2',
      price: '৳125,000',
      location: 'Banani',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=150&h=150&fit=crop',
      type: 'sell',
      category: 'Electronics'
    },
    {
      id: 10,
      title: 'Sofa Set',
      price: '৳35,000',
      location: 'Uttara',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&h=150&fit=crop',
      type: 'sell',
      category: 'Furniture'
    }
  ];

  // Sample data for different sections (first 3 items from allItems)
  const buySellItems: BuySellItem[] = allItems.slice(0, 3);

  const helpPosts: HelpPost[] = [
    {
      id: 1,
      title: 'Need help with laptop repair',
      category: 'Tech',
      urgency: 'Today',
      location: 'Gulshan 1',
      time: '2h ago'
    },
    {
      id: 2,
      title: 'Looking for math tutor',
      category: 'Study',
      urgency: 'This week',
      location: 'Banani',
      time: '5h ago'
    },
    {
      id: 3,
      title: 'Need AC installation help',
      category: 'Home',
      urgency: 'Now',
      location: 'Gulshan 2',
      time: '1h ago'
    },
  ];

  const workOffers: WorkOffer[] = [
    {
      id: 1,
      title: 'Looking for electrician',
      budget: '৳2,000',
      category: 'Home',
      location: 'Dhanmondi',
      time: '3h ago'
    },
    {
      id: 2,
      title: 'Need web developer',
      budget: '৳15,000',
      category: 'Tech',
      location: 'Gulshan 1',
      time: '1d ago'
    },
  ];

  const handleNavigationPress = (tab: string) => {
    if (!navigation) return;
    
    switch (tab) {
      case 'Home':
        // Already on Home screen
        break;
      case 'Experts':
        navigation.navigate('Experts');
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

  const renderBuySellCard = (item: BuySellItem) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.card} 
      activeOpacity={0.7}
      onPress={() => handleItemPress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.cardPrice}>{item.price}</Text>
        <Text style={styles.cardLocation}>{item.location}</Text>
      </View>
      {item.type === 'rent' && (
        <View style={styles.typeTag}>
          <Text style={styles.typeText}>RENT</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const getBadgeStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case 'tech': return styles.techBadge;
      case 'study': return styles.studyBadge;
      case 'home': return styles.homeBadge;
      default: return styles.categoryBadge;
    }
  };

  const renderHelpCard = (item: HelpPost) => (
    <TouchableOpacity key={item.id} style={styles.helpCard} activeOpacity={0.7}>
      <View style={styles.helpHeader}>
        <View style={[styles.categoryBadge, getBadgeStyle(item.category)]}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.helpTime}>{item.time}</Text>
      </View>
      <Text style={styles.helpTitle} numberOfLines={2}>{item.title}</Text>
      <View style={styles.helpFooter}>
        <Text style={styles.helpLocation}>{item.location}</Text>
        <View style={[styles.urgencyTag, item.urgency === 'Now' && styles.urgentTag]}>
          <Text style={styles.urgencyText}>{item.urgency}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleWorkPress = (item: WorkOffer) => {
    // Navigate directly to chat for service discussion
    if (navigation) {
      navigation.navigate('ChatDetail', { 
        conversation: {
          id: `work_${item.id}`,
          otherUser: {
            id: 100 + item.id,
            name: item.category === 'Tech' ? 'Sarah Ahmed' : 'Karim Hassan',
            location: item.location
          },
          item: {
            id: item.id,
            title: item.title,
            price: item.budget,
            image: item.category === 'Tech' 
              ? 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=150&h=150&fit=crop'
              : 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=150&h=150&fit=crop',
            type: 'service'
          },
          lastMessage: {
            text: 'Hi! I saw your work request. I have experience with this type of project.',
            timestamp: '10m ago',
            senderId: 100 + item.id,
            isRead: false
          },
          unreadCount: 1,
          isActive: true
        }
      });
    }
  };

  const renderWorkCard = (item: WorkOffer) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.workCard} 
      activeOpacity={0.7}
      onPress={() => handleWorkPress(item)}
    >
      <View style={styles.workHeader}>
        <Text style={styles.workTitle} numberOfLines={2}>{item.title}</Text>
        <Ionicons name="chatbubble-outline" size={16} color="#8B5CF6" />
      </View>
      <Text style={styles.workBudget}>{item.budget}</Text>
      <View style={styles.workFooter}>
        <Text style={styles.workLocation}>{item.location}</Text>
        <Text style={styles.workTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <SearchHeader
        navigation={navigation!}
        searchText={searchText}
        onSearchChange={handleSearchChange}
        onSearchFocus={handleSearchFocus}
        onSearchBlur={handleSearchBlur}
        onSearchSubmit={handleSearchSubmit}
        showSuggestions={showSuggestions}
        suggestions={getFilteredSuggestions(searchText)}
        onSuggestionPress={handleSuggestionPress}
        variant="home"
        chatBadgeCount={3}
      />

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {/* Buy & Sell Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Buy Or Rent</Text>
            <TouchableOpacity onPress={() => navigation?.navigate('Search')}>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsContainer}
          >
            {buySellItems.map(renderBuySellCard)}
          </ScrollView>
        </View>

        {/* Need Help Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Need Help?</Text>
            <TouchableOpacity onPress={() => navigation?.navigate('Search')}>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsContainer}
          >
            {helpPosts.map(renderHelpCard)}
          </ScrollView>
        </View>

        {/* Find Work / Offer Service Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Find Work / Offer Service</Text>
            <TouchableOpacity onPress={() => navigation?.navigate('Search')}>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsContainer}
          >
            {workOffers.map(renderWorkCard)}
          </ScrollView>
        </View>
      </ScrollView>

      <BottomNavigation 
        activeTab="Home" 
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
    backgroundColor: '#FAFAFA',
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  viewAll: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  cardsContainer: {
    paddingLeft: 20,
    paddingRight: 8,
  },
  
  // Buy & Sell Cards
  card: {
    width: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 80,
    backgroundColor: '#F3F4F6',
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
    lineHeight: 18,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  cardLocation: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '400',
  },
  typeTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  typeText: {
    fontSize: 8,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Help Cards
  helpCard: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  helpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
  },
  techBadge: {
    backgroundColor: '#EFF6FF',
  },
  studyBadge: {
    backgroundColor: '#FFFBEB',
  },
  homeBadge: {
    backgroundColor: '#F0FDF4',
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#374151',
  },
  helpTime: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  helpTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 12,
    lineHeight: 18,
  },
  helpFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  helpLocation: {
    fontSize: 12,
    color: '#6B7280',
  },
  urgencyTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#F3F4F6',
  },
  urgentTag: {
    backgroundColor: '#FEF2F2',
  },
  urgencyText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#374151',
  },

  // Work Cards
  workCard: {
    width: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  workHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  workTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    lineHeight: 18,
    flex: 1,
  },
  workBudget: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 12,
  },
  workFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workLocation: {
    fontSize: 12,
    color: '#6B7280',
  },
  workTime: {
    fontSize: 11,
    color: '#9CA3AF',
  },



});

export default HomeScreen; 