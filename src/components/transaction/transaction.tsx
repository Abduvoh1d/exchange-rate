import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input, Button, Select, Table, DatePicker, Row, Col, FormProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from "dayjs";
import { Container } from "../container.tsx";
import TextArea from "antd/es/input/TextArea";
import DataStore from "../../store";
import {observer} from "mobx-react";

interface Transaction {
    id: number;
    amount: number;
    date: string;
    note: string;
    type: 'income' | 'expense';
    things?: string;
}

const getLocalTransactions = (): Transaction[] => {
    const storedTransactions = localStorage.getItem('transactions');
    return storedTransactions ? JSON.parse(storedTransactions) : [];
};

const setLocalTransactions = (transactions: Transaction[]) => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
};

const Transaction: React.FC = () => {
    const [form] = Form.useForm();
    const [transactions, setTransactions] = useState<Transaction[]>(getLocalTransactions());
    const [expenses, setExpenses] = useState<boolean>(false);

    useEffect(() => {
        setLocalTransactions(transactions);
    }, [transactions]);

    const onFinish: FormProps['onFinish'] = async (values: Omit<Transaction, 'id'>) => {
        const newTransaction: Transaction = {
            ...values,
            id: Date.now(),
            date: dayjs(values.date).format('YYYY-MM-DD'),
        };

        setTransactions((prevTransactions) => {
            const updatedTransactions = [...prevTransactions, newTransaction];
            if (values.type === 'expense') {
                DataStore.decBalance(Number(values.amount));
            } else {
                DataStore.incBalance(Number(values.amount));
            }
            return updatedTransactions;
        });

        form.resetFields();
    };

    const columns: ColumnsType<Transaction> = [
        {
            title: 'Data',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Money',
            dataIndex: 'amount',
            key: 'amount',
            sorter: (a, b) => a.amount - b.amount,
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Reason spend',
            dataIndex: 'things',
            key: 'things',
        },
        {
            title: 'Comment',
            dataIndex: 'note',
            key: 'note',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
    ];

    const dataSource = useMemo(
        () => transactions.map((item) => ({ ...item, key: item.id })),
        [transactions]
    );

    return (
        <Container className={'pb-20'}>
            <p className={'text-[24px] font-bold mt-2'}>Tranzaksiyalarni boshqarish</p>
            <p><span className={'font-bold'}>All income</span> : {DataStore.income}</p>
            <p><span className={'font-bold'}>All expense</span> : {DataStore.expense}</p>
            <p><span className={'font-bold'}>Balance</span> : {DataStore.balance}</p>

            <Form form={form} layout="vertical" onFinish={onFinish}
                  className={'flex items-center gap-3 mt-5 sm:w-[80%] lg:w-[50%] mx-auto bg-gray-200 py-10 px-5 rounded-md border-2 border-gray-300'}>
                <Row gutter={[20, 0]} justify="center" className={'w-full'}>
                    <Col span={20} className={'w-full'}>
                        <Form.Item
                            label="Choose Transaction"
                            name="type"
                            rules={[{ required: true, message: 'Choose type' }]}
                        >
                            <Select size={'large'} placeholder="Choose"
                                    onChange={(value) => setExpenses(value === 'expense')}>
                                <Select.Option value="income">Daromad</Select.Option>
                                <Select.Option value="expense">Xarajat</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={20} className={'w-full'}>
                        <Form.Item
                            label="Money"
                            name="amount"
                            rules={[{ required: true, message: 'Enter Money' }]}
                        >
                            <Input type={'number'} size={'large'} />
                        </Form.Item>
                    </Col>

                    <Col span={20} className={'w-full'}>
                        <Form.Item
                            label="Data"
                            name="date"
                            rules={[{ required: true, message: 'Enter data' }]}
                        >
                            <DatePicker size={'large'} className={'w-full'} />
                        </Form.Item>
                    </Col>

                    {expenses && (
                        <Col span={20} className={'w-full'}>
                            <Form.Item
                                label="What is the reason for the expense?"
                                name="things"
                                rules={[{ required: true, message: 'Enter reason' }]}
                            >
                                <TextArea size={'large'} />
                            </Form.Item>
                        </Col>
                    )}

                    <Col span={20} className={'w-full'}>
                        <Form.Item
                            label="Comment"
                            name="note"
                            rules={[{ required: true, message: 'Enter comment' }]}
                        >
                            <TextArea size={'large'} />
                        </Form.Item>
                    </Col>

                    <Col span={24} className={'w-full'}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className={'w-full py-5'}>
                                Qo‘shish
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

            <Table
                className="mt-4"
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            />
        </Container>
    );
};

export default observer(Transaction);
