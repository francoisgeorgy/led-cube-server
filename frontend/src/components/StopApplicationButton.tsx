import {stopApplicationScript, stopScript} from "../utils/commands.ts";
import {Application} from "../utils/interfaces.ts";

interface CommandButtonProps {
    application: Application;
}

export function StopApplicationButton({application}: CommandButtonProps) {

    const stopApplication = (app: Application) => {
        if (app.stop_script) stopApplicationScript(app.stop_script);
    };

    return (
        <button onClick={() => stopApplication(application)}
            className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Stopper</button>
    )
}
