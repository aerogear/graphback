/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/**  @model  */
export type Comment = {
  __typename?: 'Comment';
  /**  @id  */
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  /** @manyToOne(field: 'comments', key: 'noteId') */
  note?: Maybe<Note>;
};

export type CommentFilter = {
  id?: Maybe<IdInput>;
  text?: Maybe<StringInput>;
  description?: Maybe<StringInput>;
  noteId?: Maybe<IdInput>;
  and?: Maybe<Array<CommentFilter>>;
  or?: Maybe<Array<CommentFilter>>;
  not?: Maybe<CommentFilter>;
};

export type CommentResultList = {
  __typename?: 'CommentResultList';
  items: Array<Maybe<Comment>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
};

export type CommentSubscriptionFilter = {
  and?: Maybe<Array<CommentSubscriptionFilter>>;
  or?: Maybe<Array<CommentSubscriptionFilter>>;
  not?: Maybe<CommentSubscriptionFilter>;
  id?: Maybe<IdInput>;
  text?: Maybe<StringInput>;
  description?: Maybe<StringInput>;
};

export type CreateCommentInput = {
  id?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  noteId?: Maybe<Scalars['ID']>;
};

export type CreateNoteInput = {
  id?: Maybe<Scalars['ID']>;
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type IdInput = {
  ne?: Maybe<Scalars['ID']>;
  eq?: Maybe<Scalars['ID']>;
  le?: Maybe<Scalars['ID']>;
  lt?: Maybe<Scalars['ID']>;
  ge?: Maybe<Scalars['ID']>;
  gt?: Maybe<Scalars['ID']>;
  in?: Maybe<Array<Scalars['ID']>>;
};

export type MutateCommentInput = {
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  noteId?: Maybe<Scalars['ID']>;
};

export type MutateNoteInput = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createNote?: Maybe<Note>;
  updateNote?: Maybe<Note>;
  deleteNote?: Maybe<Note>;
  createComment?: Maybe<Comment>;
  updateComment?: Maybe<Comment>;
  deleteComment?: Maybe<Comment>;
};


export type MutationCreateNoteArgs = {
  input: CreateNoteInput;
};


export type MutationUpdateNoteArgs = {
  input: MutateNoteInput;
};


