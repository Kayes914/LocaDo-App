import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Switch, RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomNavigation } from '../components/navigation';
import { useTheme } from '../contexts/ThemeContext';

interface CreatePostScreenProps {
  navigation?: {
    navigate: (screen: string, params?: any) => void;
  };
}

interface ImageAsset {
  uri: string;
  id: string;
}

const CreatePostScreen: React.FC<CreatePostScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode, colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'sell' | 'help' | 'work'>('sell');
  
  // Sell/Rent Tab State
  const [sellTitle, setSellTitle] = useState('');
  const [sellDescription, setSellDescription] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [isRent, setIsRent] = useState(false);
  const [sellImages, setSellImages] = useState<ImageAsset[]>([]);
  const [sellContactMethod, setSellContactMethod] = useState('');
  
  // Help Tab State
  const [helpText, setHelpText] = useState('');
  const [helpImage, setHelpImage] = useState<ImageAsset | null>(null);
  const [helpUrgency, setHelpUrgency] = useState('today');
  
  // Work Tab State
  const [workTitle, setWorkTitle] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const [workDate, setWorkDate] = useState('');
  const [workTime, setWorkTime] = useState('');
  const [workBudget, setWorkBudget] = useState('');
  const [workContactMethod, setWorkContactMethod] = useState('');
  
  // Common State
  const [locationText, setLocationText] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);

  const urgencyOptions = [
    { label: 'Right Now', value: 'now' },
    { label: 'Today', value: 'today' },
    { label: 'This Week', value: 'week' },
  ];

  const pickImages = async (multiple: boolean = true) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: multiple,
      quality: 0.8,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      if (multiple) {
        const newImages = result.assets.map(asset => ({
          uri: asset.uri,
          id: Math.random().toString(),
        }));
        setSellImages(prev => [...prev, ...newImages].slice(0, 4));
      } else {
        setHelpImage({
          uri: result.assets[0].uri,
          id: Math.random().toString(),
        });
      }
    }
  };

  const removeImage = (id: string, isHelp: boolean = false) => {
    if (isHelp) {
      setHelpImage(null);
    } else {
      setSellImages(prev => prev.filter(img => img.id !== id));
    }
  };

  const handlePost = () => {
    let postData: any = {
      type: activeTab,
      location: locationText,
      timestamp: new Date().toISOString(),
    };

    switch (activeTab) {
      case 'sell':
        if (!sellTitle || !sellDescription || !sellPrice) {
          Alert.alert('Missing Information', 'Please fill in all required fields');
          return;
        }
        postData = {
          ...postData,
          title: sellTitle,
          description: sellDescription,
          price: sellPrice,
          isRent,
          images: sellImages,
          contactMethod: sellContactMethod,
        };
        break;
      
      case 'help':
        if (!helpText) {
          Alert.alert('Missing Information', 'Please describe what you need help with');
          return;
        }
        postData = {
          ...postData,
          description: helpText,
          image: helpImage,
          urgency: helpUrgency,
        };
        break;
      
      case 'work':
        if (!workTitle || !workDescription) {
          Alert.alert('Missing Information', 'Please fill in title and description');
          return;
        }
        postData = {
          ...postData,
          title: workTitle,
          description: workDescription,
          date: workDate,
          time: workTime,
          budget: workBudget,
          contactMethod: workContactMethod,
        };
        break;
    }

    // Here you would typically send the data to your backend
    console.log('Posting:', postData);
    Alert.alert('Success', 'Your post has been created!', [
      { text: 'OK', onPress: () => {
        clearForm();
        // Navigate to Posts screen to see the created post
        if (navigation) {
          navigation.navigate('Posts');
        }
      }}
    ]);
  };

  const clearForm = () => {
    // Reset all form fields
    setSellTitle('');
    setSellDescription('');
    setSellPrice('');
    setIsRent(false);
    setSellImages([]);
    setSellContactMethod('chat');
    
    setHelpText('');
    setHelpImage(null);
    setHelpUrgency('today');
    
    setWorkTitle('');
    setWorkDescription('');
    setWorkDate('');
    setWorkTime('');
    setWorkBudget('');
    setWorkContactMethod('chat');
  };

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
        // Already on Create Post screen
        break;
      case 'Experts':
        navigation.navigate('Experts');
        break;
      case 'Profile':
        navigation.navigate('Profile');
        break;
      default:
        console.log('Navigate to:', tab);
    }
  };

  const handleLocationPress = () => {
    setShowLocationModal(true);
  };

  const renderSellTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Title */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Title *</Text>
        <TextInput
          style={styles.textInput}
          value={sellTitle}
          onChangeText={setSellTitle}
          placeholder="What are you selling?"
          placeholderTextColor={colors.inputPlaceholder}
        />
      </View>

      {/* Description */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.textInput, styles.multilineInput]}
          value={sellDescription}
          onChangeText={setSellDescription}
          placeholder="Describe your item in detail..."
          placeholderTextColor="#94A3B8"
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Price and Rent/Sell Toggle */}
      <View style={styles.row}>
        <View style={[styles.inputGroup, styles.halfWidth, { width: '48%' }]}>
          <Text style={styles.label}>Price *</Text>
          <TextInput
            style={[styles.textInput, styles.inputHeight]}
            value={sellPrice}
            onChangeText={setSellPrice}
            placeholder="0"
            placeholderTextColor="#94A3B8"
            keyboardType="numeric"
          />
        </View>
        <View style={[styles.inputGroup, styles.halfWidth, { width: '48%' }]}>
          <Text style={styles.label}>Type</Text>
          <View style={[styles.textInput, styles.inputHeight, styles.toggleContainer]}>
            <Text style={[styles.toggleText, !isRent && styles.toggleTextActive]}>Sell</Text>
            <Switch
              value={isRent}
              onValueChange={setIsRent}
              color="#3B82F6"
            />
            <Text style={[styles.toggleText, isRent && styles.toggleTextActive]}>Rent</Text>
          </View>
        </View>
      </View>

      {/* Location */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.textInput}
          value={locationText}
          onChangeText={setLocationText}
          placeholder="Current Location"
          placeholderTextColor="#94A3B8"
        />
      </View>

      {/* Contact Number */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          style={styles.textInput}
          value={sellContactMethod}
          onChangeText={setSellContactMethod}
          placeholder="Enter your phone number"
          placeholderTextColor="#94A3B8"
          keyboardType="phone-pad"
        />
      </View>

      {/* Image Upload */}
      <View style={[styles.inputGroup, { marginBottom: 40 }]}>
        <Text style={styles.label}>Images (1-4)</Text>
        <View style={styles.imageUploadContainer}>
          {sellImages.map((image) => (
            <View key={image.id} style={styles.imagePreview}>
              <Image source={{ uri: image.uri }} style={styles.previewImage} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => removeImage(image.id)}
              >
                <Ionicons name="close" size={16} color="white" />
              </TouchableOpacity>
            </View>
          ))}
          {sellImages.length < 4 && (
            <TouchableOpacity
              style={styles.addImageButton}
              onPress={() => pickImages(true)}
            >
              <Ionicons name="camera" size={28} color="#64748B" />
              <Text style={styles.addImageText}>Add Photo</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );

  const renderHelpTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Help Description */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>I need help with... *</Text>
        <TextInput
          style={[styles.textInput, styles.multilineInput]}
          value={helpText}
          onChangeText={setHelpText}
          placeholder="Describe what you need help with..."
          placeholderTextColor="#94A3B8"
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Location */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.textInput}
          value={locationText}
          onChangeText={setLocationText}
          placeholder="Current Location"
          placeholderTextColor="#94A3B8"
        />
      </View>

      {/* Contact Number */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          style={styles.textInput}
          value={sellContactMethod}
          onChangeText={setSellContactMethod}
          placeholder="Enter your phone number"
          placeholderTextColor="#94A3B8"
          keyboardType="phone-pad"
        />
      </View>

      {/* Optional Image */}
      <View style={[styles.inputGroup, { marginBottom: 40 }]}>
        <Text style={styles.label}>Image (Optional)</Text>
        <View style={styles.imageUploadContainer}>
          {helpImage ? (
            <View style={styles.imagePreview}>
              <Image source={{ uri: helpImage.uri }} style={styles.previewImage} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => removeImage('', true)}
              >
                <Ionicons name="close" size={16} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addImageButton}
              onPress={() => pickImages(false)}
            >
              <Ionicons name="camera" size={28} color="#64748B" />
              <Text style={styles.addImageText}>Add Photo</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );

  const renderWorkTab = () => (
    <ScrollView 
      style={[styles.tabContent, { paddingBottom: 40 }]} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Title */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>What do you need? *</Text>
        <TextInput
          style={styles.textInput}
          value={workTitle}
          onChangeText={setWorkTitle}
          placeholder="e.g., Fix electrical outlet"
          placeholderTextColor="#94A3B8"
        />
      </View>

      {/* Description */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.textInput, styles.multilineInput]}
          value={workDescription}
          onChangeText={setWorkDescription}
          placeholder="Provide more details about the work needed..."
          placeholderTextColor="#94A3B8"
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Date and Time */}
      <View style={styles.row}>
        <View style={[styles.inputGroup, { flex: 1 }]}>
          <Text style={styles.label}>Date</Text>
          <TextInput
            style={styles.textInput}
            value={workDate}
            onChangeText={setWorkDate}
            placeholder="DD/MM/YYYY"
            placeholderTextColor="#94A3B8"
          />
        </View>
        <View style={[styles.inputGroup, { flex: 1 }]}>
          <Text style={styles.label}>Time</Text>
          <TextInput
            style={styles.textInput}
            value={workTime}
            onChangeText={setWorkTime}
            placeholder="HH:MM"
            placeholderTextColor="#94A3B8"
          />
        </View>
      </View>

      {/* Budget */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Budget (Optional)</Text>
        <TextInput
          style={styles.textInput}
          value={workBudget}
          onChangeText={setWorkBudget}
          placeholder="Enter your budget"
          placeholderTextColor="#94A3B8"
          keyboardType="numeric"
        />
      </View>

      {/* Location */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.textInput}
          value={locationText}
          onChangeText={setLocationText}
          placeholder="Current Location"
          placeholderTextColor="#94A3B8"
        />
      </View>

      {/* Contact Number */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          style={styles.textInput}
          value={workContactMethod}
          onChangeText={setWorkContactMethod}
          placeholder="Enter your phone number"
          placeholderTextColor="#94A3B8"
          keyboardType="phone-pad"
        />
      </View>
    </ScrollView>
  );

  // Dynamic styles based on theme
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingBottom: 20,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
      letterSpacing: -0.5,
    },
    headerPostButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      gap: 6,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    headerPostButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
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
      paddingVertical: 16,
      paddingHorizontal: 8,
      alignItems: 'center',
      borderBottomWidth: 3,
      borderBottomColor: 'transparent',
      borderRadius: 8,
      marginHorizontal: 4,
      gap: 4,
    },
    activeTab: {
      borderBottomColor: colors.primary,
      backgroundColor: colors.primaryLight,
    },
    tabText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    activeTabText: {
      color: colors.primary,
      fontWeight: '700',
    },
    contentContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    tabContent: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 40,
    },
    inputGroup: {
      marginBottom: 24,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 10,
      letterSpacing: -0.2,
    },
    textInput: {
      borderWidth: 2,
      borderColor: colors.inputBorder,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
      backgroundColor: colors.input,
      color: colors.text,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
    inputHeight: {
      height: 56,
    },
    multilineInput: {
      height: 120,
      textAlignVertical: 'top',
      paddingTop: 16,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 16,
      justifyContent: 'space-between',
    },
    halfWidth: {
      flex: 1,
    },
    toggleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    toggleText: {
      fontSize: 16,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    toggleTextActive: {
      color: colors.primary,
      fontWeight: '700',
    },
    imageUploadContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
      marginTop: 8,
    },
    imagePreview: {
      position: 'relative',
      width: 90,
      height: 90,
      borderRadius: 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    previewImage: {
      width: 90,
      height: 90,
      borderRadius: 16,
    },
    removeImageButton: {
      position: 'absolute',
      top: -6,
      right: -6,
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: colors.error,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    addImageButton: {
      width: 90,
      height: 90,
      borderWidth: 2,
      borderColor: colors.border,
      borderStyle: 'dashed',
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.surfaceSecondary,
    },
    addImageText: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 6,
      fontWeight: '500',
    },
    locationButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.input,
      borderWidth: 2,
      borderColor: colors.inputBorder,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
    locationText: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
      marginLeft: 12,
      fontWeight: '500',
    },
    radioOption: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      backgroundColor: colors.card,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.03,
      shadowRadius: 2,
      elevation: 1,
    },
    radioLabel: {
      fontSize: 16,
      color: colors.text,
      marginLeft: 12,
      fontWeight: '500',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: colors.overlay,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    modalContainer: {
      backgroundColor: colors.modal,
      padding: 24,
      borderRadius: 20,
      width: '100%',
      maxWidth: 400,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: 10,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 16,
      textAlign: 'center',
    },
    modalText: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 20,
      textAlign: 'center',
    },
    modalButtons: {
      flexDirection: 'row',
      gap: 16,
      marginTop: 24,
    },
    modalButton: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: colors.buttonSecondary,
      borderWidth: 1,
      borderColor: colors.border,
    },
    confirmButton: {
      backgroundColor: colors.primary,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    cancelButtonText: {
      color: colors.buttonTextSecondary,
      fontSize: 16,
      fontWeight: '600',
    },
    confirmButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '700',
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      
      <View style={styles.container}>
        {/* Header with Post Button */}
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <Text style={styles.headerTitle}>Create Post</Text>
          <TouchableOpacity style={styles.headerPostButton} onPress={handlePost}>
            <Ionicons name="send" size={18} color="white" />
            <Text style={styles.headerPostButtonText}>Post</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabNavigation}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'sell' && styles.activeTab]}
            onPress={() => setActiveTab('sell')}
          >
            <Ionicons 
              name={activeTab === 'sell' ? 'storefront' : 'storefront-outline'} 
              size={20} 
              color={activeTab === 'sell' ? colors.primary : colors.textSecondary} 
            />
            <Text style={[styles.tabText, activeTab === 'sell' && styles.activeTabText]}>
              Sell
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'help' && styles.activeTab]}
            onPress={() => setActiveTab('help')}
          >
            <Ionicons 
              name={activeTab === 'help' ? 'help-circle' : 'help-circle-outline'} 
              size={20} 
              color={activeTab === 'help' ? colors.primary : colors.textSecondary} 
            />
            <Text style={[styles.tabText, activeTab === 'help' && styles.activeTabText]}>
              Help
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'work' && styles.activeTab]}
            onPress={() => setActiveTab('work')}
          >
            <Ionicons 
              name={activeTab === 'work' ? 'construct' : 'construct-outline'} 
              size={20} 
              color={activeTab === 'work' ? colors.primary : colors.textSecondary} 
            />
            <Text style={[styles.tabText, activeTab === 'work' && styles.activeTabText]}>
              Work
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.contentContainer}>
          {activeTab === 'sell' && renderSellTab()}
          {activeTab === 'help' && renderHelpTab()}
          {activeTab === 'work' && renderWorkTab()}
        </View>

        {/* Location Modal */}
        <Modal
          visible={showLocationModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowLocationModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>📍 Set Location</Text>
              <Text style={styles.modalText}>Current: {locationText}</Text>
              <TextInput
                style={styles.textInput}
                value={locationText}
                onChangeText={setLocationText}
                placeholder="Current Location"
                placeholderTextColor={colors.inputPlaceholder}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowLocationModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={() => setShowLocationModal(false)}
                >
                  <Text style={styles.confirmButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <BottomNavigation 
        activeTab="Post" 
        onTabPress={handleNavigationPress} 
      />
    </SafeAreaView>
  );
};

export default CreatePostScreen;