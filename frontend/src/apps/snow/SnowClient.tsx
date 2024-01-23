import {state} from "../../State.ts";
import {startScript, stopScript} from "../../utils/commands.ts";
import {useState} from "react";
import {observer} from "mobx-react-lite";
import {APP_SNOW_CUBE} from "../../utils/applications.ts";

export const SnowClient = observer(() => {

    const [started, setStarted] = useState<boolean>(false);

    const startApplication = async () => {
        const b = await startScript(APP_SNOW_CUBE.category, APP_SNOW_CUBE.start_script);
        if (b) {
            setStarted(true);
        }
    };

    const stopApplication = async () => {
        const b = await stopScript();
        if (b) {
            setStarted(false);
        }
    };
    return (
        <>
            <div className="flex-1 Xp-4 overflow-auto bg-gray-500">
                <div className="p-4 border-b border-black flex flex-col">
                    <h3 className="cursor-pointer self-center font-bold text-xl">Cube à neige</h3>
                    {!started &&
                    <button onClick={startApplication}
                            className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Démarrer
                    </button>}
                </div>
            </div>
            {state.running &&
            <div className="p-4 border-t border-black bg-orange-700 text-center flex justify-between">
                <div>{state.running?.category} {state.running?.script}</div>
                <button onClick={stopApplication}
                        className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Stopper
                </button>
            </div>}
        </>
    );

});
