import React, { useState } from 'react';
import { useCreateCommentMutation } from '../../generated-types';


type createCommentProps = {
    noteId:string,
    addCommentState:any
  }


const CreateComment = ({noteId,addCommentState}:createCommentProps) => {
    const [createComment] = useCreateCommentMutation();
    const [newCommentTitle, setNewCommentTitle] = useState("");
    const [newCommentDescription, setNewCommentDescription] = useState("");

    return(
        <div>
            <fieldset>
                <legend>Create New Comment</legend>
                <form onSubmit={e => {
                e.preventDefault();
                createComment({ variables: { text:newCommentTitle, description: newCommentDescription, noteId:noteId } });
                addCommentState(false);
                }}>
                <p>
                    <label htmlFor="title">Title: </label>
                    <input
                    name="title"
                    value={newCommentTitle}
                    onChange={(e) => setNewCommentTitle(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="description">Description: </label>
                    <input
                    name="description"
                    value={newCommentDescription}
                    onChange={(e) => setNewCommentDescription(e.target.value)} />
                </p>
                <input type='submit' />
                </form>
            </fieldset>
        </div>
    );
}

export default CreateComment;