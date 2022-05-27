import React, { SetStateAction, useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { listNotes } from '../utils/myfscopy';

export const MyNotes = ({ navigation }: { navigation: any }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    listNotes().then((_notes: SetStateAction<never[]>) => {
      console.log({ _notes });
      if (isSubscribed) {
        setNotes(_notes);
      }
      return () => {
        isSubscribed = false;
      };
    });
  }, []);

  const openEditor = (note: string) => {
    console.log(`open note: ${note}`);
    navigation.navigate('note-editor' && 'muistiinpanoeditori', { filename: note });
    // navigation.navigate('note-editor', { filename: note });
  };

  return (
    <View>
      <Text>my-notes</Text>
      {notes.map((note, i) => (
        <View key={`note-${i}`}>
          <Button title={note} onPress={() => openEditor(note)} />
        </View>
      ))}
    </View>
  );
};

export default MyNotes;
