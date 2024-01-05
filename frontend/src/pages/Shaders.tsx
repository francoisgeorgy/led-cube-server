import {ApplicationsList} from "../components/ApplicationsList.tsx";

export function Shaders() {
    return (
        <ApplicationsList category="shaders" formatNameFunc={(name) => name.replace('shader-', '')} />
    );
}