export type MutationDeleteNoteArgs = {
  input: MutateNoteInput;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationUpdateCommentArgs = {
  input: MutateCommentInput;
};


export type MutationDeleteCommentArgs = {
  input: MutateCommentInput;
};

/**  @model  */
export type Note = {
  __typename?: 'Note';
  /**  @id  */
  id: Scalars['ID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  /**
   * @oneToMany(field: 'note', key: 'noteId')
   * @oneToMany(field: 'note')
   */
  comments: Array<Maybe<Comment>>;
};


/**  @model  */
export type NoteCommentsArgs = {
  filter?: Maybe<CommentFilter>;
};

export type NoteFilter = {
  id?: Maybe<IdInput>;
  title?: Maybe<StringInput>;
  description?: Maybe<StringInput>;
  and?: Maybe<Array<NoteFilter>>;
  or?: Maybe<Array<NoteFilter>>;
  not?: Maybe<NoteFilter>;
};

export type NoteResultList = {
  __typename?: 'NoteResultList';
  items: Array<Maybe<Note>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
};

export type NoteSubscriptionFilter = {
  and?: Maybe<Array<NoteSubscriptionFilter>>;
  or?: Maybe<Array<NoteSubscriptionFilter>>;
  not?: Maybe<NoteSubscriptionFilter>;
  id?: Maybe<IdInput>;
  title?: Maybe<StringInput>;
  description?: Maybe<StringInput>;
};

export type OrderByInput = {
  field: Scalars['String'];
  order?: Maybe<SortDirectionEnum>;
};

export type PageRequest = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  getDraftNotes?: Maybe<Array<Maybe<Note>>>;
  getNote?: Maybe<Note>;
  findNotes: NoteResultList;
  getComment?: Maybe<Comment>;
  findComments: CommentResultList;
};


export type QueryGetNoteArgs = {
  id: Scalars['ID'];
};


export type QueryFindNotesArgs = {
  filter?: Maybe<NoteFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


export type QueryGetCommentArgs = {
  id: Scalars['ID'];
};


export type QueryFindCommentsArgs = {
  filter?: Maybe<CommentFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};

export enum SortDirectionEnum {
  Desc = 'DESC',
  Asc = 'ASC'
}

export type StringInput = {
  ne?: Maybe<Scalars['String']>;
  eq?: Maybe<Scalars['String']>;
  le?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  ge?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newNote: Note;
  updatedNote: Note;
  deletedNote: Note;
  newComment: Comment;
  updatedComment: Comment;
  deletedComment: Comment;
};


export type SubscriptionNewNoteArgs = {
  filter?: Maybe<NoteSubscriptionFilter>;
};


export type SubscriptionUpdatedNoteArgs = {
  filter?: Maybe<NoteSubscriptionFilter>;
};


export type SubscriptionDeletedNoteArgs = {
  filter?: Maybe<NoteSubscriptionFilter>;
};


export type SubscriptionNewCommentArgs = {
  filter?: Maybe<CommentSubscriptionFilter>;
};


export type SubscriptionUpdatedCommentArgs = {
  filter?: Maybe<CommentSubscriptionFilter>;
};


export type SubscriptionDeletedCommentArgs = {
  filter?: Maybe<CommentSubscriptionFilter>;
};

export type GetDraftNotesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDraftNotesQuery = (
  { __typename?: 'Query' }
  & { getDraftNotes?: Maybe<Array<Maybe<(
    { __typename?: 'Note' }
    & NoteExpandedFieldsFragment
  )>>> }
);

export type NoteFieldsFragment = (
  { __typename?: 'Note' }
  & Pick<Note, 'id' | 'title' | 'description'>
);

export type NoteExpandedFieldsFragment = (
  { __typename?: 'Note' }
  & Pick<Note, 'id' | 'title' | 'description'>
  & { comments: Array<Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'text' | 'description'>
  )>> }
);

export type CommentFieldsFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'text' | 'description'>
);

export type CommentExpandedFieldsFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'text' | 'description'>
  & { note?: Maybe<(
    { __typename?: 'Note' }
    & Pick<Note, 'id' | 'title' | 'description'>
  )> }
);

export type FindNotesQueryVariables = Exact<{
  filter?: Maybe<NoteFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
}>;


export type FindNotesQuery = (
  { __typename?: 'Query' }
  & { findNotes: (
    { __typename?: 'NoteResultList' }
    & Pick<NoteResultList, 'offset' | 'limit' | 'count'>
    & { items: Array<Maybe<(
      { __typename?: 'Note' }
      & NoteExpandedFieldsFragment
    )>> }
  ) }
);

export type GetNoteQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetNoteQuery = (
  { __typename?: 'Query' }
  & { getNote?: Maybe<(
    { __typename?: 'Note' }
    & NoteExpandedFieldsFragment
  )> }
);

export type FindCommentsQueryVariables = Exact<{
  filter?: Maybe<CommentFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
}>;


export type FindCommentsQuery = (
  { __typename?: 'Query' }
  & { findComments: (
    { __typename?: 'CommentResultList' }
    & Pick<CommentResultList, 'offset' | 'limit' | 'count'>
    & { items: Array<Maybe<(
      { __typename?: 'Comment' }
      & CommentExpandedFieldsFragment
    )>> }
  ) }
);

export type GetCommentQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetCommentQuery = (
  { __typename?: 'Query' }
  & { getComment?: Maybe<(
    { __typename?: 'Comment' }
    & CommentExpandedFieldsFragment
  )> }
);

export type CreateNoteMutationVariables = Exact<{
  input: CreateNoteInput;
}>;


