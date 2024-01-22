import {Application} from "./interfaces.ts";

export const APP_COLORS: Application = {
    category: 'applications',
    start_script: 'color_start.sh',
    stop_script: 'color_stop.sh',
    title: 'Couleur',
    description: 'Changer la couleur du cube',
    requiresConfirmation: false
}

export const APP_RUBIK: Application = {
    category: 'applications',
    start_script: 'rubik-websockets_start.sh',
    stop_script: 'rubik-websockets_stop.sh',
    title: "Rubik's Cube",
    description: 'Rubik interactive',
    requiresConfirmation: false
}

export const APP_SNOW_CUBE: Application = {
    category: 'applications',
    start_script: 'snow-cube_start.sh',
    stop_script: 'snow-cube_stop.sh',
    title: "Cube à neige",
    description: 'Cube à neige',
    requiresConfirmation: false
}

export const APP_IMU: Application = {
    category: 'applications',
    start_script: '3d_start.sh',
    stop_script: '3d_stop.sh',
    title: "3D",
    requiresConfirmation: false
}

export const APP_HEALTH: Application = {
    category: 'applications',
    start_script: 'TODO.sh',
    stop_script: 'TODO.sh',
    title: "Health",
    requiresConfirmation: false
}

export const APP_RESTART_WEB: Application = {
    category: 'applications',
    start_script: 'TODO.sh',
    stop_script: 'TODO.sh',
    title: 'Redémarrer le serveur web',
    requiresConfirmation: false,
    code: "424242",
    button_color: 'red',
    button_text: 'Redémarrer le serveur web'
}

export const APP_REBOOT: Application = {
    category: 'applications',
    start_script: 'TODO.sh',
    stop_script: 'TODO.sh',
    title: 'Redémarrer tout le Cube',
    requiresConfirmation: false,
    code: "424242",
    button_color: 'red',
    button_text: 'Redémarrer tout le Cube'
}
