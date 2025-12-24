import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import toast from 'react-hot-toast';
import axios from 'axios';
import './addreview.scss';

const AddReview = () => {
  const [reviewData, setReviewData] = useState({
    name: "",
    rating: "",
    comment: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("YOUR_BACKEND_REVIEW_API_URL_HERE", reviewData);
      console.log(response.data);
      toast.success("Review Added Successfully!");
      setReviewData({ name: "", rating: "", comment: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to add review!");
    }
  };

  return (
    <Container className="mt-5 add-review-container">
      <h2>Add Your Review</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={reviewData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Select
            name="rating"
            value={reviewData.rating}
            onChange={handleChange}
            required
          >
            <option value="">Select Rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            name="comment"
            value={reviewData.comment}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">Add Review</Button>
      </Form>
    </Container>
  );
};

export default AddReview;
