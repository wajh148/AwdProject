import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import toast from 'react-hot-toast'
import axios from 'axios' // ✅ Add Axios
import './CreateRecipe.scss';

const CreateRecipe = () => {
  const [recipeData, setRecipeData] = useState({
    name: "",
    description: "",
    ingredients: "",
    time: "",
    serving: "",
    difficulty: "",
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if(name === "image") {
      setRecipeData({...recipeData, image: files[0]});
    } else {
      setRecipeData({...recipeData, [name]: value});
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", recipeData.name);
      formData.append("description", recipeData.description);
      formData.append("ingredients", recipeData.ingredients);
      formData.append("time", recipeData.time);
      formData.append("serving", recipeData.serving);
      formData.append("difficulty", recipeData.difficulty);
      if(recipeData.image) {
        formData.append("image", recipeData.image);
      }

      // ✅ Axios POST request
      const response = await axios.post("YOUR_BACKEND_API_URL_HERE", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      console.log(response.data);
      toast.success("Recipe Uploaded Successfully!");
      
      // Agar chaho to form reset bhi kar sakte ho
      setRecipeData({
        name: "",
        description: "",
        ingredients: "",
        time: "",
        serving: "",
        difficulty: "",
        image: null
      });

    } catch (error) {
      console.error(error);
      toast.error("Failed to upload recipe!");
    }
  }

  return (
    <Container className="mt-5">
      <h1>Create New Recipe</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Recipe Name</Form.Label>
          <Form.Control type="text" name="name" value={recipeData.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" value={recipeData.description} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ingredients (comma separated)</Form.Label>
          <Form.Control type="text" name="ingredients" value={recipeData.ingredients} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cooking Time</Form.Label>
          <Form.Control type="text" name="time" value={recipeData.time} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Serving</Form.Label>
          <Form.Control type="text" name="serving" value={recipeData.serving} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Difficulty</Form.Label>
          <Form.Select name="difficulty" value={recipeData.difficulty} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" name="image" onChange={handleChange} />
        </Form.Group>

        <Button type="submit" variant="success">Upload Recipe</Button>
      </Form>
    </Container>
  )
}

export default CreateRecipe
