import { db } from "../firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const recipeCollectionRef = collection(db,"recipes");

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
        return getDocs(recipeDoc)
    }
}

export default new RecipeDataService();