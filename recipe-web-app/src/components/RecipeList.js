import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import RecipeDataService from "../services/recipes.services";

const RecipesList = ({ getRecipeId }) => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const data = await RecipeDataService.getAllRecipes();
    console.log(data.docs);
    setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await RecipeDataService.deleteRecipe(id);
    getRecipes();
  };
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getRecipes}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Recipe</th>
            <th>Ingredients</th>
            <th>Instructions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.recipeName}</td>
                <td>{doc.ingredients}</td>
                <td>{doc.instructions}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getRecipeId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default RecipesList;