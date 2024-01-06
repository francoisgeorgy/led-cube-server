import store from "storejs";

export const LOCAL_STORAGE_KEY = "francoisgeorgy.ch.ledcube.preferences";

export interface Preferences {
    cube_host: string;
    port_http: number;
    port_ws: number;
}

export const DEFAULT_PREFERENCES: Preferences = {
    cube_host: "127.0.0.1",
    port_http: 5040,
    port_ws: 5041
}

export function loadPreferences(): Preferences {
    const s = store.get(LOCAL_STORAGE_KEY);
    return Object.assign({}, DEFAULT_PREFERENCES, s ? JSON.parse(s) : {});
}

export function savePreferences(options: Partial<Preferences> = {}) {
    store(LOCAL_STORAGE_KEY, JSON.stringify(Object.assign({}, loadPreferences(), options)));
}