export type CreateNoteMutation = (
  { __typename?: 'Mutation' }
  & { createNote?: Maybe<(
    { __typename?: 'Note' }
    & NoteFieldsFragment
  )> }
);

export type UpdateNoteMutationVariables = Exact<{
  input: MutateNoteInput;
}>;


export type UpdateNoteMutation = (
  { __typename?: 'Mutation' }
  & { updateNote?: Maybe<(
    { __typename?: 'Note' }
    & NoteFieldsFragment
  )> }
);

export type DeleteNoteMutationVariables = Exact<{
  input: MutateNoteInput;
}>;


export type DeleteNoteMutation = (
  { __typename?: 'Mutation' }
  & { deleteNote?: Maybe<(
    { __typename?: 'Note' }
    & NoteFieldsFragment
  )> }
);

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment?: Maybe<(
    { __typename?: 'Comment' }
    & CommentFieldsFragment
  )> }
);

export type UpdateCommentMutationVariables = Exact<{
  input: MutateCommentInput;
}>;


export type UpdateCommentMutation = (
  { __typename?: 'Mutation' }
  & { updateComment?: Maybe<(
    { __typename?: 'Comment' }
    & CommentFieldsFragment
  )> }
);

export type DeleteCommentMutationVariables = Exact<{
  input: MutateCommentInput;
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & { deleteComment?: Maybe<(
    { __typename?: 'Comment' }
    & CommentFieldsFragment
  )> }
);

export type NewNoteSubscriptionVariables = Exact<{
  filter?: Maybe<NoteSubscriptionFilter>;
}>;


export type NewNoteSubscription = (
  { __typename?: 'Subscription' }
  & { newNote: (
    { __typename?: 'Note' }
    & NoteFieldsFragment
  ) }
);

export type UpdatedNoteSubscriptionVariables = Exact<{
  filter?: Maybe<NoteSubscriptionFilter>;
}>;


export type UpdatedNoteSubscription = (
  { __typename?: 'Subscription' }
  & { updatedNote: (
    { __typename?: 'Note' }
    & NoteFieldsFragment
  ) }
);

export type DeletedNoteSubscriptionVariables = Exact<{
  filter?: Maybe<NoteSubscriptionFilter>;
}>;


export type DeletedNoteSubscription = (
  { __typename?: 'Subscription' }
  & { deletedNote: (
    { __typename?: 'Note' }
    & NoteFieldsFragment
  ) }
);

export type NewCommentSubscriptionVariables = Exact<{
  filter?: Maybe<CommentSubscriptionFilter>;
}>;


export type NewCommentSubscription = (
  { __typename?: 'Subscription' }
  & { newComment: (
    { __typename?: 'Comment' }
    & CommentFieldsFragment
  ) }
);

export type UpdatedCommentSubscriptionVariables = Exact<{
  filter?: Maybe<CommentSubscriptionFilter>;
}>;


export type UpdatedCommentSubscription = (
  { __typename?: 'Subscription' }
  & { updatedComment: (
    { __typename?: 'Comment' }
    & CommentFieldsFragment
  ) }
);

export type DeletedCommentSubscriptionVariables = Exact<{
  filter?: Maybe<CommentSubscriptionFilter>;
}>;


export type DeletedCommentSubscription = (
  { __typename?: 'Subscription' }
  & { deletedComment: (
    { __typename?: 'Comment' }
    & CommentFieldsFragment
  ) }
);

export const NoteFieldsFragmentDoc = gql`
    fragment NoteFields on Note {
  id
  title
  description
}
    `;
export const NoteExpandedFieldsFragmentDoc = gql`
    fragment NoteExpandedFields on Note {
  id
  title
  description
  comments {
    id
    text
    description
  }
}
    `;
export const CommentFieldsFragmentDoc = gql`
    fragment CommentFields on Comment {
  id
  text
  description
}
    `;
