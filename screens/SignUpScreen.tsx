import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

type SignUpScreenProps = {
  navigation: NavigationProp<any>;
};

const SignUpScreen: React.FC<SignUpScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateInputs = useCallback(() => {
    const passwordCriteria = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).{8,}$/;
    const isValidPassword = passwordCriteria.test(password);
    const passwordsMatch = password === confirmPassword;
    setIsValid(!!email && !!username && isValidPassword && passwordsMatch);
  }, [email, username, password, confirmPassword]);

  useEffect(() => {
    validateInputs();
  }, [email, username, password, confirmPassword, validateInputs]);

  const handleSignUp = () => {
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Proceed with sign-up logic
    navigation.navigate('Home');
  };

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
      return 'Password must be at least 8 characters long';
    }
    if (!hasNumber.test(password)) {
      return 'Password must contain at least one numerical value';
    }
    if (!hasSymbol.test(password)) {
      return 'Password must contain at least one symbol';
    }
    return '';
  };

  const isMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.form}>
        <Text style={styles.label}>
          Email <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text style={styles.label}>
          Username <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.label}>
          Password <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.passwordRequirements}>
          <Text
            style={[styles.requirement, isMinLength && styles.requirementMet]}>
            • At least 8 characters long
          </Text>
          <Text
            style={[styles.requirement, hasNumber && styles.requirementMet]}>
            • Contains at least one numerical value
          </Text>
          <Text
            style={[styles.requirement, hasSymbol && styles.requirementMet]}>
            • Contains at least one symbol
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text style={styles.label}>
          Confirm Password <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[
            styles.input,
            password !== confirmPassword && styles.inputError,
          ]}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        {password !== confirmPassword && (
          <Text style={styles.errorText}>Passwords do not match</Text>
        )}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[
            styles.button,
            isValid ? styles.buttonEnabled : styles.buttonDisabled,
          ]}
          onPress={handleSignUp}
          disabled={!isValid}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.requiredKey}>* means required</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  required: {
    color: 'red',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  inputError: {
    borderColor: 'red',
  },
  passwordRequirements: {
    marginBottom: 16,
  },
  requirement: {
    color: 'red',
  },
  requirementMet: {
    color: 'green',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonEnabled: {
    backgroundColor: '#007BFF',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
  requiredKey: {
    marginTop: 20,
    fontSize: 14,
    color: 'red',
  },
});

export default SignUpScreen;
