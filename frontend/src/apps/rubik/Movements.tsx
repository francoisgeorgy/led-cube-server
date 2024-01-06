import {Button} from "./Button.tsx";
import {MessageToCube} from "../../useWebSocket.ts";

interface WsRubikMovementsProps {
    sendMessage: (message: MessageToCube) => void;
}

export function Movements({sendMessage} : WsRubikMovementsProps) {
    return (
        <div className="movements">
            <Button name="90 G" onClick={() => sendMessage({command: 'move', parameters: 'ccw'})} />
            <Button name="90 D" onClick={() => sendMessage({command: 'move', parameters: 'cw'})} />
            <Button name="180" onClick={() => sendMessage({command: 'move', parameters: '180'})} />
        </div>
    )
}
