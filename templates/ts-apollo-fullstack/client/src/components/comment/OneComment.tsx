import React from 'react';
import { useDeleteCommentMutation } from '../../generated-types';
import { Button } from '@material-ui/core';
import './Comment.css';

type comment ={
    id:string,
    text:string,
    description:string,
}

const OneComment = ({id, text, description }: comment) => {
    const [deleteComment] = useDeleteCommentMutation();

    return(
        <div>
            <li className="comment">
              <strong >{text}</strong>:&nbsp;
              {description}
              <Button variant="outlined" color="secondary"  onClick={()=>deleteComment({variables:{id:id}})}>Delete Comment</Button>
            </li>
        </div>
    );
}

export default OneComment;