import {MessageToCube} from "../../useWebSocket.ts";
import {MiscCommands} from "./MiscCommands.tsx";
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
                    <Faces sendMessage={sendMessage} />
                </div>
                <div className="px-4">
                    Rotation de la sélection :
                </div>
                <div className="p-4">
                    <Movements sendMessage={sendMessage} />
                </div>
                <div className="px-4">
                    Opérations sur le Cube :
                </div>
                <div className="p-4">
                    <MiscCommands sendMessage={sendMessage} />
                </div>
            </div>
        </div>
    );

}
