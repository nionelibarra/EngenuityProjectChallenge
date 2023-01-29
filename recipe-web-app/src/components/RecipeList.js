import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Alert, InputGroup, ButtonGroup } from "react-bootstrap";
import RecipeDataService from "../services/recipes.services";

const RecipesList = ({ id }) => {
  //Declared Variables to store Recipe ID numbers
  const [recipeId, setRecipeId] = useState("");
  const [recipes, setRecipes] = useState([]);


  // Flags to show or close the edit recipe modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // **********************FOR TESTING ONLY DELETE LATER*************************
  const getRecipeIdHandler = (id) => {
    setRecipeId(id);
    //DELETE CONSOLE LOG LATER FOR TESTING ONLY!
    console.log("Raw RECIPE ID: ", id)
  }
  // ***********************************************

  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
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

    //DELETE CONSOLE LOG FOR TESTING ONLY!
    console.log(newRecipe);

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
  };
  
  //HANDLER FOR OBTAINING THE RECIPES FROM THE DATABASE
  const getRecipes = async () => {
    const data = await RecipeDataService.getAllRecipes();
    console.log(data.docs);
    setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };


  //DELETE HANDLER WHEN WE ARE DELETING RECIPEs
  const deleteHandler = async (id) => {
    await RecipeDataService.deleteRecipe(id);
    getRecipes();
  };



  //EDIT HANDLER WHEN WERE EDITING AND UPDATING A RECIPE
  const editHandler = async () => {
    setMessage("");
    //DELETE CONSOLE LOG LATER FOR TESTING  ONLY!
    console.log("ACCESSED EDIT HANDLER")
    try {
      handleShow();//DISPLAY MODAL FIRST
      const docSnap = await RecipeDataService.getRecipe(recipeId);
      //DELETE CONSOLE LOG LATER FOR TESTING  ONLY!
      console.log("the record is :", docSnap.data());
      setRecipeName(docSnap.data().recipeName);
      setIngredients(docSnap.data().ingredients);
      setInstructions(docSnap.data().instructions);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
      //DELETE CONSOLE LOG LATER FOR TESTING  ONLY!
    console.log("PROBLEM")
    }
  };

  //GET RECIPES WHENEVER THE ID CHANGES
  useEffect(() => {
    //REMOVE CONSOLE LOG LATER
    console.log("The id here is : ", recipeId);
    if (recipeId !== undefined && recipeId !== "") {
      editHandler();
    }
  }, [recipeId]);


  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getRecipes}>
          Refresh List
        </Button>
      </div>


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
                    onClick={(e) => getRecipeIdHandler(doc.id)}
                  // onClick={handleShow}
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

      {/* ***********************************************************MODAL EDIT  COMPONENT********************************************************* */}

      <Modal show={show} onHide={handleClose}>
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
              >
                {message?.msg}
              </Alert>
            )}

            {/* INPUT FOR RECIPE NAME */}
            <Form onSubmit={handleSubmit} id="recipe-form">
              <Form.Group className="mb-3" controlId="formRecipeName">
                <InputGroup>
                  <InputGroup.Text id="formRecipeName">A</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Recipe Name"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              {/* INPUT FOR RECIPE INREDIENTS */}
              <Form.Group className="mb-3" controlId="formIngredients">
                <InputGroup>
                  <InputGroup.Text id="formIngredients">B</InputGroup.Text>
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
              <Form.Group className="mb-3" controlId="formInstructions">
                <InputGroup>
                  <InputGroup.Text id="formIngredients">C</InputGroup.Text>
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
              {/* <div className="d-grid gap-2">
                        <Button variant="primary" type="Submit">
                            Update Recipe
                        </Button>
                    </div> */}
            </Form>
          </div>
        </></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" type="Submit" form="recipe-form">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default RecipesList;