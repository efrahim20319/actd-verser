import { FunctionComponent } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import styles from "./style.module.scss";
import SelectsGrid from "../SelectsGrid/SelectsGrid";
import VersesGrid from "../VersesGrid";
import { Button } from "../ui/button";

interface SelectionCardProps {

}

const SelectionCard: FunctionComponent<SelectionCardProps> = () => {
    return (<Card className={styles.selectionCard}>
        <CardHeader className={styles.selectionCard__header}>
            <CardTitle>Select the verse</CardTitle>
            <CardDescription>Select the chapter and verse that will be used</CardDescription>
        </CardHeader>
        <CardContent className={styles.selectionCard__content}>
            <SelectsGrid />
            <VersesGrid />
        </CardContent>
        <CardFooter className={styles.selectionCard__footer}>
            <Button variant={"secondary"}>Clear</Button>
            <Button variant={"secondary"}>Commands</Button>
        </CardFooter>
    </Card>
    );
}

export default SelectionCard;