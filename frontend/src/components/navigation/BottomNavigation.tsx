import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

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
      iconFamily: 'Ionicons' as const,
    },
    {
      id: 'Post',
      icon: 'add-circle-outline',
      label: 'Post',
      iconFamily: 'Ionicons' as const,
    },
    {
      id: 'Experts',
      icon: 'user-tie',
      label: 'Experts',
      iconFamily: 'FontAwesome5' as const,
    },
    {
      id: 'MyPosts',
      icon: 'document-text-outline',
      label: 'My Posts',
      iconFamily: 'Ionicons' as const,
    },
    {
      id: 'Profile',
      icon: 'person-outline',
      label: 'Profile',
      iconFamily: 'Ionicons' as const,
    },
  ];

  const handleTabPress = (tabId: string) => {
    if (onTabPress) {
      onTabPress(tabId);
    }
  };

  const renderIcon = (item: typeof navigationItems[0], isActive: boolean) => {
    const iconColor = isActive ? '#007AFF' : '#8E8E93';
    const iconSize = item.iconFamily === 'FontAwesome5' ? 20 : 24;

    if (item.iconFamily === 'FontAwesome5') {
      return (
        <FontAwesome5 
          name={item.icon as any} 
          size={iconSize} 
          color={iconColor} 
        />
      );
    }

    return (
      <Ionicons 
        name={item.icon as any} 
        size={iconSize} 
        color={iconColor} 
      />
    );
  };

  return (
    <View style={[styles.bottomNav, { paddingBottom: insets.bottom + 10 }]}>
      {navigationItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <TouchableOpacity 
            key={item.id}
            style={styles.navItem}
            onPress={() => handleTabPress(item.id)}
          >
            {renderIcon(item, isActive)}
            <Text style={[styles.navText, isActive && styles.activeNavText]}>
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
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
    fontWeight: '500',
  },
  activeNavText: {
    color: '#007AFF',
  },
});

export default BottomNavigation; 