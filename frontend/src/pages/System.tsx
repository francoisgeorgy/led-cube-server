export function System() {
    return (
        <div className="flex-1 overflow-auto bg-gray-500 flex flex-col">
            <div className="p-4 border-b border-black text-center">
                <h3 className="font-bold text-xl">Redémarrer le serveur</h3>
                <button
                        className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Démarrer
                </button>
            </div>
            <div className="p-4 border-b border-black text-center">
                <h3 className="font-bold text-xl">Redémarrer le Cube</h3>
                <button
                        className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Démarrer
                </button>
            </div>
        </div>
    );
    // return (
        // <ApplicationsList category="system"/>
    // );
}
