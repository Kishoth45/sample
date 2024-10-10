import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { fetchData, addQuote } from "../redux/slice/tableslice";
import { Table, Input, Button, Pagination, Modal, Form, Spin } from "antd";
import { SearchOutlined } from '@ant-design/icons'; // Search icon

const TableList: React.FC = () => { 
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state: RootState) => state.table);
    const [searchText, setSearchText] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [addModalVisible, setAddModalVisible] = useState(false); // State for Add Modal

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    if (loading) {
        return (
        <div className="spin">
            <Spin size="large" />
        </div>
        )
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const Quotes = data?.quotes || [];

    // Filter quotes based on search text
    const filteredQuotes = Quotes.filter((quote) =>
        quote.quote.toLowerCase().includes(searchText.toLowerCase()) ||
        quote.author.toLowerCase().includes(searchText.toLowerCase())
    );

    // Handle quote add
    const handleAdd = (values: any) => {
        dispatch(addQuote(values)); // Dispatch action to add quote
        setAddModalVisible(false);
    };

    return (
        <div style={{ padding: '20px'}}>
            <Button 
                type="primary" 
                onClick={() => setAddModalVisible(true)} 
                style={{ marginBottom: 20 }}
            >
                Add Quote
            </Button>
            <Input
                placeholder="Search quotes"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: 20,marginLeft:10, width: 300 }}
                prefix={<SearchOutlined />} // Add search icon
            />

            <Table
                dataSource={filteredQuotes.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                rowKey="id"
                pagination={false}
                style={{ backgroundColor: 'white' }} // Table background
                bordered
            >
                <Table.Column title="ID" dataIndex="id" key="id" />
                <Table.Column title="Quote" dataIndex="quote" key="quote" />
                <Table.Column title="Author" dataIndex="author" key="author" />
            </Table>

            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredQuotes.length}
                onChange={(page, pageSize) => {
                    setCurrentPage(page);
                    setPageSize(pageSize);
                }}
                pageSizeOptions={['10', '20','30','50']}
                showSizeChanger
                style={{ marginTop: 20, float: 'right' }} // Align pagination to the right
            />

            {/* Add Quote Modal */}
            <Modal
                title="Add Quote"
                visible={addModalVisible}
                onCancel={() => setAddModalVisible(false)}
                footer={null}
            >
                <Form
                    initialValues={{ quote: '', author: '' }} // Default values
                    onFinish={handleAdd}
                >
                    <Form.Item name="quote" label="Quote" rules={[{ required: true, message: 'Please input the quote!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="author" label="Author" rules={[{ required: true, message: 'Please input the author!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Add</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TableList;
