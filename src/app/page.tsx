"use client"

import Canvas from "@/components/Canvas";
import { Button } from "@/components/ui/button";
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
import { useEffect, useRef, useState } from "react";


interface ILanguage {
  abbrev: string;
  fullName: string;
  versions: IVersion[]
}

interface IVersion {
  abbrev: string;
  fullName: string;
}

interface IBook {
  abbrev: {
    pt: string,
    en: string
  },
  author: string,
  chapters: number,
  group: string,
  name: string,
  testament: string
}

export interface Iverse {
  number: number;
  text: string
}

export default function Home() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHIiOiJNb24gQXVnIDEyIDIwMjQgMTM6MTg6NDggR01UKzAwMDAuZWZyYWhpbXRrc0BnbWFpbC5jb20iLCJpYXQiOjE3MjM0Njg3Mjh9.tSvIHXnoxOkLC93q0Rddky_DGW3wOIS14ghuGdO7DEU";
  const versionByAbbrev: Map<string, IVersion> = new Map();
  versionByAbbrev.set("acf", { abbrev: "acf", fullName: "Almeida Corrigida Fiel" })
  versionByAbbrev.set("nvi", { abbrev: "nvi", fullName: "Nova Versão Internacional" })
  versionByAbbrev.set("ra", { abbrev: "ra", fullName: "Revista e Atualizada" })
  versionByAbbrev.set("apee", { abbrev: "apee", fullName: "La Bible de l'Épée" })
  versionByAbbrev.set("bbe", { abbrev: "bbe", fullName: "Bible In Basic English" })
  versionByAbbrev.set("kjv", { abbrev: "kjv", fullName: "King James Version" })
  versionByAbbrev.set("rvr", { abbrev: "rvr", fullName: "Reina-Valera" })



  const languages: ILanguage[] = [
    {
      abbrev: "ptr", fullName: "Portugues",
      versions: [versionByAbbrev.get('acf'), versionByAbbrev.get('nvi'), versionByAbbrev.get('ra')] as IVersion[]
    },
    {
      abbrev: "frc", fullName: "French",
      versions: [versionByAbbrev.get('apee')] as IVersion[]
    },
    {
      abbrev: "eng", fullName: "English",
      versions: [versionByAbbrev.get('bbe'), versionByAbbrev.get('kjv')] as IVersion[]
    },
    {
      abbrev: "spn", fullName: "Spanish",
      versions: [versionByAbbrev.get('rvr')] as IVersion[]
    },
  ]

  const [language, setLanguage] = useState(languages[0]);
  const [version, setVersion] = useState<IVersion>(languages[0].versions[0]);
  const [books, setBooks] = useState<IBook[]>([] as any);
  const [book, setBook] = useState<IBook>([] as any);
  const [chapters, setChapters] = useState<string[]>([]);
  const [chapter, setChapter] = useState<string>(""); //provavelmente sera apagado
  const [verses, setVerses] = useState<Iverse[]>([]);
  const [image, setImage] = useState(new Image());
  const [verseByNumber, setverseByNumber] = useState<Map<number, Iverse>>(new Map());
  const canvasRef = useRef(null as any);
  const [versesStates, setVersesStates] = useState<boolean[]>([])
  const [passageTitle, setPassageTitle] = useState("");



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


  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-center text-white  text-2xl bg-slate-500 p-6">
        <div><h1 className="inline font-bold">ACTD</h1> <span>Verser</span></div>
      </header>
      <main className="bg-gray-50 flex flex-1 pt-14 justify-around">
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
                  setVerses([]);
                  setverseByNumber(new Map());
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
                  const selectedBook = books.filter(book => book['abbrev']['pt'] == value)[0];
                  setBook(selectedBook);
                  const newChapters = [];
                  for (let index = 0; index < selectedBook["chapters"]; index++) {
                    newChapters.push(String(index + 1))
                  }

                  setChapters(newChapters);
                  setVerses([]);
                  setverseByNumber(new Map());
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
                  setChapter(value);
                  fetch(`https://www.abibliadigital.com.br/api/verses/${version.abbrev}/${book.abbrev.pt}/${value}`, {
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
                }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Version" />
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
                  setPassageTitle(`${book.name} ${chapter}:${verses[0].number} - ${verses[verses.length - 1].number}`);
                  versesStates[index] = !versesStates[index];
                  setVersesStates([...versesStates]);
                }} key={index}><VerseBlock selected={versesStates[index]} verseNumber={verse.number} /></div>))}
              </div>) : <></>
            }
          </CardContent>
          <CardFooter className="justify-start gap-2">
            <Button onClick={() => { setverseByNumber(new Map()); setVersesStates((prev => [...prev].fill(false))) }} >Clear</Button> <Button >Make</Button>
          </CardFooter>
        </Card >
        <Card className="h-fit w-[50%] shadow-lg">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <Canvas passageTitle={passageTitle} canvasRef={canvasRef} image={image} verseByNumber={verseByNumber} /> */}
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
                link.download = `${book.name} ${chapter} (${verses[0].number} - ${verses[verses.length - 1].number}).png`;
                
                link.href = canvasRef.current.toDataURL();
                link.click();
              } else {
                alert("Nenhum versiculo selecionado")
              }
            }}>Download</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
