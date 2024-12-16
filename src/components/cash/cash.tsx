import {useEffect, useState} from "react";
import {IExchangeRate, IPairExchangeRate} from "../../types";
import {Button, Col, Form, FormProps, Input, Row, Select} from "antd";
import {useForm} from "antd/es/form/Form";
import {Container} from "../container.tsx";
import DataStore from "../../store";
import {observer} from "mobx-react";
import Loading from "../loading.tsx";

function Cash() {
    const [form] = useForm()
    const [data, setData] = useState<IExchangeRate | null>(null);
    const [pairData, setPairData] = useState<IPairExchangeRate | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            const data = await DataStore.getExchangeRate();
            setData(data);
            setLoading(false);
        }

        getData();
    }, []);

    if (loading) {
        return <Loading/>;
    }


    const onFinish: FormProps['onFinish'] = async (values) => {
        const data = await DataStore.getPairExchangeRate(localStorage.getItem('money') as string, values.pair, Number(values.amount));
        setPairData(data);
    };

    return (
        <Container>
            {data && (
                <Form form={form} layout="vertical" onFinish={onFinish} className={'flex items-center gap-3 mt-5 sm:w-[80%] lg:w-[50%] mx-auto bg-gray-200 py-10 px-5 rounded-md border-2 border-gray-300'}>
                    <Row className={'w-full flex-col items-center justify-center gap-3'}>
                        <Col sm={18} lg={13} className={'w-full'}>
                            <Form.Item label="Number" name="amount" rules={[{ required: true, message: 'Enter number' }]}>
                                <Input placeholder={'Enter number'} type="number" size={'large'}/>
                            </Form.Item>
                        </Col>
                        <Col sm={18} lg={13} className={'w-full'}>
                            <Form.Item label="Money" rules={[{ required: true, message: 'Choose' }]} name="pair">
                                <Select
                                    size={'large'}
                                    placeholder={'Select money'}
                                    options={
                                        Object.keys(data?.conversion_rates || {}).map((item) => ({
                                            label: item,
                                            value: item,
                                        }))
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={18} lg={13} className={'w-full'}>
                            <Form.Item label={null}>
                                <Button type="primary" htmlType="submit" className={'w-full py-5'}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            )}

            {pairData && (
                <div className={'flex flex-col items-center justify-center gap-3 mt-5 sm:w-[80%] lg:w-[50%] mx-auto bg-gray-200 py-10 px-5 rounded-md border-2 border-gray-300'}>
                    <h1 className={'text-2xl font-bold'}>Result</h1>
                    <h1 className={'text-xl font-bold'}>
                    {pairData.base_code} - {pairData.target_code} = {pairData.conversion_rate}
                    </h1>
                </div>
            )}
        </Container>
    );
}

export default observer(Cash);