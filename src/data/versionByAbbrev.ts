import { IVersion } from "@/utils/IVersion";

export const versionByAbbrev: Map<string, IVersion> = new Map();
  versionByAbbrev.set("acf", { abbrev: "acf", fullName: "Almeida Corrigida Fiel" })
  versionByAbbrev.set("nvi", { abbrev: "nvi", fullName: "Nova Versão Internacional" })
  versionByAbbrev.set("ra", { abbrev: "ra", fullName: "Revista e Atualizada" })
  versionByAbbrev.set("apee", { abbrev: "apee", fullName: "La Bible de l'Épée" })
  versionByAbbrev.set("bbe", { abbrev: "bbe", fullName: "Bible In Basic English" })
  versionByAbbrev.set("kjv", { abbrev: "kjv", fullName: "King James Version" })
  versionByAbbrev.set("rvr", { abbrev: "rvr", fullName: "Reina-Valera" })