import {useEffect, useState} from "react";
import {StartApplicationButton} from "./StartApplicationButton.tsx";
import {StopApplicationButton} from "./StopApplicationButton.tsx";
import {Application} from "../utils/interfaces.ts";
import {state} from "../State.ts";

interface StartStopApplicationButtonsProps {
    application: Application;
}

export function StartStopApplicationButtons({application}: StartStopApplicationButtonsProps) {

    const [runningStatus, setRunningStatus] = useState('');

    const fetchRunningStatus = async () => {
        try {
            const response = await fetch(`http://${state.cube_address}/api/running`);
            const data = await response.json();
            console.log("data.running", data.running)
            setRunningStatus(data.running);
        } catch (error) {
            console.error('Error fetching running status', error);
        }
    };

/*
    useEffect(() => {
        const interval = setInterval(() => {
            fetchRunningStatus().then();
        }, 1000);
        return () => clearInterval(interval); // This is the clean-up function
    }, []);
    // TODO: add cube_address in deps?
*/

    return (
        <>
            <div className="self-center"><StartApplicationButton application={application}/></div>
            <div className="self-center"><StopApplicationButton application={application}/></div>
        </>
    );

}
