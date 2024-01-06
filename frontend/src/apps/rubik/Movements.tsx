import {Button} from "./Button.tsx";
import {MessageToCube} from "../../useWebSocket.ts";

interface WsRubikMovementsProps {
    sendMessage: (message: MessageToCube) => void;
}

export function Movements({sendMessage} : WsRubikMovementsProps) {
    return (
        <div className="movements">
            <Button name="CCW" onClick={() => sendMessage({command: 'ccw'})} />
            <Button name="CW &#10226;" onClick={() => sendMessage({command: 'cw'})} />
            <Button name="180" onClick={() => sendMessage({command: '180'})} />
        </div>
    )
}
