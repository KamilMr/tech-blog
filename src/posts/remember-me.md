---
title: Building a Secure "Remember Me"
subtitle: 
date: 2025-08-15
language: English
tags:
  - React-Native
---

# Building a Secure "Remember Me" 

When building authentication flows, one of the most common user requests is "Can you just remember my login?" It seems simple enough at first — save the credentials somewhere and reload them next time. But like most things in software development and in life, the devil is in the details.

## The Storage Dilemma: AsyncStorage vs Expo SecureStore

Before diving into implementation, I had to make a decision: where to store user credentials. The two main contenders were:

1. **AsyncStorage** - React Native's simple key-value storage
2. **Expo SecureStore** - secure storage

AsyncStorage might seem like the obvious choice—it's simpler, widely used, and gets the job done. But here's the thing: AsyncStorage stores data in plain text. On a rooted anyone with file system access can read these credentials.

Expo SecureStore, on the other hand, leverages the device's secure hardware enclave (Keychain on iOS, Keystore on Android). Even if someone gains file system access, the credentials remain encrypted and protected by the operating system's security layer.

## Creating the Secure Storage Utility

First, I created small helper function around Expo SecureStore:

```javascript
import * as SecureStore from 'expo-secure-store';

// Save credentials securely
const save = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

// Retrieve saved credentials
const getValueFor = async (key: string) => {
  let result = await SecureStore.getItemAsync(key);
  if (result) return result;
};

// Delete credentials when user unchecks "remember me"
const deleteValue = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};

export {save, getValueFor, deleteValue};
```

This utility provides three essential operations: save, retrieve, and delete. The delete function is particularly important—when users change their mind about being remembered.
## Integrating the Checkbox UI

I added a checkbox component that's both functional and accessible:

```javascript
import {Button, TextInput, Checkbox} from 'react-native-paper';
import {save, getValueFor, deleteValue} from '@/utils/secureStorage';

// State for remembering user preference
const [rememberUser, setRememberUser] = useState(false);

// Checkbox with accessible label
<View style={styles.checkboxContainer}>
  <Checkbox
    status={rememberUser ? 'checked' : 'unchecked'}
    onPress={handleCheckbox}
  />
  <Text style={styles.checkboxLabel} onPress={handleCheckbox}>
    Zapamiętaj mnie
  </Text>
</View>
```
## Checkbox Handler

The checkbox handler is where it's not just about toggling a boolean—it's about managing sensitive data also:

```js
const handleCheckbox = async () => {
  const newRememberValue = !rememberUser;
  setRememberUser(newRememberValue);

  // Immediately delete stored credentials when unchecked
  if (!newRememberValue) {
    try {
      await deleteValue('rememberedEmail');
      await deleteValue('rememberedPassword');
    } catch (error) {
      console.log('Error clearing saved credentials');
    }
  }
};
```

The key insight here is **immediate deletion**. When users uncheck "remember me," their credentials are deleted instantly—not on the next login attempt, not when the app restarts, but immediately.
## Loading Saved Credentials on Mount

The component needs to check for saved credentials when it first loads:

```javascript
useEffect(() => {
  const loadSavedCredentials = async () => {
    try {
      const savedEmail = await getValueFor('rememberedEmail');
      const savedPassword = await getValueFor('rememberedPassword');

      if (savedEmail && savedPassword) {
        setData({
          email: savedEmail,
          password: savedPassword,
        });
        setRememberUser(true);
      }
    } catch (error) {
      console.log('No saved credentials found');
    }
  };

  loadSavedCredentials();
}, []);
```
## Saving Credentials on Successful Login

Finally, the login handler saves credentials only after successful authentication:

```javascript
const handleSave = async () => {
  try {
    await dispatch(signIn(data)).unwrap();

    // Only save if user opted in AND login succeeded
    if (rememberUser) {
      await save('rememberedEmail', data.email);
      await save('rememberedPassword', data.password);
    }

    router.replace('/');
  } catch (error: any) {
    console.error('error', error?.message || 'Coś poszło nie tak');
  }
};
```