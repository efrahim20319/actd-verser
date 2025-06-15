import { FunctionComponent } from "react";
import style from "./style.module.scss"

interface HeaderProps {

}

const Header: FunctionComponent<HeaderProps> = () => {
    return (<header className={style.header}>
        ACTD<span >Verser</span>
    </header>);
}

export default Header;
