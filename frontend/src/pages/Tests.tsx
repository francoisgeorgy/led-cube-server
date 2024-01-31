import {Link} from "react-router-dom";
import {APP_RGB_STRIPES} from "../utils/applications.ts";
import {ApplicationButton} from "../components/ApplicationButton.tsx";

/*
export function Tests() {
    return (
        <ApplicationsList category="tests"/>
    );
}
*/

export function Tests() {
    return (
        <div className="flex-1 overflow-auto bg-gray-500 flex flex-col">
            <div className="p-4 border-b border-black text-center">
                <Link to="/imu" className="font-bold text-xl">IMU</Link>
            </div>
            <ApplicationButton application={APP_RGB_STRIPES}/>
            {/*<ApplicationButton application={APP_HEALTH}/>*/}
        </div>
    );
}

