import { FunctionComponent } from "react";
import styles from "./styles.module.scss";
import VerseBlock from "../VerseBlock/verseBlock";
interface VersesGridProps {

}

const VersesGrid: FunctionComponent<VersesGridProps> = () => {
    return (<div className={styles.versesGrid}>
        <VerseBlock selected={true} verseNumber={1}/>
        <VerseBlock selected={false} verseNumber={1}/>
        <VerseBlock selected={false} verseNumber={1}/>
        <VerseBlock selected={false} verseNumber={1}/>
        <VerseBlock selected={false} verseNumber={1}/>
        <VerseBlock selected={false} verseNumber={1}/>
        <VerseBlock selected={false} verseNumber={1}/>
        <VerseBlock selected={false} verseNumber={1}/>
        <VerseBlock selected={false} verseNumber={1}/>
        <VerseBlock selected={false} verseNumber={1}/>
        <VerseBlock selected={false} verseNumber={1}/>
        <VerseBlock selected={false} verseNumber={1}/>
        <VerseBlock selected={false} verseNumber={1}/>
        <VerseBlock selected={false} verseNumber={1}/>
        <VerseBlock selected={false} verseNumber={1}/>
        <VerseBlock selected={false} verseNumber={1}/>
        <VerseBlock selected={false} verseNumber={1}/>
        <VerseBlock selected={false} verseNumber={1}/>
    
    </div>);
}

export default VersesGrid;