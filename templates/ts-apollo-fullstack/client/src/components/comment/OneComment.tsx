import React from 'react';
import { useDeleteCommentMutation } from '../../generated-types';

type comment ={
    id:string,
    text:string,
    description:string,
}

const OneComment = ({id, text, description }: comment) => {
    const [deleteComment] = useDeleteCommentMutation();

    return(
        <div>
            <li>
              <strong>{text}</strong>:&nbsp;
              {description}
              <button onClick={()=>deleteComment({variables:{id:id}})}>Delete Comment</button>
            </li>
        </div>
    );
}

export default OneComment;