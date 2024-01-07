import {startScript} from "../utils/commands.ts";
import {Application} from "../utils/interfaces.ts";

interface CommandButtonProps {
    application: Application;
}

export function StartApplicationButton({application}: CommandButtonProps) {

    const startApplication = (app: Application) => {
        if (app.requiresConfirmation) {
            // TODO: handle requiresConfirmation
            if (window.confirm(`Launch ${app.title}?`)) {
                console.log(`Launching ${app.title}`);
                // Launch the application
            }
        } else {
            console.log(`Launching ${app.title}`);
            // Launch the application
            startScript(app.category, app.start_script);
        }
    };

    return (
        <button onClick={() => startApplication(application)}
            className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Démarrer</button>
    )
            // className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Démarrer</button>
}
