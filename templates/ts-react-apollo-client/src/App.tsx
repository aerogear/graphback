import React, { useState } from 'react';
import { useFindNotesQuery, useGetDraftNotesQuery } from './generated-types';
import CreateNote from './components/notes/CreateNote';
import OneNote from './components/notes/OneNote';
import { Checkbox, Box, Container } from '@material-ui/core';

const App: React.FC = () => {
  const allNotes = useFindNotesQuery();
  allNotes.startPolling(2000);
  console.log(allNotes.data?.findNotes)

  const [viewDraftNotes, setViewDraftNotes] = useState(false);

  const draftNotes = useGetDraftNotesQuery();

  const noteItems = viewDraftNotes ? draftNotes?.data?.getDraftNotes : allNotes.data?.findNotes?.items;

  return (
    <Container>
      <CreateNote />
      <Box>
        <div style={{marginLeft: 400, paddingTop: 50 }}><Checkbox checked={viewDraftNotes} onChange={() => setViewDraftNotes(!viewDraftNotes)} /> <b>VIEW DRAFT NOTES</b></div>
        <ul>
          {
            // TODO fix typings
            noteItems && noteItems.map((note: any) => (
              <OneNote key={note.id} id={note.id} title={note.title} description={note.description} comments={note.comments} />
            ))
          }
        </ul>
      </Box>
    </Container>
  );
}

export default App;
