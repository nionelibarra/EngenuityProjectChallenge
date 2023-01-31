//Auth Context allows 1 user login data to be distributed 
//throughout the whole app until user logs out

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
                //DELETE LATER
                console.log("User details is: ",currentUser);
                console.log("User ID in Auth Context is: ",currentUser.uid);
                setUserUid(currentUser.uid)
                console.log("value savedin userUid variable in auth context: ", userUid)
            }
            else{
                //DELETE LATER
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
