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
import { HelpPost } from '../types/item';

interface PostsScreenProps {
  navigation?: {
    navigate: (screen: string, params?: any) => void;
  };
}

interface CommunityPost extends HelpPost {
  type: 'help' | 'support' | 'inquiry';
  priority: 'low' | 'medium' | 'high';
  postedBy: string;
  avatar?: string;
  description: string;
  isResolved: boolean;
}

const PostsScreen: React.FC<PostsScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const communityPosts: CommunityPost[] = [
    {
      id: 1,
      title: 'Need help with laptop repair urgently',
      category: 'Tech Support',
      urgency: 'Today',
      location: 'Gulshan 1',
      time: '2h ago',
      type: 'help',
      priority: 'high',
      postedBy: 'Sarah Ahmed',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      description: 'My laptop screen is flickering and making weird noises. Need someone who can fix it today. Willing to pay good money for quick service.',
      isResolved: false,
    },
    {
      id: 2,
      title: 'Looking for math tutor for grade 10',
      category: 'Education',
      urgency: 'This week',
      location: 'Dhanmondi',
      time: '4h ago',
      type: 'inquiry',
      priority: 'medium',
      postedBy: 'Karim Rahman',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      description: 'Need experienced math tutor for my daughter. She is struggling with algebra. Preferably someone who can come home 2-3 times a week.',
      isResolved: false,
    },
    {
      id: 3,
      title: 'Water leakage in bathroom - need plumber',
      category: 'Home Repair',
      urgency: 'Today',
      location: 'Banani',
      time: '1h ago',
      type: 'help',
      priority: 'high',
      postedBy: 'Fatima Khan',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      description: 'Water is leaking from bathroom ceiling. It started this morning and getting worse. Need reliable plumber immediately.',
      isResolved: false,
    },
    {
      id: 4,
      title: 'Recommendations for good restaurants nearby',
      category: 'Food & Dining',
      urgency: 'No rush',
      location: 'Uttara',
      time: '6h ago',
      type: 'inquiry',
      priority: 'low',
      postedBy: 'Ahmed Hassan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      description: 'New to the area. Looking for good local restaurants with reasonable prices. Any cuisine is fine, just want quality food.',
      isResolved: true,
    },
    {
      id: 5,
      title: 'Lost cat - please help find',
      category: 'Lost & Found',
      urgency: 'Today',
      location: 'Mirpur',
      time: '30m ago',
      type: 'help',
      priority: 'high',
      postedBy: 'Rashida Begum',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face',
      description: 'My orange tabby cat "Mimi" has been missing since yesterday evening. She has a blue collar. Please contact me if you see her!',
      isResolved: false,
    },
    {
      id: 6,
      title: 'Internet connection issues - need tech support',
      category: 'Tech Support',
      urgency: 'Today',
      location: 'Gulshan 2',
      time: '3h ago',
      type: 'support',
      priority: 'medium',
      postedBy: 'Nazrul Islam',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
      description: 'WiFi keeps disconnecting every few minutes. Router seems fine but internet is very unstable. Need technical help.',
      isResolved: false,
    },
  ];

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

  const handleChatPress = (post: CommunityPost) => {
    console.log('Opening chat with:', post.postedBy);
    // Navigate to chat screen with the post author
    if (navigation) {
      navigation.navigate('ChatDetail', { 
        postId: post.id,
        userName: post.postedBy,
        userAvatar: post.avatar,
        postTitle: post.title 
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'help': return 'help-circle';
      case 'support': return 'people';
      case 'inquiry': return 'chatbubble';
      default: return 'document';
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderPostCard = (post: CommunityPost) => (
    <View
      key={post.id}
      style={[styles.postCard, post.isResolved && styles.resolvedCard]}
    >

      
      {/* Header */}
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.avatar }} style={styles.avatar} />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{post.postedBy}</Text>
            <View style={styles.locationTime}>
              <Ionicons name="location-outline" size={12} color="#6B7280" />
              <Text style={styles.location}>{post.location}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.time}>{post.time}</Text>
            </View>
          </View>
        </View>
        <View style={styles.postMeta}>
          <View style={[styles.typeBadge, { backgroundColor: getPriorityColor(post.priority) }]}>
            <Text style={styles.typeText}>{post.type.toUpperCase()}</Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postDescription}>{post.description}</Text>

      {/* Footer */}
      <View style={styles.postFooter}>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{post.category}</Text>
          <Text style={styles.timeText}>{post.time}</Text>
        </View>
        
        <View style={styles.chatContainer}>
          <TouchableOpacity 
            style={[styles.helpButton, post.isResolved && styles.helpButtonDisabled]}
            onPress={post.isResolved ? undefined : () => handleChatPress(post)}
            disabled={post.isResolved}
          >
            <Ionicons name="chatbubble-outline" size={16} color={post.isResolved ? "#9CA3AF" : "#FFFFFF"} />
            <Text style={[styles.helpButtonText, post.isResolved && styles.helpButtonTextDisabled]}>
              {post.isResolved ? "Chat" : "Help"}
            </Text>
          </TouchableOpacity>
          {post.isResolved && (
            <Text style={styles.solvedText}>Solved</Text>
          )}
        </View>
      </View>
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
          placeholder="Search community posts..."
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
            <Text style={styles.headerTitle}>Community Posts</Text>
            <Text style={styles.headerSubtitle}>
              Local people sharing their problems and helping each other
            </Text>
          </View>

          <View style={styles.postsContainer}>
            {communityPosts.map(renderPostCard)}
          </View>
        </ScrollView>

        <BottomNavigation 
          activeTab="MyPosts" 
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
  postsContainer: {
    paddingHorizontal: 20,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  resolvedCard: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },

  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  locationTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 4,
  },
  dot: {
    fontSize: 13,
    color: '#6B7280',
    marginHorizontal: 6,
  },
  time: {
    fontSize: 13,
    color: '#6B7280',
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  resolvedBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  resolvedText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  postTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    lineHeight: 24,
  },
  postDescription: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 16,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  category: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  timeText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '400',
    marginTop: 2,
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
  },
  helpButtonDisabled: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  helpButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 6,
  },
  helpButtonTextDisabled: {
    color: '#9CA3AF',
  },
  solvedText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default PostsScreen;