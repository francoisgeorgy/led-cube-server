import {useEffect, useState} from "react";
import {state} from "../State.ts";
import {observer} from "mobx-react-lite";
import {running, startScript, stopScript} from "../utils/commands.ts";
import {Application} from "../utils/interfaces.ts";

interface AppDescriptionProps {
    description: string;
    className?: string;
}

function AppDescription({ description, className }: AppDescriptionProps) {
  const lines = description.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  return <div className={className}>{lines}</div>;
}

interface ApplicationsListProps {
    category: string;
    formatNameFunc?: (name: string) => string;
}

export const ApplicationsList = observer(({category, formatNameFunc}: ApplicationsListProps) => {

    const [runningStatus, setRunningStatus] = useState('');

    const [selectedApp, setSelectedApp] = useState<string | null>(null);

    const [applications, setApplications] = useState<Application[]>([]);

    const [special, setSpecial] = useState<boolean>(false);

    const fetchRunningStatus = async () => {
        console.log("ApplicationsList.fetchRunningStatus");
        try {
            const response = await fetch(
                `http://${state.cube_address}/api/running`,
                {mode: "cors"}
            );
            const data = await response.json();
            // console.log("fetchRunningStatus: response", response)
            // console.log("fetchRunningStatus: data", data)
            setRunningStatus(data.running);
        } catch (error) {
            console.error('Error fetching running status', error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchRunningStatus();
        }, 1000);
        return () => clearInterval(interval); // This is the clean-up function
    }, []);

    useEffect(() => {

        console.log("ApplicationsList", category);

        fetch(`http://${state.cube_address}/api/applications/${category}`)  // Adjust the URL/port as necessary
            .then(response => response.json())
            .then(data => setApplications(data as Application[]))
            .catch(error => console.error('Error fetching data: ', error));
    }, [state.cube_address]);

    const handleClick = (title: string) => {
        setSpecial(false);
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
            let b = await startScript(category, app.start_script);
            // console.log('startScript result:', b);
            if (b) {
                setSelectedApp(null);
            }
        }
    };

    const toggleSpecial = () => {
        setSelectedApp(null);
        if (!special) {
            running();
        }
        setSpecial(!special);
    };

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
            {/*
            <div className="p-4">
                Top Part of Content
            </div>
            */}
            <div className="flex-1 Xp-4 overflow-auto bg-gray-500">
                {applications.map(app => (
                    <div key={app.start_script} className="p-4 border-b border-black flex flex-col">
                      <h3 onClick={() => handleClick(app.start_script)} className="cursor-pointer self-center font-bold text-xl">{displayFormattedName(app.title)}</h3>
                      {selectedApp === app.start_script && (
                        <>
                            {app.description && <AppDescription description={app.description} className="p-4"/>}
                            <button onClick={() => startApplication(app)}
                                className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Démarrer</button>
                        </>
                      )}
                    </div>
                  ))}
            </div>
            {/*If the main content above does not fill the height, it is possible to put a div at the bottom with : */}
            {runningStatus &&
            <div className="p-4 border-t border-black bg-orange-700 text-center flex justify-between">
                <div>{runningStatus}</div>
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
