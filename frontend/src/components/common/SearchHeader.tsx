import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface SearchHeaderProps {
  // Navigation props
  navigation: {
    goBack?: () => void;
    navigate: (screen: string, params?: any) => void;
  };
  
  // Search functionality
  searchText: string;
  onSearchChange: (text: string) => void;
  onSearchSubmit?: () => void;
  onSearchFocus?: () => void;
  onSearchBlur?: () => void;
  placeholder?: string;
  
  // UI Configuration
  showBackButton?: boolean;
  showSuggestions?: boolean;
  suggestions?: string[];
  onSuggestionPress?: (suggestion: string) => void;
  
  // Chat functionality
  chatBadgeCount?: number;
  
  // Styling variants
  variant?: 'home' | 'search';
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  navigation,
  searchText,
  onSearchChange,
  onSearchSubmit,
  onSearchFocus,
  onSearchBlur,
  placeholder = "Search items, help, services...",
  showBackButton = false,
  showSuggestions = false,
  suggestions = [],
  onSuggestionPress,
  chatBadgeCount = 3,
  variant = 'home'
}) => {
  const insets = useSafeAreaInsets();
  const headerStyle = variant === 'home' ? styles.headerHome : styles.headerSearch;
  const searchContainerStyle = variant === 'home' ? styles.searchContainerHome : styles.searchContainerSearch;
  const searchInputStyle = variant === 'home' ? styles.searchInputHome : styles.searchInputSearch;
  const chatButtonStyle = variant === 'home' ? styles.chatButtonHome : styles.chatButtonSearch;

  return (
    <View style={[styles.header, headerStyle, { paddingTop: insets.top + (variant === 'home' ? 16 : 12) }]}>
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
          <Ionicons name="arrow-back" size={20} color="#374151" />
        </TouchableOpacity>
      )}
      
      <View style={[styles.searchContainer, searchContainerStyle]}>
        <Ionicons 
          name="search-outline" 
          size={18} 
          color="#9CA3AF" 
        />
        <TextInput
          style={[styles.searchInput, searchInputStyle]}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={searchText}
          onChangeText={onSearchChange}
          onFocus={onSearchFocus}
          onBlur={onSearchBlur}
          onSubmitEditing={onSearchSubmit}
          returnKeyType="done"
        />
        
        {showSuggestions && suggestions.length > 0 && (
          <ScrollView
            style={styles.suggestionsList}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.suggestionsContainer}
          >
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionItem}
                onPress={() => onSuggestionPress?.(suggestion)}
              >
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
      
      <TouchableOpacity 
        style={[styles.chatButton, chatButtonStyle]} 
        onPress={() => navigation.navigate('ChatList')}
      >
        <Ionicons 
          name="chatbubble-outline" 
          size={20} 
          color="#374151" 
        />
        {chatBadgeCount > 0 && (
          <View style={styles.chatBadge}>
            <Text style={styles.badgeText}>{chatBadgeCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerHome: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#FAFAFA',
    gap: 12,
  },
  headerSearch: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 10,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  searchContainerHome: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    maxWidth: '85%',
    height: 44,
    justifyContent: 'center',
  },
  searchContainerSearch: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    color: '#111827',
    fontSize: 15,
    paddingVertical: 0,
    textAlignVertical: 'center',
  },
  searchInputHome: {
    marginLeft: 10,
    fontWeight: '400',
  },
  searchInputSearch: {
    marginLeft: 8,
  },
  chatButton: {
    position: 'relative',
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  chatButtonHome: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  chatButtonSearch: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  chatBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 9,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  
  // Search Suggestions
  suggestionsList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    maxHeight: 200,
    zIndex: 10,
  },
  suggestionsContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  suggestionItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  suggestionText: {
    fontSize: 14,
    color: '#374151',
  },
});

export default SearchHeader; 