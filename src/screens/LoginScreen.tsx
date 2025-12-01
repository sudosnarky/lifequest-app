import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useUser } from '../contexts/UserContext';
import { colors } from '../theme';

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useUser();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      // Navigation will be handled automatically by auth state change
    } catch (error: any) {
      Alert.alert(
        'Login Failed',
        error.response?.data?.error || 'Invalid email or password'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>LifeQuest</Text>
          <Text style={styles.subtitle}>Level up your life</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="your@email.com"
            placeholderTextColor={colors.beige.light}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor={colors.beige.light}
            secureTextEntry
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>Sign up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.testAccountsContainer}>
            <Text style={styles.testAccountsTitle}>Test Accounts:</Text>
            <Text style={styles.testAccountText}>alex@test.com / password123</Text>
            <Text style={styles.testAccountText}>jordan@test.com / password123</Text>
            <Text style={styles.testAccountText}>sam@test.com / password123</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy.dark,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.beige.main,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.beige.light,
    fontStyle: 'italic',
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.beige.main,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: colors.navy.main,
    borderWidth: 1,
    borderColor: colors.beige.dark,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.beige.main,
  },
  button: {
    backgroundColor: colors.navy.light,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: colors.beige.light,
    fontSize: 14,
  },
  link: {
    color: colors.navy.lighter,
    fontSize: 14,
    fontWeight: '600',
  },
  testAccountsContainer: {
    marginTop: 32,
    padding: 16,
    backgroundColor: colors.navy.main,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.beige.dark,
  },
  testAccountsTitle: {
    color: colors.beige.main,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  testAccountText: {
    color: colors.beige.light,
    fontSize: 12,
    marginVertical: 2,
  },
});
