import './App.css'
import './apps/rubik/cube.css'
import {Header} from "./components/Header.tsx";
import {ApplicationsList} from "./components/ApplicationsList.tsx";
import {Footer} from "./components/Footer.tsx";

function App() {
/*
    return (
        <div className="App">
            {/!*<WebSocketClientReconnect />*!/}
            <WsRubikClient />
        </div>
    );
*/
    return (
        <div className="flex flex-col h-screen">
            <div className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-10">
                <Header />
            </div>

            <div className="pt-16 pb-14 flex flex-col overflow-hidden h-full">

{/*
                <div className="bg-gray-200 p-4">
                    Menu Content (optional)
                </div>
*/}

                <ApplicationsList />
{/*
                <div className="mb-4 p-4">
                    Top Part of Content
                </div>

                <div className="flex-1 bg-gray-300 overflow-auto p-4">
                </div>

                <div className="mt-4 p-4">
                    Bottom Part of Content
                </div>
*/}
            </div>

            <div className="bg-gray-800 text-white p-4 fixed bottom-0 left-0 right-0">
                <Footer />
            </div>
        </div>
    )
}

export default App
