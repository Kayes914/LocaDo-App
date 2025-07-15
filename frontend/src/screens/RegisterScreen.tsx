import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

interface RegisterScreenProps {
  navigation?: {
    navigate: (screen: string, params?: any) => void;
    replace: (screen: string, params?: any) => void;
    goBack: () => void;
  };
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode, colors } = useTheme();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    };
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    // Phone validation (optional but if provided should be valid)
    if (formData.phone.trim() && !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const success = await register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        phone: formData.phone.trim() || undefined,
        location: formData.location.trim() || undefined,
      });

      if (success) {
        // Navigation will be handled automatically by AppNavigator
        // when authentication state changes
        console.log('Registration successful');
      } else {
        Alert.alert('Registration Failed', 'Failed to create account. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const navigateToLogin = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      paddingHorizontal: 24,
    },
    scrollView: {
      flexGrow: 1,
    },
    header: {
      alignItems: 'center',
      paddingTop: 40,
      paddingBottom: 32,
    },
    backButton: {
      position: 'absolute',
      left: 0,
      top: 40,
      padding: 8,
    },
    logo: {
      fontSize: 28,
      fontWeight: '800',
      color: colors.primary,
      marginBottom: 8,
      letterSpacing: -1,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
    },
    form: {
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      gap: 16,
    },
    inputGroup: {
      marginBottom: 20,
    },
    halfWidth: {
      flex: 1,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
      letterSpacing: -0.2,
    },
    inputContainer: {
      position: 'relative',
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
    inputError: {
      borderColor: colors.error,
    },
    passwordInput: {
      paddingRight: 50,
    },
    passwordToggle: {
      position: 'absolute',
      right: 16,
      top: 14,
      padding: 4,
    },
    errorText: {
      color: colors.error,
      fontSize: 14,
      marginTop: 6,
      marginLeft: 4,
    },
    registerButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 16,
      marginBottom: 24,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    registerButtonDisabled: {
      backgroundColor: colors.textSecondary,
      shadowOpacity: 0,
      elevation: 0,
    },
    registerButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '700',
      letterSpacing: -0.3,
    },
    footer: {
      paddingVertical: 16,
      alignItems: 'center',
    },
    loginText: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    loginLink: {
      color: colors.primary,
      fontWeight: '600',
    },
    guestButton: {
      marginTop: 20,
      paddingVertical: 14,
      paddingHorizontal: 24,
      alignItems: 'center',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: 'transparent',
    },
    guestButtonText: {
      fontSize: 16,
      color: colors.textSecondary,
      fontWeight: '500',
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.container} 
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={navigateToLogin}>
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.logo}>Join Locado</Text>
            <Text style={styles.subtitle}>
              Create your account to get started
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name *</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.textInput,
                    errors.name ? styles.inputError : {}
                  ]}
                  value={formData.name}
                  onChangeText={(text) => updateField('name', text)}
                  placeholder="Enter your full name"
                  placeholderTextColor={colors.inputPlaceholder}
                  autoCapitalize="words"
                  autoComplete="name"
                  autoCorrect={false}
                />
              </View>
              {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email *</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.textInput,
                    errors.email ? styles.inputError : {}
                  ]}
                  value={formData.email}
                  onChangeText={(text) => updateField('email', text)}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.inputPlaceholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                />
              </View>
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            </View>

            {/* Phone and Location Row */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Phone</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[
                      styles.textInput,
                      errors.phone ? styles.inputError : {}
                    ]}
                    value={formData.phone}
                    onChangeText={(text) => updateField('phone', text)}
                    placeholder="Your phone number"
                    placeholderTextColor={colors.inputPlaceholder}
                    keyboardType="phone-pad"
                    autoComplete="tel"
                  />
                </View>
                {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Location</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    value={formData.location}
                    onChangeText={(text) => updateField('location', text)}
                    placeholder="Your city"
                    placeholderTextColor={colors.inputPlaceholder}
                    autoCapitalize="words"
                  />
                </View>
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password *</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.textInput,
                    styles.passwordInput,
                    errors.password ? styles.inputError : {}
                  ]}
                  value={formData.password}
                  onChangeText={(text) => updateField('password', text)}
                  placeholder="Create a password"
                  placeholderTextColor={colors.inputPlaceholder}
                  secureTextEntry={!showPassword}
                  autoComplete="password-new"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={22}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
              {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Password *</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.textInput,
                    styles.passwordInput,
                    errors.confirmPassword ? styles.inputError : {}
                  ]}
                  value={formData.confirmPassword}
                  onChangeText={(text) => updateField('confirmPassword', text)}
                  placeholder="Confirm your password"
                  placeholderTextColor={colors.inputPlaceholder}
                  secureTextEntry={!showConfirmPassword}
                  autoComplete="password-new"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off' : 'eye'}
                    size={22}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
            </View>

            {/* Register Button */}
            <TouchableOpacity
              style={[
                styles.registerButton,
                loading ? styles.registerButtonDisabled : {}
              ]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.registerButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text style={styles.loginLink} onPress={navigateToLogin}>
                Sign In
              </Text>
            </Text>
            
            {/* Browse as Guest Button */}
            <TouchableOpacity 
              style={styles.guestButton}
              onPress={() => {
                if (navigation) {
                  navigation.replace('Home');
                }
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.guestButtonText}>Browse as Guest</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen; 