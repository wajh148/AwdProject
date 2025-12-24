import React from 'react'
import Container from "react-bootstrap/Container"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import "./RecipeDetails.scss"
import { useNavigate, useParams } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart, faCircle, faSort, faFilter } from '@fortawesome/free-solid-svg-icons'

const recipes = {
  1: {
    name: "Chicken Biryani",
    image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    time: "60 min",
    serving: "5",
    difficulty: "Medium",
    ingredients: [
      "500g chicken",
      "2 cups basmati rice",
      "1 onion sliced",
      "2 tsp biryani masala",
      "Salt as needed"
    ],
    description: "Spicy and flavorful traditional Pakistani chicken biryani.",
    cook: "Chef Ali",
    stars: 5
  },
  // ... baki recipes same
}

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = recipes[id];
  const navigate = useNavigate(); // ✅ add navigate here

  if(!recipe) return <p>Recipe not found!</p>

  return (
    <>
      <Container>
        <div className="mainDetails">
          <h1>{recipe.name}</h1>

          {/* ⭐ AVG RATING */}
          <p className="d-flex align-items-center gap-1">
            Avg Rating:
            <span className="review mx-1">{recipe.stars}</span>
            <span className="d-flex align-items-center gap-1">
              {[...Array(recipe.stars)].map((_, index) => (
                <FontAwesomeIcon key={index} icon={faStar} className="star" />
              ))}
            </span>
            <span className="mx-2">|</span>
            <span className="review">(2) reviews</span>
            <span className="mx-2">|</span>
            <span className="review">
              Save
              <FontAwesomeIcon icon={faHeart} className="mx-1" style={{ cursor: "pointer" }}/>
            </span>
          </p>

          <h4>Recipe By :- <span className="review">{recipe.cook}</span></h4>

          <div className="midesection d-flex justify-content-between flex-wrap">
            {/* LEFT SIDE */}
            <div>
              <div className="RecipeDetails mt-4">
                <Card style={{ maxWidth: '35rem' }} className="border-0">
                  <Card.Img variant="top" src={recipe.image} style={{objectFit:"cover"}} />
                </Card>

                <Card style={{ maxWidth: '35rem' }} className="mt-2">
                  <Card.Body className="d-flex justify-content-between">
                    <div>
                      <Card.Title>Cooking Time</Card.Title>
                      <p>{recipe.time}</p>
                    </div>
                    <div>
                      <Card.Title>Serving</Card.Title>
                      <p>{recipe.serving}</p>
                    </div>
                    <div>
                      <Card.Title>Difficulty</Card.Title>
                      <p>{recipe.difficulty}</p>
                    </div>
                  </Card.Body>
                </Card>
              </div>

              <div className="Ingredients mt-4">
                <h3>Ingredients</h3>
                {recipe.ingredients.map((item, index) => (
                  <p key={index} className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faCircle} className="circle mx-2" />
                    {item}
                  </p>
                ))}

                <div className="Description mt-3">
                  <h3>Description</h3>
                  <p style={{ maxWidth: "35rem" }}>{recipe.description}</p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="instructions mt-5">
              <span className="d-flex align-items-center">
                <img src={recipe.image} style={{ maxWidth: "50px", marginRight: "5px" }} alt=""/>
                <h3>Cook's Note</h3>
              </span>
              <p>
                Follow the instructions carefully to make {recipe.name}.
              </p>
            </div>
          </div>

          {/* REVIEWS */}
          <div className="reviewdetails mt-4">
            <h2>Reviews (2)</h2>
            {/* ✅ Updated button */}
            <Button variant="primary" onClick={() => navigate("/AddReview")}>
              Add Review
            </Button>

            <div className="user_review mt-3 d-flex justify-content-between">
              <p>
                <FontAwesomeIcon icon={faSort} className="mx-2" />
                Sort
              </p>
              <p>
                <FontAwesomeIcon icon={faFilter} className="mx-2" />
                Filter
              </p>
            </div>

            <div className="final_review" style={{ maxWidth: "33rem" }}>
              <div className="d-flex align-items-center mt-3">
                <img src={recipe.image} style={{ width: "50px", marginRight: "10px", borderRadius: "50%" }} alt=""/>
                <h5>Muniba Fatima</h5>
              </div>

              <div className="mt-2 d-flex align-items-center gap-1">
                {[...Array(recipe.stars)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="star" />
                ))}
                <span className="mx-3" style={{ fontSize: "12px" }}>08/02/2025</span>
              </div>

              <p className="mt-2">Nice recipe!</p>
            </div>
          </div>

        </div>
      </Container>
    </>
  )
}

export default RecipeDetails
