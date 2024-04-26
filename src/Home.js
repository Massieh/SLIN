import Barre from "./Barre.js";
import Chat from "./Chat.js";
import Page_Co from "./Page_Co.js";
import Defi from "./Defi.js"
import Liste_MP from "./Liste_MP.js"
import { useState, createContext } from "react";

export const etatContext = createContext();
export default function Home() {
    //const
    const [etat, setEtat] = useState(1);
    let principal = <Chat />;

    switch (etat) {
        case 2:
            principal = <Defi />
            break;
        case 3:
            principal = <Chat />;
            break;
        case 4:
            principal = <Liste_MP/>;
            break;
        default:
            break;
    }
    //F

    //return
    return (<div>
        {principal}
        <etatContext.Provider value={{ setEtat }}>
            <Barre />
            </etatContext.Provider>
    </div>);
}