// import {SetStateAction, useState} from "react";
import {state} from "../State.ts";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";

interface ServerOption {
    label: string;
    url: string;
}

// export function ServerSelector() {
export const ServerSelector = observer(() => {

    const serverOptions: ServerOption[] = [
        {label: '192.168.1.73', url: '192.168.1.73:5040'},
        {label: '192.168.1.100', url: '192.168.1.100:5040'},
        {label: '192.168.1.101', url: '192.168.1.101:5040'},
    ];

    // const [url, setUrl] = useState<string>('');
    // const [reconnectCounter, setReconnectCounter] = useState(0);
    // const {connected, status, message, sendMessage} = useWebSocket(url, reconnectCounter);

    // const [runningStatus, setRunningStatus] = useState('');

    const fetchRunningStatus = async () => {
        console.log("ApplicationsList.fetchRunningStatus");
        try {
            const response = await fetch(
                `http://${state.cube_address}/api/running`,
                {mode: "cors"}
            );
            const data = await response.json();
            // console.log("fetchRunningStatus: response", response)
            // console.log("fetchRunningStatus: data", data)
            // setRunningStatus(data.running);

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

    const handleServerChange = (e: any) => {
        console.log("handleServerChange", e.target.value);
        // setUrl(e.target.value);
        if (e.target.value) {
            state.setCubeAddress(e.target.value);
        }
    };

    const forceReconnect = () => {
        console.log("forceReconnect");
        // setReconnectCounter((prev) => prev + 1); // Increment to trigger reconnection
    };

    // let connected = true;

    return (
        <div className="flex">
            <select value={state.cube_address} onChange={handleServerChange} className="px-2">
                <option value="">Select Server</option>
                {serverOptions.map((option, index) => (
                    <option key={index} value={option.url}>
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
