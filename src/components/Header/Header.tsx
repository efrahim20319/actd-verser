import { FunctionComponent } from "react";
import style from "./style.module.scss"

interface HeaderProps {

}

const Header: FunctionComponent<HeaderProps> = () => {
    return (<header className={style.header}>
        Hello<span>World</span>
    </header>);
}

export default Header;
