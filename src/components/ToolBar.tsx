import { Dispatch, FunctionComponent, SetStateAction, useContext } from "react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Toggle } from "./ui/toggle";
import { Language } from "@/models/Language";
import AppContext from "@/app/appContext";

interface ToolBarProps {
}

const ToolBar: FunctionComponent<ToolBarProps> = () => {
    const appContext = useContext(AppContext);
    return (<><div className="flex justify-between items-center m-5 gap-6 p-4 bg-white shadow-md rounded-md">
        <div>
            <h2>Tamanho do titulo</h2>
            <div className="flex gap-2 p-2 rounded-md bg-slate-200">
                <Input defaultValue={appContext.titleFontSize} placeholder="Size in pixels" onChange={(evt) => appContext.setTitleFontSize(Number(evt.target.value))} type="number" min={0} max={200} />
            </div>
        </div>
        <div>
            <h2>Tamanho dos versiculos</h2>
            <div className="flex gap-2 p-2 rounded-md bg-slate-200">
                <Input defaultValue={appContext.verseFontSize} placeholder="Size in pixels" onChange={(evt) => appContext.setVerseFontSize(Number(evt.target.value))} type="number" min={0} max={200} />
            </div>
        </div>
        <div>
            <h2>Espaçamento entre linhas</h2>
            <div className="flex gap-2 p-2 rounded-md bg-slate-200">
                <Input defaultValue={appContext.lineHeight} placeholder="Size in pixels" onChange={(evt) => appContext.setLineHeight(Number(evt.target.value))} type="number" min={0} max={200} />
            </div>
        </div>
        <div>
            <h2>Espaçamento entre versiculos</h2>
            <div className="flex gap-2 p-2 rounded-md bg-slate-200">
                <Input defaultValue={appContext.spaceBetweenVerses} placeholder="Size in pixels" onChange={(evt) => appContext.setSpaceBetweenVerses(Number(evt.target.value))} type="number" min={0} max={200} />
            </div>
        </div>
        <div>
            <h2>Fonte</h2>
            <div className="flex gap-2 p-2 rounded-md bg-slate-200">
                <Select onValueChange={(font) => {
                    appContext.setFontFamily(font)
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
            <Toggle onClick={() => { appContext.setBold(prev => !prev) }} variant={"outline"} className="p-3 rounded-md ">Negrito</Toggle>
        </div>
    </div>
    </>);
}

export default ToolBar;