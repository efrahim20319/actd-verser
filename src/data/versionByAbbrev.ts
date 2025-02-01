import { Version } from "@/models/Version";

export const versionByAbbrev: Map<string, Version> = new Map();
  versionByAbbrev.set("acf", { abbrev: "acf", fullName: "Almeida Corrigida Fiel" })
  versionByAbbrev.set("nvi", { abbrev: "nvi", fullName: "Nova Versão Internacional" })
  versionByAbbrev.set("ra", { abbrev: "ra", fullName: "Revista e Atualizada" })
  versionByAbbrev.set("apee", { abbrev: "apee", fullName: "La Bible de l'Épée" })
  versionByAbbrev.set("bbe", { abbrev: "bbe", fullName: "Bible In Basic English" })
  versionByAbbrev.set("kjv", { abbrev: "kjv", fullName: "King James Version" })
  versionByAbbrev.set("rvr", { abbrev: "rvr", fullName: "Reina-Valera" })