"use client"

import Canvas from "@/components/Canvas";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,

} from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VerseBlock from "@/components/verseBlock";
import { languages } from "@/data/languages";
import { versionByAbbrev } from "@/data/versionByAbbrev";
import { IBook } from "@/utils/IBook";
import { ILanguage } from "@/utils/ILanguage";
import { Iverse } from "@/utils/Iverse";
import { IVersion } from "@/utils/IVersion";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";


export default function Home() {
  const token = process.env.NEXT_PUBLIC_AUTHTOKEN;


  const [language, setLanguage] = useState(languages[0]);
  const [version, setVersion] = useState<IVersion>(languages[0].versions[0]);
  const [books, setBooks] = useState<IBook[]>([] as any);
  const [book, setBook] = useState<IBook>([] as any);
  const [chapters, setChapters] = useState<string[]>([]);
  const [chapter, setChapter] = useState<string>(""); //provavelmente sera apagado
  const [verses, setVerses] = useState<Iverse[]>([]);
  const [verseByNumber, setverseByNumber] = useState<Map<number, Iverse>>(new Map());
  const canvasRef = useRef(null as any);
  const [versesStates, setVersesStates] = useState<boolean[]>([])
  const [passageTitle, setPassageTitle] = useState("");

  const [titleFontSize, setTitleFontSize] = useState(60);
  const [verseFontSize, setVerseFontSize] = useState(60);
  const [lineHeight, setLineHeight] = useState(60);
  const [spaceBetweenVerses, setSpaceBetweenVerses] = useState(80);
  const [bold, setBold] = useState(false);
  const [fontFamily, setFontFamily] = useState("Arial");





  useEffect(() => {
    fetch("https://www.abibliadigital.com.br/api/books", {
      headers: {
        "authorization": `Bearer ${token}`
      }
    })
      .then((results) => {
        if (results.ok) {
          results.json().then(data => { setBooks(data) }
          )
        }
      })
  }, [])

  function getVerses(version: IVersion, book: IBook, chapter: string) {
    fetch(`https://www.abibliadigital.com.br/api/verses/${version.abbrev}/${book.abbrev.pt}/${chapter}`, {
      headers: {
        "authorization": `Bearer ${token}`
      }
    })
      .then(results => {
        if (results.ok) {
          results.json().then(data => {
            setVerses(data.verses)
            setVersesStates(Array(data.verses.length).fill(false));
          })
        } else {
          console.log(results);
        }
      })
  }

  function createTitle(book: IBook, chapter: string, verses: Iverse[]): string {
    if (verses.length == 0) {
      return "";
    }
    if (verses.length == 1) {
      return `${book.name} ${chapter}:${verses[0].number}`;
    }
    let finalString = String(verses[0].number);
    let countSeq = 0;
    let atual, prev;
    for (let index = 1; index < verses.length; index++) {

      if (verses[index - 1].number == verses[index].number - 1) {
        countSeq += 1;
      }
      if ((verses[index - 1].number != verses[index].number - 1) && countSeq > 0) {
        countSeq = 0;
        finalString += ` - ${verses[index - 1].number},${verses[index].number}`
        continue;
      }
      if ((verses[index - 1].number != verses[index].number - 1) && countSeq == 0) {
        finalString += `,${verses[index].number}`
      }
      if ((verses[index - 1].number == verses[index].number - 1) && (index == verses.length - 1)) {
        finalString += ` - ${verses[index].number}`
      }
    }
    return `${book.name} ${chapter}:${finalString}`;
  }

  function clear() {
    setverseByNumber(new Map());
    setVersesStates((prev => [...prev].fill(false)));
    setPassageTitle("");
  }



  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-center text-white  text-2xl bg-slate-500 p-6">
        <div><h1 className="inline font-bold">ACTD</h1> <span>Verser</span></div>
      </header>
      <main className="bg-gray-50 flex flex-col items-center">
        <div className="flex justify-between items-center m-5 gap-6 p-4 bg-white shadow-md rounded-md">
          <div>
            <h2>Tamanho do titulo</h2>
            <div className="flex gap-2 p-2 rounded-md bg-slate-200">
            <Input defaultValue={titleFontSize} placeholder="Size in pixels" onChange={(evt) => setTitleFontSize(Number(evt.target.value))} type="number" min={0} max={200} />
            </div>
          </div>
          <div>
            <h2>Tamanho dos versiculos</h2>
            <div className="flex gap-2 p-2 rounded-md bg-slate-200">
              <Input defaultValue={verseFontSize} placeholder="Size in pixels" onChange={(evt) => setVerseFontSize(Number(evt.target.value))} type="number" min={0} max={200}/>
            </div>
          </div>
          <div>
            <h2>Espaçamento entre linhas</h2>
            <div className="flex gap-2 p-2 rounded-md bg-slate-200">
            <Input defaultValue={lineHeight} placeholder="Size in pixels" onChange={(evt) => setLineHeight(Number(evt.target.value))} type="number" min={0} max={200}/>
            </div>
          </div>
          <div>
            <h2>Espaçamento entre versiculos</h2>
            <div className="flex gap-2 p-2 rounded-md bg-slate-200">
            <Input defaultValue={spaceBetweenVerses} placeholder="Size in pixels" onChange={(evt) => setSpaceBetweenVerses(Number(evt.target.value))} type="number" min={0} max={200}/>
            </div>
          </div>
          <div>
            <h2>Fonte</h2>
            <div className="flex gap-2 p-2 rounded-md bg-slate-200">
              <Select onValueChange={(font) => {
                setFontFamily(font)
              }}>
                <SelectTrigger className="w-[10em]">
                  <SelectValue placeholder="Font" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                  <SelectItem value="Courier New">Courier New</SelectItem>
                  <SelectItem value="Verdana">Verdana</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Toggle onClick={() => { setBold(prev => !prev) }} variant={"outline"} className="p-3 rounded-md ">Negrito</Toggle>
          </div>
        </div>
        <section className="flex flex-1 justify-around">
          <Card className="h-fit w-[40%] shadow-lg">
            <CardHeader>
              <CardTitle>Select the verse</CardTitle>
              <CardDescription>Select he chapter and verse that will be used</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-3">
                <div>
                  <Label>Language</Label>
                  <Select onValueChange={(value) => {
                    const selectedLang = languages.filter(language => language.abbrev == value);
                    setLanguage(selectedLang[0]);
                    setVerses([]);
                    setverseByNumber(new Map());
                  }} >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent >
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
                </div>
                <div>
                  <Label >Bible Version</Label>
                  <Select onValueChange={(value) => {
                    setVersion((versionByAbbrev.get(value) as IVersion))
                    setVerses([]); //resetar versiculos
                    setverseByNumber(new Map()); // resetar o mar verseByNumber
                    if (book && chapter) {
                      clear();
                      getVerses(versionByAbbrev.get(value) as IVersion, book, chapter);

                    }
                  }}>
                    <SelectTrigger className="w-[20em]">
                      <SelectValue placeholder="Version" />
                    </SelectTrigger>
                    <SelectContent>
                      {language.versions.map((version, index) => {
                        return (<SelectItem key={index} value={version.abbrev}>{version.fullName}</SelectItem>)
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-between mb-3">
                <div>
                  <Label>Book</Label>
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
                    <SelectTrigger className="w-[20em]">
                      <SelectValue placeholder="Books" />
                    </SelectTrigger>
                    <SelectContent>
                      {books.map((book, index) => {
                        return (<SelectItem key={index} value={book['abbrev']['pt']}>{book['name']}</SelectItem>)
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Chapter</Label>
                  <Select onValueChange={value => {
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
                </div>
              </div>
              {(verses.length != 0) ?
                (<div className="grid grid-cols-4 gap-4 bg-slate-100 p-2 max-h-56 overflow-y-scroll">
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
            <CardFooter className="justify-start gap-2">
              <Button onClick={() => clear()} >Clear</Button>
            </CardFooter>
          </Card >
          <Card className="h-fit w-[50%] shadow-lg">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>Card Description</CardDescription>
              <div className="flex flex-wrap gap-3">

              </div>
            </CardHeader>
            <CardContent>
              <Canvas passageTitle={passageTitle} canvasRef={canvasRef} verseByNumber={verseByNumber} titleFontSize={titleFontSize}
                verseFontSize={verseFontSize} bold={bold} fontFamily={fontFamily} lineHeight={lineHeight} spaceBetweenVerses={spaceBetweenVerses}/>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={async () => {
                const inputFile = document.createElement('input');
                inputFile.type = "file"
                const newImage = new Image();
                const reader = new FileReader();
                inputFile.onchange = (ev) => {
                  // newImage.src = 
                  // console.log(inputFile.files[0]);
                  reader.onload = e => {
                    console.log(ev);
                  }

                }
                inputFile.click();
              }}>Change Image</Button> <Button onClick={() => {
                const verses = Array.from(verseByNumber.values());
                verses.sort((a, b) => {
                  if (a.number > b.number) {
                    return 1;
                  }
                  return -1;
                });
                if (verses.length != 0) {
                  const link = document.createElement('a');
                  let filename = createTitle(book, chapter, verses).replace(":", " v ");
                  if (verses.length != 0) {

                    link.download = `${filename}.png`;
                  }

                  link.href = canvasRef.current.toDataURL();
                  link.click();
                } else {
                  alert("Nenhum versiculo selecionado")
                }
              }}>Download</Button>
            </CardFooter>
          </Card>
        </section>

      </main>
    </div>
  );
}
