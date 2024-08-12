"use client"
import { Iverse } from "@/app/page";
import { document } from "postcss";
import { FunctionComponent, useEffect, useRef } from "react";

interface CanvasProps {
    verses: Iverse[];
    image: HTMLImageElement;
}

function printVerse(verse: Iverse, context: any, currentHeight: number = 150) {
    let startStr = 0, endStr = 50;
    let substring = "";
    
    if (verse.text.length > 55) {
        while (startStr < verse.text.length) {
            substring = verse.text.substring(startStr, endStr);
            if (substring.startsWith(" ")) substring.substring(1);
            context.fillText(substring, 100, currentHeight); // You can adjust the position and style
            currentHeight += 55;
            startStr += 50;
            endStr += 50;
        }
    } else {
        context.fillText(verse.text, 100, currentHeight); // You can adjust the position and style
        currentHeight += 55;
    }
    return currentHeight + 15;
}

const Canvas: FunctionComponent<CanvasProps> = ({ verses, image }) => {
    const canvasRef = useRef(null);
    image.src = "/assets/img/test.jpg";
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        image.onload = (e) => {
            context.drawImage(image, 0, 0);
            context.font = '60px Arial';
            context.fillStyle = 'white';
            if (image.src) {
                let currentHeight = 150;
                for (const verse of verses) {
                    currentHeight = printVerse(verse, context, currentHeight);
                }
            }
        }



    }, [verses, image])
    
    return (<canvas className="w-full rounded-md" width={1536} height={878} ref={canvasRef} />);
}

export default Canvas;