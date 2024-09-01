import { ILanguage } from "@/utils/ILanguage";
import { IVersion } from "@/utils/IVersion";
import { versionByAbbrev } from "./versionByAbbrev";

export const languages: ILanguage[] = [
    {
      abbrev: "ptr", fullName: "Portugues",
      versions: [versionByAbbrev.get('acf'), versionByAbbrev.get('nvi'), versionByAbbrev.get('ra')] as IVersion[]
    },
    {
      abbrev: "frc", fullName: "French",
      versions: [versionByAbbrev.get('apee')] as IVersion[]
    },
    {
      abbrev: "eng", fullName: "English",
      versions: [versionByAbbrev.get('bbe'), versionByAbbrev.get('kjv')] as IVersion[]
    },
    {
      abbrev: "spn", fullName: "Spanish",
      versions: [versionByAbbrev.get('rvr')] as IVersion[]
    },
  ]