import { Book } from "@/models/Book";
import { Verse } from "@/models/Verse";

function createTitle(book: Book, chapter: string, verses: Verse[]): string { //Function for creating the text displayed in the top, respecting the order of the verses
    if (verses.length == 0) {
        return "";
    }
    if (verses.length == 1) {
        return `${book.name} ${chapter}:${verses[0].number}`;
    }
    let finalString = String(verses[0].number);
    let countSeq = 0;
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

export default createTitle;