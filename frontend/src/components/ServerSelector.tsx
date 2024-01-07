import {state} from "../State.ts";
import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";

interface ServerOption {
    label: string;
    host: string;
    port_http: number;   // API web classique
    port_ws: number;     // API websockets
}

export const ServerSelector = observer(() => {

    const serverOptions: ServerOption[] = [
        {label: 'local', host: 'localhost', port_http: 5040, port_ws: 5041},
        {label: 'm2', host: '192.168.1.73', port_http: 5040, port_ws: 5041},
        {label: 'pi-e1-12', host: '192.168.1.100', port_http: 5040, port_ws: 5041},
        {label: 'pi-de-e0', host: '192.168.1.101', port_http: 5040, port_ws: 5041},
    ];

    const fetchRunningStatus = async () => {
        try {
            console.log("fetchRunningStatus", state.cube_host, state.port_http);

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
            // console.error('Error fetching running status', error);
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

    const handleServerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const c = serverOptions.find(o => o.host == e.target.value)
        if (c) {
            // console.log("handleServerChange set", c.host, c.port_http, c.port_ws);
            state.setCubeHost(c.host);
            state.setPortHttp(c.port_http);
            state.setPortWs(c.port_ws);
        }
    };

/*
    const forceReconnect = () => {
        console.log("forceReconnect");
        // setReconnectCounter((prev) => prev + 1); // Increment to trigger reconnection
    };
*/

    return (
        <div className="flex">
            <select value={state.cube_host} onChange={handleServerChange} className="px-2">
                <option value="">Select Server</option>
                {serverOptions.map((option, index) => (
                    <option key={index} value={option.host}>
                        {option.label}
                    </option>
                ))}
            </select>
{/*
            <div className="ml-2">
                <button onClick={forceReconnect}>R</button>
            </div>
*/}
        </div>
    );
});
