import {Button} from "./Button.tsx";
import {MessageToCube} from "../../useWebSocket.ts";

interface WsRubikScrambleProps {
    sendMessage: (message: MessageToCube) => void;
}

export function Scramble({sendMessage}: WsRubikScrambleProps) {

    return (
        <div className="scramble">
            <Button name="Reset" onClick={() => sendMessage({command: 'reset'})} />
            <Button name="Scramble" onClick={() => sendMessage({command: 'shuffle'})} />
            <Button name="Auto" onClick={() => sendMessage({command: 'auto'})} />
        </div>
    )
}
