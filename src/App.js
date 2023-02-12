import "./App.css";
import { Crud } from "./components/Crud";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    
    

    const handleChange = (e) => {
        setNewNote(e.target.value);
    };
    async function postData() {
        const response = await fetch("http://localhost:7777/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: uuidv4(),
                content: newNote,
            }),
        });
        if (!response.ok) {
            throw new Error('Network post response was not ok');
          }
        fetchData();
    }
    async function fetchData() {
        const response = await fetch("http://localhost:7777/notes");
        //console.log(response)
        const json = await response.json();
        //console.log(json)

        setNotes(json);
    }
    const handleClick = (e) => {
        e.preventDefault();
        postData();
        setNewNote("");
    };
    async function handleDelete(e) {
        const response = await fetch(`http://localhost:7777/notes/${e.target.id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network delete response was not ok');
        }
        fetchData();
    }
   
    
    useEffect(() => {
        fetchData();
    },[]);
    return (
        <div className="App">
            <button className="update-button" onClick={fetchData}>click to update</button>
            <Crud notes={notes} handleDelete={handleDelete} />
            <form className="new-note-form">
                <textarea
                    onChange={handleChange}
                    value={newNote}
                    placeholder="type something"
                    className="new-note-input"
                ></textarea>
                <button className="addNote" onClick={handleClick}>add note</button>
            </form>
        </div>
    );
}

export default App;
