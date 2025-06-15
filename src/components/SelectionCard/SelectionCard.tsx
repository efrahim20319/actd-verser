import { Dispatch, FunctionComponent, SetStateAction, useContext } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import styles from "./style.module.scss";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import VerseBlock from "../VerseBlock/verseBlock";
import { Button } from "../ui/button";
import { languages } from "@/data/languages";
import { Language } from "@/models/Language";
import AppContext from "@/app/appContext";
import { Version } from "@/models/Version";
import { Verse } from "@/models/Verse";
import { versionByAbbrev } from "@/data/versionByAbbrev";
import { Book } from "@/models/Book";
import createTitle from "@/utils/createTitle";

interface SelectionCardProps {

}

const SelectionCard: FunctionComponent<SelectionCardProps> = () => {
    const context = useContext(AppContext);
    const setverseByNumber = context.setverseByNumber;
    const setPassageTitle = context.setPassageTitle;
    const setVersesStates = context.setVersesStates;
    let verses = context.verses;
    let book = context.book;
    let chapter = context.chapter;
    let verseByNumber = context.verseByNumber;
    let versesStates = context.versesStates;
    return (<Card className="w-[40%]">
        <CardHeader>
            <CardTitle>Select the verse</CardTitle>
            <CardDescription>Select the chapter and verse that will be used</CardDescription>
        </CardHeader>
        <CardContent className="h-full">
            <VersesSelects setChapter={context.setChapter} chapters={context.chapters} version={context.version} setChapters={context.setChapters} setBook={context.setBook} books={context.books} clear={context.clear} getVerses={context.getVerses} chapter={context.chapter} book={context.book} language={context.language} setLanguage={context.setLanguage} setVerses={context.setVerses} setVersion={context.setVersion} setverseByNumber={context.setverseByNumber} />
            {(verses.length != 0) ?
                  (<div className="grid grid-cols-4 gap-2 bg-slate-100 p-2 max-h-56 overflow-y-scroll">
                    {verses.map((verse, index) => (<div onClick={() => {
                      setverseByNumber((prev) => {
                        if (prev.has(verse.number)) {
                          prev.delete(verse.number);
                          return new Map(prev);
                        }
                        prev.set(verse.number, verse);
                        return new Map(prev);
                      })
                      const verses = Array.from(verseByNumber.values());
                      verses.sort((a, b) => {
                        if (a.number > b.number) {
                          return 1;
                        }
                        return -1;
                      });

                      setPassageTitle(createTitle(book, chapter, verses));
                      versesStates[index] = !versesStates[index];
                      setVersesStates([...versesStates]);
                    }} key={index}><VerseBlock selected={versesStates[index]} verseNumber={verse.number} /></div>))}
                  </div>) : <></>
                }
        </CardContent>
        <CardFooter >
            <Button onClick={() => context.clear()} >Clear</Button>
        </CardFooter>
    </Card>
    );
}

export default SelectionCard;

interface VersesSelectsProps {
    language: Language,
    setLanguage: Dispatch<SetStateAction<Language>>,
    setVersion: Dispatch<SetStateAction<Version>>
    setVerses: Dispatch<SetStateAction<Verse[]>>,
    setverseByNumber: Dispatch<SetStateAction<Map<number, Verse>>>,
    book: Book,
    setBook: Dispatch<SetStateAction<Book>>
    books: Book[],
    chapter: string,
    chapters: string[],
    setChapter: Dispatch<SetStateAction<string>>,
    setChapters: Dispatch<SetStateAction<string[]>>,
    version: Version
    getVerses: (version: Version, book: Book, chapter: string) => void,
    clear: () => void
}

const VersesSelects: FunctionComponent<VersesSelectsProps> = ({ setChapter,  chapters, version, setChapters, setBook, language, setLanguage, setVerses, setVersion, setverseByNumber, book, books, chapter, clear, getVerses }) => {
    return (<div className="grid grid-cols-2 gap-2 mb-2">
        <Select onValueChange={(value) => {
            const selectedLang = languages.filter(language => language.abbrev == value);
            setLanguage(selectedLang[0]);
            setVerses([]);
            setverseByNumber(new Map());
        }}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
                {(languages).map((value, index) => {
                    return (<div onClick={() => {
                        setLanguage(value);
                    }} key={index}>
                        <SelectItem value={value.abbrev}>{value.fullName}</SelectItem>
                    </div>
                    )
                })}
            </SelectContent>
        </Select>
        <Select onValueChange={(value) => {
            setVersion((versionByAbbrev.get(value) as Version))
            setVerses([]); //resetar versiculos
            setverseByNumber(new Map()); // resetar o mar verseByNumber
            if (book && chapter) {
                clear();
                getVerses(versionByAbbrev.get(value) as Version, book, chapter);

            }
        }}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Bible Version" />
            </SelectTrigger>
            <SelectContent>
                {language.versions.map((version, index) => {
                    return (<SelectItem key={index} value={version.abbrev}>{version.fullName}</SelectItem>)
                })}
            </SelectContent>
        </Select>
        <Select onValueChange={(value) => {
            const [selectedBook] = books.filter(book => book['abbrev']['pt'] == value);
            setBook(selectedBook);
            const newChapters = [];
            for (let index = 0; index < selectedBook["chapters"]; index++) {
                newChapters.push(String(index + 1))
            }
            setChapters(newChapters);
            setVerses([]);
            setverseByNumber(new Map());
            console.log(chapter);
            console.log(version, book, chapter);

            getVerses(version, selectedBook, chapter);
        }}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Book" />
            </SelectTrigger>
            <SelectContent>
                {books.map((book, index) => {
                    return (<SelectItem key={index} value={book['abbrev']['pt']}>{book['name']}</SelectItem>)
                })}
            </SelectContent>
        </Select>
        <Select onValueChange={(value) => {
            clear();
            setChapter(value);
            getVerses(version, book, value);
        }}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Chapter" />
            </SelectTrigger>
            <SelectContent>
                {chapters.map((chapter, index) => {
                    return <SelectItem key={index} value={chapter}>{chapter}</SelectItem>
                })}
            </SelectContent>
        </Select>
    </div>);
}

