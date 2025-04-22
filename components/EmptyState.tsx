
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ClipboardList } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export function EmptyState() {
  return (
    <Animated.View 
      style={styles.container}
      entering={FadeIn.duration(500)}
    >
      <ClipboardList size={64} color="#6C63FF" style={styles.icon} />
      <Text style={styles.title}>No tasks yet</Text>
      <Text style={styles.subtitle}>
        Add a task using the button below
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  icon: {
    marginBottom: 16,
    opacity: 0.9,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
  },
});