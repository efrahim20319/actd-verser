import { Combobox } from "@/components/combobox";
import { FunctionComponent } from "react";
import styles from "./style.module.scss"

interface SelectsGridProps {

}

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]

const SelectsGrid: FunctionComponent<SelectsGridProps> = () => {
    return (
        <section className={styles.selectsGrid}>
            <Combobox title="Language" placeHolder="select language" list={frameworks} />
            <Combobox title="Bible Version" placeHolder="select language" list={frameworks} />
            <Combobox title="Book" placeHolder="select language" list={frameworks} />
            <Combobox title="Chapter" placeHolder="select language" list={frameworks} />
        </section>);
}

export default SelectsGrid;