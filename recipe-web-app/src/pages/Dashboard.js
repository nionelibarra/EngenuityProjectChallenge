import React, { useState } from 'react'
import NavigationBar from '../components/Navbar'
import AddRecipe from '../components/AddRecipe'
import { Container, Row } from 'react-bootstrap'
import RecipesList from '../components/RecipeList'
import './Dashboard.css'


export const Dashboard = () => {

    return (
    <div>
        <div class="navigation-bar">
            <NavigationBar/>
        </div>
        <div>
            <AddRecipe/>
        </div>
        <div>
           <RecipesList/>
        </div>

    </div>
    )
}
