import "./Page_Co.css";
import { useState } from "react";
import { auth, dataBase } from "./firebase-config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { IDContext } from "./Identifiants";
export default function Page_Co() {
    //Constantes
    const [CurrentMail, SetCurrentMail] = useState("");
    const [CurrentMDP, SetCurrentMDP] = useState("");
    const [CurrentPseudo, SetCurrentPseudo] = useState("");
    const [CurrentPDP, SetCurrentPDP] = useState(""); //Penser à ajouter une vérification pour la pdp
    const [SignIn, SetSignIn] = useState(true);
    const { setCurrentUser } = useContext(IDContext);
    const navigate = useNavigate();
    //Fonctions
    function EcrireLeMDP(event) {
        SetCurrentMDP(event.target.value);
    }
    function EcrirePDP(event) {
        SetCurrentPDP(event.target.value);
    }
    function EcrireLeMail(event) {
        SetCurrentMail(event.target.value);
    }
    function EcrireLePseudo(event) {
        SetCurrentPseudo(event.target.value);
    }
    function NouveauCompte() {
        SetSignIn(!SignIn);
        SetCurrentMail("");
        SetCurrentMDP("");
        SetCurrentPDP("");
        SetCurrentPseudo("");
    }

    function Connecter(event) {
        event.preventDefault();
        signInWithEmailAndPassword(auth, CurrentMail, CurrentMDP)
            .then((userCredential) => {
                console.log(userCredential);
                setCurrentUser(userCredential);
                return (navigate("/"));
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    /*function Inscrire(event) {
        event.preventDefault();
        const creation = createUserWithEmailAndPassword(auth, CurrentMail, CurrentMDP)
            .then((userCredential) => {
                setDoc(doc(dataBase, "utilisateurs", userCredential.user.uid),{
                    Nom: CurrentPseudo,
                    Pdp: "https://us-tuna-sounds-images.voicemod.net/b3271e36-7263-442a-9785-be3e4a16ba7e-1708972891086.png"
                })
                updateCurrentUser(creation.user,{
                    displayName: CurrentPseudo,
                    photoURL: CurrentPDP,
                })
                    ;
                    alert("Account successfully created");
                NouveauCompte();
            })
            .catch((error) => {
                alert(error.message);
            });

    }*/

    function Inscrire(event) {
        event.preventDefault();

        createUserWithEmailAndPassword(auth, CurrentMail, CurrentMDP)
            .then((userCredential) => {
                const user = userCredential.user;

                const profileUpdates = {
                    displayName: CurrentPseudo,
                    photoURL: CurrentPDP,
                };

                return updateProfile(user, profileUpdates);
            })
            .then(() => {
                const user = auth.currentUser;
                const userId = user.uid;

                const userDocRef = doc(dataBase, "utilisateurs", userId);
                const userDocData = {
                    Nom: CurrentPseudo,
                    Pdp:"https://i.kym-cdn.com/entries/icons/original/000/039/022/ddddd.jpg",
                    Mail: CurrentMail,
                    ID: userId
                };
                return setDoc(userDocRef, userDocData);
            })
            .then(() => {
                const user = auth.currentUser;
                const userId = user.uid;

                const userDocRef = doc(dataBase, "amis", userId);
                const userDocData = {
                };
                return setDoc(userDocRef, userDocData);
            })
            .then(() => {
                alert("Compte créé avec succès");
                NouveauCompte();
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    //Affichage
    if (SignIn) {
        return (
            <div className="container">
                <h1>SLIN</h1>
                <form onSubmit={Connecter}>
                    <div className="form-group">
                        <label>Email Adress</label>
                        <input value={CurrentMail} placeholder="Enter your email" onChange={EcrireLeMail} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input value={CurrentMDP} type="password" placeholder="Enter your password" onChange={EcrireLeMDP} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Sign In" />
                    </div>
                </form>
                <a className="signup-link" onClick={NouveauCompte}>No account yet ? Sign up !</a>
            </div>);
        /*return (
            <div className="App">
                <img className="logo" src="../Images/fakeit.png" alt="Logo" />

      <div className="container">
        <input className="input" type="text" placeholder="Email" />
        <input className="input" type="password" placeholder="Password" />
        <button className="button">Login</button>
      </div>

      <div className="space" />

      <a className="forgot-password">Forgot Password ?</a>
      <a className="signup-link">No account yet ? Sign up !</a>
    </div>
            );*/

    }
    else {
        return (
            <div className="container">
                <h1>NEW ACCOUNT INFORMATION</h1>
                <form onSubmit={Inscrire}>
                <div className="form-group">
                    <label>Email Adress</label>
                    <input value={CurrentMail} placeholder="Enter your email" onChange={EcrireLeMail} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input value={CurrentMDP} type="password" placeholder="Enter your password" onChange={EcrireLeMDP} />
                </div>
                    <div class="form-group">
                        <label>Pseudo</label>
                        <input value={CurrentPseudo} placeholder="Enter your Name" onChange={EcrireLePseudo} />
                    </div>
                <div className="form-group">
                    <input type="submit" value="Sign Up" />
                </div>
                    <a className="signup-link" onClick={NouveauCompte}>Take me back !</a>
                </form>
                </div>
            );
    }
}