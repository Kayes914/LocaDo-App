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
  Alert,
  Platform,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Switch, RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomNavigation } from '../components/navigation';

const { width } = Dimensions.get('window');

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
  const [activeTab, setActiveTab] = useState<'sell' | 'help' | 'work'>('sell');
  
  // Sell/Rent Tab State
  const [sellTitle, setSellTitle] = useState('');
  const [sellDescription, setSellDescription] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [isRent, setIsRent] = useState(false);
  const [sellCategory, setSellCategory] = useState('books');
  const [sellImages, setSellImages] = useState<ImageAsset[]>([]);
  const [sellContactMethod, setSellContactMethod] = useState('chat');
  
  // Help Tab State
  const [helpText, setHelpText] = useState('');
  const [helpCategory, setHelpCategory] = useState('tech');
  const [helpImage, setHelpImage] = useState<ImageAsset | null>(null);
  const [helpUrgency, setHelpUrgency] = useState('today');
  
  // Work Tab State
  const [workTitle, setWorkTitle] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const [workDate, setWorkDate] = useState('');
  const [workTime, setWorkTime] = useState('');
  const [workBudget, setWorkBudget] = useState('');
  const [workCategory, setWorkCategory] = useState('electrician');
  const [workContactMethod, setWorkContactMethod] = useState('chat');
  
  // Common State
  const [locationText, setLocationText] = useState('Current Location');
  const [showLocationModal, setShowLocationModal] = useState(false);

  const sellCategories = [
    { label: 'Books', value: 'books' },
    { label: 'Electronics', value: 'electronics' },
    { label: 'Furniture', value: 'furniture' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Sports', value: 'sports' },
    { label: 'Other', value: 'other' },
  ];

  const helpCategories = [
    { label: 'Tech Support', value: 'tech' },
    { label: 'Study Help', value: 'study' },
    { label: 'Home Tasks', value: 'home' },
    { label: 'Other', value: 'other' },
  ];

  const workCategories = [
    { label: 'Electrician', value: 'electrician' },
    { label: 'Plumber', value: 'plumber' },
    { label: 'Tutor', value: 'tutor' },
    { label: 'Cleaner', value: 'cleaner' },
    { label: 'Driver', value: 'driver' },
    { label: 'Other', value: 'other' },
  ];

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
          category: sellCategory,
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
          category: helpCategory,
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
          category: workCategory,
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
    setSellCategory('books');
    setSellImages([]);
    setSellContactMethod('chat');
    
    setHelpText('');
    setHelpCategory('tech');
    setHelpImage(null);
    setHelpUrgency('today');
    
    setWorkTitle('');
    setWorkDescription('');
    setWorkDate('');
    setWorkTime('');
    setWorkBudget('');
    setWorkCategory('electrician');
    setWorkContactMethod('chat');
  };

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
        // Already on Create Post screen
        break;
      case 'MyPosts':
        navigation.navigate('Posts');
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
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Description */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.textInput, styles.multilineInput]}
          value={sellDescription}
          onChangeText={setSellDescription}
          placeholder="Describe your item..."
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Price and Rent/Sell Toggle */}
      <View style={styles.row}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
          <Text style={styles.label}>Price *</Text>
          <TextInput
            style={styles.textInput}
            value={sellPrice}
            onChangeText={setSellPrice}
            placeholder="0"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.toggleGroup}>
          <Text style={styles.label}>Type</Text>
          <View style={styles.toggleContainer}>
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

      {/* Category */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={sellCategory}
            onValueChange={setSellCategory}
            style={styles.picker}
          >
            {sellCategories.map(cat => (
              <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Image Upload */}
      <View style={styles.inputGroup}>
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
              <Ionicons name="camera" size={24} color="#6B7280" />
              <Text style={styles.addImageText}>Add Photo</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Location */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Location</Text>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={handleLocationPress}
        >
          <Ionicons name="location-outline" size={20} color="#6B7280" />
          <Text style={styles.locationText}>{locationText}</Text>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Contact Method */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Contact Method</Text>
        <RadioButton.Group
          onValueChange={setSellContactMethod}
          value={sellContactMethod}
        >
          <View style={styles.radioOption}>
            <RadioButton value="chat" color="#3B82F6" />
            <Text style={styles.radioLabel}>In-app Chat</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value="phone" color="#3B82F6" />
            <Text style={styles.radioLabel}>Phone Call</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value="both" color="#3B82F6" />
            <Text style={styles.radioLabel}>Both</Text>
          </View>
        </RadioButton.Group>
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
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Category */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={helpCategory}
            onValueChange={setHelpCategory}
            style={styles.picker}
          >
            {helpCategories.map(cat => (
              <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Optional Image */}
      <View style={styles.inputGroup}>
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
              <Ionicons name="camera" size={24} color="#6B7280" />
              <Text style={styles.addImageText}>Add Photo</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Urgency */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>When do you need help?</Text>
        <RadioButton.Group
          onValueChange={setHelpUrgency}
          value={helpUrgency}
        >
          {urgencyOptions.map(option => (
            <View key={option.value} style={styles.radioOption}>
              <RadioButton value={option.value} color="#3B82F6" />
              <Text style={styles.radioLabel}>{option.label}</Text>
            </View>
          ))}
        </RadioButton.Group>
      </View>
    </ScrollView>
  );

  const renderWorkTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Title */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>What do you need? *</Text>
        <TextInput
          style={styles.textInput}
          value={workTitle}
          onChangeText={setWorkTitle}
          placeholder="e.g., Fix electrical outlet"
          placeholderTextColor="#9CA3AF"
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
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Date and Time */}
      <View style={styles.row}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
          <Text style={styles.label}>Date</Text>
          <TextInput
            style={styles.textInput}
            value={workDate}
            onChangeText={setWorkDate}
            placeholder="DD/MM/YYYY"
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <View style={[styles.inputGroup, { flex: 1 }]}>
          <Text style={styles.label}>Time</Text>
          <TextInput
            style={styles.textInput}
            value={workTime}
            onChangeText={setWorkTime}
            placeholder="HH:MM"
            placeholderTextColor="#9CA3AF"
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
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
        />
      </View>

      {/* Category */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={workCategory}
            onValueChange={setWorkCategory}
            style={styles.picker}
          >
            {workCategories.map(cat => (
              <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Location */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Location</Text>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={handleLocationPress}
        >
          <Ionicons name="location-outline" size={20} color="#6B7280" />
          <Text style={styles.locationText}>{locationText}</Text>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Contact Method */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Contact Method</Text>
        <RadioButton.Group
          onValueChange={setWorkContactMethod}
          value={workContactMethod}
        >
          <View style={styles.radioOption}>
            <RadioButton value="chat" color="#3B82F6" />
            <Text style={styles.radioLabel}>In-app Chat</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value="phone" color="#3B82F6" />
            <Text style={styles.radioLabel}>Phone Call</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value="both" color="#3B82F6" />
            <Text style={styles.radioLabel}>Both</Text>
          </View>
        </RadioButton.Group>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <Text style={styles.headerTitle}>Create Post</Text>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabNavigation}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'sell' && styles.activeTab]}
            onPress={() => setActiveTab('sell')}
          >
            <Text style={[styles.tabText, activeTab === 'sell' && styles.activeTabText]}>
              Sell
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'help' && styles.activeTab]}
            onPress={() => setActiveTab('help')}
          >
            <Text style={[styles.tabText, activeTab === 'help' && styles.activeTabText]}>
              Help
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'work' && styles.activeTab]}
            onPress={() => setActiveTab('work')}
          >
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

        {/* Floating Post Button */}
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>

        {/* Location Modal */}
        <Modal
          visible={showLocationModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowLocationModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Location</Text>
              <Text style={styles.modalText}>Current: {locationText}</Text>
              <TextInput
                style={styles.textInput}
                value={locationText}
                onChangeText={setLocationText}
                placeholder="Enter your location"
                placeholderTextColor="#9CA3AF"
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  tabNavigation: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#3B82F6',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#3B82F6',
  },
  contentContainer: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#111827',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  toggleGroup: {
    flex: 1,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  toggleText: {
    fontSize: 16,
    color: '#6B7280',
  },
  toggleTextActive: {
    color: '#3B82F6',
    fontWeight: '500',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
  },
  imageUploadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  imagePreview: {
    position: 'relative',
    width: 80,
    height: 80,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageButton: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  addImageText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  locationText: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    marginLeft: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioLabel: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 8,
  },
  postButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  postButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 12,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
  },
  confirmButton: {
    backgroundColor: '#3B82F6',
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CreatePostScreen;