import {makeAutoObservable} from "mobx";
import {loadPreferences, savePreferences} from "./preferences";

class State {

    cube_address: string;
    rubik_address: string;
    alive: boolean;
    status: string;
    running: string;
    // cube_ip_address: string;
    // cube_port: number;

    constructor() {
        const prefs = loadPreferences();
        // this.cube_ip_address = prefs.cube_ip;
        // this.cube_port = prefs.cube_port
        this.cube_address = prefs.cube_address;
        this.rubik_address = prefs.rubik_address;
        this.alive = false;
        this.status = '';
        this.running = '';
        makeAutoObservable(this);
    }

    // getCubeIpAddress() {
    //     return this.cube_ip_address;
    // }

    setCubeAddress(a: string) {
        this.cube_address = a;
        savePreferences({cube_address: this.cube_address});
    }

    setRubikAddress(a: string) {
        this.rubik_address = a;
        savePreferences({rubik_address: this.rubik_address});
    }

    setAlive(b: boolean) {
        this.alive = b;
    }

/*
    setCubeIpAddress(a: string) {
        this.cube_ip_address = a;
        savePreferences({cube_ip: this.cube_ip_address});
    }

    setCubePort(p: number) {
        this.cube_port = p;
        savePreferences({cube_port: this.cube_port});
    }
*/

    // get cube_ip_address(): string {
    //     return this._cube_ip_address;
    // }
    //
    // set cube_ip_address(value: string) {
    //     this._cube_ip_address = value;
    // }

    setStatus(status: string) {
        this.status = status;
    }

    setRunning(script: string) {
        this.running = script;
    }

}

export const state = new State();
