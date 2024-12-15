import {createContext, ReactNode} from "react";
import api from "../api";
import {AxiosResponse} from "axios";
import {IExchangeRate, IPairExchangeRate} from "../types";

interface IDataContext {
    getExchangeRate: (name?: string) => Promise<IExchangeRate>;
    getPairExchangeRate: (name1?: string, name2?: string , amount?: number) => Promise<IPairExchangeRate>;
}

export const DataContext = createContext<IDataContext | null>(null);

function DataProvider({children}: { children: ReactNode }) {
    const getExchangeRate = async (name?: string) => {
        const response: AxiosResponse<IExchangeRate> = await api.get(name ? `/latest/${name}` : 'latest/USD');
        return response.data;
    };

    const getPairExchangeRate = async (name1?: string, name2?: string, amount?: number) => {
        const response: AxiosResponse<IPairExchangeRate> = await api.get(name1 && name2 ? `/pair/${name1}/${name2}/${amount}` : 'pair/USD/UZS/1');
        return response.data;
    };

    return (
        <DataContext.Provider value={{getExchangeRate, getPairExchangeRate}}>
            {children}
        </DataContext.Provider>
    );
}

export default DataProvider;