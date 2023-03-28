import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper } from "../../../declarations/dkeeper";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(()=>{
    console.log("useEffect is triggered");
    getNotes();
  },
  []
  );

  async function getNotes(){
    const loadNote=await dkeeper.getNote();
    console.log(loadNote);
    setNotes(loadNote);
  }

  function addNote(newNote) {
    dkeeper.createNote(newNote.title,newNote.content);
    setNotes(prevNotes => {
      return [ newNote,...prevNotes];
    });
  }

  async function deleteNote(id) {
    await dkeeper.deletNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
