import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  FlatList
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SearchHeader } from '../components/common';
import { BuySellItem, HelpPost, WorkOffer } from '../types/item';
import { useTheme } from '../contexts/ThemeContext';

interface SearchScreenProps {
  navigation: {
    goBack: () => void;
    navigate: (screen: string, params?: any) => void;
  };
  route?: {
    params?: {
      searchQuery?: string;
    };
  };
}

interface FilterOptions {
  category: string[];
  priceRange: { min: number; max: number };
  location: string[];
  type: string[];
  condition: string[];
  sortBy: string;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode, colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState(route?.params?.searchQuery || '');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'items' | 'services' | 'help'>('all');

  // Filter state
  const [filters, setFilters] = useState<FilterOptions>({
    category: [],
    priceRange: { min: 0, max: 200000 },
    location: [],
    type: [],
    condition: [],
    sortBy: 'recent'
  });

  // Extended sample data
  const allItems: BuySellItem[] = [
    {
      id: 1,
      title: 'iPhone 14 Pro',
      price: '৳85,000',
      location: 'Gulshan 2',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=150&h=150&fit=crop',
      type: 'sell',
      category: 'Electronics',
      condition: 'Excellent',
      postedDate: '2 days ago'
    },
    {
      id: 2,
      title: 'Apartment for Rent',
      price: '৳25,000/month',
      location: 'Banani',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=150&h=150&fit=crop',
      type: 'rent',
      category: 'Real Estate',
      condition: 'Good',
      postedDate: '1 day ago'
    },
    {
      id: 7,
      title: 'Furnished Apartment',
      price: '৳35,000/month',
      location: 'Gulshan 1',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=150&h=150&fit=crop',
      type: 'rent',
      category: 'Real Estate',
      condition: 'Excellent',
      postedDate: '3 days ago'
    },
    {
      id: 8,
      title: 'Studio Apartment',
      price: '৳18,000/month',
      location: 'Dhanmondi',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=150&h=150&fit=crop',
      type: 'rent',
      category: 'Real Estate',
      condition: 'Good',
      postedDate: '1 week ago'
    },
    {
      id: 3,
      title: 'Gaming Laptop',
      price: '৳95,000',
      location: 'Dhanmondi',
      image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=150&h=150&fit=crop',
      type: 'sell',
      category: 'Electronics',
      condition: 'Good',
      postedDate: '3 days ago'
    },
    {
      id: 4,
      title: 'Office Space',
      price: '৳40,000/month',
      location: 'Gulshan 1',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=150&h=150&fit=crop',
      type: 'rent',
      category: 'Real Estate',
      condition: 'Excellent',
      postedDate: '1 week ago'
    },
    {
      id: 5,
      title: 'Dining Set',
      price: '৳25,000',
      location: 'Uttara',
      image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=150&h=150&fit=crop',
      type: 'sell',
      category: 'Furniture',
      condition: 'Good',
      postedDate: '5 days ago'
    },
    {
      id: 6,
      title: 'Car Rental',
      price: '৳3,500/day',
      location: 'Banani',
      image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=150&h=150&fit=crop',
      type: 'rent',
      category: 'Vehicles',
      condition: 'Excellent',
      postedDate: '2 days ago'
    }
  ];

  const helpPosts: HelpPost[] = [
    {
      id: 1,
      title: 'Need laptop repair service',
      category: 'Tech',
      urgency: 'Today',
      location: 'Gulshan 1',
      time: '2h ago',
      budget: '৳2,000'
    },
    {
      id: 2,
      title: 'Looking for math tutor',
      category: 'Education',
      urgency: 'This week',
      location: 'Banani',
      time: '5h ago',
      budget: '৳5,000/month'
    },
    {
      id: 3,
      title: 'AC installation needed',
      category: 'Home',
      urgency: 'Now',
      location: 'Dhanmondi',
      time: '1h ago',
      budget: '৳3,000'
    }
  ];

