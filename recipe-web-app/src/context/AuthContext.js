//Auth Context runs as a service "API" for the application to process functions
//for users to login, logout, sign in, and sign up throughout the whole application

import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const userAuthContext = createContext()


export function UserAuthContextProvider({ children }) {

    const [user, setUser] = useState("")
    const[userUid,setUserUid] =useState("")

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function signIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logOut()
    {
        return signOut(auth)
    }

  
    useEffect((e) => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser)
            {
                setUser(currentUser);
                setUserUid(currentUser.uid);

                console.log("UID saved in Authcontext: ",userUid)
                
            }
            else{
                console.log("No User Available")
            }
            
        });
        return () => {
            unsubscribe();
        }
    
    }, []);

    return (
        <userAuthContext.Provider value={{user, signUp, signIn,logOut,userUid}}>
            {children}
        </userAuthContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(userAuthContext);
}
