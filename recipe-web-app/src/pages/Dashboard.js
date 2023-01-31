import React from 'react'
import NavigationBar from '../components/Navbar'
import RecipesList from '../components/RecipeList'
import './Dashboard.css'


export const Dashboard = () => {

    return (
    <div>
        <div class="navigation-bar">
            <NavigationBar/>
        </div>
        <div>
           <RecipesList/>
        </div>

    </div>
    )
}
