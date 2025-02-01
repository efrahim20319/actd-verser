"use client"

import { Verse } from "@/models/Verse";
import { Dispatch, FunctionComponent, MutableRefObject, SetStateAction, useEffect, useRef } from "react";

interface CanvasProps {
    verseByNumber: Map<number, Verse>;
    canvasRef: MutableRefObject<any>
    passageTitle: string;
    titleFontSize: number;
    verseFontSize: number;
    lineHeight: number;
    spaceBetweenVerses: number;
    fontFamily: string;
    bold: boolean;
    imageSrc: String;
}


function printAtWordWrap(context: any, text: string, x: number, y: number, lineHeight: number, fitWidth: number) {
    fitWidth = fitWidth || 0;
    lineHeight = lineHeight || 20;

    var currentLine = 0;
    let lastLine = y;
    var lines = text.split(/\r\n|\r|\n/);
    for (var line = 0; line < lines.length; line++) {
        if (fitWidth <= 0) {
            context.fillText(lines[line], x, y + (lineHeight * currentLine));
            // context.strokeText(lines[line], x, y + (lineHeight * currentLine));
            lastLine = y + (lineHeight * currentLine);
        } else {
            var words = lines[line].split(' ');
            var idx = 1;
            while (words.length > 0 && idx <= words.length) {
                var str = words.slice(0, idx).join(' ');
                var w = context.measureText(str).width;
                if (w > fitWidth) {
                    if (idx == 1) {
                        idx = 2;
                    }
                    context.fillText(words.slice(0, idx - 1).join(' '), x, y + (lineHeight * currentLine));
                    // context.strokeText(words.slice(0, idx - 1).join(' '), x, y + (lineHeight * currentLine));
                    lastLine = y + (lineHeight * currentLine);
                    currentLine++;
                    words = words.splice(idx - 1);
                    idx = 1;
                }
                else { idx++; }
            }
            if (idx > 0) {
                context.fillText(words.join(' '), x, y + (lineHeight * currentLine));
                // context.strokeText(words.join(' '), x, y + (lineHeight * currentLine));
                lastLine = y + (lineHeight * currentLine);
            }
        }
        currentLine++;
    }
    return lastLine;
}

function printVerse(verse: Verse, context: any, currentHeight: number = 150, textWidth = 1350, lineHeight = 60, spaceBetweenVerses = 80) {
    currentHeight = printAtWordWrap(context, (`${verse.number} - ${verse.text}`), 60, currentHeight, lineHeight, textWidth);
    return currentHeight + spaceBetweenVerses;
}

const Canvas: FunctionComponent<CanvasProps> = ({ verseByNumber, canvasRef, passageTitle, bold, fontFamily, lineHeight, titleFontSize, verseFontSize, spaceBetweenVerses, imageSrc }) => {

    useEffect(() => {
        const image = new Image();
        image.src = String(imageSrc);

        const canvas = canvasRef.current as any;
        const context = canvas.getContext('2d');
        const verses = Array.from(verseByNumber.values());
        verses.sort((a, b) => {
            if (a.number > b.number) {
                return 1;
            }
            return -1;
        });
        image.onload = (e) => {
            if (canvasRef.current) {

                canvasRef.current.width = image.naturalWidth;
                canvasRef.current.height = image.naturalHeight;
            }
            context.drawImage(image, 0, 0);
            context.font = `${bold ? "bold" : ""} ${titleFontSize}px ${fontFamily}`; //Title configuration
            context.fillStyle = 'black';
            context.textAlign = "center";
            const versesString: string = verses.map(verse => `(${verse.number}) ${verse.text}`).join()
            if (image.src) {
                
                image.style.filter = "blur(105px)";
                let currentHeight = 150; //Height after the title
                context.fillText(passageTitle, Number(image.naturalWidth) / 2, 80);
                context.textAlign = "start";
                context.font = `${bold ? "bold" : ""} ${verseFontSize}px ${fontFamily}`; //Verse configuration
                // printAtWordWrap(context, versesString, 100, 150, 55, 1350);
                for (const verse of verses) {
                    currentHeight = printVerse(verse, context, currentHeight, Number(image.naturalWidth) * 0.90, lineHeight, spaceBetweenVerses);

                }
            }
        }


    }, [verseByNumber, canvasRef, passageTitle, bold, fontFamily, titleFontSize, verseFontSize, lineHeight, spaceBetweenVerses, imageSrc])

    return (<canvas className="w-full rounded-md" ref={canvasRef} />);
}

export default Canvas;