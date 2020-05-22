/* tslint:disable */
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;

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
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  /** @manyToOne field: 'comments', key: 'noteId' */
  note?: Maybe<Note>;
};

export type CommentFilter = {
  id?: Maybe<IdInput>;
  text?: Maybe<StringInput>;
  description?: Maybe<StringInput>;
  noteId?: Maybe<IdInput>;
  and?: Maybe<Array<Maybe<CommentFilter>>>;
  or?: Maybe<Array<Maybe<CommentFilter>>>;
  not?: Maybe<CommentFilter>;
};

export type CommentResultList = {
  __typename?: 'CommentResultList';
  items: Array<Maybe<Comment>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
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
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  contains?: Maybe<Scalars['ID']>;
  startsWith?: Maybe<Scalars['ID']>;
  endsWith?: Maybe<Scalars['ID']>;
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
  createNote: Note;
  updateNote: Note;
  createComment: Comment;
  updateComment: Comment;
};


export type MutationCreateNoteArgs = {
  input: CreateNoteInput;
};


export type MutationUpdateNoteArgs = {
  input: MutateNoteInput;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationUpdateCommentArgs = {
  input: MutateCommentInput;
};

/**  @model  */
export type Note = {
  __typename?: 'Note';
  id: Scalars['ID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  /** @oneToMany field: 'note', key: 'noteId' */
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
  and?: Maybe<Array<Maybe<NoteFilter>>>;
  or?: Maybe<Array<Maybe<NoteFilter>>>;
  not?: Maybe<NoteFilter>;
};

export type NoteResultList = {
  __typename?: 'NoteResultList';
  items: Array<Maybe<Note>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
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
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
};

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

export type FindNotesQueryVariables = {
  filter?: Maybe<NoteFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


export type FindNotesQuery = (
  { __typename?: 'Query' }
  & { findNotes: (
    { __typename?: 'NoteResultList' }
    & Pick<NoteResultList, 'offset' | 'limit'>
    & { items: Array<Maybe<(
      { __typename?: 'Note' }
      & NoteExpandedFieldsFragment
    )>> }
  ) }
);

export type GetNoteQueryVariables = {
  id: Scalars['ID'];
};


export type GetNoteQuery = (
  { __typename?: 'Query' }
  & { getNote?: Maybe<(
    { __typename?: 'Note' }
    & NoteExpandedFieldsFragment
  )> }
);

export type FindCommentsQueryVariables = {
  filter?: Maybe<CommentFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


export type FindCommentsQuery = (
  { __typename?: 'Query' }
  & { findComments: (
    { __typename?: 'CommentResultList' }
    & Pick<CommentResultList, 'offset' | 'limit'>
    & { items: Array<Maybe<(
      { __typename?: 'Comment' }
      & CommentExpandedFieldsFragment
    )>> }
  ) }
);

export type GetCommentQueryVariables = {
  id: Scalars['ID'];
};


export type GetCommentQuery = (
  { __typename?: 'Query' }
  & { getComment?: Maybe<(
    { __typename?: 'Comment' }
    & CommentExpandedFieldsFragment
  )> }
);

export type CreateNoteMutationVariables = {
  input: CreateNoteInput;
};


export type CreateNoteMutation = (
  { __typename?: 'Mutation' }
  & { createNote: (
    { __typename?: 'Note' }
    & NoteFieldsFragment
  ) }
);

export type UpdateNoteMutationVariables = {
  input: MutateNoteInput;
};


export type UpdateNoteMutation = (
  { __typename?: 'Mutation' }
  & { updateNote: (
    { __typename?: 'Note' }
    & NoteFieldsFragment
  ) }
);

export type CreateCommentMutationVariables = {
  input: CreateCommentInput;
};


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'Comment' }
    & CommentFieldsFragment
  ) }
);

export type UpdateCommentMutationVariables = {
  input: MutateCommentInput;
};


