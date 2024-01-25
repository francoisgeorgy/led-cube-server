import {observer} from "mobx-react-lite";
import {useState} from "react";
import {useWebSocket} from "../../useWebSocket.ts";
import {state} from "../../State.ts";
import "./ImuClient.css";
import VectorDisplay from "../../components/VectorDisplay.tsx";
import AccelerometerVisualization from "../../components/AccelerometerVisualization.tsx";

export const ImuClient = observer(() => {

    // const [color, setColor] = useState({ r: 50, g: 50, b: 150 });
    const [reconnectCounter, setReconnectCounter] = useState(0);
    // const {connected, status, message, sendMessage} = useWebSocket(`ws://${state.cube_host}:${state.port_ws}/ws`, reconnectCounter);
    const {connected, message} = useWebSocket(`ws://${state.cube_host}:${state.port_ws}/ws`, reconnectCounter);

    const forceReconnect = () => {
        setReconnectCounter((prev) => prev + 1); // Increment to trigger reconnection
    };

    let v = {
        "a": -1.0,
        "b": 1.0,
        "c": 1.0
    }

    let vectorData;
    if (message) {
        vectorData = JSON.parse(message);
    } else {
        vectorData = {
            "x": 0.0,
            "y": 0.0,
            "z": 1.0
        }
    }

    return (
        <div className="flex flex-col h-full">

            <div className="responsive py-4">
                {/*<VectorDisplay message={message}/>*/}
                <AccelerometerVisualization vec={vectorData} />
            </div>

            <div className="border-t border-blue-400 pt-2 my-4">
                <div className="mb-4">
                    Connexion avec l'application: {connected ? 'OK' : 'pas de connexion'}
                </div>
                <div>
                    données reçues:
                </div>
                <div>
                    {message}
                </div>
                {!connected && <button className="self-center bg-blue-500 hover:bg-blue-700 text-white px-2 rounded"
                                       onClick={forceReconnect}>Reconnexion</button>}
            </div>
{/*
            <div className="mt-4">
                <div className="mb-4">
                    Messages:
                </div>
                <div>
                    {message}
                </div>
            </div>
*/}
        </div>
    );

});
