
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { Check, Trash2, Edit2, X } from 'lucide-react-native';
import Animated, { FadeInRight, FadeOutLeft, Layout } from 'react-native-reanimated';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

export function TaskItem({ task, onToggleComplete, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSaveEdit = () => {
    if (editedTitle.trim()) {
      onEdit(task.id, editedTitle);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedTitle(task.title);
    setIsEditing(false);
  };

  return (
    <Animated.View 
      style={styles.container}
      entering={FadeInRight.duration(300)}
      exiting={FadeOutLeft.duration(200)}
      layout={Layout.springify()}
    >
      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            value={editedTitle}
            onChangeText={setEditedTitle}
            autoFocus
            onSubmitEditing={handleSaveEdit}
            blurOnSubmit={false}
          />
          <View style={styles.editActions}>
            <Pressable 
              onPress={handleCancelEdit}
              style={({ pressed }) => [
                styles.editButton,
                pressed && styles.buttonPressed
              ]}
            >
              <X size={18} color="#FF3B30" />
            </Pressable>
            <Pressable 
              onPress={handleSaveEdit}
              style={({ pressed }) => [
                styles.editButton,
                pressed && styles.buttonPressed
              ]}
            >
              <Check size={18} color="#34C759" />
            </Pressable>
          </View>
        </View>
      ) : (
        <>
          <Pressable 
            onPress={() => onToggleComplete(task.id)}
            style={({ pressed }) => [
              styles.checkbox,
              task.completed && styles.checkboxCompleted,
              pressed && styles.checkboxPressed
            ]}
          >
            {task.completed && <Check size={16} color="#FFFFFF" />}
          </Pressable>
          
          <Text 
            style={[
              styles.title,
              task.completed && styles.titleCompleted
            ]}
            numberOfLines={1}
          >
            {task.title}
          </Text>
          
          <View style={styles.actions}>
            <Pressable 
              onPress={() => setIsEditing(true)}
              style={({ pressed }) => [
                styles.actionButton,
                pressed && styles.buttonPressed
              ]}
              disabled={task.completed}
            >
              <Edit2 
                size={18} 
                color={task.completed ? "#C7C7CC" : "#6C63FF"} 
              />
            </Pressable>
            
            <Pressable 
              onPress={() => onDelete(task.id)}
              style={({ pressed }) => [
                styles.actionButton,
                pressed && styles.buttonPressed
              ]}
            >
              <Trash2 size={18} color="#FF3B30" />
            </Pressable>
          </View>
        </>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#6C63FF',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkboxCompleted: {
    backgroundColor: '#6C63FF',
    borderColor: '#6C63FF',
  },
  checkboxPressed: {
    opacity: 0.8,
  },
  title: {
    fontSize: 16,
    color: '#1C1C1E',
    flex: 1,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  actions: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  editContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editInput: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
    padding: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 6,
  },
  editActions: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  editButton: {
    padding: 8,
    marginLeft: 4,
  },
});