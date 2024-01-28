import {state} from "../State.ts";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";

function parseHostnamePort(input: string): { host: string, port: string | null } {

    // Regex for hostname or IP address with an optional port
    const regex = /^([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*|\b(?:\d{1,3}\.){3}\d{1,3}\b)(:\d+)?$/;

    const match = input.match(regex);
    if (match) {
        const host = match[1];
        const port = match[3] ? match[3].substring(1) : null; // Remove ':' from the port
        return { host, port };
    } else {
        throw new Error("Invalid input format");
    }
}

export const ServerSelectorInput = observer(() => {

    const fetchRunningStatus = async () => {
        try {
            const response = await fetch(
                `http://${state.cube_host}:${state.port_http}/api/running`,
                {mode: "cors"}
            );
            const data = await response.json();

            state.setAlive(true);

            if (response.status != 200) {
                console.warn("unexpected response", response.status)
                state.setRunning('');
            } else if (Object.prototype.hasOwnProperty.call(data, 'running')) {
                console.log("running: ", data.running)
                state.setRunning(data.running);
            } else {
                console.warn("unexpected response", data)
                state.setRunning('');
            }
        } catch (error) {
            console.error('Error fetching running status', error);
            state.setRunning('');
            state.setAlive(false);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchRunningStatus();
        }, 1000);
        return () => clearInterval(interval); // This is the clean-up function
    }, [state.cube_host, state.port_http]);

    const handleAddressClick = () => {
        const userInput = window.prompt('Cube IP:', state.cube_host);
        if (userInput !== null) {
            try {
                const a = parseHostnamePort(userInput);
                console.log(a);
                state.setCubeHost(a.host);
                // if (a.port) {
                //     state.setCubeHost(a.host);
                // }
            } catch (error) {
                console.error(error);
            }
        }
    }

/*
    const forceReconnect = () => {
        console.log("forceReconnect");
        // setReconnectCounter((prev) => prev + 1); // Increment to trigger reconnection
    };
*/

    return (
        <div onClick={handleAddressClick} className="text-sky-300">{state.cube_host}</div>
    );
});
