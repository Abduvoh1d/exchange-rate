import {FaGithub, FaTelegram} from "react-icons/fa6";
import {Container} from "../container.tsx";
import {useContext, useEffect, useState} from "react";
import {DataContext} from "../../context";
import {IExchangeRate} from "../../types";
import {Select} from "antd";

function Header() {
    const context = useContext(DataContext);
    const [data, setData] = useState<IExchangeRate | null>(null);

    if (!context) return null;

    const {getExchangeRate} = context

    useEffect(() => {
        async function getData() {
            const data = await getExchangeRate();
            setData(data);
        }

        getData();
    }, []);

    return (
        <header className={'w-full border-b-2 shadow-sm sticky top-0 left-0 bg-white'}>
            <Container className={'flex items-center justify-between'}>
                <img src="/logo.avif" alt="logo" width={90} height={90}/>

                <div className={'flex items-center gap-3'}>
                    <Select options={Object.keys(data?.conversion_rates || {}).map((item) => ({
                        label: item,
                        value: item,
                    }))}
                            size={'large'}
                            className={'w-[80px]'}
                            placeholder={'Choose'}
                            defaultValue={localStorage.getItem('money') ?? 'USD'}
                            onSelect={(value) => localStorage.setItem('money', value)}
                    />

                    <a href="https://github.com/Abduvoh1d/exchange-rate" target={'_blank'}>
                        <FaGithub className={'size-7 text-gray-700'}/>
                    </a>

                    <a href="https://t.me/abduvoh1d18" target={'_blank'}>
                        <FaTelegram className={'size-7 text-gray-700'}/>
                    </a>
                </div>
            </Container>
        </header>
    );
}

export default Header;