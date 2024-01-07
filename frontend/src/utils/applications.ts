import {Application} from "./interfaces.ts";

export const APP_COLORS: Application = {
    start_script: 'start-colors-websockets.sh',
    stop_script: 'stop-colors-websockets.sh',
    title: 'Couleur',
    description: 'Changer la couleur du cube',
    requiresConfirmation: false
}

export const APP_RUBIK: Application = {
    start_script: 'start-rubik-websockets.sh',
    stop_script: 'stop-rubik-websockets.sh',
    title: "Rubik's Cube",
    description: 'Rubik interactive',
    requiresConfirmation: false
}

