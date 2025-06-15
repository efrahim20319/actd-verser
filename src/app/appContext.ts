import { Book } from '@/models/Book';
import { Language } from '@/models/Language';
import { Verse } from '@/models/Verse';
import { Version } from '@/models/Version';
import { createContext, Dispatch, MutableRefObject, SetStateAction } from 'react';

interface AppContext {
    titleFontSize: number;
    setTitleFontSize: Dispatch<SetStateAction<number>>;
    verseFontSize: number
    setVerseFontSize: Dispatch<SetStateAction<number>>;
    lineHeight: number;
    setLineHeight: Dispatch<SetStateAction<number>>;
    spaceBetweenVerses: number;
    setSpaceBetweenVerses: Dispatch<SetStateAction<number>>;
    bold: boolean;
    setBold: Dispatch<SetStateAction<boolean>>;
    fontFamily: string;
    setFontFamily: Dispatch<SetStateAction<string>>,
    canvasRef: MutableRefObject<any>,
    verseByNumber: Map<number, Verse>,
    setverseByNumber: Dispatch<SetStateAction<Map<number, Verse>>>,
    selectedImage: string,
    setSelectedImage: Dispatch<SetStateAction<string>>,
    imageState: number[]
    passageTitle: string,
    setPassageTitle: Dispatch<SetStateAction<string>>
    language: Language,
    setLanguage: Dispatch<SetStateAction<Language>>,
    setVersion: Dispatch<SetStateAction<Version>>
    setVerses: Dispatch<SetStateAction<Verse[]>>,
    book: Book,
    setBook: Dispatch<SetStateAction<Book>>,
    books: Book[],
    setBooks: Dispatch<SetStateAction<Book[]>>,
    chapter: string
    chapters: string[],
    setChapter: Dispatch<SetStateAction<string>>,
    setChapters: Dispatch<SetStateAction<string[]>>,
    version: Version,
    verses: Verse[],
    versesStates: boolean[],
    setVersesStates: Dispatch<SetStateAction<boolean[]>>

    getVerses: (version: Version, book: Book, chapter: string) => void,
    clear: () => void
}


const AppContext = createContext<AppContext>({} as any);


export default AppContext;
