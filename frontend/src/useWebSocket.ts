import {useState, useEffect, useCallback, useRef} from 'react';

interface MyMessageData {
    message: string;
    // ... other properties
}

export const useWebSocket = (url: string, reconnectCounter: unknown) => {

    console.log(reconnectCounter);

    const ws = useRef<WebSocket | null>(null);
    // const [websocket, setWebsocket] = useState(null);

    // connection status (informational only)
    const [status, setStatus] = useState<string>("");

    const [message, setMessage] = useState<string>("");

    // const [messages, setMessages] = useState([]);
    const [connected, setConnected] = useState(false);

    const reconnectInterval = 3000; // Time in milliseconds to wait for reconnection
    const maxReconnectAttempts = 3; // Maximum number of reconnection attempts
    let reconnectAttempts = 0;

    // The useCallback hook in the useWebSocket example is used to memoize the connect function. Memoization is a
    // process where the function is saved in memory, so the same instance of the function is reused on subsequent
    // renders unless its dependencies change. This is particularly important in React for a few reasons:
    //
    // - Preventing Unnecessary Re-renders: In React, functions are objects, and creating a new function on every render
    // can trigger re-renders for child components that receive the function as a prop. By using useCallback, you ensure
    // that the function's identity remains stable between renders as long as its dependencies don't change.
    //
    // - Dependency Array in useEffect: The connect function is used as a dependency in the useEffect hook. If connect
    // were defined without useCallback, it would be a new function on each render, causing the useEffect hook to run
    // again, potentially leading to undesirable behaviors like multiple WebSocket connections. With useCallback, the
    // connect function's identity is stable, so useEffect only runs when the function's dependencies (url and
    // reconnectInterval) change.
    //
    // - Optimization: While it might not have a significant impact on performance in many cases, useCallback can be
    // beneficial in more complex components or when the function is computationally expensive.
    //
    // In the useWebSocket hook, useCallback is used for connect to ensure that this function doesn't change across
    // renders unless its dependencies (url and reconnectInterval) change. This prevents unnecessary reconnections
    // and ensures that the effect hook which sets up the WebSocket connection behaves as intended.
    //
    const connect = useCallback(() => {

        ws.current = new WebSocket(url);

        ws.current.onopen = () => {
            console.log('WebSocket.onOpen', url);
            reconnectAttempts = 0; // Reset reconnect attempts on successful connection
            setConnected(true);
            setStatus(`connected`);
            // console.log('WebSocket.onOpen: connected set to true');
        };

        ws.current.onmessage = (event: MessageEvent<string>) => {
            const message = JSON.parse(event.data) as MyMessageData;
            console.log("onmessage", message)
            // setCounter(message.counter);
            setMessage(message.message);
        };

        ws.current.onerror = (error: Event) => {
            console.error('WebSocket.onError:', error);
        };

        ws.current.onclose = () => {
            console.log('WebSocket.onClose');
            setConnected(false);
            // console.log('WebSocket.onClose: connected set to false');
            if (reconnectAttempts < maxReconnectAttempts) {
                console.log('onClose: Attempting to reconnect...', reconnectAttempts);
                setStatus(`trying to connect... (${reconnectAttempts+1}/${maxReconnectAttempts})`);
                setTimeout(() => {
                    connect();
                    reconnectAttempts++;
                }, reconnectInterval);
            } else {
                console.log('onClose: Max reconnect attempts reached, not attempting further reconnects');
                setStatus(`unable to connect`);
                reconnectAttempts = 0; // Reset reconnect attempts for the case if the user force a reconnection
            }
        };

    }, [url, reconnectInterval]);

    useEffect(() => {
        // const ws = new WebSocket(url);
        connect();
        return () => {
            console.log("cleanup")
            if (ws.current) {
                console.log("ws.current.close()");
                ws.current.close();
            }
        };
    }, [connect, reconnectCounter]);

    const sendMessage = useCallback((message: string) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            console.log("send message", message)
            ws.current.send(JSON.stringify({"command": message}));
        }
    }, [ws.current]);

    return {connected, status, message, sendMessage};
};
