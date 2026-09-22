// Wordlist de moderação PT/EN (assédio, violência sexual, violência física)
// Uso: import { verificar } from "./wordlist.js";
//      verificar("fui violada no trabalho") -> ["assedio", "regex_pt", ...]  ([] = passou)

const WORDLIST = {
  "violencia_sexual": {
    "alta_confianca": {
      "pt": [
        "estupro",
        "estuprada",
        "estuprado",
        "estupraram",
        "estuprou",
        "estuprador",
        "abuso sexual",
        "abusos sexuais",
        "abusada sexualmente",
        "abusado sexualmente",
        "abusaram de mim",
        "abusou de mim",
        "abusou sexualmente",
        "agressão sexual",
        "agredida sexualmente",
        "agredido sexualmente",
        "violência sexual",
        "coação sexual",
        "coagida sexualmente",
        "coagido sexualmente",
        "importunação sexual",
        "crime sexual",
        "crimes sexuais",
        "forçada a ter relações",
        "forçado a ter relações",
        "obrigou-me a ter relações",
        "obrigou-me a ter sexo",
        "forçou-me a ter sexo",
        "me forçou a ter relações",
        "sexo forçado",
        "sexo sem consentimento",
        "sem o meu consentimento",
        "tocou-me sem consentimento",
        "me tocou sem consentimento",
        "apalpou-me",
        "me apalpou",
        "apalpada",
        "apalpado",
        "violação sexual",
        "fui violada",
        "fui violado",
        "violaram-me",
        "me violaram",
        "violou-me",
        "me violou",
        "violador",
        "pedofilia",
        "pedófilo",
        "abuso de menores"
      ],
      "en": [
        "rape",
        "raped",
        "rapes",
        "raping",
        "rapist",
        "sexual assault",
        "sexually assaulted",
        "sexual abuse",
        "sexually abused",
        "molest",
        "molested",
        "molesting",
        "molestation",
        "molester",
        "groped",
        "groping",
        "fondled",
        "non-consensual",
        "nonconsensual",
        "without my consent",
        "forced me to have sex",
        "forced himself on me",
        "forced herself on me",
        "forced sex",
        "date rape",
        "drugged and raped",
        "roofied",
        "sexual violence",
        "sexual coercion",
        "sexually coerced",
        "child abuse",
        "pedophile",
        "paedophile"
      ],
      "variantes_ofuscadas": [
        "r4pe",
        "r4ped",
        "rap3",
        "rap3d",
        "r@pe",
        "r@ped",
        "raep",
        "raeped",
        "rapeed",
        "raaped",
        "r.a.p.e",
        "r a p e",
        "r*pe",
        "r*ped",
        "estupr4da",
        "estupr@da",
        "estrupo",
        "estrupada",
        "estrupado",
        "abus4da",
        "s3x forçado"
      ]
    },
    "ambiguos": {
      "pt": [
        "violada",
        "violado",
        "violação",
        "violaram",
        "violou",
        "abusada",
        "abusado",
        "abuso",
        "abusaram",
        "tocou-me",
        "me tocou"
      ],
      "en": [
        "rapped",
        "raped",
        "assaulted",
        "abused",
        "touched me",
        "forced me"
      ]
    }
  },
  "assedio": {
    "alta_confianca": {
      "pt": [
        "assédio",
        "assédio sexual",
        "assédio moral",
        "assediada",
        "assediado",
        "assediaram",
        "assediou",
        "assediador",
        "assediar",
        "mobbing",
        "bullying no trabalho",
        "bullying laboral",
        "perseguida pelo chefe",
        "perseguido pelo chefe",
        "ambiente de trabalho hostil",
        "ameaçou despedir-me se não",
        "propostas sexuais",
        "chantagem sexual",
        "comentários sexuais",
        "stalker",
        "stalking",
        "perseguição"
      ],
      "en": [
        "harassment",
        "sexual harassment",
        "harassed",
        "sexually harassed",
        "harassing me",
        "harrassed",
        "harrasment",
        "harasment",
        "harrassment",
        "workplace bullying",
        "bullied at work",
        "hostile work environment",
        "quid pro quo",
        "sexual advances",
        "unwanted advances",
        "stalked",
        "stalking",
        "stalker",
        "catcalled"
      ],
      "variantes_ofuscadas": [
        "ass3dio",
        "@ssedio",
        "asedio",
        "assedio",
        "asediada",
        "har4ssed",
        "h@rassed",
        "harr@ssed",
        "h4rassment"
      ]
    },
    "ambiguos": {
      "pt": [
        "perseguida",
        "perseguido",
        "humilhada",
        "humilhado",
        "intimidada",
        "intimidado"
      ],
      "en": [
        "bullied",
        "harass",
        "intimidated",
        "humiliated"
      ]
    }
  },
  "violencia_fisica": {
    "alta_confianca": {
      "pt": [
        "violência doméstica",
        "espancada",
        "espancado",
        "espancaram-me",
        "me espancaram",
        "bateu-me",
        "me bateu",
        "agrediu-me",
        "me agrediu",
        "fui agredida",
        "fui agredido",
        "agressão física",
        "maus-tratos",
        "maus tratos",
        "estrangulou-me",
        "me estrangulou"
      ],
      "en": [
        "domestic violence",
        "domestic abuse",
        "beat me",
        "beaten up",
        "he hit me",
        "she hit me",
        "physically abused",
        "physical abuse",
        "choked me",
        "strangled me",
        "assaulted me"
      ]
    },
    "ambiguos": {
      "pt": [
        "agredida",
        "agredido",
        "agressão",
        "bateram"
      ],
      "en": [
        "beaten",
        "hit me",
        "attacked"
      ]
    }
  },
  "padroes_regex": {
    "pt": [
      "\\b(fui|fomos|tenho sido|estou a ser)\\s+(violad[ao]s?|estuprad[ao]s?|estrupad[ao]s?|abusad[ao]s?|assediad[ao]s?|agredid[ao]s?|molestad[ao]s?|apalpad[ao]s?|espancad[ao]s?)\\b",
      "\\b(foi|foram|ser|sido|tinha sido|esta a ser)\\s+(estuprad[ao]s?|estrupad[ao]s?|assediad[ao]s?|agredid[ao]s?|molestad[ao]s?|apalpad[ao]s?|espancad[ao]s?|(violad[ao]s?|abusad[ao]s?)\\s+sexualmente)\\b",
      "\\b(sofri|sofreu|sofremos|sofro|sofre|sofrem|vitima|vitimas)\\s+(de\\s+)?(um\\s+|uma\\s+)?(assedio|abuso|abusos|violacao|violencia|agressao|agressoes|estupro|bullying|mobbing|perseguicao|importunacao)",
      "\\b(me|te|a|o|nos)\\s+(violou|violaram|estuprou|estupraram|abusou|abusaram|assediou|assediaram|agrediu|agrediram|apalpou|apalparam)\\b",
      "\\b(violou|violaram|estuprou|estupraram|abusou|abusaram|assediou|assediaram|agrediu|apalpou)-(me|te|a|o|nos)\\b",
      "\\b(abusou|abusaram|aproveitou-se|aproveitaram-se|se aproveitou)\\s+(de mim|dela|dele|de nos)\\b",
      "\\b(no|na|do|da)\\s+(trabalho|emprego|escritorio|empresa|escola|faculdade)\\b.*\\b(assedi\\w*|viola\\w*|abus\\w*|estupr\\w*|agred\\w*|agress\\w*)\\b",
      "\\b(assedi\\w*|viola\\w*|abus\\w*|estupr\\w*|agred\\w*|agress\\w*)\\b.*\\b(no|na)\\s+(trabalho|emprego|escritorio|empresa|escola|faculdade)\\b"
    ],
    "en": [
      "\\b(i|she|he|we|they)\\s+(was|were|got|have been|has been|had been|am being|is being)\\s+(raped|rapped|r4ped|raeped|molested|groped|harassed|harrassed|assaulted|abused|stalked|drugged|sexually\\s+(assaulted|harassed|abused))\\b",
      "\\b(been|being|getting|got)\\s+(raped|rapped|molested|groped|sexually\\s+\\w+|harassed|harrassed)\\b",
      "\\b(he|she|they|someone|my\\s+\\w+)\\s+(raped|rapped|molested|groped|assaulted|abused|harassed|touched)\\s+(me|her|him|us)\\b",
      "\\b(victim|survivor)\\s+of\\s+(rape|sexual|assault|abuse|harassment|domestic)",
      "\\b(suffered|experienced|endured|faced)\\s+(sexual\\s+)?(harassment|abuse|assault|rape|bullying)\\b",
      "\\b(at|in)\\s+(work|the office|my job|school|college)\\b.*\\b(rap\\w*|harass\\w*|molest\\w*|assault\\w*|abus\\w*|grop\\w*)\\b",
      "\\b(rap\\w*|harass\\w*|molest\\w*|assault\\w*|abus\\w*|grop\\w*)\\b.*\\b(at|in)\\s+(work|the office|my job|school|college)\\b"
    ]
  }
};

