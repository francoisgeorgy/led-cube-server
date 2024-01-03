// import applications from '../applications.json';
import {useEffect, useState} from "react";
import {state} from "../State.ts";
import {observer} from "mobx-react-lite";
import {running, startScript, stopScript} from "../utils/commands.ts";

interface Application {
    script: string;     // will be used as key
    title: string;
    description: string;
    requiresConfirmation: boolean;
}

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

export const ApplicationsList = observer(() => {

    const [selectedApp, setSelectedApp] = useState<string | null>(null);

    const [applications, setApplications] = useState<Application[]>([]);

    const [special, setSpecial] = useState<boolean>(false);

    useEffect(() => {
        fetch(`http://${state.cube_address}/api/applications`)  // Adjust the URL/port as necessary
            .then(response => response.json())
            .then(data => setApplications(data as Application[]))
            .catch(error => console.error('Error fetching data: ', error));
    }, [state.cube_address]);

    const handleClick = (title: string) => {
        setSpecial(false);
        setSelectedApp(selectedApp === title ? null : title);
    };

    const startApplication = (app: Application) => {
        if (app.requiresConfirmation) {
            if (window.confirm(`Launch ${app.title}?`)) {
                console.log(`Launching ${app.title}`);
                // Launch the application
            }
        } else {
            console.log(`Launching ${app.title}`);
            // Launch the application
            startScript(app.script);
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


    return (
        <>
            {/*
            <div className="p-4">
                Top Part of Content
            </div>
            */}
            <div className="flex-1 Xp-4 overflow-auto bg-gray-500">
                {applications.map(app => (
                    <div key={app.script} className="p-4 border-b border-black flex flex-col">
                      <h3 onClick={() => handleClick(app.script)} className="cursor-pointer self-center font-bold text-xl">{app.title}</h3>
                      {selectedApp === app.script && (
                        <>
                            {app.description && <AppDescription description={app.description} className="p-4"/>}
                            <button onClick={() => startApplication(app)}
                                className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Launch App</button>
                        </>
                      )}
                    </div>
                  ))}
            </div>
            {/*If the main content above does not fill the height, it is possible to put a div at the bottom with : */}
            <div className="p-4 border-t border-black bg-orange-700">
                <div className="flex flex-col">
                    <h3 onClick={toggleSpecial} className="cursor-pointer self-center text-xl">Stop {state.running}</h3>
                    {special && (
                        <>
                            <button onClick={() => stopApplication()}
                                    className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Stop</button>
                        </>
                      )}
                </div>
            </div>
            {/*
            <div className="p-4 border-t border-black bg-orange-700">
                <div>Reboot</div>
            </div>
*/}
        </>
    )
});
