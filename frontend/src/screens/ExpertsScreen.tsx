import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavigation } from '../components/navigation';
import SearchHeader from '../components/common/SearchHeader';

const { width } = Dimensions.get('window');

interface Expert {
  id: number;
  name: string;
  profession: string;
  experience: string;
  rating: number;
  reviews: number;
  area: string;
  verified: boolean;
  image: string;
}

interface Category {
  id: string;
  label: string;
}

interface ExpertsPageProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
    goBack?: () => void;
  };
}

const ExpertsPage: React.FC<ExpertsPageProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories: Category[] = [
    { id: 'all', label: 'All' },
    { id: 'electrician', label: 'Electrician' },
    { id: 'plumber', label: 'Plumber' },
    { id: 'tutor', label: 'Tutor' },
    { id: 'cleaner', label: 'Cleaner' },
    { id: 'driver', label: 'Driver' },
  ];

  const experts: Expert[] = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      profession: 'Electrician',
      experience: '8 years',
      rating: 4.8,
      reviews: 24,
      area: 'Mirpur',
      verified: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Fatima Khan',
      profession: 'Math Tutor',
      experience: '5 years',
      rating: 4.9,
      reviews: 18,
      area: 'Dhanmondi',
      verified: true,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Karim Rahman',
      profession: 'Plumber',
      experience: '12 years',
      rating: 4.7,
      reviews: 31,
      area: 'Gulshan',
      verified: false,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Rashida Begum',
      profession: 'House Cleaner',
      experience: '3 years',
      rating: 4.6,
      reviews: 12,
      area: 'Banani',
      verified: true,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expert.profession.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           expert.profession.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const handleChatPress = (expertId: number) => {
    // Navigate to chat screen if navigation is available
    if (navigation) {
      navigation.navigate('Chat', { expertId });
    }
  };

  const handleCallPress = (expertId: number) => {
    // Handle call functionality
    console.log('Calling expert:', expertId);
  };

  const handleNavigationPress = (tab: string) => {
    if (!navigation?.navigate) return;
    
    switch (tab) {
      case 'Home':
        navigation.navigate('Home');
        break;
      case 'Items':
        navigation.navigate('Items');
        break;
      case 'Post':
        navigation.navigate('CreatePost');
        break;
      case 'Experts':
        // Already on Experts screen
        break;
      case 'Profile':
        navigation.navigate('Profile');
        break;
      default:
        console.log('Navigate to:', tab);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SearchHeader
          navigation={navigation}
          searchText={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={() => console.log('Search submitted')}
          placeholder="Search experts..."
          showBackButton={false}
          showSuggestions={false}
        />
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          {/* Categories */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Experts List */}
          <View style={styles.expertsContainer}>
            {filteredExperts.map((expert) => (
              <View key={expert.id} style={styles.expertCard}>
                <View style={styles.expertBasicInfo}>
                  <View style={styles.expertImageContainer}>
                    <Image
                      source={{ uri: expert.image }}
                      style={styles.expertImage}
                    />
                    {expert.verified && (
                      <View style={styles.verifiedBadge}>
                        <Ionicons name="checkmark" size={12} color="white" />
                      </View>
                    )}
                  </View>
                  <View style={styles.expertDetails}>
                    <Text style={styles.expertName}>{expert.name}</Text>
                    <Text style={styles.expertProfession}>{expert.profession}</Text>
                    <Text style={styles.expertExperience}>{expert.experience}</Text>
                  </View>
                </View>
                
                <View style={styles.expertMetadata}>
                  <View style={styles.ratingArea}>
                    <Ionicons name="star" size={16} color="#FBBF24" />
                    <Text style={styles.ratingText}>{expert.rating}</Text>
                    <Text style={styles.reviewsText}>({expert.reviews} reviews)</Text>
                  </View>
                  <View style={styles.locationContainer}>
                    <Ionicons name="location-outline" size={16} color="#6B7280" />
                    <Text style={styles.locationText}>{expert.area}</Text>
                  </View>
                </View>
                
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.chatButton]}
                    onPress={() => handleChatPress(expert.id)}
                  >
                    <Ionicons name="chatbubble-outline" size={16} color="white" />
                    <Text style={styles.chatButtonText}>Chat</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.callButton]}
                    onPress={() => handleCallPress(expert.id)}
                  >
                    <Ionicons name="call-outline" size={16} color="#374151" />
                    <Text style={styles.callButtonText}>Call</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <BottomNavigation 
        activeTab="Experts" 
        onTabPress={handleNavigationPress} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 80, // Increased padding for bottom navigation
    paddingHorizontal: 16, // Consistent horizontal padding
    paddingTop: 16, // Add top padding for content
  },
  categoriesContainer: {
    marginBottom: 24, // Increased spacing between sections
  },
  categoriesContent: {
    paddingHorizontal: 0, // Categories already have padding
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: '#3B82F6',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: 'white',
  },
  expertsContainer: {
    padding: 0, // Cards have their own padding
  },
  expertCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20, // Increased spacing between cards
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  expertBasicInfo: {
    flexDirection: 'row',
    marginBottom: 16, // Increased spacing
  },
  expertImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  expertImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    backgroundColor: '#10B981',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'white',
  },
  expertDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  expertName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  expertProfession: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  expertExperience: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  expertMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20, // Increased spacing
  },
  ratingArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16, // Increased spacing between buttons
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12, // Increased button padding
    borderRadius: 8,
    gap: 8,
  },
  chatButton: {
    backgroundColor: '#3B82F6',
  },
  callButton: {
    backgroundColor: '#F3F4F6',
  },
  chatButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  callButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ExpertsPage;

// Also export as ExpertsScreen for consistency
export { ExpertsPage as ExpertsScreen };