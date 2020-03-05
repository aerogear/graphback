import React, { useState } from 'react';
import { useUpdateNoteMutation } from '../../generated-types';

type noteProps = {
    id:string
    title: string,
    description: string,
    editState:any
  }


const EditNote = ({id, title, description,editState }: noteProps) => {
    const [updateNote] = useUpdateNoteMutation();
    const [NoteTitle, setNoteTitle] = useState(title);
    const [NoteDescription, setNoteDescription] = useState(description);


    return(
        <div>
            <fieldset>
                <legend>Edit Note</legend>
                <form onSubmit={e => {
                e.preventDefault();
                updateNote({ variables: {id:id, title: NoteTitle, description: NoteDescription } });
                editState(false);
                }}>
                <p>
                    <label htmlFor="title">Title: </label>
                    <input
                    name="title"
                    value={NoteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="description">Description: </label>
                    <input
                    name="description"
                    value={NoteDescription}
                    onChange={(e) => setNoteDescription(e.target.value)} />
                </p>
                <input type='submit' />
                </form>
            </fieldset>
        </div>
    );
}

export default EditNote;