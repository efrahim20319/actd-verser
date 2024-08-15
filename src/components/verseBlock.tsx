import { DOMAttributes, FunctionComponent, MouseEventHandler, useEffect, useState } from "react";
import { twMerge as tm } from 'tailwind-merge'
interface VerseBlockProps {
    verseNumber: number;
    selected: boolean;
}

const VerseBlock: FunctionComponent<VerseBlockProps> = ({ verseNumber,  selected}) => {
    return (<div className={tm(
        "bg-slate-300 flex justify-center items-center h-10 font-bold text-white rounded-sm hover:bg-slate-500 cursor-pointer transition-all duration-300 ease-linear",
        selected && "bg-slate-500")}>
        {verseNumber}
    </div>);
}

export default VerseBlock;