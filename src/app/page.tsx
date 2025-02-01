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
import { Book } from "@/models/Book";
import { Verse } from "@/models/Verse";
import { Version } from "@/models/Version";
import { useContext, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";
import AppContext from "./appContext";
import ToolBar from "@/components/ToolBar";
import createTitle from "@/utils/createTitle";



export default function Home() {
  const token = process.env.NEXT_PUBLIC_AUTHTOKEN;

  const [language, setLanguage] = useState(languages[0]);
  const [version, setVersion] = useState<Version>(languages[0].versions[0]);
  const [books, setBooks] = useState<Book[]>([] as any);
  const [book, setBook] = useState<Book>([] as any);
  const [chapters, setChapters] = useState<string[]>([]);
  const [chapter, setChapter] = useState<string>(""); //provavelmente sera apagado
  const [verses, setVerses] = useState<Verse[]>([]);
  const [verseByNumber, setverseByNumber] = useState<Map<number, Verse>>(new Map());
  const canvasRef = useRef(null as any);
  const [versesStates, setVersesStates] = useState<boolean[]>([])
  const [passageTitle, setPassageTitle] = useState("");

  const [titleFontSize, setTitleFontSize] = useState(60);
  const [verseFontSize, setVerseFontSize] = useState(60);
  const [lineHeight, setLineHeight] = useState(60);
  const [spaceBetweenVerses, setSpaceBetweenVerses] = useState(80);
  const [bold, setBold] = useState(false);
  const [fontFamily, setFontFamily] = useState("Arial");

  const imageState = [1, 2, 3, 4];
  const [selectedImage, setSelectedImage] = useState("/assets/img/bible-1.jpg");





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

  function getVerses(version: Version, book: Book, chapter: string) {
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



  function clear() {
    setverseByNumber(new Map());
    setVersesStates((prev => [...prev].fill(false)));
    setPassageTitle("");
  }



  return (
    <AppContext.Provider value={{ bold, fontFamily, lineHeight, setBold, setFontFamily, setLineHeight, setSpaceBetweenVerses, setTitleFontSize, setVerseFontSize, spaceBetweenVerses, titleFontSize, verseFontSize }}>
      <div className="min-h-screen flex flex-col">
        <header className="flex justify-center text-white  text-2xl bg-slate-500 p-6">
          <div><h1 className="inline font-bold">ACTD</h1> <span>Verser</span></div>
        </header>
        <main className="bg-gray-50 flex flex-col items-center">
          <ToolBar />
          <section className="flex flex-1 justify-around">
            <Card className="h-fit w-[40%] shadow-lg">+
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
                      setVersion((versionByAbbrev.get(value) as Version))
                      setVerses([]); //resetar versiculos
                      setverseByNumber(new Map()); // resetar o mar verseByNumber
                      if (book && chapter) {
                        clear();
                        getVerses(versionByAbbrev.get(value) as Version, book, chapter);

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
                  verseFontSize={verseFontSize} bold={bold} fontFamily={fontFamily} lineHeight={lineHeight} spaceBetweenVerses={spaceBetweenVerses} imageSrc={selectedImage} />
              </CardContent>
              <CardFooter className="flex justify-between">

                <Dialog >
                  <DialogTrigger asChild>
                    <Button>Change Image</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[90em]">
                    <DialogHeader>
                      <DialogTitle>Changing the image</DialogTitle>
                      <DialogDescription>
                        Select the desired image
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-between">
                      {imageState.map((_, index) => {
                        return (
                          <div className="relative cursor-pointer" key={index} onClick={() => {
                            setSelectedImage(`/assets/img/bible-${index + 1}.jpg`);
                          }}>
                            <Image className="w-80 h-80" src={`/assets/img/bible-${index + 1}.jpg`} alt="Image" width={3000} height={3000} />
                            <div className="absolute top-[50%] left-[50%]">
                              {index + 1}
                            </div>
                          </div>)
                      })}
                    </div>
                  </DialogContent>
                </Dialog>

                <Button onClick={() => {
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
    </AppContext.Provider>

  );
}
