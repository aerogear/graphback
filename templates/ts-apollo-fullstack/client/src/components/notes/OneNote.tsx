import React, { useState } from 'react';
import EditNote from './EditNote';
import { Note } from '../../generated-types';
import CreateComment from '../comment/CreateComment';
import OneComment from '../comment/OneComment';



const OneNote = ({id, title, description,comments }: Note) => {
    const [noteEdit,setNoteEdit]=useState(false)
    const [addComment,setAddComment]=useState(false)
    


    return(
        <div>
            <li>
              <strong>{title}</strong>:&nbsp;
              {description}
              <button onClick={()=>setNoteEdit(!noteEdit)}>Edit</button>
              <button onClick={()=>setAddComment(!addComment)}>Add Comment</button>
              {noteEdit?<EditNote id={id} title={title} description={description} editState={setNoteEdit}></EditNote>:<div></div>}
              {addComment?<CreateComment noteId={id} addCommentState={setAddComment}></CreateComment>:<div></div>}
              <ul>
                {comments && comments.length>0 ? comments.map((com)=>{
                    return(
                        <OneComment id={com.id} text={com.text} description={com.description} key={com.id}></OneComment>
                        );
                    }):<div></div>}
              </ul>
            </li>
        </div>
    );
}

export default OneNote;