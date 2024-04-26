import "./Chat.css";
import { IDContext } from "./Identifiants";
import { useEffect, useState, useContext } from "react";
import { addDoc, collection, serverTimestamp, query, orderBy, limit, onSnapshot} from 'firebase/firestore';
import { dataBase } from "./firebase-config";

export default function Chat() {
   //Les constantes
    const [NouveauMessage, setNouveauMessage] = useState("");
    const Message_collection = collection(dataBase, "Message");
    const [Messages, setMessages] = useState([])
    const { currentUser } = useContext(IDContext);
    //const QueryMessage = Message_collection.orderBy("Heure").limit(10);
    //const LesMessages = query(Message_collection).OrderBy("Heure").limit(10); 
    const QueryMessage = query(Message_collection, orderBy("Heure","desc"), limit(10)); //remplacer la constante par une variable plus tard

    useEffect(() => {
        const effacer = onSnapshot(QueryMessage, (snap) => {
            let temp = [];
            snap.forEach((elem) => {
                temp.push({ ...elem.data(), id: elem.id });
            })
            setMessages(temp);
        });
        return () => effacer(); 
    },[])

    //Les fonctions

       function EcrireLeMessage(event) {
        setNouveauMessage(event.target.value);
    }

    const EnvoyerLeMessage = async (event) => { 
        event.preventDefault();
        if (NouveauMessage === "") {
            return;
        }
        await addDoc(Message_collection, {
            Heure: serverTimestamp(),
            LeMessage: NouveauMessage,
            Nom: currentUser.user.displayName,
            PDP: currentUser.user.photoURL
            
        });
        setNouveauMessage("");
        console.log(currentUser.user.photoURL);
    }

        //retour
    /*return <div>
        <h1>ChatRoom</h1>
        {Messages.slice().reverse().map((afficher) => (<h2>{afficher.Nom}: {afficher.LeMessage}</h2>))}
            <form onSubmit={EnvoyerLeMessage}>
                <input value={NouveauMessage} type='text' placeholder="Ecris un message dans ce canal" onChange={EcrireLeMessage} />
            <button >Envoyer</button>
            </form>
           </div>*/

    return < div className="container">
        <h1>ChatRoom</h1>
        {Messages.slice().reverse().map((afficher) => (
            <div className="message">
                <img src="https://i.kym-cdn.com/entries/icons/original/000/039/022/ddddd.jpg" alt="Profile Picture" className="pdp" />
                <div className="utilisateur">{afficher.Nom}</div>
            <div className="leMessage">{afficher.LeMessage}</div>
        </div>
        ))}
        <div className="message-input">
            <form onSubmit={EnvoyerLeMessage}>
                <input value={NouveauMessage} type="text" placeholder="Type your message..." onChange={EcrireLeMessage} />
                <button>Send</button>
            </form>
        </div>
        </div>
    }