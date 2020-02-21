import { getUpdateFunction, CacheOperation } from 'offix-cache';
import GET_TODOS from '../graphql/queries/findAllTodos.graphql';

export const createTodo = {
  updateQuery: GET_TODOS,
  returnType: 'Todo',
  mutationName: 'createTodo',
  operationType: CacheOperation.ADD,
};

export const updateTodo = {
  updateQuery: GET_TODOS,
  returnType: 'Todo',
  mutationName: 'updateTodo',
  operationType: CacheOperation.REFRESH,
};

export const deleteTodo = {
  updateQuery: GET_TODOS,
  returnType: 'Todo',
  mutationName: 'deleteTodo',
  operationType: CacheOperation.DELETE,
};

export const globalCacheUpdates = {
  createTodo: getUpdateFunction(createTodo),
  updateTodo: getUpdateFunction(updateTodo),
  deleteTodo: getUpdateFunction(deleteTodo),
}