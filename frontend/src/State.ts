import {makeAutoObservable} from "mobx";
import {loadPreferences, savePreferences} from "./preferences";
import {Running} from "./utils/interfaces.ts";

class State {

    // TODO: add ssl: boolean;  // true pour wss et https
    cube_host: string;
    port_http: number;
    port_ws: number;
    alive: boolean;
    status: string;
    running: null|Running;

    constructor() {
        const prefs = loadPreferences();
        this.cube_host = prefs.cube_host;
        this.port_http = prefs.port_http;
        this.port_ws = prefs.port_ws;
        this.alive = false;
        this.status = '';
        this.running = null;
        makeAutoObservable(this);
    }

    setCubeHost(a: string) {
        this.cube_host = a;
        savePreferences({cube_host: this.cube_host});
    }

    setPortHttp(p: number) {
        this.port_http = p;
        savePreferences({port_http: this.port_http});
    }

    setPortWs(p: number) {
        this.port_ws = p;
        savePreferences({port_ws: this.port_ws});
    }

    setAlive(b: boolean) {
        this.alive = b;
    }

    setStatus(status: string) {
        this.status = status;
    }

    setRunning(script: any) {
        this.running = script;
    }

}

export const state = new State();
