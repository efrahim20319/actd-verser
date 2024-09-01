import { IVersion } from "./IVersion";

export interface ILanguage {
    abbrev: string;
    fullName: string;
    versions: IVersion[]
}