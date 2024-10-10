'use client'

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store/store";
import { fetchComment } from "@/app/redux/slice/commentSlice";
import { Table, Button, Spin, Alert, Modal, Input, Form, Pagination } from 'antd'; // Ant Design components
import { ApiResponse } from "@/app/redux/types/apiTypes";

const Comments: React.FC = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state: RootState) => state.comment);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedComment, setSelectedComment] = useState<any>(null);
    const [searchText, setSearchText] = useState("");
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(fetchComment());
    }, [dispatch]);

    const handleAddComment = () => {
        setIsEditMode(false);
        setIsModalVisible(true);
        form.resetFields();
    };

    const handleEditComment = (comment: any) => {
        setIsEditMode(true);
        setSelectedComment(comment);
        setIsModalVisible(true);
        form.setFieldsValue(comment); // Pre-fill the form with selected comment
    };

    const handleDeleteComment = (commentId: number) => {
        console.log("Delete comment with ID:", commentId);
        // Add dispatch to handle delete action
    };

    const handleSubmit = (values: any) => {
        if (isEditMode && selectedComment) {
            console.log("Editing comment", selectedComment.id, values);
            // Add dispatch to handle edit action
        } else {
            console.log("Adding comment", values);
            // Add dispatch to handle add action
        }
        setIsModalVisible(false);
    };

    const filteredComments = data?.comments.filter((comment: any) => 
        comment.user.username.toLowerCase().includes(searchText.toLowerCase()) ||
        comment.body.toLowerCase().includes(searchText.toLowerCase())
    ) || [];

    if (loading) {
        return (
            <div className="spin">
                <Spin size="large" />
            </div>
        )
    }

    if (error) {
        return <Alert message="Error" description={error} type="error" showIcon />; // Ant Design's alert
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Username',
            dataIndex: ['user', 'username'],
            key: 'username',
        },
        {
            title: 'Body',
            dataIndex: 'body',
            key: 'body',
        },
        {
            title: 'Post ID',
            dataIndex: 'postId',
            key: 'postId',
        },
        {
            title: 'Likes',
            dataIndex: 'likes',
            key: 'likes',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, comment: any) => (
                <>
                    <Button type="primary" onClick={() => handleEditComment(comment)} style={{ marginRight: 8 }}>Edit</Button>
                    <Button type="default" danger onClick={() => handleDeleteComment(comment.id)}>Delete</Button>
                </>
            ),
        },
    ];

    return (
        <div style={{margin:20}}>
            {/* Search input */}
            <Input 
                placeholder="Search by username or body" 
                onChange={(e) => setSearchText(e.target.value)} 
                style={{ marginBottom: 16, width: 300 }}
            />

            {/* Add Comment Button */}
            <Button type="primary" onClick={handleAddComment} style={{ marginBottom: 16,marginLeft:10 }}>Add Comment</Button>

            {/* Comments Table */}
            <Table 
                columns={columns} 
                dataSource={filteredComments} 
                rowKey="id"  
                pagination={{ pageSize: 10 }}  
            />

            {/* Add/Edit Comment Modal */}
            <Modal 
                title={isEditMode ? "Edit Comment" : "Add Comment"}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item name="id" label="ID">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name={['user', 'username']} label="Username" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="body" label="Body" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="postId" label="Post ID">
                        <Input />
                    </Form.Item>
                    <Form.Item name="likes" label="Likes">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Comments;
