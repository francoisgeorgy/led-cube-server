import WsRubikClient from "../apps/rubik/WsRubikClient.tsx";
import {Application} from "../utils/interfaces.ts";
import {StartApplicationButton} from "../components/StartApplicationButton.tsx";
import {StopApplicationButton} from "../components/StopApplicationButton.tsx";


const RUBIK: Application = {
    start_script: 'start-rubik-websockets.sh',
    stop_script: 'stop-rubik-websockets.sh',
    title: 'Rubik interactive',
    description: 'Rubik interactive',
    requiresConfirmation: false
}

export function Rubik() {
    return (
        <div className="p-4">
            <h2>Rubik</h2>
            <div className="my-4">
                <StartApplicationButton application={RUBIK} />
                <StopApplicationButton application={RUBIK} />
            </div>
            <WsRubikClient />
        </div>
    );
}
