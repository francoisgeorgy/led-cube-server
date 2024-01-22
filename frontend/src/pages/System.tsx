import {startScript, stopScript} from "../utils/commands.ts";
import {Link} from "react-router-dom";
import {ApplicationButton} from "../components/ApplicationButton.tsx";
import {Application} from "../utils/interfaces.ts";
import {APP_HEALTH, APP_IMU, APP_REBOOT, APP_RESTART_WEB} from "../utils/applications.ts";

export function System() {

    const restart_server = () => {
        const c = window.prompt("Restart code?");
        if (c !== "424242") {
            console.log("invalid code");
            return false;
        }
        console.log("restart");
    };

    const reboot_cube = () => {
        const c = window.prompt("Reboot code?");
        if (c !== "424242") {
            console.log("invalid code");
            return false;
        }
        console.log("restart");
    };

    const startApplication = async (app: Application) => {
        console.log("startApplication", app);
        if (app.requiresConfirmation) {
            if (window.confirm(`Launch ${app.title}?`)) {
                console.log(`Launching ${app.title}`);
                // Launch the application
            }
        } else {
            console.log(`Launching ${app.title}`);
            // Launch the application
            const b = await startScript(category, app.start_script);
            // console.log('startScript result:', b);
            // if (b) {
            //     setSelectedApp(null);
            // }
        }
    };


    return (
        <div className="flex-1 overflow-auto bg-gray-500 flex flex-col">
            {/*<div className="p-4 border-b border-black text-center">*/}
            {/*    <Link to="/3d" className="font-bold text-xl">3D</Link>*/}
            {/*</div>*/}
            <div className="p-4 border-b border-black text-center">
                <Link to="/imu" className="font-bold text-xl">Accelerometer</Link>
            </div>
            {/*<ApplicationButton application={APP_IMU}/>*/}
            <ApplicationButton application={APP_HEALTH}/>
            <ApplicationButton application={APP_RESTART_WEB}/>
            <ApplicationButton application={APP_REBOOT}/>
            {/*
            <div className="p-4 border-b border-black text-center">
                <h3 className="font-bold text-xl">Redémarrer le serveur web</h3>
                <button onClick={restart_server}
                        className="self-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">exécuter la commande
                </button>
            </div>
            <div className="p-4 border-b border-black text-center">
                <h3 className="font-bold text-xl">Redémarrer tout le Cube</h3>
                <button onClick={reboot_cube}
                        className="self-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">exécuter la commande
                </button>
            </div>
*/}
        </div>
    );
    // return (
    // <ApplicationsList category="system"/>
    // );
}