  const workOffers: WorkOffer[] = [
    {
      id: 1,
      title: 'Web Developer Needed',
      budget: '৳15,000',
      category: 'Tech',
      location: 'Gulshan 2',
      time: '1d ago',
      description: 'Need experienced developer for e-commerce site'
    },
    {
      id: 2,
      title: 'Electrician Required',
      budget: '৳2,500',
      category: 'Home',
      location: 'Uttara',
      time: '3h ago',
      description: 'House wiring work needed'
    },
    {
      id: 3,
      title: 'Graphic Designer',
      budget: '৳8,000',
      category: 'Design',
      location: 'Banani',
      time: '2d ago',
      description: 'Logo and branding design required'
    }
  ];

  // Filter options
  const categories = ['Electronics', 'Real Estate', 'Furniture', 'Vehicles', 'Tech', 'Home', 'Education', 'Design'];
  const locations = ['Gulshan 1', 'Gulshan 2', 'Banani', 'Dhanmondi', 'Uttara'];
  const conditions = ['Excellent', 'Good', 'Fair', 'Poor'];
  const types = ['sell', 'rent', 'service'];
  const sortOptions = [
    { key: 'recent', label: 'Most Recent' },
    { key: 'price_low', label: 'Price: Low to High' },
    { key: 'price_high', label: 'Price: High to Low' },
    { key: 'location', label: 'Location' }
  ];

  // Filter and search logic
  const getFilteredResults = () => {
    let results: any[] = [];

    if (activeTab === 'all' || activeTab === 'items') {
      results = [...results, ...allItems.map(item => ({ ...item, itemType: 'item' }))];
    }
    if (activeTab === 'all' || activeTab === 'help') {
      results = [...results, ...helpPosts.map(item => ({ ...item, itemType: 'help' }))];
    }
    if (activeTab === 'all' || activeTab === 'services') {
      results = [...results, ...workOffers.map(item => ({ ...item, itemType: 'service' }))];
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query) ||
        item.location?.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.category.length > 0) {
      results = results.filter(item => filters.category.includes(item.category));
    }
    if (filters.location.length > 0) {
      results = results.filter(item => filters.location.includes(item.location));
    }
    if (filters.type.length > 0) {
      results = results.filter(item => filters.type.includes(item.type));
    }
    if (filters.condition.length > 0) {
      results = results.filter(item => filters.condition.includes(item.condition));
    }

    // Sort results
    switch (filters.sortBy) {
      case 'price_low':
        results.sort((a, b) => {
          const priceA = parseInt(a.price?.replace(/[^\d]/g, '') || '0');
          const priceB = parseInt(b.price?.replace(/[^\d]/g, '') || '0');
          return priceA - priceB;
        });
        break;
      case 'price_high':
        results.sort((a, b) => {
          const priceA = parseInt(a.price?.replace(/[^\d]/g, '') || '0');
          const priceB = parseInt(b.price?.replace(/[^\d]/g, '') || '0');
          return priceB - priceA;
        });
        break;
      case 'location':
        results.sort((a, b) => a.location.localeCompare(b.location));
        break;
      default: // recent
        break;
    }

