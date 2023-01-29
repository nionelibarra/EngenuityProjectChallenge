import React, { useState } from 'react'
import NavigationBar from '../components/Navbar'
import AddRecipe from '../components/AddRecipe'
import { Container, Row } from 'react-bootstrap'
import RecipesList from '../components/RecipeList'
import './Dashboard.css'


export const Dashboard = () => {

    const [recipeId,setRecipeId] = useState("");

    const  getRecipeIdHandler = (id) =>
{
    //DELETE CONSOLE LOG LATER FOR TESTING ONLY!
    console.log("The ID of the Recipe to be edited is: ", id)
    setRecipeId(id);
}
    return (
    <div>
        <div class="navigation-bar">
            <NavigationBar/>
        </div>
        <div>
            <AddRecipe/>
        </div>
        <div>
           <RecipesList getRecipeId={getRecipeIdHandler}/>
        </div>

    </div>
    )
}
