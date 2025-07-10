import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface BottomNavigationProps {
  activeTab?: string;
  onTabPress?: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeTab = 'Home', 
  onTabPress 
}) => {
  const insets = useSafeAreaInsets();

  const navigationItems = [
    {
      id: 'Home',
      icon: 'home',
      label: 'Home',
    },
    {
      id: 'Marketplace',
      icon: 'storefront',
      label: 'Marketplace',
    },
    {
      id: 'Post',
      icon: 'add-circle',
      label: 'Post',
      isSpecial: true,
    },
    {
      id: 'Help',
      icon: 'help-circle',
      label: 'Help',
    },
    {
      id: 'Settings',
      icon: 'settings',
      label: 'Settings',
    },
  ];

  const handleTabPress = (tabId: string) => {
    if (onTabPress) {
      onTabPress(tabId);
    }
  };

  return (
    <View style={[styles.bottomNav, { paddingBottom: insets.bottom + 12 }]}>
      {navigationItems.map((item) => {
        const isActive = activeTab === item.id;
        const isSpecial = item.isSpecial;
        
        return (
          <TouchableOpacity 
            key={item.id}
            style={[styles.navItem, isSpecial && styles.specialNavItem]}
            onPress={() => handleTabPress(item.id)}
          >
            <View style={[styles.iconContainer, isSpecial && styles.specialIconContainer, isActive && !isSpecial && styles.activeIconContainer]}>
              <Ionicons 
                name={item.icon as any} 
                size={isSpecial ? 26 : 22} 
                color={isSpecial ? '#FFFFFF' : (isActive ? '#007AFF' : '#8E8E93')} 
              />
            </View>
            <Text style={[
              styles.navText, 
              isActive && !isSpecial && styles.activeNavText,
              isSpecial && styles.specialNavText
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingTop: 16,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  specialNavItem: {
    marginTop: -8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  specialIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  activeIconContainer: {
    backgroundColor: '#F0F8FF',
  },
  navText: {
    fontSize: 11,
    color: '#8E8E93',
    fontWeight: '500',
    textAlign: 'center',
  },
  activeNavText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  specialNavText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 11,
  },
});

export default BottomNavigation; 