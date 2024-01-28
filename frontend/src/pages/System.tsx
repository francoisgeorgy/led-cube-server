import {Link} from "react-router-dom";
import {rebootServer} from "../utils/commands.ts";
import {useState} from "react";

export function System() {

    const [selected, setSelected] = useState<boolean>(false);

    const toggle = () => {
        // setSpecial(false);
        setSelected(!selected);
    };

    const reboot_cube = () => {
        const c = window.prompt("Reboot code?");
        if (c) rebootServer(c);
    };

    return (
        <div className="flex-1 overflow-auto bg-gray-500 flex flex-col">
            <div className="p-4 border-b border-black text-center">
                <Link to="/imu" className="font-bold text-xl">Accéléromètre</Link>
            </div>
            {/*<ApplicationButton application={APP_IMU}/>*/}
            {/*<ApplicationButton application={APP_HEALTH}/>*/}
            {/*<ApplicationButton application={APP_RESTART_WEB}/>*/}
            <div className="p-4 border-b border-black text-center">
                <h3 onClick={() => toggle()}
                    className={`cursor-pointer text-center font-bold text-xl`}>
                    Redémarrer le Cube
                </h3>
                {selected && <button onClick={reboot_cube}
                        className="self-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">exécuter
                    la commande
                </button>}
            </div>
        </div>
    );
}
