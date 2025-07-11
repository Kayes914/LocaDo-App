import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Conversation, ChatMessage } from '../types/item';

interface ChatDetailScreenProps {
  route: {
    params: {
      conversation: Conversation;
    };
  };
  navigation: {
    goBack: () => void;
  };
}

const ChatDetailScreen: React.FC<ChatDetailScreenProps> = ({ route, navigation }) => {
  const { conversation } = route.params;
  const insets = useSafeAreaInsets();
  const [newMessage, setNewMessage] = useState('');

  // Generate conversation based on item type
  const getServiceMessages = () => [
    {
      id: 1,
      text: conversation.lastMessage.text,
      timestamp: conversation.lastMessage.timestamp,
      senderId: conversation.lastMessage.senderId,
      isRead: true
    },
    {
      id: 2,
      text: 'Thank you for reaching out! I\'d be happy to help. Can you tell me more details about what you need?',
      timestamp: '8m ago',
      senderId: 1, // Current user
      isRead: true
    },
    {
      id: 3,
      text: conversation.item.title.includes('web developer') 
        ? 'I need a simple business website with contact forms and a gallery. About 5-6 pages.'
        : 'I need help with AC installation in my apartment. It\'s a 1.5 ton unit.',
      timestamp: '5m ago',
      senderId: conversation.otherUser.id,
      isRead: true
    },
    {
      id: 4,
      text: conversation.item.title.includes('web developer')
        ? 'That sounds doable! Do you have any design preferences? The budget mentioned is ৳15,000 - is that flexible?'
        : 'I can definitely help with that. The budget shows ৳2,000 - is that just for installation or including materials?',
      timestamp: '3m ago',
      senderId: 1,
      isRead: true
    },
    {
      id: 5,
      text: conversation.item.title.includes('web developer')
        ? 'I prefer modern, clean design. The budget can go up to ৳20,000 if needed. When can you start?'
        : 'That\'s just for installation. I already have the AC unit. How soon can you do it?',
      timestamp: '1m ago',
      senderId: conversation.otherUser.id,
      isRead: false
    }
  ];

  const getRegularMessages = () => [
    {
      id: 1,
      text: `Hi! I'm interested in your ${conversation.item.title}. Is it still available?`,
      timestamp: '2 days ago',
      senderId: conversation.otherUser.id,
      isRead: true
    },
    {
      id: 2,
      text: 'Yes, it\'s still available! Are you looking to buy it soon?',
      timestamp: '2 days ago',
      senderId: 1, // Current user
      isRead: true
    },
    {
      id: 3,
      text: 'Great! Can you tell me more about the condition? Any scratches or issues?',
      timestamp: '2 days ago',
      senderId: conversation.otherUser.id,
      isRead: true
    },
    {
      id: 4,
      text: 'It\'s in really good condition. I\'ve taken good care of it. Used it mostly at home.',
      timestamp: '2 days ago',
      senderId: 1,
      isRead: true
    },
    {
      id: 5,
      text: conversation.item.type === 'rent' 
        ? 'Perfect! When would be a good time to see the place? I\'m free this weekend.'
        : 'Sounds good! When can we meet? I\'m in the same area.',
      timestamp: '1 day ago',
      senderId: conversation.otherUser.id,
      isRead: true
    },
    {
      id: 6,
      text: conversation.item.type === 'rent'
        ? 'This weekend works! How about Saturday afternoon? I can show you around.'
        : 'How about we meet at the Gulshan 2 Circle this weekend? It\'s a public place.',
      timestamp: '1 day ago',
      senderId: 1,
      isRead: true
    },
    {
      id: 7,
      text: conversation.lastMessage.text,
      timestamp: conversation.lastMessage.timestamp,
      senderId: conversation.lastMessage.senderId,
      isRead: conversation.lastMessage.isRead
    }
  ];

  const messages: ChatMessage[] = conversation.item.type === 'service' 
    ? getServiceMessages() 
    : getRegularMessages();

  const handleSend = () => {
    if (newMessage.trim()) {
      // In real app, would send message to backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const renderMessage = (message: ChatMessage) => {
    const isFromCurrentUser = message.senderId === 1;
    
    return (
      <View key={message.id} style={[
        styles.messageContainer,
        isFromCurrentUser ? styles.sentMessage : styles.receivedMessage
      ]}>
        <View style={[
          styles.messageBubble,
          isFromCurrentUser ? styles.sentBubble : styles.receivedBubble
        ]}>
          <Text style={[
            styles.messageText,
            isFromCurrentUser ? styles.sentText : styles.receivedText
          ]}>
            {message.text}
          </Text>
        </View>
        <Text style={[
          styles.messageTime,
          isFromCurrentUser ? styles.sentTime : styles.receivedTime
        ]}>
          {message.timestamp}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
          <Ionicons name="arrow-back" size={22} color="#374151" />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <Text style={styles.userName}>{conversation.otherUser.name}</Text>
          <Text style={styles.userLocation}>{conversation.otherUser.location}</Text>
        </View>
        
        <TouchableOpacity style={styles.callButton}>
          <Ionicons name="call-outline" size={22} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Item Info Bar */}
      <View style={styles.itemInfoBar}>
        <Image source={{ uri: conversation.item.image }} style={styles.itemThumb} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle} numberOfLines={1}>{conversation.item.title}</Text>
          <Text style={styles.itemPrice}>{conversation.item.price}</Text>
        </View>
        {conversation.item.type === 'rent' && (
          <View style={styles.rentBadge}>
            <Text style={styles.rentBadgeText}>RENT</Text>
          </View>
        )}
        {conversation.item.type === 'service' && (
          <View style={styles.serviceBadge}>
            <Text style={styles.serviceBadgeText}>SERVICE</Text>
          </View>
        )}
      </View>

      {/* Messages */}
      <ScrollView 
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map(renderMessage)}
      </ScrollView>

      {/* Input Bar */}
      <View style={[styles.inputBar, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            maxLength={500}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={20} color="#3B82F6" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  userLocation: {
    fontSize: 13,
    color: '#6B7280',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 12,
  },
  itemThumb: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  itemPrice: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  rentBadge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  rentBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  serviceBadge: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  serviceBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    gap: 16,
  },
  messageContainer: {
    maxWidth: '80%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    marginBottom: 4,
  },
  sentBubble: {
    backgroundColor: '#3B82F6',
    borderBottomRightRadius: 4,
  },
  receivedBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  sentText: {
    color: '#FFFFFF',
  },
  receivedText: {
    color: '#111827',
  },
  messageTime: {
    fontSize: 11,
    marginHorizontal: 4,
  },
  sentTime: {
    color: '#9CA3AF',
  },
  receivedTime: {
    color: '#9CA3AF',
  },
  inputBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatDetailScreen; 