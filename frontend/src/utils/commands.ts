import {state} from "../State.ts";

export const startScript = async (category: string, script: string) => {
    console.log("enter sendCommand");
    try {
        console.log("send command");
        const response = await fetch(
            `http://${state.cube_host}:${state.port_http}/api/start/${category}/${script}`,
            {mode: "cors"}
        );
        console.log("command sent");
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data?.error ?? `${response.status} requête invalide`);
        }
        // console.log(data); // Process your data here
        state.setStatus(data?.message ?? '');
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        // @ts-expect-error error is not type
        state.setStatus(error.message ?? 'Erreur de communication');
        return false;
    }
    return true;
    // console.log("return from sendCommand");
};

export const stopApplicationScript = async (category: string, script: string) => {
    console.log("enter stopApplicationScript");
    try {
        console.log("send command");
        const response = await fetch(
            `http://${state.cube_host}:${state.port_http}/api/stop/${category}/${script}`,
            {mode: "cors"}
        );
        console.log("command sent");
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data?.error ?? `${response.status} requête invalide`);
        }
        // console.log(data); // Process your data here
        state.setStatus(data?.message ?? '');
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        // @ts-expect-error error is not type
        state.setStatus(error.message ?? 'Erreur de communication');
        return false;
    }
    return true;
    // console.log("return from stopApplicationScript");
};

export const stopScript = async () => {
    console.log("enter sendCommand");
    try {
        console.log("send command");
        const response = await fetch(
            `http://${state.cube_host}:${state.port_http}/api/stop`,
            {mode: "cors"}
        );
        // console.log("command sent");
        // console.log(response);
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
            throw new Error(data?.error ?? `${response.status} requête invalide`);
        }
        // const data = await response.json();
        state.setStatus(data?.message ?? '');
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        // @ts-expect-error error is not type
        state.setStatus(error.message ?? 'Erreur de communication');
        return false;
    }
    // TODO: review "running" handling.
    state.setRunning('');
    // console.log("return from sendCommand");
    return true;
};

/*
export const running = async () => {
    console.log("enter sendCommand");
    try {
        console.log("send command");
        const response = await fetch(
            `http://${state.cube_host}:${state.port_http}/api/running`,
            {mode: "cors"}
        );
         const data = await response.json();
         console.log(data);
        if (!response.ok) {
            throw new Error(data?.error ?? `${response.status} requête invalide`);
        }
        state.setRunning(data?.running ?? '');
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        // state.setStatus(error.message ?? 'Erreur de communication');
    }
    // console.log("return from sendCommand");
};
*/
