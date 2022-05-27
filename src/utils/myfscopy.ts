import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

const subDir = '/notes/';

export const initPath = () => new Promise<void>((res) => {
    RNFS.mkdir(getPath()).finally(() => res());
});

// only non-promise function
export const getPath = (): string | any => {
    if (Platform.OS === 'android') return RNFS.DocumentDirectoryPath + subDir
    else if (Platform.OS === 'ios') return RNFS.MainBundlePath + subDir
}

export const writeNote = (title: string, note: string, format = '.txt') => {
    return new Promise<void>((res, rej) => {
        // /path/to/notes/title.format
        const notepath = title.includes(format) ?
            getPath() + title :
            getPath() + title + format;
        console.log({ title, note, format, notepath });
        RNFS.writeFile(notepath, note)
            .then(() => res())
            .catch((err) => {
                console.log('error at writeFile');
                console.log({ err });
                rej();
            });
    });
};

export const readNote = (filename: string): any => new Promise((res, rej) => {
    const filepath = getPath() + filename; // /path/to/notes/filename.txt
    RNFS.readFile(filepath)
        .then((fileContent) => res(fileContent))
        .catch((err) => {
            console.log('error reading file');
            console.log({ err });
        });
});

export const listNotes: any = () => {
    return new Promise((res, rej) => {
        RNFS.readDir(getPath())
            .then((items) => {
                console.log({ items });
                const notesOnly = [];
                for (const item of items) {
                    if (item.isFile() && item.name.split('.txt')) notesOnly.push(item.name)
                }
                res(notesOnly);
            })
            .catch((err) => {
                console.log({ err });
                initPath();
                res([]);
            })
    })
}


export async function deleteNote(filename: string) {
    const filepath = getPath() + filename;
    if (filepath) {
        // exists call delete
        await RNFS.unlink(filepath);
        console.log("Note Deleted");
    } else {
        console.log("Note Not Available")
    }
}