    return results;
  };

  const toggleFilter = (filterType: keyof FilterOptions, value: string) => {
    setFilters(prev => {
      const currentArray = prev[filterType] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      return { ...prev, [filterType]: newArray };
    });
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      priceRange: { min: 0, max: 200000 },
      location: [],
      type: [],
      condition: [],
      sortBy: 'recent'
    });
  };

  const getActiveFilterCount = () => {
    return filters.category.length + 
           filters.location.length + 
           filters.type.length + 
           filters.condition.length +
           (filters.sortBy !== 'recent' ? 1 : 0);
  };

  const renderItem = (item: any) => {
    const isHelpPost = item.itemType === 'help';
    const isService = item.itemType === 'service';

    return (
      <TouchableOpacity 
        style={styles.itemCard}
        onPress={() => {
          if (isHelpPost || isService) {
            // Navigate to chat for help posts and services
            navigation.navigate('ChatDetail', { 
              conversation: {
                id: `${item.itemType}_${item.id}`,
                otherUser: {
                  id: 200 + item.id,
                  name: isService ? 'Service Seeker' : 'Help Requester',
                  location: item.location
                },
                item: {
                  id: item.id,
                  title: item.title,
                  price: item.budget || item.price,
                  image: item.image || 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=150&h=150&fit=crop',
                  type: 'service'
                },
                lastMessage: {
                  text: isService ? 'Hi! I saw your work request. I can help with this.' : 'Hi! I can help you with this.',
                  timestamp: '5m ago',
                  senderId: 200 + item.id,
                  isRead: false
                },
                unreadCount: 1,
                isActive: true
              }
            });
          } else {
            // Navigate to item details for regular items
            navigation.navigate('ItemDetails', { item });
          }
        }}
      >
        {!isHelpPost && !isService && (
          <Image source={{ uri: item.image }} style={styles.itemImage} />
        )}
        
        <View style={styles.itemContent}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
            {isHelpPost && (
              <View style={[styles.urgencyBadge, item.urgency === 'Now' && styles.urgentBadge]}>
                <Text style={styles.urgencyText}>{item.urgency}</Text>
              </View>
            )}
            {isService && (
              <View style={styles.serviceBadge}>
                <Text style={styles.serviceBadgeText}>WORK</Text>
              </View>
            )}
            {!isHelpPost && !isService && item.type === 'rent' && (
              <View style={styles.rentBadge}>
                <Text style={styles.rentBadgeText}>RENT</Text>
              </View>
            )}
          </View>
          
          <Text style={styles.itemPrice}>
            {item.price || item.budget}
          </Text>
          
          <View style={styles.itemFooter}>
            <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.itemLocation}>{item.location}</Text>
            </View>
            
            <View style={styles.categoryRow}>
              <Text style={styles.itemCategory}>{item.category}</Text>
              {item.condition && (
                <Text style={styles.itemCondition}>• {item.condition}</Text>
              )}
            </View>
          </View>
          
          {item.time && (
            <Text style={styles.itemTime}>{item.time}</Text>
          )}
          {item.postedDate && (
            <Text style={styles.itemTime}>{item.postedDate}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderFilterSection = (title: string, options: string[], filterKey: keyof FilterOptions) => (
    <View style={styles.filterSection}>
      <Text style={styles.filterTitle}>{title}</Text>
      <View style={styles.filterOptions}>
        {options.map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.filterChip,
              (filters[filterKey] as string[]).includes(option) && styles.filterChipActive
            ]}
            onPress={() => toggleFilter(filterKey, option)}
          >
            <Text style={[
              styles.filterChipText,
              (filters[filterKey] as string[]).includes(option) && styles.filterChipTextActive
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const filteredResults = getFilteredResults();

  // Dynamic styles based on theme
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    filterButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.surfaceSecondary,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    filterBadge: {
      position: 'absolute',
      top: 2,
      right: 2,
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: colors.error,
      justifyContent: 'center',
      alignItems: 'center',
    },
    filterBadgeText: {
      fontSize: 9,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    tabContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tabsRow: {
      flex: 1,
      flexDirection: 'row',
    },
    tab: {
      paddingVertical: 12,
      paddingHorizontal: 12,
      marginRight: 6,
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: colors.primary,
    },
    tabText: {
      fontSize: 13,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    activeTabText: {
      color: colors.primary,
      fontWeight: '600',
    },
    filterButtonTab: {
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surfaceSecondary,
      borderRadius: 16,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginLeft: 8,
    },
    filterButtonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    filterText: {
      fontSize: 12,
      color: colors.text,
      fontWeight: '500',
    },
    resultsHeader: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: colors.background,
    },
    resultsCount: {
      fontSize: 13,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    listContainer: {
      padding: 16,
    },
    itemCard: {
      flexDirection: 'row',
      backgroundColor: colors.card,
      borderRadius: 10,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    itemImage: {
      width: 80,
      height: 80,
      backgroundColor: colors.surfaceSecondary,
    },
    itemContent: {
      flex: 1,
      padding: 12,
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 6,
    },
    itemTitle: {
      flex: 1,
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginRight: 6,
    },
    itemPrice: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 6,
    },
    itemFooter: {
      gap: 4,
    },
    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    itemLocation: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    categoryRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemCategory: {
      fontSize: 12,
      color: colors.secondary,
      fontWeight: '500',
    },
    itemCondition: {
      fontSize: 12,
      color: colors.textSecondary,
      marginLeft: 4,
    },
    itemTime: {
      fontSize: 11,
      color: colors.textTertiary,
      marginTop: 4,
    },
    rentBadge: {
      backgroundColor: colors.warning,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },
    rentBadgeText: {
      fontSize: 8,
      color: '#FFFFFF',
      fontWeight: '700',
    },
    urgencyBadge: {
      backgroundColor: colors.surfaceSecondary,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },
    urgentBadge: {
      backgroundColor: colors.errorLight,
    },
    urgencyText: {
      fontSize: 8,
      color: colors.text,
      fontWeight: '600',
    },
    serviceBadge: {
      backgroundColor: colors.secondary,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },
    serviceBadgeText: {
      fontSize: 8,
      color: '#FFFFFF',
      fontWeight: '700',
    },
    // Filter Modal Styles
    filterModal: {
      flex: 1,
      backgroundColor: colors.modal,
    },
    filterHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    filterModalTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    cancelText: {
      fontSize: 14,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    clearText: {
      fontSize: 14,
      color: colors.error,
      fontWeight: '500',
    },
    filterContent: {
      flex: 1,
    },
    filterSection: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    filterTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
    },
    filterOptions: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    filterChip: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      backgroundColor: colors.surfaceSecondary,
      borderWidth: 1,
      borderColor: colors.border,
      minHeight: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    filterChipActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    filterChipText: {
      fontSize: 12,
      color: colors.text,
      fontWeight: '500',
      textAlign: 'center',
    },
    filterChipTextActive: {
      color: '#FFFFFF',
    },
    filterActions: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    applyButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: 'center',
    },
    applyButtonText: {
      fontSize: 14,
      color: '#FFFFFF',
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      
      <SearchHeader
        navigation={navigation}
        searchText={searchQuery}
        onSearchChange={setSearchQuery}
        showBackButton={true}
        variant="search"
        chatBadgeCount={3}
      />

      {/* Tabs with Filter */}
      <View style={styles.tabContainer}>
        <View style={styles.tabsRow}>
          {[
            { key: 'all', label: 'All' },
            { key: 'items', label: 'Items' },
            { key: 'services', label: 'Services' },
            { key: 'help', label: 'Help' }
          ].map(tab => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.activeTab]}
              onPress={() => setActiveTab(tab.key as any)}
            >
              <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity 
          style={styles.filterButtonTab} 
          onPress={() => setShowFilters(true)}
        >
          <View style={styles.filterButtonContent}>
            <Ionicons name="filter-outline" size={16} color={colors.text} />
            <Text style={styles.filterText}>Filter</Text>
          </View>
          {getActiveFilterCount() > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{getActiveFilterCount()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Results */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={filteredResults}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) => `${item.itemType}_${item.id}`}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Filter Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={[styles.filterModal, { paddingTop: insets.top }]}>
          <View style={styles.filterHeader}>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.filterModalTitle}>Filters</Text>
            <TouchableOpacity onPress={clearFilters}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.filterContent}>
            {renderFilterSection('Category', categories, 'category')}
            {renderFilterSection('Location', locations, 'location')}
            {renderFilterSection('Type', types, 'type')}
            {renderFilterSection('Condition', conditions, 'condition')}
            
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Sort By</Text>
              <View style={styles.filterOptions}>
                {sortOptions.map(option => (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      styles.filterChip,
                      filters.sortBy === option.key && styles.filterChipActive
                    ]}
                    onPress={() => setFilters(prev => ({ ...prev, sortBy: option.key }))}
                  >
                    <Text style={[
                      styles.filterChipText,
                      filters.sortBy === option.key && styles.filterChipTextActive
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.filterActions}>
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={() => setShowFilters(false)}
            >
              <Text style={styles.applyButtonText}>
                Apply Filters ({filteredResults.length})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SearchScreen; 