const LEET = { "4": "a", "@": "a", "3": "e", "1": "i", "!": "i", "0": "o", "$": "s", "5": "s", "7": "t" };

function normalizar(texto) {
  let t = String(texto).toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, ""); // remove acentos
  t = t.replace(/[4@31!0$57]/g, (c) => LEET[c]);          // leetspeak
  t = t.replace(/(?<=\w)[.*_\-](?=\w)/g, "");             // r.a.p.e / r*pe -> rape
  t = t.replace(/(\w)\1{2,}/g, "$1$1");                   // raaaaped -> raaped
  return t.replace(/\s+/g, " ").trim();
}

const escapar = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Inclui alta_confianca e ambiguos — na versão anterior os termos "ambiguos"
// estavam definidos mas nunca entravam no matching.
const TERMOS = [];
const REGEX = [];
for (const [cat, dados] of Object.entries(WORDLIST)) {
  if (cat === "padroes_regex") continue;
  for (const nivel of ["alta_confianca", "ambiguos"]) {
    const grupos = dados[nivel];
    if (!grupos) continue;
    for (const lista of Object.values(grupos)) {
      for (const termo of lista) {
        TERMOS.push([cat, new RegExp("\\b" + escapar(normalizar(termo)) + "\\b")]);
      }
    }
  }
}
for (const [lang, pads] of Object.entries(WORDLIST.padroes_regex)) {
  for (const p of pads) REGEX.push(["regex_" + lang, new RegExp(p)]);
}

/** Devolve as categorias detetadas (array vazio = passou). */
export function verificar(texto) {
  const t = normalizar(texto);
  const hits = new Set();
  for (const [cat, rx] of TERMOS) if (rx.test(t)) hits.add(cat);
  for (const [cat, rx] of REGEX) if (rx.test(t)) hits.add(cat);
  return [...hits].sort();
}

export { WORDLIST, normalizar };
