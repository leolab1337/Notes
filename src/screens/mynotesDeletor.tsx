import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Button } from 'react-native';
import { deleteNote, listNotes } from '../utils/myfscopy';


const settingOpts = (opts = { lang: 'EN' }) => {
    const _settings = {
        lang: opts.lang,
    };
    return _settings;
};


export const MyNotesDeletor = ({ dispatch, lang }: { dispatch: any, lang: string }) => {
    const [notes, setNotes] = useState([]);
    const [deleteNoteFlag, setDeleteNoteFlag] = useState(false)
    const { t, i18n } = useTranslation();

    useEffect(() => {
        AsyncStorage.getItem('settings')
            .then((settingsJSON: JSON | any) => {
                const _settings = settingOpts(JSON.parse(settingsJSON));
                console.log({ _settings, settingsJSON });
                i18n.changeLanguage(_settings.lang);
                dispatch({ type: _settings.lang });
            })
            .catch((settingsJSON: JSON | any) => {
                const _settings = settingOpts();
                console.log({ _settings, settingsJSON });
                i18n.changeLanguage(_settings.lang);
                dispatch({ type: _settings.lang });
            });
    }, []);


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
    }, [deleteNoteFlag]);



    function deleteourNote(note: string) {
        deleteNote(note)
        setDeleteNoteFlag(!deleteNoteFlag)
    }

    return (
        <View>
            <Text>{t('NotesDeletor')}</Text>
            {notes.map((note, i) => (
                <View key={`note-${i}`}>
                    <Button title={note} onPress={() => deleteourNote(note)} />
                </View>
            ))}
        </View>
    );
};

export default MyNotesDeletor;