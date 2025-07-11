import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  Alert,
  Animated,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { BuySellItem } from '../types/item';

const { width, height } = Dimensions.get('window');

interface ItemDetailsScreenProps {
  route: {
    params: {
      item: BuySellItem;
    };
  };
  navigation: {
    goBack: () => void;
  };
}

const ItemDetailsScreen: React.FC<ItemDetailsScreenProps> = ({ route, navigation }) => {
  const { item } = route.params;
  const insets = useSafeAreaInsets();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const scrollY = new Animated.Value(0);

  // Simple community-style data
  const itemDetails: BuySellItem = {
    ...item,
    description: item.id === 1 
      ? "Selling my iPhone 14 Pro. Used it for about 6 months but got a new one from work. Everything works perfectly, no cracks or scratches. Comes with original charger and box. Battery still great!\n\nReason for selling: Company provided a new phone so don't need this one anymore. Happy to meet in a public place for handover."
      : item.id === 2
      ? "Moving out of Banani next month so renting my furnished apartment. It's a nice 2-bedroom place, very clean and well-maintained. Has everything you need - bed, sofa, kitchen stuff, WiFi. Parking space included.\n\nAvailable from next month. Serious inquiries only please. Can arrange a viewing anytime."
      : "Got this study table last year but don't need it anymore since I graduated. It's solid wood, very sturdy. Perfect for studying or working from home. Has 3 drawers for storage.\n\nPick up from Dhanmondi. Can help with loading if needed.",
    condition: item.type === 'sell' ? 'Good' : undefined,
    category: item.id === 1 ? 'Electronics' : item.id === 2 ? 'Rental' : 'Furniture',
    postedBy: 'Ahmed Rahman',
    postedDate: '2 days ago',
    contact: {
      phone: '+880 1712-345678',
      name: 'Ahmed Rahman'
    },
    images: [item.image] // Most people upload just one photo
  };

  const handleContact = () => {
    Alert.alert(
      'Contact Ahmed',
      `Call Ahmed Rahman?\n${itemDetails.contact?.phone}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log('Calling...') },
      ]
    );
  };

  const handleMessage = () => {
    Alert.alert('Message Ahmed', 'Send a message to Ahmed about this item');
  };

  const handleShare = () => {
    Alert.alert('Share', 'Share this listing with friends');
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Simple Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
          <Ionicons name="arrow-back" size={22} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Item Details</Text>
        <TouchableOpacity style={styles.heartButton} onPress={handleFavorite}>
          <Ionicons 
            name={isFavorited ? "heart" : "heart-outline"} 
            size={22} 
            color={isFavorited ? "#EF4444" : "#6B7280"} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Enhanced Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover" />
          <View style={styles.imageOverlay}>
            <View style={[styles.typeTag, itemDetails.type === 'rent' && styles.rentTag]}>
              <Text style={styles.typeText}>{itemDetails.type === 'rent' ? 'FOR RENT' : 'FOR SALE'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.contentPadding}>
          {/* Enhanced Basic Info */}
          <View style={styles.basicInfo}>
            <View style={styles.titleSection}>
              <Text style={styles.itemTitle}>{itemDetails.title}</Text>
              <View style={styles.categoryTag}>
                <Text style={styles.categoryTagText}>{itemDetails.category}</Text>
              </View>
            </View>
            <Text style={styles.itemPrice}>{itemDetails.price}</Text>
            
            {itemDetails.condition && (
              <View style={styles.conditionSection}>
                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                <Text style={styles.conditionText}>Condition: {itemDetails.condition}</Text>
              </View>
            )}
            
            <View style={styles.metaInfo}>
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Ionicons name="location-outline" size={16} color="#6B7280" />
                  <Text style={styles.metaText}>{itemDetails.location}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={16} color="#6B7280" />
                  <Text style={styles.metaText}>Posted {itemDetails.postedDate}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{itemDetails.description}</Text>
          </View>

          {/* Enhanced Seller Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Posted by</Text>
            <View style={styles.sellerInfo}>
              <View style={styles.sellerAvatar}>
                <Text style={styles.avatarText}>{itemDetails.postedBy?.charAt(0)}</Text>
              </View>
              <View style={styles.sellerDetails}>
                <Text style={styles.sellerName}>{itemDetails.postedBy}</Text>
                <View style={styles.sellerMeta}>
                  <Ionicons name="location" size={14} color="#10B981" />
                  <Text style={styles.sellerLocation}>Lives in {itemDetails.location} area</Text>
                </View>
                <View style={styles.sellerMeta}>
                  <Ionicons name="shield-checkmark" size={14} color="#3B82F6" />
                  <Text style={styles.memberSince}>Verified member since 2020</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.profileButton}>
                <Ionicons name="chevron-forward" size={16} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <Ionicons name="bookmark-outline" size={20} color="#6B7280" />
              <Text style={styles.quickActionText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Ionicons name="share-outline" size={20} color="#6B7280" />
              <Text style={styles.quickActionText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Ionicons name="flag-outline" size={20} color="#6B7280" />
              <Text style={styles.quickActionText}>Report</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      {/* Simple Bottom Actions */}
      <View style={[styles.bottomActions, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity style={styles.messageButton} onPress={handleMessage}>
          <Ionicons name="chatbubble-outline" size={20} color="#3B82F6" />
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callButton} onPress={handleContact}>
          <Ionicons name="call-outline" size={20} color="#FFFFFF" />
          <Text style={styles.callButtonText}>Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  heartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 280,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F4F6',
  },
  typeTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  rentTag: {
    backgroundColor: '#F59E0B',
  },
  typeText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  imageOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  conditionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  conditionBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  contentPadding: {
    paddingHorizontal: 20,
  },
  basicInfo: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginRight: 12,
  },
  categoryTag: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryTagText: {
    fontSize: 10,
    color: '#3B82F6',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  itemPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
  },
  conditionSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  metaInfo: {
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  postedTime: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  conditionTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 4,
  },
  conditionText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
  },
  section: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sellerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sellerDetails: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  sellerLocation: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 2,
  },
  memberSince: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  bottomActions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  messageButtonText: {
    fontSize: 15,
    color: '#3B82F6',
    fontWeight: '600',
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
  },
  callButtonText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  sellerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  profileButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  quickAction: {
    alignItems: 'center',
    gap: 4,
  },
  quickActionText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
});

export default ItemDetailsScreen; 