import {startApplication} from "../utils/commands.ts";
import {Application} from "../utils/interfaces.ts";

interface CommandButtonProps {
    application: Application;
}

export function StartApplicationButton({application}: CommandButtonProps) {

    const startApp = (app: Application) => {
        if (app.requiresConfirmation) {
            // TODO: handle requiresConfirmation
            if (window.confirm(`Launch ${app.title}?`)) {
                console.log(`Launching ${app.title}`);
                // Launch the application
            }
        } else {
            console.log(`Launching ${app.title}`);
            // Launch the application
            startApplication(app.category, app.application);
        }
    };

    return (
        <button onClick={() => startApp(application)}
            className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Démarrer</button>
    )
            // className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Démarrer</button>
}
