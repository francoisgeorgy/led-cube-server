
export interface Application {
    start_script: string;     // will be used as key
    stop_script?: string;
    title: string;
    description: string;
    requiresConfirmation: boolean;
}
