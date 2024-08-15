"use client"
import { Iverse } from "@/app/page";
import { Dispatch, FunctionComponent, MutableRefObject, SetStateAction, useEffect, useRef } from "react";

interface CanvasProps {
    verseByNumber: Map<number, Iverse>;
    image: HTMLImageElement;
    canvasRef: MutableRefObject<null>
}

function printVerse(verse: Iverse, context: any, currentHeight: number = 150) {
    let startStr = 0, endStr = 60;
    let heightIncrement = 55;
    let substring = "";
    let firstInteration = true;
    const textWidth = 1350;
    
    if (verse.text.length > endStr) {
        while (startStr <= verse.text.length) {
            if (firstInteration) {
                substring = (verse.number + " - " + verse.text.substring(startStr, endStr)).trim();
                firstInteration = false;
            } else { substring = (verse.text.substring(startStr, endStr)).trim(); }
            context.fillText(substring, 100, currentHeight, textWidth); // You can adjust the position and style
            currentHeight += heightIncrement;
            startStr += endStr;
            endStr += endStr;
        }
    } else {
        context.fillText(verse.number + " - " + verse.text, 100, currentHeight, textWidth); // You can adjust the position and style
        currentHeight += heightIncrement;
    }
    return currentHeight + 15;
}

const Canvas: FunctionComponent<CanvasProps> = ({ verseByNumber, image, canvasRef }) => {
    
    image.src = "/assets/img/test.jpg";
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        const verses = verseByNumber.values().toArray().sort((a, b) => {
            if (a.number > b.number) {
                return 1;
            }
            return -1;
        });
        image.onload = (e) => {
            canvasRef.current.width = image.naturalWidth;
            canvasRef.current.height = image.naturalHeight;
            context.drawImage(image, 0, 0);
            context.font = '50px Arial';
            context.fillStyle = 'white';

            if (image.src) {
                let currentHeight = 150;
                for (const verse of verses) {
                    currentHeight = printVerse(verse, context, currentHeight);
                }
            }
        }


    }, [verseByNumber, image, canvasRef])

    return (<canvas className="w-full rounded-md" ref={canvasRef} />);
}

export default Canvas;