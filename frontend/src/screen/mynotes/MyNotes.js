import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import './Mynotes.css';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../Actions/notesAction";
import {useNavigate} from "react-router-dom";
// import Loading from '../screen/components/Loading';
import Loading from "../../components/Loading";
import ErrorComponent  from '../../components/ErrorComponent';
import ReactMarkdown from "react-markdown";
 
const MyNotes = ({search}) => {
  const dispatch = useDispatch();
  const noteList = useSelector(state => state.noteList);
  const history = useNavigate();

  const {loading, notes, error} = noteList;
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;
  // const [notes, setNotes] = useState([]);

  const deleteNote = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      dispatch(deleteNoteAction(id));
    }
  };

  //const dispatch = useDispatch();
  const noteCreate = useSelector((state) => state.noteCreate);
  const {success : successCreate} = noteCreate;
  
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success : successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {loading: loadingDelete, error : errorDelete, success : successDelete} = noteDelete;
  
  useEffect(() => { 
      dispatch(listNotes());
      if(!userInfo){
        history("/")
      }
  },[dispatch, successCreate, userInfo, history, successUpdate, successDelete, search]);

  // const history = useNavigate();
  // const pathHandler = () =>{
  //   history("/createnote")
  // }

  return (
    <MainScreen title={`Welcome back ${userInfo && userInfo.name}...`}>
      <Link to="/createnote">
        <Button className="btn btn-primary" size="sm">
          create Note
        </Button>
      </Link>
      {error && <ErrorComponent variant="danger">{error}</ErrorComponent>}
      {errorDelete && (<ErrorComponent>{errorDelete}</ErrorComponent>)} 
      {loading && <Loading />}
      {loadingDelete && <Loading/>}
      {notes?.reverse().filter(filteredNotes => filteredNotes.title.toLowerCase().includes(search.toLowerCase())).map((note) => (
            <Card key={note._id} style={{ margin: "10px" }}>
              <Card.Header className="d-flex align-items-center justify-content-between">
                <span style={{ color: "black", fontSize: "20px" }}>
                  {note.title}
                </span>
                <div>
                  <Button
                    href={`/note/${note._id}`}
                    className="btn btn-primary"
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button
                    className="btn btn-danger mx-3"
                    size="sm"
                    onClick={() => deleteNote(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              <Accordion style={{ margin: "10px"}}>
              <Accordion.Header>Click to expand</Accordion.Header>
              <Accordion.Body>
              <Card.Body>
                <h6>
                  <Badge>{note.category}</Badge>
                </h6>
                <blockquote className="blockquote mb-0">
                <ReactMarkdown>
                  {note.content}
                </ReactMarkdown>
                  <footer className="blockquote-footer">
                  Created At 
                    <cite title="Source Title">
                      {` ` + note.createdAt.substring(0 , 10)}
                    </cite>
                  </footer>
                </blockquote>
              </Card.Body>
              </Accordion.Body>
              </Accordion>
            </Card>
      ))}
    </MainScreen>
  );
};

export default MyNotes;
