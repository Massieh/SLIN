import { useState } from "react";
import "./Liste_MP.css";
import { dataBase } from "./firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore"
export default function Liste_MP() {
    const [cherche, setCherche] = useState("");
    const [user, setUser] = useState("");

    function EcrireLePseudo(event) {
        setCherche(event.target.value);
    }

    async function Recherche(event) {
        const QueryUtilisateurs = query(collection(dataBase, "utilisateurs"), where("Nom", "==", cherche));
        try {
            const querySnapshot = await getDocs(QueryUtilisateurs);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            })
            if (querySnapshot.size === 0) {
                alert("Pas d'utilisateur");
            }
            else {
                console.log(user);
            }
        }
        catch (err) {
            alert(err);
        }
    }

    function handleKey(event) {
        event.code === "Enter" && Recherche();
    }
    return (
        <div>
            <input type="text" placeholder="Your friend's username..." onChange={EcrireLePseudo} onKeyDown={handleKey} value={cherche} />
            <h1>Utilisateur</h1>
            <img src={user.Pdp} alt="la pdp de l'utilisateur" />
            <span>{user.Nom}</span>

        </div>
        )
}
