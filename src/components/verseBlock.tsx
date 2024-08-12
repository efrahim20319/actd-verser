import { DOMAttributes, FunctionComponent, MouseEventHandler, useState } from "react";

interface VerseBlockProps {
    verseNumber: number;
}

const VerseBlock: FunctionComponent<VerseBlockProps> = ({ verseNumber }) => {
    return (<div className="bg-slate-300 flex justify-center items-center h-10 font-bold text-white rounded-sm hover:bg-slate-500 cursor-pointer transition-all duration-300 ease-linear">
        {verseNumber}
    </div>);
}

export default VerseBlock;