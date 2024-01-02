import {observer} from "mobx-react-lite";
// import {Port} from "./Port.tsx";
import {ServerSelector} from "./ServerSelector.tsx";

// function validateIpAddress(addr: string) {
//     return /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(addr);
// }

export const Header = observer(() => {

    // function handleIpChange(e: React.FormEvent<HTMLInputElement>) {
    //     const v = e.currentTarget.value;
    //     state.setCubeIpAddress(v);
    // }

    return (
        <div className="flex space-x-4 justify-between">
            <div>LED Cube</div>
            <ServerSelector />
        </div>
    )
});
