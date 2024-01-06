import WsExampleClient from "../apps/rubik/WsExampleClient.tsx";
import {StartApplicationButton} from "../components/StartApplicationButton.tsx";
import {StopApplicationButton} from "../components/StopApplicationButton.tsx";
import {Application} from "../utils/interfaces.ts";
import {StartStopApplicationButtons} from "../components/StartStopApplicationButtons.tsx";

const APP: Application = {
    start_script: 'start-colors-websockets.sh',
    stop_script: 'stop-colors-websockets.sh',
    title: 'Couleurs',
    description: 'Changer la couleur du cube',
    requiresConfirmation: false
}

export function WsExample() {
    return (
        <div className="p-4">
            <div className="flex align-middle">
                <div className="self-center flex-grow text-xl font-bold">WSExample</div>
                <StartStopApplicationButtons application={APP} />
{/*
                <div className="self-center"><StartApplicationButton application={APP}/></div>
                <div className="self-center"><StopApplicationButton application={APP}/></div>
*/}
            </div>
            <WsExampleClient/>
        </div>
    );
}
