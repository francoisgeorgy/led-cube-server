import {StartApplicationButton} from "./StartApplicationButton.tsx";
import {StopApplicationButton} from "./StopApplicationButton.tsx";
import {Application} from "../utils/interfaces.ts";
import {state} from "../State.ts";
import {observer} from "mobx-react-lite";

interface StartStopApplicationButtonsProps {
    application: Application;
}

export const StartStopApplicationButtons = observer(({application}: StartStopApplicationButtonsProps) => {

    const stop = state.running == application.start_script;

    return (
        <>
            {!stop && <div className="self-center"><StartApplicationButton application={application}/></div>}
            {stop && <div className="self-center"><StopApplicationButton application={application}/></div>}
        </>
    );

});
