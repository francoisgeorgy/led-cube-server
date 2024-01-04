import {stopScript} from "../utils/commands.ts";

export function StopAnyButton() {

    const stopApplication = () => {
        stopScript();
    };

    return (
        <button onClick={() => stopApplication()}
            className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Stopper</button>
    )
}
