import React, { SetStateAction, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { writeNote, readNote } from '../utils/myfscopy';

// props.route.params.filename
export const NoteEditor = (props: any) => {
  const _tin = { min: 1, max: 10, format: '.txt' }; // min,max title size
  const [title, titleChange] = useState('');
  let [content, contentChange] = useState('');

  useEffect(() => {
    let isSubscribed = true;
    if (
      props.route.params.filename &&
      typeof props.route.params.filename === 'string'
    ) {
      // readNote
      console.log(props.route.params.filename);
      readNote(props.route.params.filename).then((_content: SetStateAction<string>) => {
        if (isSubscribed) {
          titleChange(props.route.params.filename);
          contentChange(_content);
        }

      });
    }
    return () => {
      isSubscribed = false;
    };
  }, []);

  const save = () => {
    if (_tin.min <= title.length && title.length <= _tin.max) {
      writeNote(title, content, _tin.format)
        .then(() => console.log('success write note'))
        .catch(() => console.log('failed write note'));
    } else {
      // handle bad topic
      console.log('bad topic');
      console.log({ title, _tin });
    }
  };

  return (
    <View>
      <Text>create-note</Text>
      <TextInput
        style={styles.tinput}
        onChangeText={titleChange}
        value={title}
        placeholder="title here"
      />
      <TextInput
        style={styles.tarea}
        onChangeText={contentChange}
        value={content}
        placeholder="content here"
        multiline={true}
      />
      <Button title="Save" onPress={() => save()} />
    </View>
  );
};

const styles = StyleSheet.create({
  tarea: {
    height: 160,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  tinput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default NoteEditor;