export type UpdateCommentMutation = (
  { __typename?: 'Mutation' }
  & { updateComment: (
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
export const FindNotesDocument = gql`
    query findNotes($filter: NoteFilter, $page: PageRequest, $orderBy: OrderByInput) {
  findNotes(filter: $filter, page: $page, orderBy: $orderBy) {
    items {
      ...NoteExpandedFields
    }
    offset
    limit
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
export function useFindNotesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindNotesQuery, FindNotesQueryVariables>) {
        return ApolloReactHooks.useQuery<FindNotesQuery, FindNotesQueryVariables>(FindNotesDocument, baseOptions);
      }
export function useFindNotesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindNotesQuery, FindNotesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindNotesQuery, FindNotesQueryVariables>(FindNotesDocument, baseOptions);
        }
export type FindNotesQueryHookResult = ReturnType<typeof useFindNotesQuery>;
export type FindNotesLazyQueryHookResult = ReturnType<typeof useFindNotesLazyQuery>;
export type FindNotesQueryResult = ApolloReactCommon.QueryResult<FindNotesQuery, FindNotesQueryVariables>;
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
export function useGetNoteQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetNoteQuery, GetNoteQueryVariables>) {
        return ApolloReactHooks.useQuery<GetNoteQuery, GetNoteQueryVariables>(GetNoteDocument, baseOptions);
      }
export function useGetNoteLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetNoteQuery, GetNoteQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetNoteQuery, GetNoteQueryVariables>(GetNoteDocument, baseOptions);
        }
export type GetNoteQueryHookResult = ReturnType<typeof useGetNoteQuery>;
export type GetNoteLazyQueryHookResult = ReturnType<typeof useGetNoteLazyQuery>;
export type GetNoteQueryResult = ApolloReactCommon.QueryResult<GetNoteQuery, GetNoteQueryVariables>;
export const FindCommentsDocument = gql`
    query findComments($filter: CommentFilter, $page: PageRequest, $orderBy: OrderByInput) {
  findComments(filter: $filter, page: $page, orderBy: $orderBy) {
    items {
      ...CommentExpandedFields
    }
    offset
    limit
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
export function useFindCommentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindCommentsQuery, FindCommentsQueryVariables>) {
        return ApolloReactHooks.useQuery<FindCommentsQuery, FindCommentsQueryVariables>(FindCommentsDocument, baseOptions);
      }
export function useFindCommentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindCommentsQuery, FindCommentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindCommentsQuery, FindCommentsQueryVariables>(FindCommentsDocument, baseOptions);
        }
export type FindCommentsQueryHookResult = ReturnType<typeof useFindCommentsQuery>;
export type FindCommentsLazyQueryHookResult = ReturnType<typeof useFindCommentsLazyQuery>;
export type FindCommentsQueryResult = ApolloReactCommon.QueryResult<FindCommentsQuery, FindCommentsQueryVariables>;
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
export function useGetCommentQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCommentQuery, GetCommentQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCommentQuery, GetCommentQueryVariables>(GetCommentDocument, baseOptions);
      }
export function useGetCommentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCommentQuery, GetCommentQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCommentQuery, GetCommentQueryVariables>(GetCommentDocument, baseOptions);
        }
export type GetCommentQueryHookResult = ReturnType<typeof useGetCommentQuery>;
export type GetCommentLazyQueryHookResult = ReturnType<typeof useGetCommentLazyQuery>;
export type GetCommentQueryResult = ApolloReactCommon.QueryResult<GetCommentQuery, GetCommentQueryVariables>;
export const CreateNoteDocument = gql`
    mutation createNote($input: CreateNoteInput!) {
  createNote(input: $input) {
    ...NoteFields
  }
}
    ${NoteFieldsFragmentDoc}`;
export type CreateNoteMutationFn = ApolloReactCommon.MutationFunction<CreateNoteMutation, CreateNoteMutationVariables>;

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
export function useCreateNoteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateNoteMutation, CreateNoteMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateNoteMutation, CreateNoteMutationVariables>(CreateNoteDocument, baseOptions);
      }
export type CreateNoteMutationHookResult = ReturnType<typeof useCreateNoteMutation>;
export type CreateNoteMutationResult = ApolloReactCommon.MutationResult<CreateNoteMutation>;
export type CreateNoteMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateNoteMutation, CreateNoteMutationVariables>;
export const UpdateNoteDocument = gql`
    mutation updateNote($input: MutateNoteInput!) {
  updateNote(input: $input) {
    ...NoteFields
  }
}
    ${NoteFieldsFragmentDoc}`;
export type UpdateNoteMutationFn = ApolloReactCommon.MutationFunction<UpdateNoteMutation, UpdateNoteMutationVariables>;

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
export function useUpdateNoteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateNoteMutation, UpdateNoteMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateNoteMutation, UpdateNoteMutationVariables>(UpdateNoteDocument, baseOptions);
      }
export type UpdateNoteMutationHookResult = ReturnType<typeof useUpdateNoteMutation>;
export type UpdateNoteMutationResult = ApolloReactCommon.MutationResult<UpdateNoteMutation>;
export type UpdateNoteMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateNoteMutation, UpdateNoteMutationVariables>;
export const CreateCommentDocument = gql`
    mutation createComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    ...CommentFields
  }
}
    ${CommentFieldsFragmentDoc}`;
export type CreateCommentMutationFn = ApolloReactCommon.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

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
export function useCreateCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, baseOptions);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = ApolloReactCommon.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation updateComment($input: MutateCommentInput!) {
  updateComment(input: $input) {
    ...CommentFields
  }
}
    ${CommentFieldsFragmentDoc}`;
export type UpdateCommentMutationFn = ApolloReactCommon.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

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
export function useUpdateCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, baseOptions);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = ApolloReactCommon.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;