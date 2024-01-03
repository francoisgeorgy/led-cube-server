import './App.css'
import './apps/rubik/cube.css'
import {Header} from "./components/Header.tsx";
import {ApplicationsList} from "./pages/ApplicationsList.tsx";
import {Footer} from "./components/Footer.tsx";
import {Link, Outlet, Route, Routes} from "react-router-dom";
import {Rubik} from "./pages/Rubik.tsx";

function XApp() {
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
                <Header/>
            </div>
            <div className="pt-16 pb-14 flex flex-col overflow-hidden h-full">
                {/*
                <div className="bg-gray-200 p-4">
                    Menu Content (optional)
                </div> */}
                <ApplicationsList/>
                {/*
                <div className="mb-4 p-4">
                    Top Part of Content
                </div>
                <div className="flex-1 bg-gray-300 overflow-auto p-4">
                </div>
                <div className="mt-4 p-4">
                    Bottom Part of Content
                </div> */}
            </div>
            <div className="bg-gray-800 text-white p-4 fixed bottom-0 left-0 right-0">
                <Footer/>
            </div>
        </div>
    )
}

export default function App() {
    return (
        <div className="flex flex-col h-screen">
            <div className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-10">
                <Header/>
            </div>
            {/* Routes nest inside one another. Nested route paths build upon
                parent route paths, and nested route elements render inside
                parent route elements. See the note about <Outlet> below. */}
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="about" element={<About/>}/>
                    <Route path="rubik" element={<Rubik/>}/>
                    <Route path="shaders" element={<ApplicationsList/>}/>
                    <Route path="applications" element={<ApplicationsList/>}/>
                    {/* Using path="*"" means "match anything", so this route
                        acts like a catch-all for URLs that we don't have explicit
                        routes for. */}
                    <Route path="*" element={<NoMatch/>}/>
                </Route>
            </Routes>
        </div>
    );
}


function Layout() {
    return (
        <div className="pt-16 pb-14 flex flex-col overflow-hidden h-full">
            <div className="bg-gray-600 py-4 flex">
                <div className="mx-4">
                    <Link to="/">Home</Link>
                </div>
                <div className="mx-4">
                    <Link to="/shaders">Shaders</Link>
                </div>
                <div className="mx-4">
                    <Link to="/rubik">Rubik's Cube</Link>
                </div>
                <div className="mx-4">
                    <Link to="/apps">Apps</Link>
                </div>
            </div>
            {/* An <Outlet> renders whatever child route is currently active,
                  so you can think about this <Outlet> as a placeholder for
                  the child routes we defined above. */}

            <Outlet/>
            <div className="bg-gray-800 text-white p-4 fixed bottom-0 left-0 right-0">
                <Footer/>
            </div>
        </div>
    )
}


function Home() {
    return (
        <div className="p-4">
            <h2>Home</h2>
        </div>
    );
}

function About() {
    return (
        <div className="p-4">
            <h2>About</h2>
        </div>
    );
}


function NoMatch() {
    return (
        <div className="p-4">
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    );
}

