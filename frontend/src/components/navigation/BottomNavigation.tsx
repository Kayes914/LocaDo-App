import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

interface BottomNavigationProps {
  activeTab?: string;
  onTabPress?: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeTab = 'Home', 
  onTabPress 
}) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const navigationItems = [
    {
      id: 'Home',
      icon: 'home-outline',
      activeIcon: 'home',
      label: 'Home',
    },
    {
      id: 'Items',
      icon: 'grid-outline',
      activeIcon: 'grid',
      label: 'Items',
    },
    {
      id: 'Post',
      icon: 'add',
      activeIcon: 'add',
      label: 'Post',
      isSpecial: true,
    },
    {
      id: 'Experts',
      icon: 'construct-outline',
      activeIcon: 'construct',
      label: 'Experts',
    },
    {
      id: 'Profile',
      icon: 'person-outline',
      activeIcon: 'person',
      label: 'Profile',
    },
  ];

  const handleTabPress = (tabId: string) => {
    if (onTabPress) {
      onTabPress(tabId);
    }
  };

  // Dynamic styles based on theme
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.03,
      shadowRadius: 8,
      elevation: 4,
    },
    navBar: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      paddingHorizontal: 16,
      paddingTop: 6,
      paddingBottom: 2,
      height: 50,
    },
    navItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingVertical: 2,
    },
    specialNavItem: {
      marginTop: -10,
    },
    iconWrapper: {
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 1,
    },
    activeIconWrapper: {
      backgroundColor: colors.primaryLight,
    },
    specialButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    navLabel: {
      fontSize: 9,
      color: colors.textTertiary,
      fontWeight: '500',
    },
    activeNavLabel: {
      color: colors.primary,
      fontWeight: '600',
    },
  });

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 4) }]}>
      <View style={styles.navBar}>
        {navigationItems.map((item) => {
          const isActive = activeTab === item.id;
          const isSpecial = item.isSpecial;
          
          return (
            <TouchableOpacity 
              key={item.id}
              style={[styles.navItem, isSpecial && styles.specialNavItem]}
              onPress={() => handleTabPress(item.id)}
              activeOpacity={0.7}
            >
              {isSpecial ? (
                <View style={styles.specialButton}>
                  <Ionicons 
                    name={item.icon as any} 
                    size={18} 
                    color="#FFFFFF" 
                  />
                </View>
              ) : (
                <>
                  <View style={[styles.iconWrapper, isActive && styles.activeIconWrapper]}>
                    <Ionicons 
                      name={(isActive ? item.activeIcon : item.icon) as any} 
                      size={18} 
                      color={isActive ? colors.primary : colors.textTertiary} 
                    />
                  </View>
                  <Text style={[styles.navLabel, isActive && styles.activeNavLabel]}>
                    {item.label}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default BottomNavigation; 