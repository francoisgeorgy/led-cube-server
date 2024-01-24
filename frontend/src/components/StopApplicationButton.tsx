import {stopApplication} from "../utils/commands.ts";
import {Application} from "../utils/interfaces.ts";

interface CommandButtonProps {
    application: Application;
}

export function StopApplicationButton({application}: CommandButtonProps) {

    const stopApp = (app: Application) => {
        stopApplication(app.category, app.application);
    };

    return (
        <button onClick={() => stopApp(application)}
            className="self-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Stopper</button>
    )
}
