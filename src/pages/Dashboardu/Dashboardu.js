import React, { useState } from 'react'
import Container from "react-bootstrap/Container"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import "./dashboard.scss"

const Dashboard = () => {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // ✅ Recipe data as an array
  const recipes = [
    {id:1, title:"Chicken Biryani", description:"Delicious traditional biryani", img:"https://bing.com/th?id=OSK.833084f6a416f2e137a4bdc1004423a1"},
    {id:2, title:"Chicken Karahi", description:"Spicy desi chicken karahi", img:"https://bing.com/th?id=OSK.c97401d24ecc100c1c322500c4aac3e4"},
    {id:3, title:"Beef Nihari", description:"Rich slow cooked nihari", img:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Mutton_Nihari.jpg/500px-Mutton_Nihari.jpg"},
    {id:4, title:"Haleem", description:"Hearty Pakistani haleem", img:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bangladeshi_style_Shahi_Haleem.jpg/500px-Bangladeshi_style_Shahi_Haleem.jpg"},
    {id:5, title:"Chicken Pulao", description:"Fragrant tasty pulao", img:"https://th.bing.com/th/id/R.719d2ebc7adce1b48bde90153c17d4c2?rik=eNO6VCfBkn46wA&riu=http%3a%2f%2f2.bp.blogspot.com%2f-zDkFPJ2E7ow%2fUQ0E02ybDlI%2fAAAAAAAAHf4%2f1pF-0uo-QzA%2fs1600%2fIMG_4214.JPG&ehk=jYmtkQrwAl1J8%2bN7GLNEtpoYF1%2f%2bhXE7LDgnbVTuqaY%3d&risl=&pid=ImgRaw&r=0"},
    {id:6, title:"Chapli Kabab", description:"Pashtun style chapli kabab", img:"https://tse3.mm.bing.net/th/id/OIP.E7uvU7LtaKQddqMQSMi7PwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"},
    {id:7, title:"Seekh Kabab", description:"Grilled spicy seekh kabab", img:"https://www.teaforturmeric.com/wp-content/uploads/2018/10/Seekh-Kebab-4.jpg"},
  ];

  const handleNavigateRecipe = (id) => {
    navigate(`/RecipeDetails/${id}`)
  }

  // ✅ Filter recipes based on search
  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <h1 className="text-center mt-5">Recipe</h1>

      <section className="mx-auto">
        {/* search section */}
        <div className="d-flex justify-content-end mb-4">
          <Form className='mx-auto' style={{ maxWidth: "340px", width: "100%" }}>
            <Form.Group className="mb-3" style={{ position: "relative" }}>
              <Form.Control 
                type="text" 
                placeholder="Search Recipe" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <div 
                  style={{ position: "absolute", right: "6px", top: "8px", cursor: "pointer" }}
                  onClick={() => setSearch("")}
                >
                  <FontAwesomeIcon icon={faCircleXmark} />
                </div>
              )}
            </Form.Group>
          </Form>
        </div>

        {/* recipe cards */}
        <div className="recipecard d-flex justify-content-between flex-wrap align-items-start" style={{ gap: "15px" }}>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map(recipe => (
              <Card 
                key={recipe.id} 
                style={{ maxWidth:'21rem', width:"32%", height:"27rem", boxShadow:"0px 2px 20px #cfd8dc", cursor:"pointer" }}
              >
                <Card.Img style={{width:"100%", height:"13rem", objectFit:"cover"}} variant="top" 
                  src={recipe.img} 
                />
                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                  <Card.Text>{recipe.description}</Card.Text>
                  <Button variant="outline-danger" onClick={()=>handleNavigateRecipe(recipe.id)}>View Recipe</Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p className="text-center mt-5" style={{width:"100%"}}>No recipes found.</p>
          )}
        </div>
      </section>
    </Container>
  )
}

export default Dashboard;
