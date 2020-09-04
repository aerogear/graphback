import React, { useState } from 'react';
import { useUpdateNoteMutation } from '../../generated-types';
import { Button, TextField, Card } from '@material-ui/core';
import './Note.css';

type noteProps = {
    _id: string
    title: string,
    description: string | undefined,
    editState: any
}

const EditNote = ({ _id, title, description, editState }: noteProps) => {
    const [updateNote] = useUpdateNoteMutation();
    const [NoteTitle, setNoteTitle] = useState(title);
    const [NoteDescription, setNoteDescription] = useState(description);


    return (
        <div>
            <Card className="inputCard">
                <form noValidate autoComplete="off" className="inputForm">
                    <h3>Edit Note</h3>
                    <TextField
                        label="Title"
                        variant="outlined"
                        onChange={(e) => setNoteTitle(e.target.value)}
                        value={NoteTitle}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        onChange={(e) => setNoteDescription(e.target.value)}
                        value={NoteDescription}
                    />
                    <Button variant="outlined" color="primary"
                        onClick={() => {
                            updateNote({ variables: { input: { _id: _id, title: NoteTitle, description: NoteDescription } } });
                            editState(false);
                        }}>Update Note</Button>
                </form>
            </Card>
        </div>
    );
}

export default EditNote;
