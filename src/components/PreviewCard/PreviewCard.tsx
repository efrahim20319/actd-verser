import { FunctionComponent, useCallback, useContext } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import styles from "./style.module.scss";
import Canvas from "../Canvas/Canvas";
import AppContext from "@/app/appContext";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import createTitle from "@/utils/createTitle";
import Image from 'next/image';


interface SelectionCardProps {

}

const PreviewCard: FunctionComponent<SelectionCardProps> = () => {
    const context = useContext(AppContext);
    const imageState = context.imageState;
    const verseByNumber = context.verseByNumber;
    const book = context.book;
    const chapter = context.chapter;
    const canvasRef = context.canvasRef;
    return (<Card className="w-[58%]">
        <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Output image</CardDescription>
        </CardHeader>
        <CardContent>
            <Canvas passageTitle={context.passageTitle} imageSrc={context.selectedImage} bold={context.bold} canvasRef={context.canvasRef} fontFamily={context.fontFamily} lineHeight={context.lineHeight} spaceBetweenVerses={context.spaceBetweenVerses} titleFontSize={context.titleFontSize} verseFontSize={context.verseFontSize} verseByNumber={context.verseByNumber} />
        </CardContent>
        <CardFooter className="flex justify-between" >
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
                                <div className="relative cursor-pointer" key={index} onClick={() => { context.setSelectedImage(`/assets/img/bible-${index + 1}.jpg`); }}>
                                     <Image className="w-80 h-80" src={`/assets/img/bible-${index + 1}.jpg`} alt="Image" width={3000} height={3000} />
                                    <div className="absolute top-[50%] left-[50%]">
                                        
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
    );
}

export default PreviewCard;