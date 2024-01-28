import {APP_SNOW_CUBE, APP_SNOW_CUBE_300, APP_SNOW_CUBE_ADAFRUIT, APP_SNOW_CUBE_W} from "../utils/applications.ts";
import {ApplicationButton} from "../components/ApplicationButton.tsx";

export function Snow() {
    return (
        <div className="flex-1 overflow-auto bg-gray-500 flex flex-col">
            <ApplicationButton application={APP_SNOW_CUBE}/>
            <ApplicationButton application={APP_SNOW_CUBE_W}/>
            <ApplicationButton application={APP_SNOW_CUBE_ADAFRUIT}/>
            <ApplicationButton application={APP_SNOW_CUBE_300}/>
        </div>
    );
}
