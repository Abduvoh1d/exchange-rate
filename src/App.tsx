import Header from "./components/header/header.tsx";
import Cash from "./components/cash/cash.tsx";
import DataProvider from "./context";

function App() {

    return (
        <DataProvider>
            <Header/>
            <Cash/>
        </DataProvider>
    )
}

export default App
