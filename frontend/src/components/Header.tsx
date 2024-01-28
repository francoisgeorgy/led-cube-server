import {observer} from "mobx-react-lite";
// import {ServerSelector} from "./ServerSelector.tsx";
import {state} from "../State.ts";
import {Link} from "react-router-dom";
import {ServerSelectorInput} from "./ServerSelectorInput.tsx";

export const Header = observer(() => {

    return (
        <div className="flex space-x-4 justify-between items-center">
            {/*<div className={state.alive ? 'text-yellow-300 font-bold' : 'text-white'}>LED Cube</div>*/}
            <div className={state.alive ?
                "px-4 h-7 flex justify-center items-center text-sky-200 bg-blue-700 font-bold border-1 rounded-lg border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]" :
                "px-4 h-7 flex justify-center items-center text-sky-300 border border-1 rounded-lg border-sky-500"}>
                <Link to="/">LED Cube</Link>
            </div>
            <ServerSelectorInput />
        </div>
    )
});
