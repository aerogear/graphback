import React, { useState } from 'react';
import { useCreateNoteMutation } from '../../generated-types';

const CreateNote: React.FC = () => {
    const [createNote] = useCreateNoteMutation();
    const [newNoteTitle, setNewNoteTitle] = useState("");
    const [newNoteDescription, setNewNoteDescription] = useState("");

    return(
        <div>
            <fieldset>
                <legend>Create New Note</legend>
                <form onSubmit={e => {
                e.preventDefault();
                createNote({ variables: { title: newNoteTitle, description: newNoteDescription } });
                }}>
                <p>
                    <label htmlFor="title">Title: </label>
                    <input
                    name="title"
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="description">Description: </label>
                    <input
                    name="description"
                    value={newNoteDescription}
                    onChange={(e) => setNewNoteDescription(e.target.value)} />
                </p>
                <input type='submit' />
                </form>
            </fieldset>
        </div>
    );
}

export default CreateNote;