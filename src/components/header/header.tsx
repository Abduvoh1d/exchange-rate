import {FaGithub, FaTelegram} from "react-icons/fa6";
import {Container} from "../container.tsx";
import {useEffect, useState} from "react";
import {IExchangeRate} from "../../types";
import {Select, Drawer, Button} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import {Link, Outlet} from "react-router-dom";
import DataStore from "../../store";

function Header() {
    const [data, setData] = useState<IExchangeRate | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        async function getData() {
            const data = await DataStore.getExchangeRate();
            setData(data);
        }

        getData();
    }, []);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    const selectOptions = Object.keys(data?.conversion_rates || {}).map((item) => ({
        label: item,
        value: item,
    }));

    return (
        <>
            <header className={"w-full border-b-2 shadow-sm sticky top-0 left-0 z-10 bg-white"}>
                <Container className={"flex items-center justify-between md:justify-between"}>
                    <img src="/logo.avif" alt="logo" width={90} height={90}/>

                    <div className={"hidden md:flex items-center gap-5"}>
                        <Link to={'/'}>Money</Link>
                        <Link to={'/dashboard'}>Dashboard</Link>
                        <Link to={'/transaction'}>Transaction</Link>
                    </div>

                    <div className={"hidden md:flex items-center gap-3"}>
                        <Select
                            options={selectOptions}
                            size={"large"}
                            className={"w-[80px]"}
                            placeholder={"Choose"}
                            defaultValue={localStorage.getItem("money") ?? "USD"}
                            onSelect={(value) => localStorage.setItem("money", value)}
                        />

                        <a href="https://github.com/Abduvoh1d/exchange-rate" target={"_blank"}>
                            <FaGithub className={"size-7 text-gray-700"}/>
                        </a>

                        <a href="https://t.me/abduvoh1d18" target={"_blank"}>
                            <FaTelegram className={"size-7 text-gray-700"}/>
                        </a>
                    </div>

                    <div className={"md:hidden flex items-center"}>
                        <Button
                            icon={<MenuOutlined/>}
                            onClick={toggleDrawer}
                        />
                    </div>
                </Container>

                <Drawer
                    title="Menu"
                    placement="right"
                    onClose={closeDrawer}
                    open={isDrawerOpen}
                >
                    <div className={"flex flex-col gap-3"}>
                        <Link to={'/'}>Money</Link>
                        <Link to={'/dashboard'}>Dashboard</Link>
                        <Link to={'/transaction'}>Transaction</Link>
                    </div>

                    <div className={"flex items-center justify-end gap-3 absolute bottom-5 right-5"}>
                        <Select
                            options={selectOptions}
                            size={"large"}
                            placeholder={"Choose"}
                            defaultValue={localStorage.getItem("money") ?? "USD"}
                            onSelect={(value) => localStorage.setItem("money", value)}
                        />

                        <a href="https://github.com/Abduvoh1d/exchange-rate" target={"_blank"}>
                            <FaGithub className={"size-7 text-gray-700"}/>
                        </a>

                        <a href="https://t.me/abduvoh1d18" target={"_blank"}>
                            <FaTelegram className={"size-7 text-gray-700"}/>
                        </a>
                    </div>
                </Drawer>
            </header>

            <Outlet/>
        </>
    );
}

export default Header;
