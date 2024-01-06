import {stopApplicationScript, stopScript} from "../utils/commands.ts";
import {Application} from "../utils/interfaces.ts";
import {StartStopApplicationButtons} from "./StartStopApplicationButtons.tsx";
import {APP_COLORS} from "../utils/applications.ts";

interface ApplicationHeaderProps {
    application: Application;
}

export function ApplicationHeader({application}: ApplicationHeaderProps) {

    return (
        <div className="flex align-middle">
            <div className="self-center flex-grow text-xl font-bold">{application.title}</div>
            <StartStopApplicationButtons application={application}/>
        </div>
    )
}
