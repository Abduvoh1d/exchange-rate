import {useContext, useEffect, useState} from "react";
import {DataContext} from "../../context";
import {IExchangeRate, IPairExchangeRate} from "../../types";
import {Button, Col, Form, FormProps, Input, Row, Select} from "antd";
import {useForm} from "antd/es/form/Form";
import {Container} from "../container.tsx";

function Cash() {
    const [form] = useForm()
    const context = useContext(DataContext);
    const [data, setData] = useState<IExchangeRate | null>(null);
    const [pairData, setPairData] = useState<IPairExchangeRate | null>(null);

    if (!context) return null;

    const {getExchangeRate, getPairExchangeRate} = context

    useEffect(() => {
        async function getData() {
            const data = await getExchangeRate();
            setData(data);
        }

        getData();
    }, []);

    const onFinish: FormProps['onFinish'] = async (values) => {
        console.log(values)
        const data = await getPairExchangeRate(localStorage.getItem('money') as string, values.pair, Number(values.amount));
        setPairData(data);
    };

    return (
        <Container>
            {data && (
                <Form form={form} layout="vertical" onFinish={onFinish} className={'flex items-center gap-3 mt-5 sm:w-[80%] lg:w-[50%] mx-auto bg-gray-200 py-10 px-5 rounded-md border-2 border-gray-300'}>
                    <Row className={'w-full flex-col items-center justify-center gap-3'}>
                        <Col sm={18} lg={13} className={'w-full'}>
                            <Form.Item label="Number" name="amount" required={true}>
                                <Input placeholder={'Enter number'} type="number" size={'large'}/>
                            </Form.Item>
                        </Col>
                        <Col sm={18} lg={13} className={'w-full'}>
                            <Form.Item label="Money" required={true} name="pair">
                                <Select size={'large'} placeholder={'Select money'}
                                        options={Object.keys(data.conversion_rates).map((item) => ({
                                            label: item,
                                            value: item,
                                        }))}
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

export default Cash;