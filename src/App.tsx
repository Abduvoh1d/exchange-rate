import {BrowserRouter, Route, Routes} from "react-router-dom";
import Cash from "./components/cash/cash.tsx";
import Dashboard from "./components/dashboard/dashboard.tsx";
import Header from "./components/header/header.tsx";
import Transaction from "./components/transaction/transaction.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Header/>}>
                    <Route path="/" element={<Cash/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/transaction" element={<Transaction/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
