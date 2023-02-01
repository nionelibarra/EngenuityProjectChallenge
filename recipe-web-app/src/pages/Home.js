//The Home page only renders the Navigation bar and the RecipesList Component

import React, { useEffect, useState } from 'react'
import NavigationBar from '../components/Navbar'
import DisplayRecipes from '../components/DisplayRecipes'


export const Home = () => {
  
  return (
    <div >
      <div class="navigation-bar"><NavigationBar /></div>
      <div><DisplayRecipes/></div>
    </div>
  )
}
