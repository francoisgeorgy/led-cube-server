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
