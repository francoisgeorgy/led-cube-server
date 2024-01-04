import {ApplicationsList} from "./ApplicationsList.tsx";

export function Shaders() {
    return (
        <ApplicationsList category="shaders" formatNameFunc={(name) => name.replace('shader-', '')} />
    );
}
