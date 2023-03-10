import React, { useEffect, useState} from 'react'
// import { Icon,Button, Card, Grid, Container, Image } from 'semantic-ui-react'
import { Modal, Card, Table, Button, Form, Alert, InputGroup } from "react-bootstrap";
import RecipeDataService from "../services/recipes.services";
import './DisplayRecipes.css'
import { useUserAuth } from "../context/AuthContext";

const DisplayRecipes = () => {
    const [recipeId, setRecipeId] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [recipeName, setRecipeName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
   
    //Handler for obtaining recipe data from database
    useEffect(() => {
        const fetchRecipes = async () => {
            const data = await RecipeDataService.getAllRecipes();
            setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        fetchRecipes()
    }, [])

    //HANDLER TO GET RECIPE ID
    const getRecipeIdHandler = (id) => {
        setRecipeId(id);
        setShowModal(true);
    }

    //HANDLER TO GET DATA TO DISPLAY IN CARD MODAL WHEN WE CLICK ON VIEWING RECIPE 
    const getRecipeDetailHandler = async () => {
        try {
            const docSnap = await RecipeDataService.getRecipe(recipeId);
            setRecipeName(docSnap.data().recipeName);
            setIngredients(docSnap.data().ingredients);
            setInstructions(docSnap.data().instructions);
        } catch (err) {
            console.log("LOADING ERROR:",err);
        }
    };


    //GET RECIPES WHENEVER THE ID CHANGES
    useEffect(() => {
        if (recipeId !== undefined && recipeId !== "") {
            getRecipeDetailHandler();
        }
    }, [recipeId]);

    const renderCards = (recipeData, index) => {
        return (
            <>
                <Card style={{ width: "18rem" }} key={index} className="box-design">
                    <Card.Body>
                        <Card.Title>{recipeData.recipeName}</Card.Title>
                        <Button variant="primary" onClick={(e) => getRecipeIdHandler(recipeData.id)}>View recipe</Button>
                    </Card.Body>
                </Card>

                <Modal
                    size="lg"
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    style={{ display: "flex",
                    justifyContent: "center",
                    alignItems: "center",}}
                >
                    <Modal.Header closeButton>
                        <Modal.Title >
                            <h1>{recipeName}</h1>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>Ingredients:</h3>
                        <p>{ingredients}</p>
                        <hr />
                        <h3>Instructions:</h3>
                        <p>{instructions}</p>
                    </Modal.Body>
                </Modal>
            </>
        )
    }


    return (
        <div className="grid">
            {recipes.map(renderCards)}
        </div>
    )
}
export default DisplayRecipes

