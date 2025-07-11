import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { BottomNavigation } from '../components/navigation';
import { BuySellItem, HelpPost, WorkOffer } from '../types/item';

interface HomeScreenProps {
  navigation?: {
    navigate: (screen: string, params?: any) => void;
  };
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const handleNavigationPress = (tab: string) => {
    // Navigation logic will be implemented here
    console.log('Navigate to:', tab);
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

  // Sample data for different sections
  const buySellItems: BuySellItem[] = [
    {
      id: 1,
      title: 'iPhone 14 Pro',
      price: '৳85,000',
      location: 'Gulshan 2',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=150&h=150&fit=crop',
      type: 'sell'
    },
    {
      id: 2,
      title: 'Apartment for Rent',
      price: '৳25,000/month',
      location: 'Banani',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=150&h=150&fit=crop',
      type: 'rent'
    },
    {
      id: 3,
      title: 'Study Table',
      price: '৳8,000',
      location: 'Dhanmondi',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop',
      type: 'sell'
    },
  ];

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
      <View style={[styles.typeTag, item.type === 'rent' && styles.rentTag]}>
        <Text style={styles.typeText}>{item.type === 'rent' ? 'RENT' : 'SELL'}</Text>
      </View>
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

  const renderWorkCard = (item: WorkOffer) => (
    <TouchableOpacity key={item.id} style={styles.workCard} activeOpacity={0.7}>
      <Text style={styles.workTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.workBudget}>{item.budget}</Text>
      <View style={styles.workFooter}>
        <Text style={styles.workLocation}>{item.location}</Text>
        <Text style={styles.workTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      
      {/* Clean Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.searchContainer}>
          <Ionicons name="search-outline" size={18} color="#9CA3AF" />
          <Text style={styles.searchPlaceholder}>Search items, help, services...</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={20} color="#374151" />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {/* Buy & Sell Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Buy Or Rent</Text>
            <TouchableOpacity>
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
            <TouchableOpacity>
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
            <TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FAFAFA',
    gap: 12,
  },
  notificationButton: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 9,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    maxWidth: '85%',
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: '#9CA3AF',
    fontWeight: '400',
  },
  micButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#059669',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rentTag: {
    backgroundColor: '#F59E0B',
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
  workTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
    lineHeight: 18,
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