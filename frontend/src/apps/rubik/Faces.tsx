import {Button} from "./Button.tsx";
import {MessageToCube} from "../../useWebSocket.ts";

interface WsRubikFacesProps {
    sendMessage: (message: MessageToCube) => void;
}

export function Faces({sendMessage} : WsRubikFacesProps) {
    return (
        <div className="faces">
            <Button name="Dessus" onClick={() => sendMessage({command: 'face', parameters: 'U'})} />
            <Button name="Equateur" onClick={() => sendMessage({command: 'face', parameters: 'E'})} disabled={true} />
            <Button name="Dessous" onClick={() => sendMessage({command: 'face', parameters: 'D'})} />

            <Button name="Devant" onClick={() => sendMessage({command: 'face', parameters: 'F'})} />
            <Button name="Centre" onClick={() => sendMessage({command: 'face', parameters: 'S'})} disabled={true} />
            <Button name="Derrière" onClick={() => sendMessage({command: 'face', parameters: 'B'})} />

            <Button name="Gauche" onClick={() => sendMessage({command: 'face', parameters: 'L'})} />
            <Button name="Milieu" onClick={() => sendMessage({command: 'face', parameters: 'M'})} disabled={true} />
            <Button name="Droite" onClick={() => sendMessage({command: 'face', parameters: 'R'})} />
        </div>
    )
}
