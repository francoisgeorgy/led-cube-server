import {state} from "../State.ts";

export const startApplication = async (category: string, application: string) => {
    // console.log("enter sendCommand");
    try {
        // console.log("send command");
        const response = await fetch(
            `http://${state.cube_host}:${state.port_http}/api/start/${category}/${application}`,
            {mode: "cors"}
        );
        // console.log("command sent");
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

export const stopApplication = async (category: string | undefined, application: string | undefined) => {
    // console.log("enter stopApplicationScript");
    if (!category || !application) {
        console.warn("stopApplication: invalid arguments", category, application)
        return false;
    }
    try {
        // console.log("send command");
        const response = await fetch(
            `http://${state.cube_host}:${state.port_http}/api/stop/${category}/${application}`,
            {mode: "cors"}
        );
        // console.log("command sent");
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

/*
export const stopScript = async () => {
    // console.log("enter sendCommand");
    try {
        // console.log("send command");
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
*/

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


export const rebootServer = async (code:string) => {
    // console.log("enter rebootServer");
    try {
        const response = await fetch(
            `http://${state.cube_host}:${state.port_http}/api/system/reboot/${code}`,
            {mode: "cors"}
        );
        // console.log("command sent");
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data?.error ?? `${response.status} requête invalide`);
        }
        // console.log(data); // Process your data here
        state.setStatus(data?.message ?? '');
    } catch (error) {
        console.error('rebootServer: expected There was a problem with the fetch operation:', error);
        // @ts-expect-error error is not type
        state.setStatus(error.message ?? 'Erreur de communication');
        return false;
    }
    state.setAlive(false);
    return true;
    // console.log("return from sendCommand");
};
