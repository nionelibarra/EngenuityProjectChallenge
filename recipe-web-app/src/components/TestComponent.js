import React, { useEffect, useState, useReducer } from "react";
import {Table} from 'react-bootstrap'
import RecipeDataService from "../services/recipes.services";






const RenderingArrayOfObjects=() =>{

    const [recipes, setRecipes] = useState([]);

useEffect(() => {
    const fetchRecipes = async () => {
      const data = await RecipeDataService.getAllRecipes();
      setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    fetchRecipes()
  }, [])


  

    const filtered = recipes.filter(recipe =>
        {
            return recipe.userId === 'bqH07nv3iMP8qAEFYwGpCnYNRii1'
        })
console.log("filtered recipes: ",filtered)


return (
//     <div>
//     {filtered.map(recipe => {
//       return (
//         <div key={recipe.id}>
//           <h2>Recipe: {recipe.ingredient}</h2>
//           <h2>User: {recipe.userId}</h2>

//           <hr />
//         </div>
//       );
//     })}
//   </div>
<Table striped bordered hover size="x-lg">
<thead>
  <tr>
    <th>#</th>
    <th>Ingredients</th>
    <th>User</th>
  </tr>
</thead>
<tbody>
  {filtered.map((doc, index) => {
    return (
      <tr key={doc.id}>
        <td>{index + 1}</td>
        <td>{doc.ingredients}</td>
        <td>{doc.userId}</td>
      </tr>
    );
  })}
</tbody>
</Table>
);

}
function TestSample() {
    return (
        <div className="App">
            <div>
                <h1 style={{ color: 'green' }}>
                    TEST FILTER RECIPES
                </h1>
                <h3>Rendering Array of Objects</h3>
                <br></br>
                <RenderingArrayOfObjects />
            </div>
        </div>
    );
}
  
export default TestSample;