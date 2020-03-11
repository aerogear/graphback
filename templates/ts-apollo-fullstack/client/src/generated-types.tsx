/* tslint:disable */
import gql from 'graphql-tag';
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

export type CommentInput = {
  id?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  createNote: Note;
  updateNote: Note;
  deleteNote: Note;
  createComment: Comment;
  updateComment: Comment;
  deleteComment: Comment;
};


export type MutationCreateNoteArgs = {
  input?: Maybe<NoteInput>;
};


export type MutationUpdateNoteArgs = {
  input?: Maybe<NoteInput>;
};


export type MutationDeleteNoteArgs = {
  input?: Maybe<NoteInput>;
};


export type MutationCreateCommentArgs = {
  input?: Maybe<CommentInput>;
};


export type MutationUpdateCommentArgs = {
  input?: Maybe<CommentInput>;
};


export type MutationDeleteCommentArgs = {
  input?: Maybe<CommentInput>;
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

export type NoteInput = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type Query = {
   __typename?: 'Query';
  findAllNotes: Array<Maybe<Note>>;
  findNotes: Array<Maybe<Note>>;
  findAllComments: Array<Maybe<Comment>>;
  findComments: Array<Maybe<Comment>>;
};


export type QueryFindAllNotesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryFindNotesArgs = {
  fields?: Maybe<NoteInput>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryFindAllCommentsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryFindCommentsArgs = {
  fields?: Maybe<CommentInput>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
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
  input?: Maybe<NoteInput>;
};


export type SubscriptionUpdatedNoteArgs = {
  input?: Maybe<NoteInput>;
};


export type SubscriptionDeletedNoteArgs = {
  input?: Maybe<NoteInput>;
};


export type SubscriptionNewCommentArgs = {
  input?: Maybe<CommentInput>;
};


export type SubscriptionUpdatedCommentArgs = {
  input?: Maybe<CommentInput>;
};


export type SubscriptionDeletedCommentArgs = {
  input?: Maybe<CommentInput>;
};


