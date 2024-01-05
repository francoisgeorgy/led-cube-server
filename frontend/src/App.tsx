import './App.css'
import './apps/rubik/cube.css'
import {Header} from "./components/Header.tsx";
import {ApplicationsList} from "./components/ApplicationsList.tsx";
import {Footer} from "./components/Footer.tsx";
import {Link, Outlet, Route, Routes} from "react-router-dom";
import {Rubik} from "./pages/Rubik.tsx";
import {Shaders} from "./pages/Shaders.tsx";
import {Tests} from "./pages/Tests.tsx";
import {Applications} from "./pages/Applications.tsx";
import {About} from "./pages/About.tsx";
import {Home} from "./pages/Home.tsx";
import {NotFound} from "./pages/NotFound.tsx";

export default function App() {
    return (
        <div className="flex flex-col h-screen">
            <div className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-10">
                <Header/>
            </div>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="about" element={<About/>}/>
                    <Route path="rubik" element={<Rubik/>}/>
                    <Route path="shaders" element={<Shaders/>}/>
                    <Route path="applications" element={<Applications/>}/>
                    <Route path="tests" element={<Tests/>}/>
                    {/* path="*"" means "match anything" */}
                    <Route path="*" element={<NotFound/>}/>
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
                    <Link to="/rubik">Rubik</Link>
                </div>
                <div className="mx-4">
                    <Link to="/applications">Apps</Link>
                </div>
                <div className="mx-4">
                    <Link to="/tests">Tests</Link>
                </div>
            </div>
            {/* An <Outlet> renders whatever child route is currently active. */}
            <Outlet/>
            <div className="bg-gray-800 text-white p-4 fixed bottom-0 left-0 right-0">
                <Footer/>
            </div>
        </div>
    )
}
