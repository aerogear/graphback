import React from 'react';

export const TodoContent = ({ todo, editTodo, deleteTodo, toggleEdit }) => {
  const handleUpdate = (e) => {
    e.preventDefault();
    // eslint-disable-next-line
    delete todo.__typename;
    // execute mutation
    editTodo({
      variables: {
        input: {
          ...todo,
          completed: !todo.completed,
        },
      },
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    // execute mutation
    const input = {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      version: todo.version,
    };
    deleteTodo({ variables: { input } });
  };

  return (
    <div className="columns">
      <div className="column col-6">
        <div className="form-group">
          <label className="form-checkbox">
            <input type="checkbox" checked={todo.completed} onChange={handleUpdate} />
            <i className="form-icon" />
            <span className={todo.completed ? 'todo-completed' : ''}>{todo.title}</span>
          </label>
        </div>
      </div>
      <div className="column col-6">
        <div className="form-group">
          <div className="btn-group float-right">
            <button type="button" className="btn btn-sm btn-primary" onClick={toggleEdit}>
              <i className="icon icon-edit" />
            </button>
            <button type="button" className="btn btn-sm btn-error" onClick={handleDelete}>
              <i className="icon icon-delete" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
