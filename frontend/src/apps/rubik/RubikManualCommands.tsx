import {MessageToCube} from "../../useWebSocket.ts";
import {Scramble} from "./Scramble.tsx";
import {Movements} from "./Movements.tsx";
import {Faces} from "./Faces.tsx";
import './rubik.css'

interface WsRubikAutoCommandsProps {
    sendMessage: (message: MessageToCube) => void;
}

export function WsRubikManualCommands({sendMessage} : WsRubikAutoCommandsProps) {

    return (
        <div className="">
            <div className="flex flex-col">
                <div className="p-4">
                    {/*<Faces sendMessage={sendMessage} />*/}
                </div>
                <div className="px-4">
                    Rotation :
                </div>
                <div className="p-4">
                    {/*<Movements sendMessage={sendMessage} />*/}
                </div>
                <div className="px-4">
                    Cube :
                </div>
                <div className="p-4">
                    <Scramble sendMessage={sendMessage} />
                </div>
            </div>
        </div>
    );

    /*
        return (
            <div className="grid justify-center grid-cols-2 gap-4 md:mx-36 my-8">
                <button className="self-center bg-blue-600 hover:bg-blue-700 text-xl text-white px-4 py-4 rounded"
                        onClick={() => sendMessage({command:'shuffle'})}>Mélanger
                </button>
                <button className="self-center bg-green-600 hover:bg-green-700 text-xl text-white px-4 py-4 rounded"
                        onClick={() => sendMessage({command:'solve'})}>Résoudre
                </button>
                <button className="self-center bg-gray-600 hover:bg-gray-700 text-xl text-white px-4 py-4 rounded"
                        onClick={() => sendMessage({command:'stop'})}>Stop
                </button>
                <button className="self-center bg-red-700 hover:bg-red-800 text-xl text-white px-4 py-4 rounded"
                        onClick={() => sendMessage({command:'reset'})}>Reset
                </button>
            </div>
        );
    */
}
