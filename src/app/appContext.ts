import { createContext, Dispatch, SetStateAction } from 'react';

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
    setFontFamily: Dispatch<SetStateAction<string>>
}


const AppContext = createContext<AppContext>({} as any);


export default AppContext;
