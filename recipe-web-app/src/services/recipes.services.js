import { db } from "../firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { useUserAuth } from "../context/AuthContext";

const recipeCollectionRef = collection(db,"recipes");
const userInfoCollectionRef = collection(db,"userInfo");



class RecipeDataService
{
    addRecipes = (newRecipe) =>
    {
        return addDoc(recipeCollectionRef, newRecipe);
        
    }

    updateRecipe =(id,updatedRecipe) => 
    {
        const recipeDoc = doc(db,"recipes",id);
        return updateDoc(recipeDoc,updatedRecipe)
    }

    deleteRecipe=(id)=>
    {
        const recipeDoc = doc(db,"recipes",id);
        return deleteDoc(recipeDoc)
    }

    getAllRecipes=()=>
    {
        return getDocs(recipeCollectionRef);
    }

    getRecipe = (id) => 
    {
        const recipeDoc = doc(db,"recipes",id);
        return getDoc(recipeDoc)
    }

    addUserInfo=(newUserInfo)=>
    {
        
        return setDoc(userInfoCollectionRef, newUserInfo);
    }
}

export default new RecipeDataService();