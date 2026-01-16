const PREPOSICIONES = [
  "a",
  "ante",
  "bajo",
  "cabe",
  "con",
  "contra",
  "de",
  "desde",
  "durante",
  "en",
  "entre",
  "hacia",
  "hasta",
  "mediante",
  "para",
  "por",
  "según",
  "sin",
  "so",
  "sobre",
  "tras",
  "versus",
  "vía",
  "mientras",
];

const ARTICULOS_Y_CONTRACCIONES = [
  "el",
  "la",
  "los",
  "las",
  "un",
  "una",
  "unos",
  "unas",
  "al",
  "del",
  "lo",
];

const CONJUNCIONES = [
  "y",
  "e",
  "ni",
  "que",
  "o",
  "u",
  "pero",
  "mas",
  "sino",
  "porque",
  "pues",
  "aunque",
  "si",
  "como",
  "cuando",
  "donde",
  "no",
  "ya",
  "sea",
  "bien",
  "ya que",
  "aun cuando",
  "si bien",
];

const PRONOMBRES_ATONOS_Y_POSESIVOS_CORTOS = [
  "me",
  "te",
  "se",
  "nos",
  "os",
  "le",
  "les",
  "mi",
  "tu",
  "su",
  "mis",
  "tus",
  "sus",
  "nuestro",
  "nuestra",
  "nuestros",
  "nuestras",
  "vuestro",
  "vuestra",
  "vuestros",
  "vuestras",
];

const PALABRAS_RANDOM_NO_VALIDAS = ["cosa"];

const VERBOS_COPULATIVOS_AUXILIARES = ["es", "son", "fue", "era", "ha", "han", "hay"];

export const SPANISH_COMMON_BLACKLIST = [
  ...PREPOSICIONES,
  ...ARTICULOS_Y_CONTRACCIONES,
  ...CONJUNCIONES,
  ...PRONOMBRES_ATONOS_Y_POSESIVOS_CORTOS,
  ...VERBOS_COPULATIVOS_AUXILIARES,
  ...PALABRAS_RANDOM_NO_VALIDAS,
];

export function cyrb53(str: string, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

export function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const normalizeWord = (word: string) => {
  return word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
};
