import {Application} from "./interfaces.ts";

export const APP_COLORS: Application = {
    category: 'applications',
    application: 'color',
    // stop_script: 'color_stop.sh',
    title: 'Couleur',
    description: 'Changer la couleur du cube',
    requiresConfirmation: false
}

export const APP_RUBIK: Application = {
    category: 'applications',
    application: 'rubik-websockets',
    // stop_script: 'rubik-websockets_stop.sh',
    title: "Rubik's Cube",
    description: 'Rubik interactive',
    requiresConfirmation: false
}

export const APP_SNOW_CUBE: Application = {
    category: 'applications',
    application: 'snow-cube',
    // start_script: 'snow-cube',
    // stop_script: 'snow-cube_stop.sh',
    title: "Cube à neige",
    description: 'Cube à neige',
    requiresConfirmation: false
}

export const APP_IMU: Application = {
    category: 'applications',
    application: '3d',
    // stop_script: '3d_stop.sh',
    title: "3D",
    description: "",
    requiresConfirmation: false
}

export const APP_HEALTH: Application = {
    category: 'applications',
    application: 'TODO.sh',
    // stop_script: 'TODO.sh',
    title: "Health",
    description: "",
    requiresConfirmation: false
}

export const APP_RESTART_WEB: Application = {
    category: 'special',
    application: 'server_restart',
    // stop_script: 'TODO.sh',
    title: 'Redémarrer le serveur web',
    description: "",
    requiresConfirmation: false,
    code: "424242",
    button_color: 'red',
    button_text: 'Redémarrer le serveur web'
}

export const APP_REBOOT: Application = {
    category: 'applications',
    application: 'TODO.sh',
    // stop_script: 'TODO.sh',
    title: 'Redémarrer tout le Cube',
    description: "",
    requiresConfirmation: false,
    code: "424242",
    button_color: 'red',
    button_text: 'Redémarrer tout le Cube'
}
