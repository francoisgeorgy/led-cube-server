import {useWebSocket} from "../../useWebSocket.ts";
import {useCallback, useEffect, useState} from "react";
import {RgbColor, RgbColorPicker} from "react-colorful";
import {state} from "../../State.ts";
import _ from 'lodash';
import "./ColorClient.css";
import {observer} from "mobx-react-lite";

export const ColorClient = observer(() => {

    const [color, setColor] = useState({ r: 50, g: 50, b: 150 });
    const [reconnectCounter, setReconnectCounter] = useState(0);
    // const {connected, status, message, sendMessage} = useWebSocket(`ws://${state.cube_host}:${state.port_ws}/ws`, reconnectCounter);
    const {connected, message, sendMessage} = useWebSocket(`ws://${state.cube_host}:${state.port_ws}/ws`, reconnectCounter);

    const updateColor = useCallback(
        _.throttle((rgb: RgbColor) => {
          // console.log('updateColor:', rgb);
          setColor(rgb);
          sendMessage({command: 'color', parameters: rgb});
        }, 100),
        []
    );

    // useEffect(() => {
    //     if (state.running) setReconnectCounter((prev) => prev + 1); // Increment to trigger reconnection
    // }, [state.running]);

    const forceReconnect = () => {
        setReconnectCounter((prev) => prev + 1); // Increment to trigger reconnection
    };

    return (
        <div className="flex flex-col h-full">

            <div className="responsive p-4">
                <RgbColorPicker color={color} onChange={updateColor} />
            </div>

            <div className="border-t border-blue-400 pt-2 my-4">
                <div className="mb-4">
                    Connexion avec l'application: {connected ? 'OK' : 'pas de connexion'}
                </div>
                <div>
                    M: {message}
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
