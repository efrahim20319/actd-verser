import { Language } from "@/models/Language";
import { Version } from "@/models/Version";
import { versionByAbbrev } from "./versionByAbbrev";

export const languages: Language[] = [
    {
      abbrev: "ptr", fullName: "Portugues",
      versions: [versionByAbbrev.get('acf'), versionByAbbrev.get('nvi'), versionByAbbrev.get('ra')] as Version[]
    },
    {
      abbrev: "frc", fullName: "French",
      versions: [versionByAbbrev.get('apee')] as Version[]
    },
    {
      abbrev: "eng", fullName: "English",
      versions: [versionByAbbrev.get('bbe'), versionByAbbrev.get('kjv')] as Version[]
    },
    {
      abbrev: "spn", fullName: "Spanish",
      versions: [versionByAbbrev.get('rvr')] as Version[]
    },
  ]