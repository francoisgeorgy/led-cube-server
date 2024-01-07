import {Header} from "./components/Header.tsx";
import {Footer} from "./components/Footer.tsx";
import {Outlet, Route, Routes} from "react-router-dom";
import {Rubik} from "./pages/Rubik.tsx";
import {Shaders} from "./pages/Shaders.tsx";
import {Tests} from "./pages/Tests.tsx";
import {Applications} from "./pages/Applications.tsx";
import {NotFound} from "./pages/NotFound.tsx";
import {Color} from "./pages/Color.tsx";
import {Menu} from "./pages/Menu.tsx";
import {Snow} from "./pages/Snow.tsx";
import './App.css'

export default function App() {
    return (
        <div className="flex flex-col h-screen">
            <div className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-10">
                <Header/>
            </div>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Menu/>}/>
                    {/*<Route path="menu" element={<Menu/>}/>*/}
                    <Route path="rubik" element={<Rubik/>}/>
                    <Route path="shaders" element={<Shaders/>}/>
                    <Route path="snow" element={<Snow/>}/>
                    <Route path="applications" element={<Applications/>}/>
                    <Route path="tests" element={<Tests/>}/>
                    <Route path="color" element={<Color/>}/>
                    {/* path="*"" means "match anything" */}
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </div>
    );
}

function Layout() {
    return (
        <div className="pt-14 pb-14 flex flex-col overflow-auto h-full">
{/*
            <div className="bg-gray-600 py-4 flex">
                <div className="ml-4 mr-2">
                    <Link to="/shaders">Shaders</Link>
                </div>
                <div className="mx-2">
                    <Link to="/rubik">Rubik</Link>
                </div>
                <div className="mx-2">
                    <Link to="/applications">Apps</Link>
                </div>
                <div className="mx-2">
                    <Link to="/tests">Tests</Link>
                </div>
                <div className="mx-2">
                    <Link to="/wsexample">WS</Link>
                </div>
            </div>
*/}
            {/* An <Outlet> renders whatever child route is currently active. */}
            <Outlet/>
            <div className="bg-gray-800 text-white p-4 fixed bottom-0 left-0 right-0">
                <Footer/>
            </div>
        </div>
    )
}
