import type { Place } from "./types";

/**
 * Acervo inicial (seed). Substitua as imagens placeholder
 * quando receber fotos reais com endereço e década.
 */
export const places: Place[] = [
  {
    id: "clube-orpheu",
    name: "Clube de Piscinas Orpheu",
    address: "Rua Independência, 30 — Centro, São Leopoldo/RS",
    lat: -29.76326,
    lng: -51.14643,
    story:
      "Espaço de lazer ligado à tradição associativa leopoldense. As piscinas e o entorno da Rua Independência guardam cenas de verões e encontros que moldaram a vida social da cidade.",
    photos: [
      {
        decade: 1950,
        src: "/places/clube-orpheu/1950-a.jpg",
        credit: "Acervo comunitário",
        caption:
          "Área das piscinas do Orpheu — vista com o espelho d’água ornamental em primeiro plano.",
      },
      {
        decade: 1950,
        src: "/places/clube-orpheu/1950-b.jpg",
        credit: "Acervo comunitário",
        caption:
          "Outra tomada do mesmo complexo: piscina retangular e trabalhos no entorno.",
      },
    ],
  },
  {
    id: "av-sao-borja-21",
    name: "Avenida São Borja, 21",
    address: "Av. São Borja, 21 — Rio Branco, São Leopoldo/RS — CEP 93032-000",
    lat: -29.7705,
    lng: -51.1351,
    story:
      "Edifício no bairro Rio Branco, testemunha de um pedaço da cidade que o tempo e o abandono marcaram. Registrar a fachada hoje é um gesto de memória — antes que o endereço vire só terreno ou recordação.",
    photos: [
      {
        decade: 2020,
        yearExact: 2024,
        src: "/places/av-sao-borja-21/atual.jpg",
        credit: "Acervo comunitário",
        caption:
          "Fachada atual do edifício na Av. São Borja, 21 — Rio Branco.",
      },
    ],
  },
  {
    id: "museu-historico",
    name: "Museu Histórico Visconde de São Leopoldo",
    address: "Rua Coronel Feijó, 774 — Centro, São Leopoldo/RS",
    lat: -29.76185,
    lng: -51.14725,
    story:
      "Espaço dedicado à memória da cidade e da imigração alemã. Ao longo das décadas, o entorno do centro mudou de fachada — mas o papel do museu como guardião da história permanece.",
    photos: [
      {
        decade: 1950,
        yearExact: 1952,
        src: "/places/museu-historico/1950.svg",
        credit: "Acervo exemplo — substituir por foto real",
        caption: "Centro histórico na metade do século XX.",
      },
      {
        decade: 1980,
        yearExact: 1984,
        src: "/places/museu-historico/1980.svg",
        credit: "Acervo exemplo — substituir por foto real",
        caption: "Fachada e movimento urbano nos anos 1980.",
      },
      {
        decade: 2010,
        yearExact: 2015,
        src: "/places/museu-historico/2010.svg",
        credit: "Acervo exemplo — substituir por foto real",
        caption: "O museu no século XXI.",
      },
    ],
  },
  {
    id: "parque-feitoria",
    name: "Parque da Feitoria",
    address: "Feitoria Velha — São Leopoldo/RS",
    lat: -29.7445,
    lng: -51.092,
    story:
      "Berço simbólico da colonização alemã no Brasil. Em 25 de julho de 1824, os primeiros imigrantes desembarcaram nesta região — marco que São Leopoldo carrega até hoje.",
    photos: [
      {
        decade: 1920,
        src: "/places/parque-feitoria/1920.svg",
        credit: "Acervo exemplo — substituir por foto real",
        caption: "Paisagem e memória da Feitoria no início do século.",
      },
      {
        decade: 1960,
        yearExact: 1965,
        src: "/places/parque-feitoria/1960.svg",
        credit: "Acervo exemplo — substituir por foto real",
        caption: "O sítio histórico consolidado como lugar de memória.",
      },
      {
        decade: 2000,
        yearExact: 2008,
        src: "/places/parque-feitoria/2000.svg",
        credit: "Acervo exemplo — substituir por foto real",
        caption: "Parque e visitação no início dos anos 2000.",
      },
    ],
  },
  {
    id: "praca-imigrante",
    name: "Praça do Imigrante",
    address: "Centro — São Leopoldo/RS",
    lat: -29.7595,
    lng: -51.1485,
    story:
      "Coração cívico da cidade. Praças, comércios e igrejas do centro testemunharam gerações de leopoldenses — e muitas fachadas que sumiram só sobrevivem em fotografias de família.",
    photos: [
      {
        decade: 1930,
        src: "/places/praca-imigrante/1930.svg",
        credit: "Acervo exemplo — substituir por foto real",
        caption: "O centro visto por quem viveu os anos 1930.",
      },
      {
        decade: 1970,
        yearExact: 1972,
        src: "/places/praca-imigrante/1970.svg",
        credit: "Acervo exemplo — substituir por foto real",
        caption: "Transformações urbanas na década de 1970.",
      },
      {
        decade: 2020,
        yearExact: 2022,
        src: "/places/praca-imigrante/2020.svg",
        credit: "Acervo exemplo — substituir por foto real",
        caption: "O mesmo endereço, outro tempo.",
      },
    ],
  },
];

export function getPlaceById(id: string): Place | undefined {
  return places.find((place) => place.id === id);
}

export function getDecadesForPlace(place: Place): number[] {
  return [...new Set(place.photos.map((photo) => photo.decade))].sort(
    (a, b) => a - b,
  );
}

export function getAllDecades(): number[] {
  const decades = new Set<number>();
  for (const place of places) {
    for (const photo of place.photos) {
      decades.add(photo.decade);
    }
  }
  return [...decades].sort((a, b) => a - b);
}

export function placesWithDecade(decade: number | null): Place[] {
  if (decade === null) return places;
  return places.filter((place) =>
    place.photos.some((photo) => photo.decade === decade),
  );
}
