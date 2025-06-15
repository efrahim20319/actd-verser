export default interface ComboBoxItem {
    title: string;
    placeHolder: string;
    list: {
        label: string;
        value: string;
    }[]
}