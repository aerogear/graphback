import React, { useEffect } from 'react';
import { useOfflineMutation } from 'react-offix-hooks';
import { Empty } from './Empty';
import { Todo } from './Todo/Todo';
import UPDATE_TODO from '../graphql/mutations/updateTodo.graphql';
import DELETE_TODO from '../graphql/mutations/deleteTodo.graphql';

import { mutateOptions, subscriptionOptions } from '../helpers';

export const TodoList = ({ todos, subscribeToMore }) => {
  const [editTodo] = useOfflineMutation(UPDATE_TODO, mutateOptions.updateTodo);

  const [deleteTodo] = useOfflineMutation(DELETE_TODO, mutateOptions.deleteTodo);

  useEffect(() => {
    subscribeToMore(subscriptionOptions.add);
    subscribeToMore(subscriptionOptions.edit);
    subscribeToMore(subscriptionOptions.remove);
  }, []);

  if (todos.length === 0) return <Empty />;

  return (
    <>
      {
        // map through todos and render
        // each todo item
        todos && todos.map((todo) => (
          <div key={todo.id} className="card" style={{ margin: ' 0.5em 1em' }}>
            <div className="card-body">
              <div className="container">
                <Todo
                  todo={todo}
                  editTodo={editTodo}
                  deleteTodo={deleteTodo}
                  subscribeToMore={subscribeToMore}
                />
              </div>
            </div>
          </div>
        ))
      }
    </>
  );
};
