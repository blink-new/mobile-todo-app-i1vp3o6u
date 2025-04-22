
import React, { useState, useRef } from 'react';
import { View, TextInput, Pressable, StyleSheet, Keyboard } from 'react-native';
import { Plus, X } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface AddTaskInputProps {
  onAddTask: (title: string) => void;
}

export function AddTaskInput({ onAddTask }: AddTaskInputProps) {
  const [taskTitle, setTaskTitle] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      onAddTask(taskTitle);
      setTaskTitle('');
      setIsExpanded(false);
      Keyboard.dismiss();
    }
  };

  const handleCancel = () => {
    setTaskTitle('');
    setIsExpanded(false);
    Keyboard.dismiss();
  };

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <View style={styles.container}>
      {isExpanded ? (
        <Animated.View 
          style={styles.expandedContainer}
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
        >
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={taskTitle}
            onChangeText={setTaskTitle}
            placeholder="Enter task title..."
            placeholderTextColor="#8E8E93"
            returnKeyType="done"
            onSubmitEditing={handleAddTask}
            blurOnSubmit={false}
          />
          <View style={styles.actions}>
            <Pressable 
              onPress={handleCancel}
              style={({ pressed }) => [
                styles.cancelButton,
                pressed && styles.buttonPressed
              ]}
            >
              <X size={20} color="#FF3B30" />
            </Pressable>
            <Pressable 
              onPress={handleAddTask}
              style={({ pressed }) => [
                styles.addButton,
                pressed && styles.buttonPressed,
                !taskTitle.trim() && styles.addButtonDisabled
              ]}
              disabled={!taskTitle.trim()}
            >
              <Plus size={20} color="#FFFFFF" />
            </Pressable>
          </View>
        </Animated.View>
      ) : (
        <Pressable 
          onPress={handleExpand}
          style={({ pressed }) => [
            styles.addTaskButton,
            pressed && styles.buttonPressed
          ]}
        >
          <Plus size={24} color="#FFFFFF" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    left: 24,
    zIndex: 10,
  },
  expandedContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
    padding: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelButton: {
    padding: 10,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#6C63FF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#C7C7CC',
  },
  addTaskButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#6C63FF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonPressed: {
    opacity: 0.8,
  },
});