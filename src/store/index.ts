import { makeAutoObservable } from "mobx";
import {AxiosResponse} from "axios";
import {IExchangeRate, IPairExchangeRate} from "../types";
import api from "../api";

class Store {
    balance: number = 0;
    income: number = 0;
    expense: number = 0;

    constructor() {
        makeAutoObservable(this);
        this.initializeTransactions();
    }

    initializeTransactions() {
        const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");

        // Filter and sum transactions by type
        this.income = transactions
            .filter((t: { type: string }) => t.type === "income")
            .reduce((sum: number, t: { amount: string }) => sum + Number(t.amount), 0);

        this.expense = transactions
            .filter((t: { type: string }) => t.type === "expense")
            .reduce((sum: number, t: { amount: string }) => sum + Number(t.amount), 0);

        // Calculate balance
        this.balance = this.income - this.expense;
    }

    incBalance = (amount: number) => {
        this.balance += amount;
        this.income += amount;

        // Update localStorage
        this.updateLocalStorage("income", amount);
    };

    decBalance = (amount: number) => {
        this.balance -= amount;
        this.expense += amount;

        // Update localStorage
        this.updateLocalStorage("expense", amount);
    };

    updateLocalStorage(type: "income" | "expense", amount: number) {
        const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");

        const newTransaction = {
            id: Date.now(),
            type,
            amount,
            date: new Date().toISOString().split("T")[0],
            note: "",
        };

        transactions.push(newTransaction);
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }

    async getExchangeRate(name?: string): Promise<IExchangeRate> {
        try {
            const response: AxiosResponse<IExchangeRate> = await api.get(
                name ? `/latest/${name}` : '/latest/USD'
            );
            return response.data;
        } catch (error) {
            console.error("Failed to fetch exchange rate:", error);
            throw error;
        }
    }

    async getPairExchangeRate (name1?: string, name2?: string, amount?: number) {
        try {
            const response: AxiosResponse<IPairExchangeRate> = await api.get(name1 && name2 ? `/pair/${name1}/${name2}/${amount}` : 'pair/USD/UZS/1');
            return response.data;
        } catch (error) {
            console.error("Failed to fetch exchange rate:", error);
            throw error;
        }
    };
}

const DataStore = new Store();
export default DataStore;
