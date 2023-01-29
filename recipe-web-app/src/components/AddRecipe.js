import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import RecipeDataService from "../services/recipes.services";

const AddRecipe = ({ id, setRecipeId }) => {
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
            if (id !== undefined && id !== "") {
                await RecipeDataService.updateRecipe(id, newRecipe);
                setRecipeId("");
                setMessage({ error: false, msg: "Updated successfully!" });
            } else {
                await RecipeDataService.addRecipes(newRecipe);
                setMessage({ error: false, msg: "New Recipe added successfully!" });
            }
        } catch (err) {
            setMessage({ error: true, msg: err.message });
        }


        setRecipeName("");
        setInstructions("");
        setIngredients("");
    };

    const editHandler = async () => {
        setMessage("");
        try {
            const docSnap = await RecipeDataService.getRecipe(id);
            console.log("the record is :", docSnap.data());
            setRecipeName(docSnap.data().recipeName);
            setIngredients(docSnap.data().ingredients);
            setInstructions(docSnap.data().instructions);
        } catch (err) {
            setMessage({ error: true, msg: err.message });
        }
    };

    useEffect(() => {
        console.log("The id here is : ", id);
        if (id !== undefined && id !== "") {
            editHandler();
        }
    }, [id]);
    return (
        <>
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
                <Form onSubmit={handleSubmit}>
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
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="Submit">
                            Add/Update
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default AddRecipe;