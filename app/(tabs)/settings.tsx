
import { View, Text, StyleSheet, ScrollView, Switch, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Trash2, Moon, Sun, Info } from 'lucide-react-native';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const clearAllTasks = async () => {
    Alert.alert(
      "Clear All Tasks",
      "Are you sure you want to delete all tasks? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('todo-app-tasks');
              Alert.alert("Success", "All tasks have been deleted.");
            } catch (error) {
              Alert.alert("Error", "Failed to delete tasks.");
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              {isDarkMode ? 
                <Moon size={20} color="#6C63FF" style={styles.settingIcon} /> : 
                <Sun size={20} color="#6C63FF" style={styles.settingIcon} />
              }
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: '#E5E5EA', true: '#6C63FF' }}
              thumbColor={'#FFFFFF'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          <Pressable 
            style={({ pressed }) => [
              styles.dangerButton,
              pressed && styles.buttonPressed
            ]}
            onPress={clearAllTasks}
          >
            <Trash2 size={20} color="#FFFFFF" style={styles.buttonIcon} />
            <Text style={styles.dangerButtonText}>Clear All Tasks</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutContainer}>
            <Info size={20} color="#6C63FF" style={styles.aboutIcon} />
            <View>
              <Text style={styles.appName}>Todo App</Text>
              <Text style={styles.versionText}>Version 1.0.0</Text>
              <Text style={styles.copyrightText}>© 2023 Blink</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FC',
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#1C1C1E',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  dangerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  aboutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aboutIcon: {
    marginRight: 16,
  },
  appName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  versionText: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 2,
  },
  copyrightText: {
    fontSize: 14,
    color: '#8E8E93',
  },
});