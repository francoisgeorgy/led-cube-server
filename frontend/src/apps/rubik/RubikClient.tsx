import {useState} from "react";
import {useWebSocket} from "../../useWebSocket.ts";
import {WsRubikAutoCommands} from "./RubikAutoCommands.tsx";
import {WsRubikManualCommands} from "./RubikManualCommands.tsx";
import {state} from "../../State.ts";
import {observer} from "mobx-react-lite";
import './rubik.css'

export const RubikClient = observer(() => {

    const [mode, setMode] = useState<string>("auto");
    const [reconnectCounter, setReconnectCounter] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const {connected, status, message, sendMessage} = useWebSocket(`ws://${state.cube_host}:${state.port_ws}/ws`, reconnectCounter);
    const {connected, message, sendMessage} = useWebSocket(`ws://${state.cube_host}:${state.port_ws}/ws`, reconnectCounter);

    const setModeAuto = () => {
        setMode("auto");
    };

    const setModeInter = () => {
        setMode("manual");
    };

    const setModeDemo = () => {
        setMode("demo");
    };

    const forceReconnect = () => {
        console.log("forceReconnect");
        setReconnectCounter((prev) => prev + 1); // Increment to trigger reconnection
    };

    return (
        <div className="flex flex-col">

            {mode == "auto" && <WsRubikAutoCommands sendMessage={sendMessage} />}
            {mode == "manual" && <WsRubikManualCommands sendMessage={sendMessage} />}

            <div className="my-4 text-center">
                {mode == "auto" &&
                <button className="self-center bg-gray-700 hover:bg-gray-800 text-gray-400 px-4 p-2 rounded"
                                       onClick={setModeInter}>Passer en mode manuel</button>}
                {mode == "manual" &&
                <button className="self-center bg-gray-700 hover:bg-gray-800 text-gray-400 px-4 p-2 rounded"
                                       onClick={setModeAuto}>Passer en mode automatique</button>}
                {mode == "demo" &&
                <button className="self-center bg-gray-700 hover:bg-gray-800 text-gray-400 px-4 p-2 rounded"
                                       onClick={setModeDemo}>Passer en mode démo</button>}
            </div>
            <div className="border-t border-blue-400 pt-2 my-4">
                <div className="mb-4">
                    Connexion avec l'application: {connected ? 'OK' : 'pas de connexion'}
                </div>
                {!connected && <button className="self-center bg-blue-500 hover:bg-blue-700 text-white px-2 rounded"
                                       onClick={forceReconnect}>Reconnexion</button>}
            </div>
            <div className="mt-4">
                <div className="mb-4">
                    Messages:
                </div>
                <div>
                    {message}
                </div>
            </div>
        </div>
    );
});
