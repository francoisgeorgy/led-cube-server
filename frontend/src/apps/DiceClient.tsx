import {useWebSocket} from "../useWebSocket.ts";
import {useState} from "react";
import {state} from "../State.ts";
import {observer} from "mobx-react-lite";
import {APP_COLORS} from "../utils/applications.ts";
import "./DiceClient.css";

export const DiceClient = observer(() => {

    const [reconnectCounter, setReconnectCounter] = useState(0);
    const {connected, message, sendMessage} = useWebSocket(`ws://${state.cube_host}:${state.port_ws}/ws`, reconnectCounter);

    const forceReconnect = () => {
        setReconnectCounter((prev) => prev + 1); // Increment to trigger reconnection
    };

    return (
        <div className="flex flex-col h-full">
            <div className="responsive p-4 grid grid-cols-3 gap-4">
                <button className="self-center bg-yellow-400 hover:bg-yellow-200 text-xl text-black px-4 py-4 rounded"
                        onClick={() => sendMessage({command: 'dice_throw'})}>Lancer
                </button>
                <div></div>
                <div></div>
            </div>
            <div>
                Couleur du dé :
            </div>
            <div className="responsive p-4 grid grid-cols-3 gap-4">
                <button className="self-center bg-red-600 hover:bg-red-700 text-xl text-white px-4 py-4 rounded"
                        onClick={() => sendMessage({command: 'dice_color', parameters: {'r': 255, 'g': 0, 'b': 0}})}>Rouge
                </button>
                <button className="self-center bg-green-600 hover:bg-green-700 text-xl text-white px-4 py-4 rounded"
                        onClick={() => sendMessage({command: 'dice_color', parameters: {'r': 0, 'g': 255, 'b': 0}})}>Vert
                </button>
                <button className="self-center bg-blue-600 hover:bg-blue-700 text-xl text-white px-4 py-4 rounded"
                        onClick={() => sendMessage({command: 'dice_color', parameters: {'r': 0, 'g': 0, 'b': 255}})}>Bleu
                </button>
                <button className="self-center bg-white hover:bg-gray-100 text-xl text-black px-4 py-4 rounded"
                        onClick={() => sendMessage({command: 'dice_color', parameters: {'r': 255, 'g': 255, 'b': 255}})}>Blanc
                </button>
                <button className="self-center bg-gray-400 hover:bg-gray-300 text-xl text-black px-4 py-4 rounded"
                        onClick={() => sendMessage({command: 'dice_color', parameters: {'r': 120, 'g': 120, 'b': 120}})}>Gris
                </button>
                <button className="self-center bg-black hover:bg-gray-600 text-xl text-white px-4 py-4 rounded"
                        onClick={() => sendMessage({command: 'dice_color', parameters: {'r': 0, 'g': 0, 'b': 0}})}>Noir
                </button>
            </div>
            <div>
                Couleur des points :
            </div>
            <div className="responsive p-4 grid grid-cols-3 gap-4">
                <button className="self-center bg-red-600 hover:bg-red-700 text-xl text-white px-4 py-4 rounded"
                        onClick={() => sendMessage({command: 'dots_color', parameters: {'r': 255, 'g': 0, 'b': 0}})}>Rouge
                </button>
                <button className="self-center bg-green-600 hover:bg-green-700 text-xl text-white px-4 py-4 rounded"
                        onClick={() => sendMessage({command: 'dots_color', parameters: {'r': 0, 'g': 255, 'b': 0}})}>Vert
                </button>
                <button className="self-center bg-blue-600 hover:bg-blue-700 text-xl text-white px-4 py-4 rounded"
                        onClick={() => sendMessage({command: 'dots_color', parameters: {'r': 0, 'g': 0, 'b': 255}})}>Bleu
                </button>
                <button className="self-center bg-white hover:bg-gray-100 text-xl text-black px-4 py-4 rounded"
                        onClick={() => sendMessage({command: 'dots_color', parameters: {'r': 255, 'g': 255, 'b': 255}})}>Blanc
                </button>
                <button className="self-center bg-gray-400 hover:bg-gray-300 text-xl text-black px-4 py-4 rounded"
                        onClick={() => sendMessage({command: 'dots_color', parameters: {'r': 120, 'g': 120, 'b': 120}})}>Gris
                </button>
                <button className="self-center bg-black hover:bg-gray-600 text-xl text-white px-4 py-4 rounded"
                        onClick={() => sendMessage({command: 'dots_color', parameters: {'r': 0, 'g': 0, 'b': 0}})}>Noir
                </button>
            </div>

            {(true || state.isRunning(APP_COLORS)) &&
            <div className="border-t border-blue-400 pt-2 mt-2">
                <div className="mb-4">
                    Connexion avec l'application: {connected ? 'OK' : 'pas de connexion'}
                </div>
                {!connected && <button className="self-center bg-blue-500 hover:bg-blue-700 text-white px-2 rounded"
                                       onClick={forceReconnect}>Reconnexion</button>}
                <div>
                    {message}
                </div>
            </div>}
        </div>
    );

});
