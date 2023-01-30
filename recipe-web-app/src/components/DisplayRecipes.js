import React, { useEffect, useState, useReducer } from 'react'
// import { Icon,Button, Card, Grid, Container, Image } from 'semantic-ui-react'
import { Modal, Card, Table, Button, Form, Alert, InputGroup } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import RecipeDataService from "../services/recipes.services";
import './DisplayRecipes.css'

const DisplayRecipes = () => {
    const [recipeId, setRecipeId] = useState("");
    const [recipes, setRecipes] = useState([])

    const [reducerValue, setReducerValue] = useReducer(x => x + 1, 0)
    const [showModal, setShowModal] = useState(false)

    const [recipeName, setRecipeName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [userId, setUserId] = useState("");
    const [message, setMessage] = useState({ error: false, msg: "" });

    //Handler for obtaining recipe data from database
    useEffect(() => {
        const fetchRecipes = async () => {
            const data = await RecipeDataService.getAllRecipes();
            console.log(data.docs);
            setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        fetchRecipes()
    }, [reducerValue])

    //HANDLER TO GET RECIPE ID
    const getRecipeIdHandler = (id) => {
        setRecipeId(id);
        setShowModal(true);
    }

    //HANDLER TO GET DATA TO DISPLAY IN CARD MODAL WHEN WE CLICK ON VIEWING RECIPE 
    const getRecipeDetailHandler = async () => {
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
            getRecipeDetailHandler();
        }
    }, [recipeId]);

    const renderCards = (recipeData, index) => {
        return (
            <>
                <Card style={{ width: "18rem" }} key={index} className="box-design">
                    <Card.Body>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Title>{recipeData.recipeName}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Author</Card.Subtitle>
                        <Card.Text>PUT NAME OF USER HERE!!</Card.Text>
                        <Button variant="primary" onClick={(e) => getRecipeIdHandler(recipeData.id)}>View recipe</Button>
                        {/* <Card.Text>{recipeData.name}</Card.Text>
                    <Card.Header>ingredients</Card.Header>
                    <Card.Text>{recipeData.ingredients}</Card.Text>
                    <Card.Header>Instructions</Card.Header>
                    <Card.Text>{recipeData.instructions}</Card.Text> */}
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

