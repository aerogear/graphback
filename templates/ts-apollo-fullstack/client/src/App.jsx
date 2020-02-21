import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useOfflineMutation, useNetworkStatus } from 'react-offix-hooks';
import { AddTodo, TodoList, Modal, Loading, Error } from './components';
import { mutateOptions } from './helpers';
import GET_TODOS from './graphql/queries/findAllTodos.graphql';
import ADD_TODO from './graphql/mutations/createTodo.graphql';

const App = () => {
  const { loading, error, data, subscribeToMore } = useQuery(GET_TODOS, mutateOptions.createTodo);

  const [addTodo] = useOfflineMutation(ADD_TODO);

  const [modalActive, setModalActive] = useState(false);

  const isOnline = useNetworkStatus();

  const toggleModal = () => {
    setModalActive(!modalActive);
  };

  if (loading) return <Loading />;

  if (error) return <Error error={error} />;

  return (
    <>
      <div className="hero hero-sm bg-gradient">
        <div className="hero-body">
          <div className="contain">
            <h1 className="mb-0">EXAMPLE TODO</h1>
            <span type="text" className="btn btn-outline">
              {(isOnline) ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>

      <Modal
        title="Create a task"
        subtitle=""
        active={modalActive}
        close={toggleModal}
        Component={() => <AddTodo addTodo={addTodo} cancel={toggleModal} />}
      />

      <section className="contain">
        <div className="action-button">
          <button type="button" className="btn btn-primary btn-lg btn-circle" onClick={toggleModal}>
            <i className="icon icon-plus" />
          </button>
        </div>
      </section>

      <section className="contain mt-4em">
        <TodoList todos={data.findAllTodos} subscribeToMore={subscribeToMore} />
      </section>
    </>
  );
};

export default App;
