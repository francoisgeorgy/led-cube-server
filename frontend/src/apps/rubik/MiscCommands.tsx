import {Button} from "./Button.tsx";
import {MessageToCube} from "../../useWebSocket.ts";

interface WsRubikScrambleProps {
    sendMessage: (message: MessageToCube) => void;
}

export function MiscCommands({sendMessage}: WsRubikScrambleProps) {

    return (
        <div className="misc">
            <Button name="Mélanger" onClick={() => sendMessage({command: 'shuffle'})} />
            <Button name="Aide" onClick={() => sendMessage({command: 'hint'})} disabled={true} />
            <Button name="Auto" onClick={() => sendMessage({command: 'auto'})} />
            {/*<Button name="Cube" onClick={() => sendMessage({command: 'cube'})} />*/}
            <Button name="Noms" onClick={() => sendMessage({command: 'names'})} />
            <div></div>
            <Button name="Reset" onClick={() => sendMessage({command: 'reset'})} />
        </div>
    )
}
