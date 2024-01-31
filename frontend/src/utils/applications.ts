import {Application} from "./interfaces.ts";

export const APP_DEMO1: Application = {
    category: 'applications',
    application: 'demo1',
    title: 'Demo 1',
    description: '',
    requiresConfirmation: false
}

export const APP_COLORS: Application = {
    category: 'applications',
    application: 'color',
    title: 'Couleur',
    description: 'Changer la couleur du cube',
    requiresConfirmation: false
}

export const APP_DICE: Application = {
    category: 'applications',
    application: 'dice',
    title: 'Dé 6 faces',
    description: '',
    requiresConfirmation: false
}

export const APP_RUBIK: Application = {
    category: 'applications',
    application: 'rubik-websockets',
    title: "Rubik's Cube",
    description: 'Rubik interactive',
    requiresConfirmation: false
}

export const APP_SNOW_CUBE: Application = {
    category: 'applications',
    application: 'snow-cube',
    title: 'Cube à neige',
    description: "Cube à neige adapté du code Adafruit. Prototype en cours de dév avec un nouvel algorithme pour l'animation des pixels.\n3000 grains.",
    requiresConfirmation: false
}

export const APP_SNOW_CUBE_W: Application = {
    category: 'applications',
    application: 'snow-cube-w',
    title: 'Cube à neige (secouer)',
    description: "Cube à neige adapté du code Adafruit. Prototype en cours de dév avec un nouvel algorithme pour l'animation des pixels.\n3000 grains.\nSecouer pour démarrer.",
    requiresConfirmation: false
}

export const APP_SNOW_CUBE_300: Application = {
    category: 'applications',
    application: 'snow-cube-300',
    title: 'Cube à neige (300)',
    description: "300 grains.",
    requiresConfirmation: false
}

export const APP_SNOW_CUBE_ADAFRUIT: Application = {
    category: 'applications',
    application: 'snow-cube-adafruit',
    title: "Cube à neige Adafruit",
    description: "Cube à neige Adafruit original, adapté pour prendre en compte l'emplacement de l'IMU et l'organisation des panneaux.\n3000 grains.",
    requiresConfirmation: false
}

export const APP_RGB_STRIPES: Application = {
    category: 'tests',
    application: 'rgbstripes',
    title: "RGB Stripes",
    description: "",
    requiresConfirmation: false
}

export const APP_IMU: Application = {
    category: 'tests',
    application: 'imu',
    title: "IMU",
    description: "",
    requiresConfirmation: false
}

export const APP_HEALTH: Application = {
    category: 'applications',
    application: 'TODO.sh',
    title: "Health",
    description: "Pas encore disponible.",
    requiresConfirmation: false
}

export const APP_RESTART_WEB: Application = {
    category: 'special',
    application: 'server_restart',
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
    title: 'Redémarrer tout le Cube',
    description: "",
    requiresConfirmation: false,
    code: "424242",
    button_color: 'red',
    button_text: 'Redémarrer tout le Cube'
}
