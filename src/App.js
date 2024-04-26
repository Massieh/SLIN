import { useContext } from "react";
import "./App.css";
import Page_Co from "./Page_Co.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { IDContext } from "./Identifiants";
import Home from "./Home";

function App() {


    //const
    const {currentUser} = useContext(IDContext)

    //Fonctions
    function ProtectedRoute({children}) {
        if (!currentUser) {
            return <Navigate to="/SignIn" />
        }
        else {
            return children;
        }
     }
       
    

    return (
        <BrowserRouter>
             <Routes>
                <Route path="/">
                    
                    <Route index element={<ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                        }
                    />
                    <Route path="SignIn" element={<Page_Co />} />
                    <Route path="Chat" element={<Page_Co />} />
                 </Route>
             </Routes>
         </BrowserRouter>
    );

    }


export default App;
