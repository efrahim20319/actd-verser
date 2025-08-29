import {FunctionComponent, useContext} from "react";
import style from "./style.module.scss"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {MenuIcon, MinusIcon, PlusIcon} from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import AppContext from "@/app/appContext";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Toggle} from "@/components/ui/toggle";


interface HeaderProps {

}

function SettingOption(props: {
    onClickSubtract: () => void,
    name: string,
    value: number | string,
    onClickAdd: () => void
}) {
    return <SheetDescription>
        <Popover>
            <PopoverTrigger>{props.name}</PopoverTrigger>
            <PopoverContent className="flex justify-around">
                <MinusIcon onClick={props.onClickSubtract}/>
                {props.value}
                <PlusIcon onClick={props.onClickAdd}/>
            </PopoverContent>
        </Popover>
    </SheetDescription>;
}

const Header: FunctionComponent<HeaderProps> = () => {
    const context = useContext(AppContext);
    return (<header className={style.header}>
        <div>
            ACTD<span>Verser</span>
        </div>
        <Sheet>
            <SheetTrigger className="block lg:hidden"><MenuIcon/></SheetTrigger>
            <SheetContent className="flex flex-col items-center justify-start">
                <SheetHeader>
                    <SheetTitle>Settings</SheetTitle>
                    <SettingOption onClickSubtract={() => {
                        context.setTitleFontSize((prev) => prev - 1)
                    }}
                                   value={context.titleFontSize}
                                   name="Tamanho do titulo"
                                   onClickAdd={() => {
                                       context.setTitleFontSize((prev) => prev + 1)
                                   }}/>
                    <SettingOption onClickSubtract={() => {
                        context.setVerseFontSize((prev) => prev - 1)
                    }}
                                   value={context.verseFontSize}
                                   name="Tamanho do versiculo"
                                   onClickAdd={() => {
                                       context.setVerseFontSize((prev) => prev + 1)
                                   }}/>
                    <SettingOption onClickSubtract={() => {
                        context.setLineHeight((prev) => prev - 1)
                    }}
                                   value={context.lineHeight}
                                   name="Espaçamento entre linhas"
                                   onClickAdd={() => {
                                       context.setLineHeight((prev) => prev + 1)
                                   }}/>
                    <SettingOption onClickSubtract={() => {
                        context.setSpaceBetweenVerses((prev) => prev - 1)
                    }}
                                   value={context.spaceBetweenVerses}
                                   name="Espaçamento entre versiculos"
                                   onClickAdd={() => {
                                       context.setSpaceBetweenVerses((prev) => prev + 1)
                                   }}/>
                    <SheetDescription>
                        <Popover>
                            <PopoverTrigger>Fonte</PopoverTrigger>
                            <PopoverContent className="flex justify-around">
                                <Select onValueChange={(font) => {
                                    context.setFontFamily(font)
                                }}>
                                    <SelectTrigger className="w-[10em]">
                                        <SelectValue placeholder="Font"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Arial">Arial</SelectItem>
                                        <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                                        <SelectItem value="Courier New">Courier New</SelectItem>
                                        <SelectItem value="Verdana">Verdana</SelectItem>
                                    </SelectContent>
                                </Select>
                            </PopoverContent>
                        </Popover>
                    </SheetDescription>
                </SheetHeader>
                <Toggle
                    pressed={context.bold} // 🔑 Agora o toggle depende do valor do contexto
                    onPressedChange={(value) => {
                        context.setBold(value) // atualiza o contexto
                    }}
                    variant={"outline"}
                    className="p-3 rounded-md"
                >
                    Negrito
                </Toggle>

            </SheetContent>
        </Sheet>
    </header>);
}

export default Header;
