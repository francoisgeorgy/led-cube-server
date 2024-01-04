import {useWebSocket} from "../../useWebSocket.ts";
import {useState} from "react";
import {state} from "../../State.ts";

// const cube_host = "192.168.1.100:5042"
// const cube_host = "192.168.1.73:5042"

/*
const sendStartRequest = async () => {
    console.log("enter sendCommand");
    try {
        console.log("send command");
        const response = await fetch(
            `http://localhost:8042/start`,
            {mode: "no-cors"}
        );
        console.log("command sent");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
    console.log("return from sendStartRequest");
};
*/

// interface ServerOption {
//     label: string;
//     url: string;
// }

const WsRubikClient: React.FC = () => {

    const [mode, setMode] = useState<string>("auto");

    // const [url, setUrl] = useState<string>(`ws://${state.cube_address}/ws`);
    const [reconnectCounter, setReconnectCounter] = useState(0);
    // const {connected, status, message, sendMessage} = useWebSocket(`ws://${state.cube_address}/ws`, reconnectCounter);

    // const {connected, status, message, sendMessage} = useWebSocket(`ws://${state.rubik_address}/ws`, reconnectCounter);
    const {connected, status, message, sendMessage} = useWebSocket(`ws://192.168.1.101:5041/ws`, reconnectCounter);

    /*
        const handleSendStartRequest = () => {
            sendStartRequest();
        };

        const handleSendStartCommand = () => {
            sendMessage('start');
        };

        const handleSendStop = () => {
            sendMessage('stop');
        };
    */

/*
    const serverOptions: ServerOption[] = [
        {label: '192.168.1.73', url: 'ws://192.168.1.73:5042/ws'},
        {label: '192.168.1.100', url: 'ws://192.168.1.100:5042/ws'},
        {label: '192.168.1.101', url: 'ws://192.168.1.101:5042/ws'},
    ];

    const handleServerChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setUrl(e.target.value);
        // if (webSocket) {
        //   webSocket.close();
        // }
    };
*/


    const setModeAuto = () => {
        setMode("auto");
    };

    const setModeInter = () => {
        setMode("inter");
    };

    const setModeDemo = () => {
        setMode("demo");
    };

    const forceReconnect = () => {
        console.log("forceReconnect");
        setReconnectCounter((prev) => prev + 1); // Increment to trigger reconnection
    };

    return (
        <div className="flex flex-col h-full">
            {/*
            <div>
                <select value={url} onChange={handleServerChange}>
                    <option value="">Select Server</option>
                    {serverOptions.map((option, index) => (
                      <option key={index} value={option.url}>
                        {option.label}
                      </option>
                    ))}
                </select> {status}
            </div>
*/}
            <div className="grid justify-center grid-cols-2 gap-8 md:mx-36 mx-8 my-16">
                <button className="self-center bg-blue-600 hover:bg-blue-700 text-xl text-white px-4 py-8 rounded"
                        onClick={() => sendMessage('shuffle')}>Mélanger
                </button>
                <div className="bg-gray-800 border-1 border border-green-600 rounded p-4 text-center flex items-center justify-center">
                    <span className="text-xl">F'2</span>
                    <span className="text ml-4">(11/21)</span>
                </div>
{/*
                <button className="self-center bg-green-600 hover:bg-green-700 text-xl text-white px-4 py-8 rounded"
                        onClick={() => sendMessage('solve')}>Résoudre
                </button>
*/}
                <button className="self-center bg-gray-600 hover:bg-gray-700 text-xl text-white px-4 py-8 rounded"
                        onClick={() => sendMessage('stop')}>Stop
                </button>
                <button className="self-center bg-red-700 hover:bg-red-800 text-xl text-white py-8 px-4 rounded"
                        onClick={() => sendMessage('reset')}>Reset
                </button>
            </div>
            <div className="my-4 text-center">
                {mode == "auto" &&
                <button className="self-center bg-gray-700 hover:bg-gray-800 text-gray-400 px-4 p-2 rounded"
                                       onClick={setModeInter}>Passer en mode interactif</button>}
                {mode == "inter" &&
                <button className="self-center bg-gray-700 hover:bg-gray-800 text-gray-400 px-4 p-2 rounded"
                                       onClick={setModeAuto}>Passer en mode automatique</button>}
                {mode == "demo" &&
                <button className="self-center bg-gray-700 hover:bg-gray-800 text-gray-400 px-4 p-2 rounded"
                                       onClick={setModeDemo}>Passer en mode démo</button>}
            </div>
            <div className="Xflex border-t border-blue-400 pt-2 my-4">
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
            {/*
            <div>
                <button onClick={handleSendStop}>send stop</button>
            </div>
*/}
        </div>
    );
};

export default WsRubikClient;
