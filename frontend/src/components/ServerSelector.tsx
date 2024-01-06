// import {SetStateAction, useState} from "react";
import {state} from "../State.ts";
import {observer} from "mobx-react-lite";

interface ServerOption {
    label: string;
    url: string;
}

// export function ServerSelector() {
export const ServerSelector = observer(() => {

    // const [url, setUrl] = useState<string>('');
    // const [reconnectCounter, setReconnectCounter] = useState(0);
    // const {connected, status, message, sendMessage} = useWebSocket(url, reconnectCounter);

    const serverOptions: ServerOption[] = [
        {label: '192.168.1.73', url: '192.168.1.73:5040'},
        {label: '192.168.1.100', url: '192.168.1.100:5040'},
        {label: '192.168.1.101', url: '192.168.1.101:5040'},
    ];

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

    let connected = true;

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
