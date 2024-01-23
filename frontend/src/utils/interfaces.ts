
export interface Application {
    category: string;
    start_script: string;     // will be used as key
    stop_script?: string;
    title: string;
    description: string;
    requiresConfirmation: boolean;
    code?: string;
    button_color?: string;
    button_text?: string;
}

export interface Running {
    category: string;
    script: string;
}
