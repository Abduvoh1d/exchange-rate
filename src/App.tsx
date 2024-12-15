import DataProvider from "./context";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Cash from "./components/cash/cash.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import Header from "./components/header/header.tsx";

function App() {
    return (
        <DataProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Header/>}>
                        <Route path="/" element={<Cash/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </DataProvider>
    );
}

export default App;
