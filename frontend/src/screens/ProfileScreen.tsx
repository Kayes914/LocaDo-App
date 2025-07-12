import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomNavigation } from '../components/navigation';

interface ProfileScreenProps {
  navigation?: {
    navigate: (screen: string, params?: any) => void;
  };
}

interface UserData {
  name: string;
  phone: string;
  phoneVerified: boolean;
  area: string;
  trustScore: number;
  skills: string[];
  profileImage: string;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [chatNotifications, setChatNotifications] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mock user data - in real app this would come from state/API
  const [userData, setUserData] = useState<UserData>({
    name: 'Sarah Ahmed',
    phone: '+880 1712-345678',
    phoneVerified: true,
    area: 'Dhanmondi, Dhaka',
    trustScore: 4.8,
    skills: ['Tutoring', 'Math', 'Physics', 'English'],
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  });

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    area: '',
    profileImage: ''
  });

  
  const handleNavigationPress = (tab: string) => {
    if (!navigation) return;
    
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
        navigation.navigate('Experts');
        break;
      case 'Profile':
        // Already on Profile screen
        break;
      default:
        console.log('Navigate to:', tab);
    }
  };

  const handleEditProfile = () => {
    // Initialize edit form with current user data
    setEditForm({
      name: userData.name,
      phone: userData.phone,
      area: userData.area,
      profileImage: userData.profileImage
    });
    setShowEditModal(true);
  };

  const handleImagePicker = async () => {
    try {
      // Request permission
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Permission to access camera roll is required!');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setEditForm(prev => ({ ...prev, profileImage: result.assets[0].uri }));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleSaveProfile = () => {
    // Update user data with edited values
    const updatedUserData = {
      ...userData,
      name: editForm.name.trim(),
      phone: editForm.phone.trim(),
      area: editForm.area.trim(),
      profileImage: editForm.profileImage.trim() || userData.profileImage
    };
    
    setUserData(updatedUserData);
    setShowEditModal(false);
    
    Alert.alert(
      'Profile Updated',
      'Your profile has been updated successfully!',
      [{ text: 'OK' }]
    );
  };

  const handleCancelEdit = () => {
    // Check if there are unsaved changes
    const hasChanges = 
      editForm.name !== userData.name ||
      editForm.phone !== userData.phone ||
      editForm.area !== userData.area ||
      editForm.profileImage !== userData.profileImage;

    if (hasChanges) {
      Alert.alert(
        'Discard Changes?',
        'You have unsaved changes. Are you sure you want to discard them?',
        [
          { text: 'Keep Editing', style: 'cancel' },
          { 
            text: 'Discard', 
            style: 'destructive', 
            onPress: () => {
              setShowEditModal(false);
              // Reset form
              setEditForm({
                name: '',
                phone: '',
                area: '',
                profileImage: ''
              });
            }
          }
        ]
      );
    } else {
      setShowEditModal(false);
      // Reset form
      setEditForm({
        name: '',
        phone: '',
        area: '',
        profileImage: ''
      });
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('Logged out') }
      ]
    );
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    Alert.alert(
      'Account Deleted',
      'Your account has been permanently deleted.',
      [{ text: 'OK' }]
    );
  };

  const handleChatNotificationToggle = () => {
    setChatNotifications(prev => !prev);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(prev => !prev);
    // In a real implementation, this would update the app's theme context
    console.log('Dark mode toggled:', !isDarkMode);
  };

  const handleHelpFeedback = () => {
    console.log('Help & Feedback');
  };

  const renderTrustScoreTooltip = () => {
    return (
      <View style={styles.tooltipContainer}>
        <Text style={styles.tooltipText}>
          Trust Score is based on user reviews, verification status, and community feedback
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* User Information Card */}
          <View style={styles.userCard}>
            <View style={styles.userHeader}>
              <View style={styles.userImageContainer}>
                <Image
                  source={{ uri: userData.profileImage }}
                  style={styles.userImage}
                />
                {userData.phoneVerified && (
                  <View style={styles.verifiedBadge}>
                    <Ionicons name="checkmark" size={12} color="white" />
                  </View>
                )}
              </View>
              
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{userData.name}</Text>
                <View style={styles.phoneContainer}>
                  <Ionicons name="call-outline" size={16} color="#6B7280" />
                  <Text style={styles.phoneText}>{userData.phone}</Text>
                  {userData.phoneVerified && (
                    <Ionicons name="shield-checkmark" size={16} color="#10B981" />
                  )}
                </View>
                <View style={styles.locationContainer}>
                  <Ionicons name="location-outline" size={16} color="#6B7280" />
                  <Text style={styles.locationText}>{userData.area}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                <Ionicons name="pencil" size={16} color="#3B82F6" />
              </TouchableOpacity>
            </View>

            {/* Trust Score */}
            <View style={styles.trustScoreContainer}>
              <View style={styles.trustScoreHeader}>
                <Text style={styles.trustScoreLabel}>Trust Score</Text>
                <TouchableOpacity style={styles.tooltipButton}>
                  <Ionicons name="information-circle-outline" size={16} color="#6B7280" />
                </TouchableOpacity>
              </View>
              <View style={styles.ratingContainer}>
                {[...Array(5)].map((_, index) => (
                  <Ionicons
                    key={index}
                    name={index < Math.floor(userData.trustScore) ? "star" : "star-outline"}
                    size={20}
                    color={index < Math.floor(userData.trustScore) ? "#FBBF24" : "#D1D5DB"}
                  />
                ))}
                <Text style={styles.ratingText}>{userData.trustScore}</Text>
              </View>
            </View>


          </View>

          {/* Settings Section */}
          <View style={styles.settingsCard}>
            <Text style={styles.sectionTitle}>Settings</Text>
            
            {/* Dark Mode Toggle */}
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => console.log('Dark mode toggle pressed')}
            >
              <View style={styles.settingLeft}>
                <Ionicons 
                  name="moon-outline" 
                  size={20} 
                  color="#6B7280" 
                />
                <Text style={styles.settingText}>Dark Mode</Text>
              </View>
              <View style={styles.settingRight}>
                <TouchableOpacity
                  style={styles.toggle}
                  onPress={() => console.log('Dark mode toggle pressed')}
                >
                  <View style={styles.toggleThumb} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            {/* Notifications Setting */}
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => setShowNotificationsModal(true)}
            >
              <View style={styles.settingLeft}>
                <Ionicons name="notifications-outline" size={20} color="#6B7280" />
                <Text style={styles.settingText}>Notifications</Text>
              </View>
              <View style={styles.settingRight}>
                <Text style={styles.settingValue}>
                  {chatNotifications ? 'Enabled' : 'Disabled'}
                </Text>
                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
              </View>
            </TouchableOpacity>

            {/* Logout */}
            <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
              <View style={styles.settingLeft}>
                <Ionicons name="log-out-outline" size={20} color="#6B7280" />
                <Text style={styles.settingText}>Logout</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Delete Account */}
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => setShowDeleteModal(true)}
            >
              <View style={styles.settingLeft}>
                <Ionicons name="trash-outline" size={20} color="#EF4444" />
                <Text style={[styles.settingText, styles.dangerText]}>Delete Account</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Help & Feedback */}
          <TouchableOpacity style={styles.helpCard} onPress={handleHelpFeedback}>
            <View style={styles.helpContent}>
              <Ionicons name="help-circle-outline" size={20} color="#3B82F6" />
              <Text style={styles.helpText}>Help & Feedback</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </TouchableOpacity>
        </ScrollView>

        {/* Notifications Settings Modal */}
        <Modal
          visible={showNotificationsModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowNotificationsModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Chat Notifications</Text>
                <TouchableOpacity onPress={() => setShowNotificationsModal(false)}>
                  <Ionicons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.notificationOption}>
                <View style={styles.notificationLeft}>
                  <Ionicons name="chatbubble-outline" size={20} color="#6B7280" />
                  <View style={styles.notificationTextContainer}>
                    <Text style={styles.notificationTitle}>Chat Messages</Text>
                    <Text style={styles.notificationSubtitle}>Get notified when you receive new messages from experts</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.toggle, chatNotifications && styles.toggleActive]}
                  onPress={handleChatNotificationToggle}
                >
                  <View style={[styles.toggleThumb, chatNotifications && styles.toggleThumbActive]} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Delete Account Confirmation Modal */}
        <Modal
          visible={showDeleteModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowDeleteModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.deleteModalContent}>
              <Ionicons name="warning" size={48} color="#EF4444" />
              <Text style={styles.deleteModalTitle}>Delete Account</Text>
              <Text style={styles.deleteModalText}>
                Are you sure you want to permanently delete your account? This action cannot be undone.
              </Text>
              <View style={styles.deleteModalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowDeleteModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleDeleteAccount}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Edit Profile Modal */}
        <Modal
          visible={showEditModal}
          transparent={true}
          animationType="slide"
          onRequestClose={handleCancelEdit}
        >
          <View style={styles.editModalOverlay}>
            <View style={styles.editModalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Edit Profile</Text>
                <TouchableOpacity onPress={handleCancelEdit}>
                  <Ionicons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>
              
              <ScrollView style={styles.editForm} showsVerticalScrollIndicator={false}>
                {/* Profile Image Upload */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Profile Picture</Text>
                  <TouchableOpacity style={styles.imageUploadButton} onPress={handleImagePicker}>
                    <View style={styles.imageUploadContent}>
                      {editForm.profileImage ? (
                        <Image source={{ uri: editForm.profileImage }} style={styles.previewImage} />
                      ) : (
                        <View style={styles.imagePlaceholder}>
                          <Ionicons name="camera" size={32} color="#6B7280" />
                        </View>
                      )}
                      <View style={styles.imageUploadTextContainer}>
                        <Text style={styles.imageUploadText}>
                          {editForm.profileImage ? 'Change Photo' : 'Upload Photo'}
                        </Text>
                        <Text style={styles.imageUploadSubtext}>Tap to select from gallery</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Name */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Full Name</Text>
                  <TextInput
                    style={[styles.textInput, styles.focusableInput]}
                    value={editForm.name}
                    onChangeText={(text) => setEditForm(prev => ({ ...prev, name: text }))}
                    placeholder="Enter your full name"
                    placeholderTextColor="#6B7280"
                    accessibilityLabel="Full Name"
                    accessibilityHint="Enter your full name"
                    returnKeyType="next"
                  />
                </View>

                {/* Phone */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Phone Number</Text>
                  <TextInput
                    style={[styles.textInput, styles.focusableInput]}
                    value={editForm.phone}
                    onChangeText={(text) => setEditForm(prev => ({ ...prev, phone: text }))}
                    placeholder="Enter your phone number"
                    placeholderTextColor="#6B7280"
                    keyboardType="phone-pad"
                    accessibilityLabel="Phone Number"
                    accessibilityHint="Enter your phone number"
                    returnKeyType="next"
                  />
                </View>

                {/* Area */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Area</Text>
                  <TextInput
                    style={[styles.textInput, styles.focusableInput]}
                    value={editForm.area}
                    onChangeText={(text) => setEditForm(prev => ({ ...prev, area: text }))}
                    placeholder="Enter your area"
                    placeholderTextColor="#6B7280"
                    accessibilityLabel="Area"
                    accessibilityHint="Enter your area or location"
                    returnKeyType="done"
                  />
                </View>
              </ScrollView>

              <View style={styles.editModalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancelEdit}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveProfile}
                >
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <BottomNavigation 
          activeTab="Profile" 
          onTabPress={handleNavigationPress} 
        />
      </View>
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
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#F9FAFB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  userCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  userImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    backgroundColor: '#10B981',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  phoneText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
    marginRight: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trustScoreContainer: {
    marginBottom: 16,
  },
  trustScoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  trustScoreLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  tooltipButton: {
    padding: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },

  settingsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#111827',
    marginLeft: 8,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  dangerText: {
    color: '#EF4444',
  },
  helpCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  helpContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpText: {
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  languageText: {
    fontSize: 16,
    color: '#111827',
  },
  deleteModalContent: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  deleteModalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  deleteModalText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  deleteModalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  deleteButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#EF4444',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  tooltipContainer: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    backgroundColor: '#374151',
    padding: 8,
    borderRadius: 6,
    zIndex: 1000,
  },
  tooltipText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  notificationOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  notificationTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  notificationSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#3B82F6',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  // Edit Modal Styles
  editModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  editModalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    maxHeight: '80%',
    paddingTop: 20,
  },
  editForm: {
    paddingHorizontal: 20,
    maxHeight: 400,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  focusableInput: {
    // Focus states for accessibility
    borderWidth: 2,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  inputHint: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  editModalButtons: {
    flexDirection: 'row',
    gap: 16,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  // Image Upload Styles
  imageUploadButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    overflow: 'hidden',
  },
  imageUploadContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  previewImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  imageUploadTextContainer: {
    flex: 1,
  },
  imageUploadText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  imageUploadSubtext: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default ProfileScreen;