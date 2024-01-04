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
            <div className="flex align-middle">
                <div className="self-center flex-grow text-xl font-bold">Rubik's Cube</div>
                <div className="self-center mx-4"><StartApplicationButton application={RUBIK}/></div>
                <div className="self-center"><StopApplicationButton application={RUBIK}/></div>
            </div>
            <WsRubikClient/>
        </div>
    );
}
