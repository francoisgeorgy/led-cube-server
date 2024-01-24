import {observer} from "mobx-react-lite";
import {state} from "../State.ts";
import {stopApplication} from "../utils/commands.ts";


export const Footer = observer(() => {

    if (state.running) {
        const n = state.running.application.replace('_start', '').replace('.sh', '');
        return (
            <div className="flex justify-between">
                <div>
                    <span className="text-gray-400">Application active :</span><br/>
                        {state.running.category} / {n}
                </div>
                <button className="self-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => stopApplication(state.running?.category, state.running?.application)}>Stopper</button>
            </div>
        )
    } else {
        return null;
    }

});
