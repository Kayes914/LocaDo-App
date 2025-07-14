import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavigation } from '../components/navigation';
import SearchHeader from '../components/common/SearchHeader';
import { useTheme } from '../contexts/ThemeContext';
import CommunityScreen from './CommunityScreen';

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

const ExpertsList: React.FC<{ experts: Expert[]; onChat: (id: number) => void; onCall: (id: number) => void; }> = ({ experts, onChat, onCall }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    expertsContainer: {
      padding: 0,
    },
    expertCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 10, // reduced from 16
      marginBottom: 14, // reduced from 20
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
    expertBasicInfo: {
      flexDirection: 'row',
      marginBottom: 10, // reduced from 16
    },
    expertImageContainer: {
      position: 'relative',
      marginRight: 12,
    },
    expertImage: {
      width: 44, // reduced from 52
      height: 44, // reduced from 52
      borderRadius: 22, // reduced from 26
    },
    verifiedBadge: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 13, // reduced from 16
      height: 13, // reduced from 16
      backgroundColor: colors.success,
      borderRadius: 6.5, // reduced from 8
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1.2, // reduced from 1.5
      borderColor: colors.card,
    },
    expertDetails: {
      flex: 1,
      justifyContent: 'center',
    },
    expertName: {
      fontSize: 15, // reduced from 16
      fontWeight: '600',
      color: colors.text,
      marginBottom: 2,
    },
    expertProfession: {
      fontSize: 13, // reduced from 14
      color: colors.textSecondary,
      marginBottom: 2,
    },
    expertExperience: {
      fontSize: 11, // reduced from 12
      color: colors.textTertiary,
    },
    expertMetadata: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12, // reduced from 20
    },
    ratingArea: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ratingText: {
      fontSize: 13, // reduced from 15
      fontWeight: '600',
      color: colors.text,
      marginLeft: 4,
    },
    reviewsText: {
      fontSize: 12, // reduced from 13
      color: colors.textSecondary,
      marginLeft: 4,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationText: {
      fontSize: 12, // reduced from 13
      color: colors.textSecondary,
      marginLeft: 4,
    },
    actionButtons: {
      flexDirection: 'row',
      gap: 8, // reduced from 16
    },
    actionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8, // reduced from 12
      borderRadius: 8,
      gap: 4, // reduced from 8
    },
    chatButton: {
      backgroundColor: colors.primary,
    },
    callButton: {
      backgroundColor: colors.surfaceSecondary,
    },
    chatButtonText: {
      color: 'white',
      fontSize: 13, // reduced from 14
      fontWeight: '500',
    },
    callButtonText: {
      color: colors.text,
      fontSize: 13, // reduced from 14
      fontWeight: '500',
    },
  });
  return (
    <View style={styles.expertsContainer}>
      {experts.map((expert) => (
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
              <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
              <Text style={styles.locationText}>{expert.area}</Text>
            </View>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.chatButton]}
              onPress={() => onChat(expert.id)}
            >
              <Ionicons name="chatbubble-outline" size={16} color="white" />
              <Text style={styles.chatButtonText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.callButton]}
              onPress={() => onCall(expert.id)}
            >
              <Ionicons name="call-outline" size={16} color={colors.text} />
              <Text style={styles.callButtonText}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const ExpertsPage: React.FC<ExpertsPageProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'experts' | 'community'>('experts');

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

  const handleChatPress = (expertId: number) => {
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

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
    },
    tabNavigation: {
      flexDirection: 'row',
      backgroundColor: colors.card,
      paddingHorizontal: 16,
      paddingTop: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tab: {
      flex: 1,
      paddingVertical: 6, // reduced from 10
      paddingHorizontal: 4,
      alignItems: 'center',
      borderBottomWidth: 3,
      borderBottomColor: 'transparent',
      borderRadius: 8,
      marginHorizontal: 2,
      gap: 2,
    },
    activeTab: {
      borderBottomColor: colors.primary,
      backgroundColor: colors.primaryLight,
    },
    tabText: {
      fontSize: 13, // reduced from 14
      fontWeight: '600',
      color: colors.textSecondary,
    },
    activeTabText: {
      color: colors.primary,
      fontWeight: '700',
    },
    scrollView: {
      flex: 1,
    },
    scrollViewContent: {
      paddingHorizontal: 10,
      paddingTop: 10,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header remains untouched */}
        <SearchHeader
          navigation={navigation}
          searchText={''}
          onSearchChange={() => {}}
          onSearchSubmit={() => {}}
          placeholder="Search experts..."
          showBackButton={false}
          showSuggestions={false}
        />
        {/* Tab Navigation */}
        <View style={styles.tabNavigation}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'experts' && styles.activeTab]}
            onPress={() => setActiveTab('experts')}
          >
            <Ionicons 
              name={activeTab === 'experts' ? 'people' : 'people-outline'} 
              size={20} 
              color={activeTab === 'experts' ? colors.primary : colors.textSecondary} 
            />
            <Text style={[styles.tabText, activeTab === 'experts' && styles.activeTabText]}>
              Experts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'community' && styles.activeTab]}
            onPress={() => setActiveTab('community')}
          >
            <Ionicons 
              name={activeTab === 'community' ? 'chatbubbles' : 'chatbubbles-outline'} 
              size={20} 
              color={activeTab === 'community' ? colors.primary : colors.textSecondary} 
            />
            <Text style={[styles.tabText, activeTab === 'community' && styles.activeTabText]}>
              Community
            </Text>
          </TouchableOpacity>
        </View>
        {/* Tab Content */}
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          {activeTab === 'experts' ? (
            <ExpertsList experts={experts} onChat={handleChatPress} onCall={handleCallPress} />
          ) : (
            <CommunityScreen />
          )}
        </ScrollView>
      </View>
      <BottomNavigation 
        activeTab="Experts" 
        onTabPress={handleNavigationPress} 
      />
    </SafeAreaView>
  );
};

export default ExpertsPage;

// Also export as ExpertsScreen for consistency
export { ExpertsPage as ExpertsScreen };