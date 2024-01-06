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
        {label: '192.168.1.73', host: '192.168.1.73', port_http: 5040, port_ws: 5041},
        {label: '192.168.1.100', host: '192.168.1.100', port_http: 5040, port_ws: 5041},
        {label: '192.168.1.101', host: '192.168.1.101:', port_http: 5040, port_ws: 5041},
    ];

    const fetchRunningStatus = async () => {
        console.log("ApplicationsList.fetchRunningStatus");
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
                state.setRunning(data.running);
            } else {
                console.warn("unexpected response", data)
                state.setRunning('');
            }
        } catch (error) {
            console.error('Error fetching running status', error);
            state.setAlive(false);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchRunningStatus();
        }, 1000);
        return () => clearInterval(interval); // This is the clean-up function
    }, []);

/*
    useEffect(() => {
        console.log("ApplicationsList", category);
        fetch(`http://${state.cube_address}/api/applications/${category}`)  // Adjust the URL/port as necessary
            .then(response => response.json())
            .then(data => setApplications(data as Application[]))
            .catch(error => console.error('Error fetching data: ', error));
    }, [state.cube_address]);
*/

    const handleServerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const c = serverOptions.find(o => o.label == e.target.value)
        if (c) {
            state.setCubeHost(c.host);
            state.setPortHttp(c.port_http);
            state.setPortWs(c.port_ws);
        }
    };

    const forceReconnect = () => {
        console.log("forceReconnect");
        // setReconnectCounter((prev) => prev + 1); // Increment to trigger reconnection
    };

    // let connected = true;

    return (
        <div className="flex">
            <select value={state.cube_host} onChange={handleServerChange} className="px-2">
                <option value="">Select Server</option>
                {serverOptions.map((option, index) => (
                    <option key={index} value={option.label}>
                        {option.label}
                    </option>
                ))}
            </select>
{/*
            <div className="mx-4">
                {connected ? 'OK' : '--'}
            </div>
*/}
            <div className="ml-2">
                <button onClick={forceReconnect}>R</button>
            </div>
        </div>
    );
});
