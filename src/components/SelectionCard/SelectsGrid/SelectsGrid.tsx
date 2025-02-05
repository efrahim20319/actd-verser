import { Combobox } from "@/components/ui/combobox";
import { FunctionComponent } from "react";
import styles from "./style.module.scss"

interface SelectsGridProps {

}

const SelectsGrid: FunctionComponent<SelectsGridProps> = () => {
    return (
        <section className={styles.selectsGrid}>
            <Combobox />
            <Combobox />
            <Combobox />
            <Combobox />
        </section>);
}

export default SelectsGrid;