import {useState} from "react";
import {observer} from "mobx-react-lite";
import {Application} from "../utils/interfaces.ts";
import {startApplication} from "../utils/commands.ts";
import {state} from "../State.ts";

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

interface ApplicationButtonProps {
    application: Application;
    formatNameFunc?: (name: string) => string;
}

export const ApplicationButton = observer(({application, formatNameFunc}: ApplicationButtonProps) => {

    const [selected, setSelected] = useState<boolean>(false);

    const toggle = () => {
        // setSpecial(false);
        setSelected(!selected);
    };

    const startApp = async (app: Application) => {
        console.log("startApplication", app);
        if (app.requiresConfirmation) {
            // TODO: implement confirmation dialog
            if (window.confirm(`Launch ${app.title}?`)) {
                console.log(`Launching ${app.title}`);
                // Launch the application
            }
        }
        if (app.code) {
            const c = window.prompt("Code?");
            if (c !== app.code) {
                console.log("invalid code");
                return false;
            }
        }
        console.log(`Launching ${app.title}`);
        // Launch the application
        const b = await startApplication(app.category, app.application);
        // console.log('startScript result:', b);
        if (b) {
            setSelected(false);
        }
    };

    const displayFormattedName = (name: string) => {
        return formatNameFunc ? formatNameFunc(name) : name;
    };

    const button_class = `self-center bg-${application.button_color??'blue'}-500 hover:bg-${application.button_color??'blue'}-700 text-white font-bold py-2 px-4 rounded mt-4`;

    return (
        <div className={`p-4 border-b border-black flex flex-col`}>
            <div className="w-full flex justify-center items-center relative">
                <h3 onClick={() => toggle()} className={` cursor-pointer Xself-center Xw-full text-center font-bold text-xl`}>
                    {displayFormattedName(application.title)}
                </h3>
                {state.isRunning(application) && <div className="absolute right-0 text-yellow-300 text-3xl" title="Application active">☀</div>}
            </div>
            {selected && (
                <>
                    {application.description && <AppDescription description={application.description} className="p-4"/>}
                    <button onClick={() => startApp(application)} className={button_class}>
                        {application.button_text??"Démarrer l'application"}
                    </button>
                </>
            )}
        </div>
    )
});
