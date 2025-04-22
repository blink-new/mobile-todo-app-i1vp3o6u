
import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TaskItem } from '@/components/TaskItem';
import { EmptyState } from '@/components/EmptyState';
import { AddTaskInput } from '@/components/AddTaskInput';
import { useTasks } from '@/hooks/useTasks';

export default function TasksScreen() {
  const { 
    tasks, 
    isLoading, 
    addTask, 
    toggleTaskComplete, 
    deleteTask, 
    editTask 
  } = useTasks();

  const completedTasks = tasks.filter(task => task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed);

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#6C63FF" />
        </View>
      );
    }

    if (tasks.length === 0) {
      return <EmptyState />;
    }

    return (
      <FlatList
        data={[
          { type: 'header', id: 'incomplete-header' },
          ...incompleteTasks.map(task => ({ type: 'task', task })),
          incompleteTasks.length > 0 && completedTasks.length > 0 
            ? { type: 'completed-header', id: 'completed-header' } 
            : null,
          ...completedTasks.map(task => ({ type: 'task', task })),
        ].filter(Boolean)}
        keyExtractor={(item) => {
          if (item.type === 'task') return item.task.id;
          return item.id;
        }}
        renderItem={({ item }) => {
          if (item.type === 'header') {
            return (
              <Text style={styles.sectionHeader}>
                Tasks ({incompleteTasks.length})
              </Text>
            );
          }
          if (item.type === 'completed-header') {
            return (
              <Text style={styles.sectionHeader}>
                Completed ({completedTasks.length})
              </Text>
            );
          }
          return (
            <TaskItem
              task={item.task}
              onToggleComplete={toggleTaskComplete}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          );
        }}
        contentContainerStyle={styles.listContent}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        {renderContent()}
        <AddTaskInput onAddTask={addTask} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FC',
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6C63FF',
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
});