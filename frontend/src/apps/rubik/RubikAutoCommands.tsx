import {MessageToCube} from "../../useWebSocket.ts";

interface WsRubikAutoCommandsProps {
    sendMessage: (message: MessageToCube) => void;
}

export function WsRubikAutoCommands({sendMessage} : WsRubikAutoCommandsProps) {

    return (
        <div className="grid justify-center grid-cols-2 gap-4 md:mx-36 my-8">
            <button className="self-center bg-blue-600 hover:bg-blue-700 text-xl text-white px-4 py-4 rounded"
                    onClick={() => sendMessage({command:'shuffle'})}>Mélanger
            </button>
{/*
            <div className="bg-gray-800 border-1 border border-green-600 rounded p-4 text-center flex items-center justify-center">
                <span className="text-xl">F'2</span>
                <span className="text ml-4">(11/21)</span>
            </div>
*/}
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
}
