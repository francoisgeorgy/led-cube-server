import {Link} from "react-router-dom";

export function Menu() {
    return (
        <div className="flex-1 overflow-auto bg-gray-500 flex flex-col">
            <div className="p-4 border-b border-black text-center">
                <Link to="/color" className="font-bold text-xl">Couleur</Link>
            </div>
            <div className="p-4 border-b border-black text-center">
                <Link to="/rubik" className="font-bold text-xl">Rubik's Cube</Link>
            </div>
            <div className="p-4 border-b border-black text-center">
                <Link to="/snow" className="font-bold text-xl">Cube à neige</Link>
            </div>
            <div className="p-4 border-b border-black text-center">
                <Link to="/shaders" className="font-bold text-xl">Shaders</Link>
            </div>
            <div className="p-4 border-b border-black text-center">
                <Link to="/tests" className="font-bold text-xl">Tests</Link>
            </div>
            <div className="p-4 border-b border-black text-center">
                <Link to="/system" className="font-bold text-xl">System</Link>
            </div>
            <div className="p-4 border-b border-black text-center">
                <Link to="/3d" className="font-bold text-xl">3D</Link>
            </div>
            <div className="flex-1"></div>
            <div className="p-4 border-b border-black text-center bg-gray-700 text-gray-300">
                Cliquez sur <span className="border rounded px-1 py-1 text-sm leading-8 mx-1">LED Cube</span> pour revenir<br />
                à ce menu depuis n'importe quelle page.
            </div>
        </div>
    );
}
