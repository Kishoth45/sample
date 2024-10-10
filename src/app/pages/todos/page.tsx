'use client'

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store/store";
import { fetchTodo, deleteTodoRequest, editTodoRequest } from "@/app/redux/slice/todoSlice";
import { Button, Table, Spin, Modal, Input, Select } from 'antd';
import { ApiResponse, todo } from '@/app/redux/types/apiTypes';
import AddTodoModal from "./addtodo";

const { Option } = Select;

const Todos: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.todo);
  const [showModal, setShowModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState<todo | undefined>(undefined); // State for editing a todo

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  if (loading) {
    return <div className="spin">
      <Spin size="large" />
    </div>;
  }
  if (error) {
    return <h3>Error: {error}</h3>;
  }

  const todos = data?.todos || [];

  const handleEditTodo = (todo: todo): void => {
    setEditingTodo(todo); // Set the todo to be edited
    setShowModal(true);   // Open the modal
  };

  const handleDeleteTodo = (id: number): void => {
    dispatch(deleteTodoRequest(id)); // Dispatch delete action
  };

  // Define the columns for the table
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Todo', dataIndex: 'todo', key: 'todo' },
    { title: 'Completed', dataIndex: 'completed', key: 'completed', render: (completed: boolean) => (completed ? "True" : "False") },
    { title: 'UserId', dataIndex: 'userId', key: 'userId' },
    {
      title: 'Actions', key: 'actions',
      render: (_: any, record: todo) => (
        <>
          <Button onClick={() => handleEditTodo(record)} style={{ marginRight: 8 }}>Edit</Button>
          <Button onClick={() => handleDeleteTodo(record.id)} danger>Delete</Button>
        </>
      )
    }
  ];

  return (
    <>
      <Button
        type="primary"
        style={{ margin: '30px' }}
        onClick={() => {
          setEditingTodo(undefined);  // Reset editing todo when adding a new todo
          setShowModal(true);         // Open the modal
        }}
      >
        Add
      </Button>

      <Table
        columns={columns}
        dataSource={todos}
        rowKey="id"
        pagination={{ pageSize: 50, showSizeChanger: true, pageSizeOptions: ['25', '10', '30'] }}
      />

      {/* Add or Edit Todo Modal */}
      <AddTodoModal
        visible={showModal}
        onClose={() => {
          setShowModal(false);       // Close the modal
          setEditingTodo(undefined); // Reset editingTodo state
        }}
        todo={editingTodo}           // Pass the editing todo (if any) to the modal
      />
    </>
  );
};

export default Todos;
