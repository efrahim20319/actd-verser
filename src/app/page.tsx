"use client"

import Canvas from "@/components/Canvas/Canvas";
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
import VerseBlock from "@/components/VerseBlock/verseBlock";
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
import ToolBar from "@/components/ToolBar/ToolBar";
import createTitle from "@/utils/createTitle";
import styles from "./styles.module.scss";
import Header from "@/components/Header/Header";
import SelectionCard from "@/components/SelectionCard/SelectionCard";
import PreviewCard from "@/components/PreviewCard/PreviewCard";



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

  async function getVerses(version: Version, book: Book, chapter: string) {
    const url = `https://www.abibliadigital.com.br/api/verses/${version.abbrev}/${book.abbrev.pt}/${chapter}`
    fetch(url, {
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
          console.log("Deu erro");
        }
      })
  }



  function clear() {
    setverseByNumber(new Map());
    setVersesStates((prev => [...prev].fill(false)));
    setPassageTitle("");
  }



  return (
    <AppContext.Provider value={{ setSelectedImage, imageState, versesStates, setVersesStates, setPassageTitle, verses, version, setChapters, setChapter, clear, getVerses, chapters, chapter, setBooks, setBook, books, book, setverseByNumber, setVersion, setVerses, passageTitle, selectedImage, bold, fontFamily, lineHeight, setBold, canvasRef, setFontFamily, setLineHeight, setSpaceBetweenVerses, setTitleFontSize, setVerseFontSize, spaceBetweenVerses, titleFontSize, verseFontSize, verseByNumber, language, setLanguage }}>
      <Header />
      <ToolBar bold fontFamily={fontFamily} lineHeight={lineHeight} setBold={setBold} 
      setFontFamily={setFontFamily} setLineHeight={setLineHeight}
       setSpaceBetweenVerses={setSpaceBetweenVerses} setTitleFontSize={setTitleFontSize} 
       setVerseFontSize={setVerseFontSize}
       spaceBetweenVerses={spaceBetweenVerses}
       titleFontSize={titleFontSize}
       verseFontSize={verseFontSize}
       />
      <main className={styles.content}>
        <SelectionCard />
        <PreviewCard />
      </main>
    </AppContext.Provider>
  );
}
