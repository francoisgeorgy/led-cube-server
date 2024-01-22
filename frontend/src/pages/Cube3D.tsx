import VectorDisplay from "../components/VectorDisplay.tsx";

export function Cube3D() {

    let v = {
        "a": -1.0,
        "b": 1.0,
        "c": 1.0
    }

    return (
        <div className="p-4">
            {/*<ApplicationHeader application={APP_COLORS} />*/}
            <VectorDisplay message={JSON.stringify(v)}/>
        </div>
    );
}
