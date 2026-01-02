'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { HiPlus, HiTrash, HiCheck, HiClock, HiFlag, HiPencil } from 'react-icons/hi';

interface Todo {
  _id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'content' | 'technical' | 'marketing' | 'support' | 'other';
  assignedTo?: string;
  dueDate?: string;
  completedAt?: string;
  tags?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'todo' | 'in-progress' | 'completed'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    category: 'other' as const,
    dueDate: '',
    assignedTo: ''
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast.error('Authentication required');
        return;
      }

      const response = await fetch('/api/admin/todos', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to fetch todos');

      const data = await response.json();
      setTodos(data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
      toast.error('Failed to load todos');
    } finally {
      setLoading(false);
    }
  }

  async function createTodo() {
    if (!newTodo.title.trim()) {
      toast.error('Title is required');
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/admin/todos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
      });

      if (!response.ok) throw new Error('Failed to create todo');

      const data = await response.json();
      setTodos([...todos, data.todo]);
      setNewTodo({
        title: '',
        description: '',
        priority: 'medium',
        category: 'other',
        dueDate: '',
        assignedTo: ''
      });
      setShowAddModal(false);
      toast.success('Todo created successfully');
    } catch (error) {
      console.error('Error creating todo:', error);
      toast.error('Failed to create todo');
    }
  }

  async function updateTodoStatus(id: string, status: Todo['status']) {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) throw new Error('Failed to update todo');

      const data = await response.json();
      setTodos(todos.map(t => t._id === id ? data.todo : t));
      toast.success('Todo updated');
    } catch (error) {
      console.error('Error updating todo:', error);
      toast.error('Failed to update todo');
    }
  }

  function openEditModal(todo: Todo) {
    setEditingTodo(todo);
    setShowEditModal(true);
  }

  async function updateTodo() {
    if (!editingTodo) return;
    if (!editingTodo.title.trim()) {
      toast.error('Title is required');
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/todos/${editingTodo._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: editingTodo.title,
          description: editingTodo.description,
          priority: editingTodo.priority,
          category: editingTodo.category,
          dueDate: editingTodo.dueDate,
          assignedTo: editingTodo.assignedTo,
          notes: editingTodo.notes
        })
      });

      if (!response.ok) throw new Error('Failed to update todo');

      const data = await response.json();
      setTodos(todos.map(t => t._id === editingTodo._id ? data.todo : t));
      setShowEditModal(false);
      setEditingTodo(null);
      toast.success('Todo updated successfully');
    } catch (error) {
      console.error('Error updating todo:', error);
      toast.error('Failed to update todo');
    }
  }

  async function deleteTodo(id: string) {
    if (!confirm('Are you sure you want to delete this todo?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/todos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to delete todo');

      setTodos(todos.filter(t => t._id !== id));
      toast.success('Todo deleted');
    } catch (error) {
      console.error('Error deleting todo:', error);
      toast.error('Failed to delete todo');
    }
  }

  const filteredTodos = filter === 'all' 
    ? todos 
    : todos.filter(t => t.status === filter);

  const statusColors = {
    'todo': 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800'
  };

  const priorityColors = {
    'low': 'text-gray-500',
    'medium': 'text-yellow-500',
    'high': 'text-orange-500',
    'urgent': 'text-red-500'
  };

  const categoryIcons = {
    'content': '📝',
    'technical': '⚙️',
    'marketing': '📢',
    'support': '💬',
    'other': '📋'
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading todos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">📋 Todo List</h1>
            <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">Manage your tasks and priorities</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base w-full sm:w-auto justify-center"
          >
            <HiPlus className="w-4 h-4 md:w-5 md:h-5" />
            Add Todo
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-2" style={{ display: 'none' }}>
          {(['all', 'todo', 'in-progress', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {f === 'all' ? 'All' : f.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              <span className="ml-2 text-sm">
                ({f === 'all' ? todos.length : todos.filter(t => t.status === f).length})
              </span>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`bg-white rounded-lg shadow p-3 md:p-4 text-left transition-all hover:shadow-lg active:scale-95 md:hover:scale-105 cursor-pointer ${
              filter === 'all' ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <p className="text-gray-600 text-xs md:text-sm">Total Tasks</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{todos.length}</p>
          </button>
          <button
            onClick={() => setFilter('todo')}
            className={`bg-white rounded-lg shadow p-3 md:p-4 text-left transition-all hover:shadow-lg active:scale-95 md:hover:scale-105 cursor-pointer ${
              filter === 'todo' ? 'ring-2 ring-gray-500' : ''
            }`}
          >
            <p className="text-gray-600 text-xs md:text-sm">To Do</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-500">{todos.filter(t => t.status === 'todo').length}</p>
          </button>
          <button
            onClick={() => setFilter('in-progress')}
            className={`bg-white rounded-lg shadow p-3 md:p-4 text-left transition-all hover:shadow-lg active:scale-95 md:hover:scale-105 cursor-pointer ${
              filter === 'in-progress' ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <p className="text-gray-600 text-xs md:text-sm">In Progress</p>
            <p className="text-2xl md:text-3xl font-bold text-blue-600">{todos.filter(t => t.status === 'in-progress').length}</p>
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`bg-white rounded-lg shadow p-3 md:p-4 text-left transition-all hover:shadow-lg active:scale-95 md:hover:scale-105 cursor-pointer ${
              filter === 'completed' ? 'ring-2 ring-green-500' : ''
            }`}
          >
            <p className="text-gray-600 text-xs md:text-sm">Completed</p>
            <p className="text-2xl md:text-3xl font-bold text-green-600">{todos.filter(t => t.status === 'completed').length}</p>
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500">No todos found. Create one to get started!</p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo._id}
                className="bg-white rounded-lg shadow p-3 md:p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-0">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                      <HiFlag className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 ${priorityColors[todo.priority]}`} />
                      <span className="text-xl md:text-2xl flex-shrink-0">{categoryIcons[todo.category]}</span>
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 flex-1 min-w-0 break-words">{todo.title}</h3>
                      <span className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusColors[todo.status]}`}>
                        {todo.status.replace('-', ' ')}
                      </span>
                    </div>
                    {todo.description && (
                      <p className="text-gray-600 text-xs md:text-sm mb-2 ml-0 md:ml-8">{todo.description}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 ml-0 md:ml-8 text-xs text-gray-500">
                      {todo.dueDate && (
                        <span className="flex items-center gap-1">
                          <HiClock className="w-3 h-3 md:w-4 md:h-4" />
                          Due: {new Date(todo.dueDate).toLocaleDateString()}
                        </span>
                      )}
                      {todo.assignedTo && (
                        <span className="truncate">Assigned: {todo.assignedTo}</span>
                      )}
                      <span className="whitespace-nowrap">Created: {new Date(todo.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 justify-end md:justify-start">
                    <div className="flex items-center gap-1 flex-wrap">
                      {todo.status === 'todo' && (
                        <>
                          <button
                            onClick={() => updateTodoStatus(todo._id, 'in-progress')}
                            className="px-2 md:px-3 py-1 md:py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap"
                            title="Start working"
                          >
                            Start
                          </button>
                          <button
                            onClick={() => updateTodoStatus(todo._id, 'completed')}
                            className="px-2 md:px-3 py-1 md:py-1.5 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors whitespace-nowrap"
                            title="Mark as done"
                          >
                            Done
                          </button>
                        </>
                      )}
                      {todo.status === 'in-progress' && (
                        <>
                          <button
                            onClick={() => updateTodoStatus(todo._id, 'todo')}
                            className="px-2 md:px-3 py-1 md:py-1.5 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap"
                            title="Move back to todo"
                          >
                            To Do
                          </button>
                          <button
                            onClick={() => updateTodoStatus(todo._id, 'completed')}
                            className="px-2 md:px-3 py-1 md:py-1.5 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors whitespace-nowrap"
                            title="Mark as done"
                          >
                            Done
                          </button>
                        </>
                      )}
                      {todo.status === 'completed' && (
                        <button
                          onClick={() => updateTodoStatus(todo._id, 'in-progress')}
                          className="px-2 md:px-3 py-1 md:py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap"
                          title="Reopen task"
                        >
                          Reopen
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => openEditModal(todo)}
                      className="p-1.5 md:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <HiPencil className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="p-1.5 md:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <HiTrash className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Todo</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter todo title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Enter description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      value={newTodo.priority}
                      onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value as any })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={newTodo.category}
                      onChange={(e) => setNewTodo({ ...newTodo, category: e.target.value as any })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="content">Content</option>
                      <option value="technical">Technical</option>
                      <option value="marketing">Marketing</option>
                      <option value="support">Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createTodo}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Todo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && editingTodo && (
          <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Todo</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={editingTodo.title}
                    onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter todo title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={editingTodo.description || ''}
                    onChange={(e) => setEditingTodo({ ...editingTodo, description: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Enter description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={editingTodo.status}
                      onChange={(e) => setEditingTodo({ ...editingTodo, status: e.target.value as any })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="todo">Todo</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      value={editingTodo.priority}
                      onChange={(e) => setEditingTodo({ ...editingTodo, priority: e.target.value as any })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={editingTodo.category}
                    onChange={(e) => setEditingTodo({ ...editingTodo, category: e.target.value as any })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="content">Content</option>
                    <option value="technical">Technical</option>
                    <option value="marketing">Marketing</option>
                    <option value="support">Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={editingTodo.dueDate ? new Date(editingTodo.dueDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => setEditingTodo({ ...editingTodo, dueDate: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assigned To
                  </label>
                  <input
                    type="text"
                    value={editingTodo.assignedTo || ''}
                    onChange={(e) => setEditingTodo({ ...editingTodo, assignedTo: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={editingTodo.notes || ''}
                    onChange={(e) => setEditingTodo({ ...editingTodo, notes: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Add notes"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={updateTodo}
                  className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingTodo(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
