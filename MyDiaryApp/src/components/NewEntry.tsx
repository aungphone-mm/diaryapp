import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { auth, firestore } from '../config/firebase';

interface NewEntryProps {
  onEntryAdded?: () => void;
}

const NewEntry: React.FC<NewEntryProps> = ({ onEntryAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (!title || !content) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const user = auth().currentUser;
    if (!user) {
      Alert.alert('Error', 'You must be logged in to create an entry');
      return;
    }

    try {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('entries')
        .add({
          title,
          content,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      Alert.alert('Success', 'Entry added successfully!');
      setTitle('');
      setContent('');
      if (onEntryAdded) {
        onEntryAdded();
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>New Diary Entry</Text>
      <TextInput
        style={styles.input}
        placeholder="Entry Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Write your entry here..."
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={10}
        textAlignVertical="top"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Entry</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
    minHeight: 150,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewEntry;
