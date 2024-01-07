import {useEffect, useState} from "react";
import {state} from "../State.ts";
import {observer} from "mobx-react-lite";
import {startScript, stopScript} from "../utils/commands.ts";
import {Application} from "../utils/interfaces.ts";

interface AppDescriptionProps {
    description: string;
    className?: string;
}

function AppDescription({description, className}: AppDescriptionProps) {
    const lines = description.split('\n').map((line, index) => (
        <span key={index}>{line}<br/></span>
    ));
    return <div className={className}>{lines}</div>;
}

interface ApplicationsListProps {
    category: string;
    formatNameFunc?: (name: string) => string;
}

export const ApplicationsList = observer(({category, formatNameFunc}: ApplicationsListProps) => {

    const [selectedApp, setSelectedApp] = useState<string | null>(null);

    const [applications, setApplications] = useState<Application[]>([]);

    // const [special, setSpecial] = useState<boolean>(false);

    useEffect(() => {
        console.log("ApplicationsList", category);
        fetch(`http://${state.cube_host}:${state.port_http}/api/applications/${category}`)
            .then(response => response.json())
            .then(data => setApplications(data as Application[]))
            .catch(error => console.error('Error fetching data: ', error));
    }, [state.cube_host, state.port_http]);

    const handleClick = (title: string) => {
        // setSpecial(false);
        setSelectedApp(selectedApp === title ? null : title);
    };

    const startApplication = async (app: Application) => {
        if (app.requiresConfirmation) {
            if (window.confirm(`Launch ${app.title}?`)) {
                console.log(`Launching ${app.title}`);
                // Launch the application
            }
        } else {
            console.log(`Launching ${app.title}`);
            // Launch the application
            const b = await startScript(category, app.start_script);
            // console.log('startScript result:', b);
            if (b) {
                setSelectedApp(null);
            }
        }
    };

/*
    const toggleSpecial = () => {
        setSelectedApp(null);
        if (!special) {
            running();
        }
        setSpecial(!special);
    };
*/

    const stopApplication = () => {
        // if (app.requiresConfirmation) {
        //     if (window.confirm(`Launch ${app.title}?`)) {
        //         console.log(`Launching ${app.title}`);
        //         // Launch the application
        //     }
        // } else {
        //     console.log(`Launching ${app.title}`);
        // Launch the application
        stopScript();
        // }
    };

    const displayFormattedName = (name: string) => {
        return formatNameFunc ? formatNameFunc(name) : name;
    };

    return (
        <>
            <div className="flex-1 Xp-4 overflow-auto bg-gray-500">
                {applications.map(app => (
                    <div key={app.start_script} className="p-4 border-b border-black flex flex-col">
                        <h3 onClick={() => handleClick(app.start_script)}
                            className="cursor-pointer self-center font-bold text-xl">{displayFormattedName(app.title)}</h3>
                        {selectedApp === app.start_script && (
                            <>
                                {app.description && <AppDescription description={app.description} className="p-4"/>}
                                <button onClick={() => startApplication(app)}
                                        className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Démarrer
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
            {state.running &&
            <div className="p-4 border-t border-black bg-orange-700 text-center flex justify-between">
                <div>{state.running}</div>
                <button onClick={() => stopApplication()}
                        className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Stopper
                </button>
            </div>}
            {/*
            <div className="flex flex-col">
                <h3 onClick={toggleSpecial} className="cursor-pointer self-center text-xl">Stop {state.running}</h3>
                {special && (
                    <>
                    </>
                )}
            </div>
            */}
            {/*
            <div className="p-4 border-t border-black bg-orange-700">
                <div>Reboot</div>
            </div>
            */}
        </>
    )
});
