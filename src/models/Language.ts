import { Version } from "./Version";

export interface Language {
    abbrev: string;
    fullName: string;
    versions: Version[]
}