import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { auth, firestore } from '../config/firebase';

interface Entry {
  id: string;
  title: string;
  content: string;
  createdAt: any;
}

const EntryList: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth().currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const unsubscribe = firestore()
      .collection('users')
      .doc(user.uid)
      .collection('entries')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          const entriesData: Entry[] = [];
          querySnapshot.forEach((doc) => {
            entriesData.push({
              id: doc.id,
              ...doc.data(),
            } as Entry);
          });
          setEntries(entriesData);
          setLoading(false);
        },
        (error) => {
          console.error('Error fetching entries:', error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Just now';
    const date = timestamp.toDate();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const renderEntry = ({ item }: { item: Entry }) => (
    <View style={styles.entryCard}>
      <Text style={styles.entryTitle}>{item.title}</Text>
      <Text style={styles.entryContent}>{item.content}</Text>
      <Text style={styles.entryDate}>{formatDate(item.createdAt)}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (entries.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No entries yet. Create your first entry!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Entries</Text>
      <FlatList
        data={entries}
        renderItem={renderEntry}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  entryCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  entryContent: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  entryDate: {
    fontSize: 12,
    color: '#999',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default EntryList;
