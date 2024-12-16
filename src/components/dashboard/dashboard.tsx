import React from "react";
import ReactApexChart from "react-apexcharts";
import DataStore from "../../store";
import {Container} from "../container.tsx";

const Dashboard = () => {
    // DataStore'dan qiymatlarni olish
    const { balance, income, expense } = DataStore;

    // Chart uchun series va labels'ni dinamik o'rnatish
    const [state] = React.useState({
        series: [income, expense, balance],
        options: {
            chart: {
                width: 380,
                type: "pie" as const,
            },
            labels: ["Income", "Expense", "Balance"], // Dinamik nomlar
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            ],
        },
    });

    return (
        <Container className={'mt-5'}>
            <p className={'text-[26px] font-medium'}>Dashboard</p>
            <div id="chart" className={"h-[80vh] flex justify-center items-center"}>
                <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="pie"
                    width={500}
                />
            </div>
        </Container>
    );
};

export default Dashboard;
