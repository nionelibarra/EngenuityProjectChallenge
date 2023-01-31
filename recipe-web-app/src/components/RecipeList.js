import React, { useEffect, useState, useReducer } from "react";
import { Table, Button, Modal, Form, Alert, InputGroup, ButtonGroup } from "react-bootstrap";
import RecipeDataService from "../services/recipes.services";
import { useUserAuth } from "../context/AuthContext";
import './RecipeList.css'

//*************************************************** VARIABLES FOR DISPLAY RECIPE LIST COMPONENT******************************** */
const RecipesList = ({ id }) => {
  //Declared Variables to store Recipe ID numbers
  const [recipeId, setRecipeId] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)


  // Flags to show or close the EDIT RECIPE MODAL
  const [showEditRecipe, setShowEditRecipe] = useState();
  const closeEditRecipe = () => setShowEditRecipe(false);
  const openEditRecipe = () => setShowEditRecipe(true);

  //Flags to show or close the DELETE RECIPE MODAL
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  //Flags to show or close the ADD RECIPE MODAL
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const closeAddRecipe = () => setShowAddRecipe(false);
  const openAddRecipe = () => setShowAddRecipe(true);

  //Declared variables for storing input data from forms
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const { user } = useUserAuth();

  //*********************************************************************************** */


  //*****************************************HANDLER FUNCTIONS FOR EDIT AND DELETE RECIPE LIST START****************************************** */

  const editRecipeHandleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (recipeName === "" || ingredients === "" || instructions === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newRecipe = {
      userId,
      recipeName,
      ingredients,
      instructions,
    };


    try {
      if (recipeId !== undefined && recipeId !== "") {
        await RecipeDataService.updateRecipe(recipeId, newRecipe);
        setRecipeId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }


    setRecipeName("");
    setInstructions("");
    setIngredients("");
    forceUpdate();
    closeEditRecipe();
  };


  //HANDLER TO GET RECIPE ID TO EDIT
  const getRecipeIdHandler = (id) => {
    setRecipeId(id);
    openEditRecipe();
  }

  //HANDLER TO GET RECIPE ID TO DELETE
  const deleteRecipeHandler = (id) => {
    setRecipeId(id);
    handleShowDelete();
  }


  //Handler for obtaining recipe data from database
  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await RecipeDataService.getAllRecipes();
      console.log(data.docs);
      setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    fetchRecipes()
  }, [reducerValue])



  //DELETE HANDLER WHEN WE ARE DELETING RECIPEs
  const deleteHandler = async (id) => {
    try {
      //DELETE LATER
      console.log("Captured Recipe id is: ", id)
      await RecipeDataService.deleteRecipe(id);
      forceUpdate()
      handleCloseDelete();
      setMessage({ error: false, msg: "Deleted successfully!" });
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

  };



  //EDIT HANDLER WHEN WERE EDITING AND UPDATING A RECIPE
  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await RecipeDataService.getRecipe(recipeId);
      setRecipeName(docSnap.data().recipeName);
      setIngredients(docSnap.data().ingredients);
      setInstructions(docSnap.data().instructions);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  //GET RECIPES WHENEVER THE ID CHANGES
  useEffect(() => {
    if (recipeId !== undefined && recipeId !== "") {
      editHandler();
    }
  }, [recipeId]);

  //*****************************************HANDLER FUNCTIONS FOR RECIPE LIST END****************************************** */




  //*****************************************HANDLER FUNCTIONS FOR RECIPE ADD START****************************************** */
  const addRecipeHandleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (recipeName === "" || ingredients === "" || instructions === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newRecipe = {
      userId,
      recipeName,
      ingredients,
      instructions,

    };

    //DELETE LATER
    console.log("New recipe details: ", newRecipe);

    try {
      await RecipeDataService.addRecipes(newRecipe);
      setMessage({ error: false, msg: "New Recipe added successfully!" });
      forceUpdate();

    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }


    setRecipeName("");
    setInstructions("");
    setIngredients("");
    closeAddRecipe();
  };


  //Set USERID FROM AUTHCONTEXT
  useEffect((e) => {
    setUserId(user.uid)
    //DELETE LATER
    console.log("uid saved: ", userId)
  })

  //*****************************************HANDLER FUNCTIONS FOR RECIPE ADD END****************************************** */


  //RENDER COMPONENTS
  return (
    <>

      <h1 class="main-header">Manage Recipes</h1>

      {message?.msg && (
        <Alert
          transition
          variant={message?.error ? "danger" : "success"}
          dismissible
          onClose={() => setMessage("")}
        >
          {message?.msg}
        </Alert>
      )}
      <Button className="add-recipe-button" onClick={() => openAddRecipe()}>Add Recipe</Button>
      <Table striped bordered hover size="x-lg">
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
                    className="edit-button"
                    onClick={(e) => getRecipeIdHandler(doc.id)}

                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete-button"
                    onClick={() => deleteRecipeHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* ***********************************************************MODAL EDIT  COMPONENT********************************************************* */}

      <Modal show={showEditRecipe} onHide={closeEditRecipe}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body><>
          <div className="p-4 box">
            {message?.msg && (
              <Alert
                variant={message?.error ? "danger" : "success"}
                dismissible
                onClose={() => setMessage("")}
                is
              >
                {message?.msg}
              </Alert>
            )}

            {/* INPUT FOR RECIPE NAME */}
            <h3>Recipe Name</h3>
            <Form onSubmit={editRecipeHandleSubmit} id="recipe-form">
              <Form.Group className="mb-3" controlId="formRecipeName">
                <InputGroup>

                  <InputGroup.Text id="formRecipeName"></InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Recipe Name"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              {/* INPUT FOR RECIPE INREDIENTS */}
              <h3>Ingredients</h3>
              <Form.Group className="mb-3" controlId="formIngredients">
                <InputGroup>
                  <InputGroup.Text id="formIngredients"></InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    type="text"
                    placeholder="Ingredients"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              {/* INPUT FOR RECIPE INTSTRUCTIONS */}
              <h3>Instructions</h3>
              <Form.Group className="mb-3" controlId="formInstructions">
                <InputGroup>
                  <InputGroup.Text id="formIngredients"></InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    type="text"
                    placeholder="Instructions e.g Add 5 cups flour....."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          </div>
        </></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditRecipe}>
            Close
          </Button>
          <Button variant="success" type="Submit" form="recipe-form">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      {/* ***********************************************************MODAL DELETE  COMPONENT********************************************************* */}
      <Modal
        show={showDelete}
        onHide={handleCloseDelete}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the "<strong><em>{recipeName}</em></strong>" recipe?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={(e) => deleteHandler(recipeId)}>DELETE</Button>
        </Modal.Footer>
      </Modal>



      {/* ***********************************************************MODAL ADD RECIPE  COMPONENT START********************************************************* */}
      <Modal show={showAddRecipe} onHide={closeAddRecipe}>
        <Modal.Header closeButton>
          <Modal.Title>Add Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body><>
          <div className="p-4 box">

            {message?.msg && (
              <Alert
                transition
                variant={message?.error ? "danger" : "success"}
                dismissible
                onClose={() => setMessage("")}
              >
                {message?.msg}
              </Alert>
            )}
            {/* INPUT FOR RECIPE NAME */}
            <h3>Recipe Name</h3>
            <Form onSubmit={addRecipeHandleSubmit} id="add-recipe-form">
              <Form.Group className="mb-3" controlId="formRecipeName">
                <InputGroup>

                  <InputGroup.Text id="formRecipeName"></InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Recipe Name"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              {/* INPUT FOR RECIPE INREDIENTS */}
              <h3>Ingredients</h3>
              <Form.Group className="mb-3" controlId="formIngredients">
                <InputGroup>
                  <InputGroup.Text id="formIngredients"></InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    type="text"
                    placeholder="Ingredients"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              {/* INPUT FOR RECIPE INTSTRUCTIONS */}
              <h3>Instructions</h3>
              <Form.Group className="mb-3" controlId="formInstructions">
                <InputGroup>
                  <InputGroup.Text id="formIngredients"></InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    type="text"
                    placeholder="Instructions e.g Add 5 cups flour....."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          </div>
        </></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAddRecipe}>
            Close
          </Button>
          <Button variant="success" type="Submit" form="add-recipe-form">
            Add Recipe
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RecipesList;