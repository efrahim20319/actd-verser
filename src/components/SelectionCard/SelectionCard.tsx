import { FunctionComponent } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import styles from "./style.module.scss";

interface SelectionCardProps {

}

const SelectionCard: FunctionComponent<SelectionCardProps> = () => {
    return (<Card className={styles.selectionCard}>
        <CardHeader>
            <CardTitle>Select the verse</CardTitle>
            <CardDescription>Select the chapter and verse that will be used</CardDescription>
        </CardHeader>
        <CardContent>

        </CardContent>
        <CardFooter >

        </CardFooter>
    </Card>
    );
}

export default SelectionCard;