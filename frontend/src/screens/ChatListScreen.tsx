import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Conversation } from '../types/item';
import { useTheme } from '../contexts/ThemeContext';

interface ChatListScreenProps {
  navigation?: {
    goBack: () => void;
    navigate: (screen: string, params?: any) => void;
  };
}

const ChatListScreen: React.FC<ChatListScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode, colors } = useTheme();

  // Sample conversations data
  const conversations: Conversation[] = [
    {
      id: 1,
      otherUser: {
        id: 2,
        name: 'Sarah Ahmed',
        location: 'Gulshan 2'
      },
      item: {
        id: 1,
        title: 'iPhone 14 Pro',
        price: '৳85,000',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=150&h=150&fit=crop',
        type: 'sell'
      },
      lastMessage: {
        id: 1,
        text: 'Is the phone still available? Can we meet today?',
        timestamp: '2m ago',
        senderId: 2,
        isRead: false
      },
      unreadCount: 2,
      isActive: true
    },
    {
      id: 2,
      otherUser: {
        id: 3,
        name: 'Karim Rahman',
        location: 'Banani'
      },
      item: {
        id: 2,
        title: 'Apartment for Rent',
        price: '৳25,000/month',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=150&h=150&fit=crop',
        type: 'rent'
      },
      lastMessage: {
        id: 2,
        text: 'Thanks for showing the apartment. I\'ll let you know by tomorrow.',
        timestamp: '1h ago',
        senderId: 3,
        isRead: true
      },
      unreadCount: 0,
      isActive: true
    },
    {
      id: 3,
      otherUser: {
        id: 4,
        name: 'Fatima Khan',
        location: 'Dhanmondi'
      },
      item: {
        id: 3,
        title: 'Study Table',
        price: '৳8,000',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop',
        type: 'sell'
      },
      lastMessage: {
        id: 3,
        text: 'Perfect! I can pick it up this weekend.',
        timestamp: 'Yesterday',
        senderId: 1, // Current user
        isRead: true
      },
             unreadCount: 0,
       isActive: true
    }
  ];

  const handleChatPress = (conversation: Conversation) => {
    // In a real app, this would navigate to individual chat screen
    navigation?.navigate('ChatDetail', { conversation });
  };

  const formatTime = (timestamp: string) => {
    return timestamp;
  };

  const renderConversation = (conversation: Conversation) => (
    <TouchableOpacity 
      key={conversation.id} 
      style={styles.conversationItem}
      onPress={() => handleChatPress(conversation)}
      activeOpacity={0.7}
    >
      <View style={styles.conversationContent}>
        {/* Item Image */}
        <View style={styles.itemImageContainer}>
          <Image source={{ uri: conversation.item.image }} style={styles.itemImage} />
          {conversation.item.type === 'rent' && (
            <View style={styles.rentTag}>
              <Text style={styles.rentTagText}>RENT</Text>
            </View>
          )}
        </View>

        {/* Conversation Details */}
        <View style={styles.conversationDetails}>
          <View style={styles.conversationHeader}>
            <Text style={styles.otherUserName}>{conversation.otherUser.name}</Text>
            <View style={styles.timeAndBadge}>
              <Text style={styles.messageTime}>{formatTime(conversation.lastMessage.timestamp)}</Text>
              {conversation.unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadCount}>{conversation.unreadCount}</Text>
                </View>
              )}
            </View>
          </View>

          <Text style={styles.itemTitle} numberOfLines={1}>{conversation.item.title} • {conversation.item.price}</Text>
          
          <View style={styles.lastMessageContainer}>
            <Text style={[
              styles.lastMessage, 
              !conversation.lastMessage.isRead && styles.unreadMessage
            ]} numberOfLines={1}>
              {conversation.lastMessage.senderId === 1 ? 'You: ' : ''}{conversation.lastMessage.text}
            </Text>
          </View>

          <View style={styles.locationContainer}>
            <Ionicons name="location" size={12} color={colors.textTertiary} />
            <Text style={styles.locationText}>{conversation.otherUser.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Dynamic styles based on theme
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.surfaceSecondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    searchButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.surfaceSecondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    chatSummary: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    summaryText: {
      fontSize: 13,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    conversationsList: {
      flex: 1,
    },
    conversationItem: {
      backgroundColor: colors.card,
      marginHorizontal: 16,
      marginVertical: 4,
      borderRadius: 12,
      overflow: 'hidden',
      position: 'relative',
    },
    conversationContent: {
      flexDirection: 'row',
      padding: 16,
      gap: 12,
    },
    itemImageContainer: {
      position: 'relative',
    },
    itemImage: {
      width: 56,
      height: 56,
      borderRadius: 8,
      backgroundColor: colors.surfaceSecondary,
    },
    rentTag: {
      position: 'absolute',
      bottom: 4,
      right: 4,
      backgroundColor: colors.warning,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },
    rentTagText: {
      fontSize: 8,
      color: '#FFFFFF',
      fontWeight: '700',
    },
    conversationDetails: {
      flex: 1,
      gap: 4,
    },
    conversationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    otherUserName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    timeAndBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    messageTime: {
      fontSize: 12,
      color: colors.textTertiary,
    },
    unreadBadge: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 6,
    },
    unreadCount: {
      fontSize: 11,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    itemTitle: {
      fontSize: 13,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    lastMessageContainer: {
      marginTop: 2,
    },
    lastMessage: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 18,
    },
    unreadMessage: {
      color: colors.text,
      fontWeight: '500',
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: 4,
    },
    locationText: {
      fontSize: 11,
      color: colors.textTertiary,
    },
    inactiveOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors.overlay,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inactiveText: {
      fontSize: 12,
      color: colors.textTertiary,
      fontWeight: '500',
      backgroundColor: colors.card,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
      paddingTop: 100,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginTop: 16,
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={navigation?.goBack}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chats</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Chat Summary */}
      <View style={styles.chatSummary}>
        <Text style={styles.summaryText}>
          {conversations.filter(c => c.unreadCount > 0).length} new messages • {conversations.filter(c => c.isActive).length} active chats
        </Text>
      </View>

      <ScrollView style={styles.conversationsList} showsVerticalScrollIndicator={false}>
        {conversations.map(renderConversation)}
        
        {/* Empty state for new users */}
        {conversations.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={64} color={colors.textTertiary} />
            <Text style={styles.emptyTitle}>No conversations yet</Text>
            <Text style={styles.emptySubtitle}>
              Start chatting with sellers and buyers when you interact with listings
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ChatListScreen; 