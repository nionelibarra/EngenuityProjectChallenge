//The Dashboard page only renders the Navigation bar and the RecipesList Component

import React from 'react'
import NavigationBar from '../components/Navbar'
import RecipesList from '../components/RecipeList'
import './AdminDashboard.css'
import AdminRecipesList from '../components/AdminRecipeList'


export const AdminDashboard = () => {

    return (
    <div>
        <div class="navigation-bar">
            <NavigationBar/>
        </div>
        <div>
           <AdminRecipesList/>
        </div>

    </div>
    )
}
