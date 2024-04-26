import { useContext } from "react";
import { etatContext } from "./Home.js";
import "./Barre.css";
export default function Barre() {
    //const
    const { setEtat } = useContext(etatContext);
    //F
    function handleClick(n) {
        setEtat(n);
    };
    //return
    return (
        <div className="horizontal-bar">
            <div className="case" onClick={() => handleClick(1)}>
                1
            </div>
            <div className="separator"></div>
            <div className="case" onClick={() => handleClick(2)}>
                2
            </div>
            <div className="separator"></div>
            <div className="case" onClick={() => handleClick(3)}>
                3
            </div>
            <div className="separator"></div>
            <div className="case" onClick={() => handleClick(4)}>
                4
            </div>
        </div>
    );
}