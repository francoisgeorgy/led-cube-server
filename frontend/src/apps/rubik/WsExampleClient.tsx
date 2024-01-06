import {useWebSocket} from "../../useWebSocket.ts";
import {useCallback, useState} from "react";
import {RgbColor, RgbColorPicker} from "react-colorful";
import _ from 'lodash';
import "./WsExampleClient.css";

const WsExampleClient: React.FC = () => {

    const [reconnectCounter, setReconnectCounter] = useState(0);

    const {connected, status, message, sendMessage} = useWebSocket(`ws://192.168.1.73:5041/ws`, reconnectCounter);

    // const [color, setColor] = useState("#aabbcc");
    const [color, setColor] = useState({ r: 200, g: 150, b: 35 });

    const updateColor = useCallback(
        _.throttle((rgb: RgbColor) => {
          console.log('updateColor:', rgb);
          sendMessage('color', rgb);
        }, 200),
        []
    );

    // const updateColor = (rgb: RgbColor) => {
    //     console.log(rgb);
    //     // sendMessage('cmd1', rgb)
    // }

    const forceReconnect = () => {
        console.log("WsExampleClient.forceReconnect");
        setReconnectCounter((prev) => prev + 1); // Increment to trigger reconnection
    };

    return (
        <div className="flex flex-col h-full">

                {/*<HexColorPicker color={color} onChange={setColor} />*/}
                <div className="responsive p-4">
                    <RgbColorPicker color={color} onChange={updateColor} />
                </div>

{/*
            <div className="grid justify-center grid-cols-2 gap-8 md:mx-36 mx-8 my-16">

                <div>{color.r} {color.g} {color.b}</div>

                <button className="self-center bg-blue-600 hover:bg-blue-700 text-xl text-white px-4 py-8 rounded"
                        onClick={() => sendMessage('cmd1')}>Cmd 1
                </button>
                <button className="self-center bg-green-600 hover:bg-green-700 text-xl text-white px-4 py-8 rounded"
                        onClick={() => sendMessage('cmd2')}>Cmd 2
                </button>
                <button className="self-center bg-gray-600 hover:bg-gray-700 text-xl text-white px-4 py-8 rounded"
                        onClick={() => sendMessage('cmd3')}>Cmd 3
                </button>
                <button className="self-center bg-red-700 hover:bg-red-800 text-xl text-white py-8 px-4 rounded"
                        onClick={() => sendMessage('cmd4')}>Cmd 4
                </button>
            </div>
*/}
            <div className="Xflex border-t border-blue-400 pt-2 my-4">
                <div className="mb-4">
                    Connexion avec l'application: {connected ? 'OK' : 'pas de connexion'}
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
};

export default WsExampleClient;
