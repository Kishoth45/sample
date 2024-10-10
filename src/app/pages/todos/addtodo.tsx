import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Input, Select, Button } from 'antd';
import { addTodoRequest, editTodoRequest } from '@/app/redux/slice/todoSlice';
import { ApiResponse,todo } from '@/app/redux/types/apiTypes';

// Define the todo type if not imported from elsewhere


const AddTodoModal: React.FC<{ visible: boolean; onClose: () => void; todo?: todo }> = ({ visible, onClose, todo }) => {
  const dispatch = useDispatch();

  const [id, setId] = useState<string>(todo ? String(todo.id) : ''); // Populate if editing
  const [todoText, setTodoText] = useState<string>(todo ? todo.todo : ''); // Populate if editing
  const [completed, setCompleted] = useState<string>(todo ? String(todo.completed) : 'false');
  const [userId, setUserId] = useState<string>(todo ? String(todo.userId) : ''); // Populate if editing

  const handleAddOrEditTodo = () => {
    if (todo) {
      // Editing an existing todo
      dispatch(editTodoRequest({
        id: Number(id),
        todo: todoText,
        completed: completed === 'true',
        userId: Number(userId),
      }));
    } else {
      // Adding a new todo
      dispatch(addTodoRequest({
        id: Number(id),
        todo: todoText,
        completed: completed === 'true',
        userId: Number(userId),
      }));
    }

    // Reset the form fields
    setId('');
    setTodoText('');
    setCompleted('false');
    setUserId('');
    onClose(); // Close the modal
  };

  return (
    <Modal
      title={todo ? "Edit Todo" : "Add New Todo"}
      open={visible}
      onOk={handleAddOrEditTodo}
      onCancel={onClose}
      okText={todo ? "Update" : "Submit"}
      cancelText="Close"
    >
      {/* Input for ID */}
      <Input
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      {/* Input for Todo */}
      <Input
        placeholder="Todo"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        style={{ marginTop: 10 }}
      />

      {/* Select for Completed */}
      <Select
        value={completed}
        onChange={(value) => setCompleted(value)}
        style={{ width: "100%", marginTop: 10 }}
      >
        <Select.Option value="true">True</Select.Option>
        <Select.Option value="false">False</Select.Option>
      </Select>

      {/* Input for UserId */}
      <Input
        placeholder="UserId"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ marginTop: 10 }}
      />
    </Modal>
  );
};

export default AddTodoModal;
