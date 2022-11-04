import React from "react";
import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import MainScreen from "../../components/MainScreen.js";
import ReactMarkdown from "react-markdown";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import './CreateNote.css';
import { useNavigate, useLocation } from "react-router-dom";
import { createNoteAction } from "../../Actions/notesAction.js";
import Loading from "../../components/Loading";
import ErrorComponent from "../../components/ErrorComponent";


const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const noteCreate = useSelector((state) => state.noteCreate);
  //eslint-disable-next-line
  const {loading , error, note} = noteCreate;

  const location = useLocation();
  const Navigate = useNavigate();
  console.log(location.pathname);
  
  
  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if(!title || !content || !category)return;
    dispatch(createNoteAction(title, content, category));

    Navigate(`/mynotes`);
    resetHandler();
  };
  
  return (
    <MainScreen title="Create a Note">
      <Card>
      {error && <ErrorComponent>{error.message}</ErrorComponent>}
        <Card.Header>Create a Note</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId = "title" className="mb-4">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text" 
                value = {title}
                placeholder="Enter the title" 
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId = "content" className="mb-4">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as = "textarea" 
                value = {content}
                placeholder="Enter the Content"
                rows= {4} 
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}
            <Form.Group controlId = "category" className="mb-4">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text" 
                value = {category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50}/>}
            <Button  type="submit"  variant="primary">
                Create Note
            </Button>
            <Button  onClick={resetHandler} variant="danger" className="ms-4 px-3 red-button">
              Reset Fields
            </Button> 
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
              Created on -: {new Date().toLocaleString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default CreateNote;
