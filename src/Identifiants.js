import { createContext,useState, useEffect} from "react";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export const IDContext = createContext();

export function IDContextProvider({children}) {
	const [currentUser, setCurrentUser] = useState();
	useEffect(() => {
		const effacer = onAuthStateChanged (auth, (user) => {
			setCurrentUser(user);
		})
		return effacer();
	}, []);
	return (
		< IDContext.Provider value={{ currentUser, setCurrentUser}}>
			{children}
		</IDContext.Provider>);
};

