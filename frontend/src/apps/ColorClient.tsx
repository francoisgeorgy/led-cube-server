import {useWebSocket} from "../useWebSocket.ts";
import {useCallback, useState} from "react";
import {RgbColor, RgbColorPicker} from "react-colorful";
import {state} from "../State.ts";
import {observer} from "mobx-react-lite";
import {APP_COLORS} from "../utils/applications.ts";
import _ from 'lodash';
import "./ColorClient.css";

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

            {state.isRunning(APP_COLORS) &&
            <div className="border-t border-blue-400 pt-2 mt-2">
                <div className="mb-4">
                    Connexion avec l'application: {connected ? 'OK' : 'pas de connexion'}
                </div>
                {!connected && <button className="self-center bg-blue-500 hover:bg-blue-700 text-white px-2 rounded"
                                       onClick={forceReconnect}>Reconnexion</button>}
                <div className="mb-4">
                    {message}
                </div>
            </div>}
        </div>
    );

});
