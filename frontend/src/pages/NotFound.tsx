import {Link} from "react-router-dom";

export function NotFound() {
    return (
        <div className="p-4">
            <h2>Aucun contenu à cette adresse.</h2>
            <p>
                <Link to="/">Retour à l'accueil</Link>
            </p>
        </div>
    );
}