export const CommentExpandedFieldsFragmentDoc = gql`
    fragment CommentExpandedFields on Comment {
  id
  text
  description
  note {
    id
    title
    description
  }
}
    `;
export const GetDraftNotesDocument = gql`
    query getDraftNotes {
  getDraftNotes {
    ...NoteExpandedFields
  }
}
    ${NoteExpandedFieldsFragmentDoc}`;

/**
 * __useGetDraftNotesQuery__
 *
 * To run a query within a React component, call `useGetDraftNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDraftNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDraftNotesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDraftNotesQuery(baseOptions?: Apollo.QueryHookOptions<GetDraftNotesQuery, GetDraftNotesQueryVariables>) {
        return Apollo.useQuery<GetDraftNotesQuery, GetDraftNotesQueryVariables>(GetDraftNotesDocument, baseOptions);
      }
export function useGetDraftNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDraftNotesQuery, GetDraftNotesQueryVariables>) {
          return Apollo.useLazyQuery<GetDraftNotesQuery, GetDraftNotesQueryVariables>(GetDraftNotesDocument, baseOptions);
        }
export type GetDraftNotesQueryHookResult = ReturnType<typeof useGetDraftNotesQuery>;
export type GetDraftNotesLazyQueryHookResult = ReturnType<typeof useGetDraftNotesLazyQuery>;
export type GetDraftNotesQueryResult = Apollo.QueryResult<GetDraftNotesQuery, GetDraftNotesQueryVariables>;
export const FindNotesDocument = gql`
    query findNotes($filter: NoteFilter, $page: PageRequest, $orderBy: OrderByInput) {
  findNotes(filter: $filter, page: $page, orderBy: $orderBy) {
    items {
      ...NoteExpandedFields
    }
    offset
    limit
    count
  }
}
    ${NoteExpandedFieldsFragmentDoc}`;

/**
 * __useFindNotesQuery__
 *
 * To run a query within a React component, call `useFindNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindNotesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useFindNotesQuery(baseOptions?: Apollo.QueryHookOptions<FindNotesQuery, FindNotesQueryVariables>) {
        return Apollo.useQuery<FindNotesQuery, FindNotesQueryVariables>(FindNotesDocument, baseOptions);
      }
export function useFindNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindNotesQuery, FindNotesQueryVariables>) {
          return Apollo.useLazyQuery<FindNotesQuery, FindNotesQueryVariables>(FindNotesDocument, baseOptions);
        }
export type FindNotesQueryHookResult = ReturnType<typeof useFindNotesQuery>;
export type FindNotesLazyQueryHookResult = ReturnType<typeof useFindNotesLazyQuery>;
export type FindNotesQueryResult = Apollo.QueryResult<FindNotesQuery, FindNotesQueryVariables>;
export const GetNoteDocument = gql`
    query getNote($id: ID!) {
  getNote(id: $id) {
    ...NoteExpandedFields
  }
}
    ${NoteExpandedFieldsFragmentDoc}`;

/**
 * __useGetNoteQuery__
 *
 * To run a query within a React component, call `useGetNoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoteQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetNoteQuery(baseOptions?: Apollo.QueryHookOptions<GetNoteQuery, GetNoteQueryVariables>) {
        return Apollo.useQuery<GetNoteQuery, GetNoteQueryVariables>(GetNoteDocument, baseOptions);
      }
export function useGetNoteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoteQuery, GetNoteQueryVariables>) {
          return Apollo.useLazyQuery<GetNoteQuery, GetNoteQueryVariables>(GetNoteDocument, baseOptions);
        }
export type GetNoteQueryHookResult = ReturnType<typeof useGetNoteQuery>;
export type GetNoteLazyQueryHookResult = ReturnType<typeof useGetNoteLazyQuery>;
export type GetNoteQueryResult = Apollo.QueryResult<GetNoteQuery, GetNoteQueryVariables>;
export const FindCommentsDocument = gql`
    query findComments($filter: CommentFilter, $page: PageRequest, $orderBy: OrderByInput) {
  findComments(filter: $filter, page: $page, orderBy: $orderBy) {
    items {
      ...CommentExpandedFields
    }
    offset
    limit
    count
  }
}
    ${CommentExpandedFieldsFragmentDoc}`;

/**
 * __useFindCommentsQuery__
 *
 * To run a query within a React component, call `useFindCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCommentsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useFindCommentsQuery(baseOptions?: Apollo.QueryHookOptions<FindCommentsQuery, FindCommentsQueryVariables>) {
        return Apollo.useQuery<FindCommentsQuery, FindCommentsQueryVariables>(FindCommentsDocument, baseOptions);
      }
export function useFindCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCommentsQuery, FindCommentsQueryVariables>) {
          return Apollo.useLazyQuery<FindCommentsQuery, FindCommentsQueryVariables>(FindCommentsDocument, baseOptions);
        }
export type FindCommentsQueryHookResult = ReturnType<typeof useFindCommentsQuery>;
export type FindCommentsLazyQueryHookResult = ReturnType<typeof useFindCommentsLazyQuery>;
export type FindCommentsQueryResult = Apollo.QueryResult<FindCommentsQuery, FindCommentsQueryVariables>;
export const GetCommentDocument = gql`
    query getComment($id: ID!) {
  getComment(id: $id) {
    ...CommentExpandedFields
  }
}
    ${CommentExpandedFieldsFragmentDoc}`;

/**
 * __useGetCommentQuery__
 *
 * To run a query within a React component, call `useGetCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCommentQuery(baseOptions?: Apollo.QueryHookOptions<GetCommentQuery, GetCommentQueryVariables>) {
        return Apollo.useQuery<GetCommentQuery, GetCommentQueryVariables>(GetCommentDocument, baseOptions);
      }
export function useGetCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentQuery, GetCommentQueryVariables>) {
          return Apollo.useLazyQuery<GetCommentQuery, GetCommentQueryVariables>(GetCommentDocument, baseOptions);
        }
export type GetCommentQueryHookResult = ReturnType<typeof useGetCommentQuery>;
export type GetCommentLazyQueryHookResult = ReturnType<typeof useGetCommentLazyQuery>;
export type GetCommentQueryResult = Apollo.QueryResult<GetCommentQuery, GetCommentQueryVariables>;
export const CreateNoteDocument = gql`
    mutation createNote($input: CreateNoteInput!) {
  createNote(input: $input) {
    ...NoteFields
  }
}
    ${NoteFieldsFragmentDoc}`;
export type CreateNoteMutationFn = Apollo.MutationFunction<CreateNoteMutation, CreateNoteMutationVariables>;

/**
 * __useCreateNoteMutation__
 *
 * To run a mutation, you first call `useCreateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNoteMutation, { data, loading, error }] = useCreateNoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateNoteMutation, CreateNoteMutationVariables>) {
        return Apollo.useMutation<CreateNoteMutation, CreateNoteMutationVariables>(CreateNoteDocument, baseOptions);
      }
export type CreateNoteMutationHookResult = ReturnType<typeof useCreateNoteMutation>;
export type CreateNoteMutationResult = Apollo.MutationResult<CreateNoteMutation>;
export type CreateNoteMutationOptions = Apollo.BaseMutationOptions<CreateNoteMutation, CreateNoteMutationVariables>;
export const UpdateNoteDocument = gql`
    mutation updateNote($input: MutateNoteInput!) {
  updateNote(input: $input) {
    ...NoteFields
  }
}
    ${NoteFieldsFragmentDoc}`;
export type UpdateNoteMutationFn = Apollo.MutationFunction<UpdateNoteMutation, UpdateNoteMutationVariables>;

/**
 * __useUpdateNoteMutation__
 *
 * To run a mutation, you first call `useUpdateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNoteMutation, { data, loading, error }] = useUpdateNoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateNoteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNoteMutation, UpdateNoteMutationVariables>) {
        return Apollo.useMutation<UpdateNoteMutation, UpdateNoteMutationVariables>(UpdateNoteDocument, baseOptions);
      }
export type UpdateNoteMutationHookResult = ReturnType<typeof useUpdateNoteMutation>;
export type UpdateNoteMutationResult = Apollo.MutationResult<UpdateNoteMutation>;
export type UpdateNoteMutationOptions = Apollo.BaseMutationOptions<UpdateNoteMutation, UpdateNoteMutationVariables>;
export const DeleteNoteDocument = gql`
    mutation deleteNote($input: MutateNoteInput!) {
  deleteNote(input: $input) {
    ...NoteFields
  }
}
    ${NoteFieldsFragmentDoc}`;
export type DeleteNoteMutationFn = Apollo.MutationFunction<DeleteNoteMutation, DeleteNoteMutationVariables>;

/**
 * __useDeleteNoteMutation__
 *
 * To run a mutation, you first call `useDeleteNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNoteMutation, { data, loading, error }] = useDeleteNoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteNoteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNoteMutation, DeleteNoteMutationVariables>) {
        return Apollo.useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(DeleteNoteDocument, baseOptions);
      }
export type DeleteNoteMutationHookResult = ReturnType<typeof useDeleteNoteMutation>;
export type DeleteNoteMutationResult = Apollo.MutationResult<DeleteNoteMutation>;
export type DeleteNoteMutationOptions = Apollo.BaseMutationOptions<DeleteNoteMutation, DeleteNoteMutationVariables>;
export const CreateCommentDocument = gql`
    mutation createComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    ...CommentFields
  }
}
    ${CommentFieldsFragmentDoc}`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, baseOptions);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation updateComment($input: MutateCommentInput!) {
  updateComment(input: $input) {
    ...CommentFields
  }
}
    ${CommentFieldsFragmentDoc}`;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, baseOptions);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation deleteComment($input: MutateCommentInput!) {
  deleteComment(input: $input) {
    ...CommentFields
  }
}
    ${CommentFieldsFragmentDoc}`;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, baseOptions);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const NewNoteDocument = gql`
    subscription newNote($filter: NoteSubscriptionFilter) {
  newNote(filter: $filter) {
    ...NoteFields
  }
}
    ${NoteFieldsFragmentDoc}`;

/**
 * __useNewNoteSubscription__
 *
 * To run a query within a React component, call `useNewNoteSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewNoteSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewNoteSubscription({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useNewNoteSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewNoteSubscription, NewNoteSubscriptionVariables>) {
        return Apollo.useSubscription<NewNoteSubscription, NewNoteSubscriptionVariables>(NewNoteDocument, baseOptions);
      }
export type NewNoteSubscriptionHookResult = ReturnType<typeof useNewNoteSubscription>;
export type NewNoteSubscriptionResult = Apollo.SubscriptionResult<NewNoteSubscription>;
export const UpdatedNoteDocument = gql`
    subscription updatedNote($filter: NoteSubscriptionFilter) {
  updatedNote(filter: $filter) {
    ...NoteFields
  }
}
    ${NoteFieldsFragmentDoc}`;

/**
 * __useUpdatedNoteSubscription__
 *
 * To run a query within a React component, call `useUpdatedNoteSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUpdatedNoteSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdatedNoteSubscription({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useUpdatedNoteSubscription(baseOptions?: Apollo.SubscriptionHookOptions<UpdatedNoteSubscription, UpdatedNoteSubscriptionVariables>) {
        return Apollo.useSubscription<UpdatedNoteSubscription, UpdatedNoteSubscriptionVariables>(UpdatedNoteDocument, baseOptions);
      }
export type UpdatedNoteSubscriptionHookResult = ReturnType<typeof useUpdatedNoteSubscription>;
export type UpdatedNoteSubscriptionResult = Apollo.SubscriptionResult<UpdatedNoteSubscription>;
export const DeletedNoteDocument = gql`
    subscription deletedNote($filter: NoteSubscriptionFilter) {
  deletedNote(filter: $filter) {
    ...NoteFields
  }
}
    ${NoteFieldsFragmentDoc}`;

/**
 * __useDeletedNoteSubscription__
 *
 * To run a query within a React component, call `useDeletedNoteSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDeletedNoteSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeletedNoteSubscription({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useDeletedNoteSubscription(baseOptions?: Apollo.SubscriptionHookOptions<DeletedNoteSubscription, DeletedNoteSubscriptionVariables>) {
        return Apollo.useSubscription<DeletedNoteSubscription, DeletedNoteSubscriptionVariables>(DeletedNoteDocument, baseOptions);
      }
export type DeletedNoteSubscriptionHookResult = ReturnType<typeof useDeletedNoteSubscription>;
export type DeletedNoteSubscriptionResult = Apollo.SubscriptionResult<DeletedNoteSubscription>;
export const NewCommentDocument = gql`
    subscription newComment($filter: CommentSubscriptionFilter) {
  newComment(filter: $filter) {
    ...CommentFields
  }
}
    ${CommentFieldsFragmentDoc}`;

/**
 * __useNewCommentSubscription__
 *
 * To run a query within a React component, call `useNewCommentSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewCommentSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewCommentSubscription({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useNewCommentSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewCommentSubscription, NewCommentSubscriptionVariables>) {
        return Apollo.useSubscription<NewCommentSubscription, NewCommentSubscriptionVariables>(NewCommentDocument, baseOptions);
      }
export type NewCommentSubscriptionHookResult = ReturnType<typeof useNewCommentSubscription>;
export type NewCommentSubscriptionResult = Apollo.SubscriptionResult<NewCommentSubscription>;
export const UpdatedCommentDocument = gql`
    subscription updatedComment($filter: CommentSubscriptionFilter) {
  updatedComment(filter: $filter) {
    ...CommentFields
  }
}
    ${CommentFieldsFragmentDoc}`;

/**
 * __useUpdatedCommentSubscription__
 *
 * To run a query within a React component, call `useUpdatedCommentSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUpdatedCommentSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdatedCommentSubscription({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useUpdatedCommentSubscription(baseOptions?: Apollo.SubscriptionHookOptions<UpdatedCommentSubscription, UpdatedCommentSubscriptionVariables>) {
        return Apollo.useSubscription<UpdatedCommentSubscription, UpdatedCommentSubscriptionVariables>(UpdatedCommentDocument, baseOptions);
      }
export type UpdatedCommentSubscriptionHookResult = ReturnType<typeof useUpdatedCommentSubscription>;
export type UpdatedCommentSubscriptionResult = Apollo.SubscriptionResult<UpdatedCommentSubscription>;
export const DeletedCommentDocument = gql`
    subscription deletedComment($filter: CommentSubscriptionFilter) {
  deletedComment(filter: $filter) {
    ...CommentFields
  }
}
    ${CommentFieldsFragmentDoc}`;

/**
 * __useDeletedCommentSubscription__
 *
 * To run a query within a React component, call `useDeletedCommentSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDeletedCommentSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeletedCommentSubscription({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useDeletedCommentSubscription(baseOptions?: Apollo.SubscriptionHookOptions<DeletedCommentSubscription, DeletedCommentSubscriptionVariables>) {
        return Apollo.useSubscription<DeletedCommentSubscription, DeletedCommentSubscriptionVariables>(DeletedCommentDocument, baseOptions);
      }
export type DeletedCommentSubscriptionHookResult = ReturnType<typeof useDeletedCommentSubscription>;
export type DeletedCommentSubscriptionResult = Apollo.SubscriptionResult<DeletedCommentSubscription>;