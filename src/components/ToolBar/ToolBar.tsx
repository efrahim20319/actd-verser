import { Context, Dispatch, FunctionComponent, SetStateAction, useContext } from "react";

import { Language } from "@/models/Language";
import AppContext from "@/app/appContext";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Toggle } from "../ui/toggle";

interface ToolBarProps {
    titleFontSize: number,
    setTitleFontSize: Dispatch<SetStateAction<number>>;
    verseFontSize: number
    setVerseFontSize: Dispatch<SetStateAction<number>>;
    lineHeight: number;
    setLineHeight: Dispatch<SetStateAction<number>>;
    spaceBetweenVerses: number;
    setSpaceBetweenVerses: Dispatch<SetStateAction<number>>;
    bold: boolean;
    setBold: Dispatch<SetStateAction<boolean>>;
    fontFamily: string;
    setFontFamily: Dispatch<SetStateAction<string>>,
}

const ToolBar: FunctionComponent<ToolBarProps> = ({titleFontSize, setTitleFontSize, verseFontSize, setVerseFontSize, lineHeight, setLineHeight, spaceBetweenVerses, setSpaceBetweenVerses, setFontFamily, setBold}) => {
    return (<div  className="flex justify-around items-center  p-3 bg-white shadow-md ">
        <div>
            <h2>Tamanho do titulo</h2>
            <div className="flex gap-2  rounded-md bg-slate-200">
                <Input height="2" defaultValue={titleFontSize} placeholder="Size in pixels" onChange={(evt) => setTitleFontSize(Number(evt.target.value))} type="number" min={0} max={200} />
            </div>
        </div>
        <div>
            <h2>Tamanho dos versiculos</h2>
            <div className="flex gap-2 rounded-md bg-slate-200">
                <Input defaultValue={verseFontSize} placeholder="Size in pixels" onChange={(evt) => setVerseFontSize(Number(evt.target.value))} type="number" min={0} max={200} />
            </div>
        </div>
        <div>
            <h2>Espaçamento entre linhas</h2>
            <div className="flex gap-2 rounded-md bg-slate-200">
                <Input defaultValue={lineHeight} placeholder="Size in pixels" onChange={(evt) => setLineHeight(Number(evt.target.value))} type="number" min={0} max={200} />
            </div>
        </div>
        <div>
            <h2>Espaçamento entre versiculos</h2>
            <div className="flex gap-2 rounded-md bg-slate-200">
                <Input defaultValue={spaceBetweenVerses} placeholder="Size in pixels" onChange={(evt) => setSpaceBetweenVerses(Number(evt.target.value))} type="number" min={0} max={200} />
            </div>
        </div>
        <div>
            <h2>Fonte</h2>
            <div className="flex gap-2  rounded-md bg-slate-200">
                <Select onValueChange={(font) => {
                    setFontFamily(font)
                }}>
                    <SelectTrigger className="w-[10em]">
                        <SelectValue placeholder="Font" />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectItem value="Arial">Arial</SelectItem>
                        <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                        <SelectItem value="Courier New">Courier New</SelectItem>
                        <SelectItem value="Verdana">Verdana</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div>
            <Toggle onClick={() => { setBold(prev => !prev) }} variant={"outline"} className="p-3 rounded-md ">Negrito</Toggle>
        </div>
    </div>);
}

export default ToolBar;






