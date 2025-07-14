import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { BottomNavigation } from '../components/navigation';
import { SearchHeader } from '../components/common';
import { BuySellItem, HelpPost, WorkOffer } from '../types/item';
import { useTheme } from '../contexts/ThemeContext';

interface HomeScreenProps {
  navigation?: {
    navigate: (screen: string, params?: any) => void;
  };
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode, colors } = useTheme();
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
      case 'Items':
        navigation.navigate('Items');
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

  // Dynamic styles based on theme
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      backgroundColor: colors.background,
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
      color: colors.text,
    },
    viewAll: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: '500',
    },
    cardsContainer: {
      paddingLeft: 20,
      paddingRight: 8,
    },
    
    // Buy & Sell Cards
    card: {
      width: 140,
      backgroundColor: colors.card,
      borderRadius: 12,
      marginRight: 16,
      borderWidth: 1,
      borderColor: colors.border,
      position: 'relative',
      height: 200,
      overflow: 'hidden',
    },
    cardImage: {
      width: '100%',
      height: 100,
      backgroundColor: colors.surfaceSecondary,
      borderTopLeftRadius: 11,
      borderTopRightRadius: 11,
    },
    cardContent: {
      padding: 10,
      flex: 1,
      justifyContent: 'space-between',
    },
    cardTitle: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
      marginBottom: 6,
      lineHeight: 17,
      height: 34,
      textAlignVertical: 'top',
    },
    cardPrice: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    cardLocation: {
      fontSize: 12,
      color: colors.textSecondary,
      fontWeight: '400',
    },
    typeTag: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: colors.success,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.card,
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

    // Help Cards
    helpCard: {
      width: 200,
      backgroundColor: colors.card,
      borderRadius: 12,
      marginRight: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
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
      backgroundColor: colors.surfaceSecondary,
    },
    techBadge: {
      backgroundColor: isDarkMode ? '#1E3A8A' : '#EFF6FF',
    },
    studyBadge: {
      backgroundColor: isDarkMode ? '#92400E' : '#FFFBEB',
    },
    homeBadge: {
      backgroundColor: isDarkMode ? '#14532D' : '#F0FDF4',
    },
    categoryText: {
      fontSize: 10,
      fontWeight: '600',
      color: colors.text,
    },
    helpTime: {
      fontSize: 11,
      color: colors.textTertiary,
    },
    helpTitle: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
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
      color: colors.textSecondary,
    },
    urgencyTag: {
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      backgroundColor: colors.surfaceSecondary,
    },
    urgentTag: {
      backgroundColor: isDarkMode ? '#7F1D1D' : '#FEF2F2',
    },
    urgencyText: {
      fontSize: 9,
      fontWeight: '600',
      color: colors.text,
    },

    // Work Cards
    workCard: {
      width: 160,
      backgroundColor: colors.card,
      borderRadius: 12,
      marginRight: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
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
      color: colors.text,
      lineHeight: 18,
      flex: 1,
    },
    workBudget: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.success,
      marginBottom: 12,
    },
    workFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    workLocation: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    workTime: {
      fontSize: 11,
      color: colors.textTertiary,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      
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

export default HomeScreen; 