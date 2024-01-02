import store from "storejs";

export const LOCAL_STORAGE_KEY = "francoisgeorgy.ch.ledcube.preferences";

export interface Preferences {
    cube_address: string;
    cube_port: number;
    cube_ip: string;
}

export const DEFAULT_PREFERENCES: Preferences = {
    cube_address: "127.0.0.1:8080",
    cube_ip: "127.0.0.1",
    cube_port: 0
}

export function loadPreferences(): Preferences {
    const s = store.get(LOCAL_STORAGE_KEY);
    return Object.assign({}, DEFAULT_PREFERENCES, s ? JSON.parse(s) : {});
}

export function savePreferences(options: Partial<Preferences> = {}) {
    store(LOCAL_STORAGE_KEY, JSON.stringify(Object.assign({}, loadPreferences(), options)));
}
