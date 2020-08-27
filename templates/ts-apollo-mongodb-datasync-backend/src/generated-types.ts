/* eslint-disable */
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  GraphbackObjectID: string;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  GraphbackTimestamp: number;
};

/**
 * @model
 * @datasync(
 *   ttl: 5184000
 * )
 */
export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['GraphbackObjectID'];
  text?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  /** @manyToOne(field: 'comments', key: 'noteId') */
  note?: Maybe<Note>;
  /** @index(name: 'Datasync_lastUpdatedAt') */
  _lastUpdatedAt?: Maybe<Scalars['GraphbackTimestamp']>;
  _version?: Maybe<Scalars['Int']>;
};

export type CommentDelta = {
  __typename?: 'CommentDelta';
  _id: Scalars['GraphbackObjectID'];
  text?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  /** @index(name: 'Datasync_lastUpdatedAt') */
  _lastUpdatedAt?: Maybe<Scalars['GraphbackTimestamp']>;
  _version?: Maybe<Scalars['Int']>;
  _deleted?: Maybe<Scalars['Boolean']>;
};

export type CommentDeltaList = {
  __typename?: 'CommentDeltaList';
  items: Array<Maybe<CommentDelta>>;
  lastSync: Scalars['GraphbackTimestamp'];
  limit?: Maybe<Scalars['Int']>;
};

export type CommentFilter = {
  _id?: Maybe<GraphbackObjectIdInput>;
  text?: Maybe<StringInput>;
  description?: Maybe<StringInput>;
  noteId?: Maybe<GraphbackObjectIdInput>;
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
  _id?: Maybe<GraphbackObjectIdInput>;
  text?: Maybe<StringInput>;
  description?: Maybe<StringInput>;
};

export type CreateCommentInput = {
  _id?: Maybe<Scalars['GraphbackObjectID']>;
  text?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  noteId?: Maybe<Scalars['GraphbackObjectID']>;
};

export type CreateNoteInput = {
  _id?: Maybe<Scalars['GraphbackObjectID']>;
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};


export type GraphbackObjectIdInput = {
  ne?: Maybe<Scalars['GraphbackObjectID']>;
  eq?: Maybe<Scalars['GraphbackObjectID']>;
  le?: Maybe<Scalars['GraphbackObjectID']>;
  lt?: Maybe<Scalars['GraphbackObjectID']>;
  ge?: Maybe<Scalars['GraphbackObjectID']>;
  gt?: Maybe<Scalars['GraphbackObjectID']>;
  in?: Maybe<Array<Scalars['GraphbackObjectID']>>;
  between?: Maybe<Array<Scalars['GraphbackObjectID']>>;
};


export type MutateCommentInput = {
  _id: Scalars['GraphbackObjectID'];
  text?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  noteId?: Maybe<Scalars['GraphbackObjectID']>;
  _version: Scalars['Int'];
};

export type MutateNoteInput = {
  _id: Scalars['GraphbackObjectID'];
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

/**
 * @model
 * @datasync(
 *   ttl: 5184000
 * )
 */
export type Note = {
  __typename?: 'Note';
  _id: Scalars['GraphbackObjectID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  /**
   * @oneToMany(field: 'note', key: 'noteId')
   * @oneToMany(field: 'note')
   */
  comments: Array<Maybe<Comment>>;
  /** @index(name: 'Datasync_lastUpdatedAt') */
  _lastUpdatedAt?: Maybe<Scalars['GraphbackTimestamp']>;
};


/**
 * @model
 * @datasync(
 *   ttl: 5184000
 * )
 */
export type NoteCommentsArgs = {
  filter?: Maybe<CommentFilter>;
};

export type NoteDelta = {
  __typename?: 'NoteDelta';
  _id: Scalars['GraphbackObjectID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  /** @index(name: 'Datasync_lastUpdatedAt') */
  _lastUpdatedAt?: Maybe<Scalars['GraphbackTimestamp']>;
  _deleted?: Maybe<Scalars['Boolean']>;
};

export type NoteDeltaList = {
  __typename?: 'NoteDeltaList';
  items: Array<Maybe<NoteDelta>>;
  lastSync: Scalars['GraphbackTimestamp'];
  limit?: Maybe<Scalars['Int']>;
};

export type NoteFilter = {
  _id?: Maybe<GraphbackObjectIdInput>;
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
  _id?: Maybe<GraphbackObjectIdInput>;
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
  getNote?: Maybe<Note>;
  findNotes: NoteResultList;
  getComment?: Maybe<Comment>;
  findComments: CommentResultList;
  syncNotes: NoteDeltaList;
  syncComments: CommentDeltaList;
};


export type QueryGetNoteArgs = {
  id: Scalars['GraphbackObjectID'];
};


export type QueryFindNotesArgs = {
  filter?: Maybe<NoteFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


export type QueryGetCommentArgs = {
  id: Scalars['GraphbackObjectID'];
};


export type QueryFindCommentsArgs = {
  filter?: Maybe<CommentFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
};


export type QuerySyncNotesArgs = {
  lastSync: Scalars['GraphbackTimestamp'];
  filter?: Maybe<NoteFilter>;
  limit?: Maybe<Scalars['Int']>;
};


export type QuerySyncCommentsArgs = {
  lastSync: Scalars['GraphbackTimestamp'];
  filter?: Maybe<CommentFilter>;
  limit?: Maybe<Scalars['Int']>;
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
