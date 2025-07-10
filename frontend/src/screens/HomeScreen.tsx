import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { BottomNavigation } from '../components/navigation';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  const handleNavigationPress = (tab: string) => {
    // Navigation logic will be implemented here
    console.log('Navigate to:', tab);
  };

  // Sample data for products/services near user
  const nearbyItems = [
    {
      id: 1,
      type: 'product',
      title: 'iPhone 14 Pro',
      price: '৳85,000',
      location: 'Gulshan 2',
      distance: '0.5 km',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=150&h=150&fit=crop',
      category: 'Electronics'
    },
    {
      id: 2,
      type: 'rental',
      title: 'Apartment for Rent',
      price: '৳25,000/month',
      location: 'Banani',
      distance: '1.2 km',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=150&h=150&fit=crop',
      category: 'Housing'
    },
    {
      id: 3,
      type: 'expert',
      title: 'Plumber Service',
      price: '৳500/hour',
      location: 'Gulshan 1',
      distance: '0.8 km',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=150&h=150&fit=crop',
      category: 'Home Service',
      rating: 4.8
    },
    {
      id: 4,
      type: 'product',
      title: 'Gaming Laptop',
      price: '৳120,000',
      location: 'Dhanmondi',
      distance: '2.1 km',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=150&h=150&fit=crop',
      category: 'Electronics'
    },
    {
      id: 5,
      type: 'expert',
      title: 'AC Repair',
      price: '৳800/visit',
      location: 'Gulshan 2',
      distance: '0.3 km',
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=150&h=150&fit=crop',
      category: 'Electronics',
      rating: 4.9
    },
    {
      id: 6,
      type: 'expert',
      title: 'Home Cleaning',
      price: '৳1,200/visit',
      location: 'Gulshan 1',
      distance: '0.7 km',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150&h=150&fit=crop',
      category: 'Home Service',
      rating: 4.7
    },
    {
      id: 7,
      type: 'product',
      title: 'Furniture Set',
      price: '৳45,000',
      location: 'Banani',
      distance: '1.1 km',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop',
      category: 'Furniture'
    },
    {
      id: 8,
      type: 'rental',
      title: 'Car Rental',
      price: '৳2,500/day',
      location: 'Gulshan 2',
      distance: '0.4 km',
      image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=150&h=150&fit=crop',
      category: 'Transport'
    },
    {
      id: 9,
      type: 'expert',
      title: 'Tutor (Math)',
      price: '৳800/hour',
      location: 'Dhanmondi',
      distance: '1.8 km',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150&h=150&fit=crop',
      category: 'Education',
      rating: 4.9
    },
    {
      id: 10,
      type: 'product',
      title: 'Camera DSLR',
      price: '৳75,000',
      location: 'Gulshan 1',
      distance: '0.9 km',
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=150&h=150&fit=crop',
      category: 'Electronics'
    }
  ];

  const renderServiceCard = (item: any) => (
    <TouchableOpacity key={item.id} style={styles.serviceCard}>
      <Image source={{ uri: item.image }} style={styles.serviceImage} />
      <View style={styles.serviceContent}>
        <View style={styles.serviceHeader}>
          <Text style={styles.serviceCategory}>{item.category}</Text>
          {item.rating && (
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          )}
        </View>
        <Text style={styles.serviceTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.servicePrice}>{item.price}</Text>
        <View style={styles.serviceLocation}>
          <Ionicons name="location-outline" size={12} color="#8E8E93" />
          <Text style={styles.serviceLocationText}>{item.location} • {item.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Split items into rows of 2
  const getItemsInRows = () => {
    const rows = [];
    for (let i = 0; i < nearbyItems.length; i += 2) {
      rows.push(nearbyItems.slice(i, i + 2));
    }
    return rows;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      
      {/* Top App Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.appName}>Locado</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.location}>Gulshan, Dhaka</Text>
            <Ionicons name="chevron-down" size={16} color="#666" />
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" />
          <Text style={styles.searchPlaceholder}>Search items, help, services...</Text>
          <Ionicons name="options-outline" size={20} color="#999" />
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Discover Local Services</Text>
          <Text style={styles.welcomeSubtitle}>Everything you need in your neighborhood</Text>
        </View>

        {/* Services Grid */}
        <View style={styles.servicesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Services</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.servicesGrid}>
            {getItemsInRows().map((row, rowIndex) => (
              <View key={rowIndex} style={styles.serviceRow}>
                {row.map(renderServiceCard)}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
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
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerLeft: {
    flex: 1,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
    marginRight: 4,
  },
  notificationButton: {
    position: 'relative',
    padding: 6,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F3F4',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: 10,
    color: '#8E8E93',
    fontSize: 15,
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  // Services Section Styles
  servicesSection: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  seeAllText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  servicesGrid: {
    paddingHorizontal: 20,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  serviceContent: {
    padding: 12,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceCategory: {
    fontSize: 12,
    color: '#8E8E93',
    backgroundColor: '#F1F3F4',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#1A1A1A',
    marginLeft: 2,
    fontWeight: '500',
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 6,
    lineHeight: 18,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  serviceLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceLocationText: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
  },
});

export default HomeScreen; 