import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

interface HelpPost {
  id: number;
  title: string;
  description: string;
  author: string;
  avatar: string;
  location: string;
  time: string;
  urgency: 'low' | 'medium' | 'high';
  category: string;
  isResolved: boolean;
}

const CommunityScreen: React.FC = () => {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const helpPosts: HelpPost[] = [
    {
      id: 1,
      title: 'Need help with laptop repair',
      description: 'My laptop screen is flickering and making weird noises. Need someone who can fix it today.',
      author: 'Sarah Ahmed',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      location: 'Gulshan 1',
      time: '2h ago',
      urgency: 'high',
      category: 'Tech Support',
      isResolved: false
    },
    {
      id: 2,
      title: 'Looking for math tutor',
      description: 'Need experienced math tutor for my daughter. She is struggling with algebra.',
      author: 'Karim Rahman',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      location: 'Dhanmondi',
      time: '4h ago',
      urgency: 'medium',
      category: 'Education',
      isResolved: false
    },
    {
      id: 3,
      title: 'Need reliable plumber urgently',
      description: 'Water is leaking from bathroom ceiling. Started this morning and getting worse.',
      author: 'Fatima Khan',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      location: 'Banani',
      time: '1h ago',
      urgency: 'high',
      category: 'Home Repair',
      isResolved: false
    },
    {
      id: 4,
      title: 'Car mechanic recommendation needed',
      description: 'My car engine is making strange sounds. Need a trustworthy mechanic nearby.',
      author: 'Ahmed Hassan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      location: 'Gulshan 2',
      time: '6h ago',
      urgency: 'medium',
      category: 'Auto Repair',
      isResolved: true
    }
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return colors.textSecondary;
    }
  };

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'URGENT';
      case 'medium': return 'MODERATE';
      case 'low': return 'LOW';
      default: return 'NORMAL';
    }
  };

  const renderHelpPost = (post: HelpPost) => (
    <TouchableOpacity key={post.id} style={[
      styles.postCard,
      post.isResolved && styles.resolvedCard
    ]}>
      <View style={styles.postHeader}>
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{post.author}</Text>
          <View style={styles.postMeta}>
            <Ionicons name="location-outline" size={12} color={colors.textSecondary} />
            <Text style={styles.location}>{post.location}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.time}>{post.time}</Text>
          </View>
        </View>
        <View style={styles.badgeContainer}>
          <View style={[styles.urgencyBadge, { backgroundColor: getUrgencyColor(post.urgency) }]}>
            <Text style={styles.urgencyText}>{getUrgencyText(post.urgency)}</Text>
          </View>
          {post.isResolved && (
            <View style={styles.resolvedBadge}>
              <Text style={styles.resolvedText}>SOLVED</Text>
            </View>
          )}
        </View>
      </View>

      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postDescription}>{post.description}</Text>
      
      <View style={styles.postFooter}>
        <Text style={styles.category}>{post.category}</Text>
        {!post.isResolved && (
          <View style={styles.helpButton}>
            <Ionicons name="chatbubble-outline" size={14} color="white" />
            <Text style={styles.helpButtonText}>Help</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      padding: 16,
    },
    header: {
      marginBottom: 24,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      lineHeight: 22,
    },
    postCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
    resolvedCard: {
      backgroundColor: colors.surfaceSecondary,
      opacity: 0.8,
    },
    postHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
    },
    authorInfo: {
      flex: 1,
    },
    authorName: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 2,
    },
    postMeta: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    location: {
      fontSize: 12,
      color: colors.textSecondary,
      marginLeft: 4,
    },
    dot: {
      fontSize: 12,
      color: colors.textSecondary,
      marginHorizontal: 6,
    },
    time: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    badgeContainer: {
      alignItems: 'flex-end',
    },
    urgencyBadge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 8,
      marginBottom: 4,
    },
    urgencyText: {
      fontSize: 10,
      color: 'white',
      fontWeight: '700',
    },
    resolvedBadge: {
      backgroundColor: '#10B981',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 8,
    },
    resolvedText: {
      fontSize: 10,
      color: 'white',
      fontWeight: '700',
    },
    postTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    postDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
      marginBottom: 16,
    },
    postFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    category: {
      fontSize: 13,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    helpButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      gap: 4,
    },
    helpButtonText: {
      fontSize: 12,
      color: 'white',
      fontWeight: '600',
    },
  });

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Community Help</Text>
          <Text style={styles.headerSubtitle}>
            People in your area asking for help. Lend a hand to your neighbors.
          </Text>
        </View>

        {helpPosts.map(renderHelpPost)}
      </View>
    </ScrollView>
  );
};

export default CommunityScreen; 