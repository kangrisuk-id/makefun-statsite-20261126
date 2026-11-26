// data.js — every figure the site shows, held in one file so each number can
// be checked against its source. National series are the World Bank's World
// Development Indicators (WDI) for Indonesia, retrieved 26 November 2026;
// province figures are Statistics Indonesia (BPS) mid-2025 estimates as
// published in the official provincial table. Nothing is fetched at run time.
//
// Series run 2010-2024 unless a note says otherwise. "wb" below names the
// WDI indicator code, so any figure can be re-queried at api.worldbank.org.

export const YEARS = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

export const SERIES = {
  // SP.POP.TOTL — total population, persons
  population: [246305322, 249470032, 252698525, 255852467, 258877399, 261799249, 264627418, 267346658, 269951846, 272489381, 274814866, 276758053, 278830529, 281190067, 283487931],
  // NY.GDP.MKTP.CD — GDP, current US$
  gdpUsd: [755094157622, 892969104563, 917869913333, 912524136718, 890814755534, 860854232686, 931877364038, 1015618744160, 1042271532989, 1119099871350, 1059054842698, 1186509691087, 1319101183380, 1371166925750, 1396301788462],
  // NY.GDP.PCAP.CD — GDP per capita, current US$
  gdpPerCapitaUsd: [3066, 3579, 3632, 3567, 3441, 3288, 3521, 3799, 3861, 4107, 3854, 4287, 4731, 4876, 4925],
  // NY.GDP.MKTP.KD.ZG — real GDP growth, annual %
  gdpGrowth: [6.22, 6.17, 6.03, 5.56, 5.01, 4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.70, 5.31, 5.05, 5.03],
  // FP.CPI.TOTL.ZG — consumer price inflation, annual average %
  inflation: [5.13, 5.36, 4.28, 6.41, 6.39, 6.36, 3.53, 3.81, 3.20, 3.03, 1.92, 1.56, 4.21, 3.67, 2.18],
  // SP.DYN.LE00.IN — life expectancy at birth, years
  lifeExpectancy: [68.4, 68.6, 68.9, 69.1, 69.3, 69.5, 69.7, 70.0, 70.1, 70.3, 68.8, 67.5, 70.9, 71.1, 71.3],
  // SP.URB.TOTL.IN.ZS — urban population, % of total
  urbanShare: [49.9, 50.5, 51.2, 51.8, 52.5, 53.2, 53.8, 54.5, 55.1, 55.7, 56.3, 56.9, 57.5, 58.1, 58.8],
  // IT.NET.USER.ZS — individuals using the internet, % of population
  internetUsers: [10.9, 12.3, 14.5, 14.9, 17.1, 22.1, 25.4, 32.3, 39.9, 47.7, 53.7, 62.1, 66.5, 69.2, 72.8],
  // SI.POV.NAHC — poverty headcount ratio at the national poverty line, %
  poverty: [13.3, 12.5, 12.0, 11.4, 11.3, 11.2, 10.9, 10.6, 9.8, 9.4, 9.8, 10.1, 9.5, 9.4, 9.0],
  // TX.VAL.MRCH.CD.WT / TM.VAL.MRCH.CD.WT — merchandise exports / imports, current US$
  exportsUsd: [157779000000, 203497000000, 190032000000, 182552000000, 176293000000, 150366000000, 144490000000, 168811000000, 180124000000, 167683000000, 163306000000, 231506000000, 291979000000, 258857000000, 264706000000],
  importsUsd: [135663000000, 177436000000, 191691000000, 186629000000, 178179000000, 142695000000, 135653000000, 156925000000, 188708000000, 171276000000, 141622000000, 196190000000, 237447000000, 221886000000, 233659000000],
  // AG.LND.FRST.ZS — forest area, % of land area
  forestShare: [51.3, 51.2, 51.0, 50.9, 50.7, 50.6, 50.7, 50.7, 50.8, 50.8, 50.9, 50.5, 50.6, 50.6, 50.7],
  // SL.UEM.TOTL.ZS — unemployment, % of labour force (ILO modelled estimate)
  unemploymentIlo: [5.61, 5.15, 4.47, 4.34, 4.05, 4.51, 4.30, 3.78, 4.39, 3.59, 4.25, 3.83, 3.46, 3.31, 3.30],
};

// Age structure, % of population (SP.POP.0014.TO.ZS / SP.POP.1564.TO.ZS /
// SP.POP.65UP.TO.ZS), 2024.
export const AGE_STRUCTURE_2024 = [
  { label: 'Ages 0-14', share: 24.6 },
  { label: 'Ages 15-64', share: 68.1 },
  { label: 'Ages 65 and over', share: 7.3 },
];

// What GDP is made of: value added by sector, % of GDP, 2024
// (NV.AGR.TOTL.ZS / NV.IND.TOTL.ZS / NV.SRV.TOTL.ZS). The three shares sum to
// less than 100 because GDP also counts taxes less subsidies on products.
export const GDP_SECTORS_2024 = [
  { label: 'Services', share: 43.8 },
  { label: 'Industry (incl. manufacturing & mining)', share: 39.3 },
  { label: 'Agriculture, forestry & fishing', share: 12.6 },
];

// Headline facts that are not a yearly series. Each carries its source and
// year on the page, next to the figure.
export const FACTS = {
  provinces: 38,
  regenciesAndCities: 514,
  islandsNamed: 'more than 17,000',
  landAreaKm2: 1904569,
  censusPopulation2020: 270203917,
  openUnemploymentBps: { value: 4.76, when: 'February 2025', source: 'BPS labour force survey (Sakernas)' },
  povertyBps: { value: 8.47, when: 'March 2025', source: 'BPS national poverty line' },
  humanDevelopmentBps: { value: 75.02, when: '2024', source: 'BPS Human Development Index (0-100 scale)' },
  adultLiteracy: { value: 96.0, when: '2020', source: 'World Bank (SE.ADT.LITR.ZS)' },
  capitalCity: 'Jakarta',
  largestCityPopulation: { value: 10678000, when: 'mid-2025', source: 'BPS estimate for Jakarta province' },
};

// All 38 provinces: capital, island region, land area, BPS mid-2025
// population estimate and the density that follows from the two.
export const PROVINCES = [
  { name: "West Java", capital: "Bandung", region: "Java", areaKm2: 37053.3, pop2025: 50759000, density: 1370 },
  { name: "East Java", capital: "Surabaya", region: "Java", areaKm2: 48055.9, pop2025: 42089300, density: 876 },
  { name: "Central Java", capital: "Semarang", region: "Java", areaKm2: 34347.4, pop2025: 38233900, density: 1113 },
  { name: "North Sumatra", capital: "Medan", region: "Sumatra", areaKm2: 72437.8, pop2025: 15785800, density: 218 },
  { name: "Banten", capital: "Serang", region: "Java", areaKm2: 9355.88, pop2025: 12537400, density: 1341 },
  { name: "Jakarta", capital: "Jakarta", region: "Java", areaKm2: 661.53, pop2025: 10678000, density: 16155 },
  { name: "South Sulawesi", capital: "Makassar", region: "Sulawesi", areaKm2: 45324, pop2025: 9563100, density: 211 },
  { name: "Lampung", capital: "Bandar Lampung", region: "Sumatra", areaKm2: 33570.8, pop2025: 9522900, density: 284 },
  { name: "South Sumatra", capital: "Palembang", region: "Sumatra", areaKm2: 86771.9, pop2025: 8928500, density: 103 },
  { name: "Riau", capital: "Pekanbaru", region: "Sumatra", areaKm2: 89900.8, pop2025: 6811200, density: 76 },
  { name: "West Sumatra", capital: "Padang", region: "Sumatra", areaKm2: 42107.7, pop2025: 5914300, density: 140 },
  { name: "West Kalimantan", capital: "Pontianak", region: "Kalimantan", areaKm2: 147018, pop2025: 5766000, density: 39 },
  { name: "East Nusa Tenggara", capital: "Kupang", region: "Lesser Sunda Islands", areaKm2: 46378.1, pop2025: 5742600, density: 124 },
  { name: "West Nusa Tenggara", capital: "Mataram", region: "Lesser Sunda Islands", areaKm2: 19632, pop2025: 5731100, density: 291 },
  { name: "Aceh", capital: "Banda Aceh", region: "Sumatra", areaKm2: 56835, pop2025: 5626000, density: 99 },
  { name: "Bali", capital: "Denpasar", region: "Lesser Sunda Islands", areaKm2: 5582.83, pop2025: 4461300, density: 798 },
  { name: "South Kalimantan", capital: "Banjarbaru", region: "Kalimantan", areaKm2: 37125.4, pop2025: 4323300, density: 116 },
  { name: "East Kalimantan", capital: "Samarinda", region: "Kalimantan", areaKm2: 126952, pop2025: 4267600, density: 34 },
  { name: "Yogyakarta", capital: "Yogyakarta", region: "Java", areaKm2: 3170.36, pop2025: 3781500, density: 1193 },
  { name: "Jambi", capital: "Jambi", region: "Sumatra", areaKm2: 49023, pop2025: 3768500, density: 77 },
  { name: "Central Sulawesi", capital: "Palu", region: "Sulawesi", areaKm2: 61497, pop2025: 3156100, density: 51 },
  { name: "Central Kalimantan", capital: "Palangka Raya", region: "Kalimantan", areaKm2: 153430, pop2025: 2845000, density: 19 },
  { name: "Southeast Sulawesi", capital: "Kendari", region: "Sulawesi", areaKm2: 36139.3, pop2025: 2836700, density: 78 },
  { name: "North Sulawesi", capital: "Manado", region: "Sulawesi", areaKm2: 14488.4, pop2025: 2721400, density: 188 },
  { name: "Riau Islands", capital: "Tanjung Pinang", region: "Sumatra", areaKm2: 8170.38, pop2025: 2213500, density: 268 },
  { name: "Bengkulu", capital: "Bengkulu", region: "Sumatra", areaKm2: 20122.2, pop2025: 2138000, density: 106 },
  { name: "Maluku", capital: "Ambon", region: "Maluku Islands", areaKm2: 46133.8, pop2025: 1970600, density: 43 },
  { name: "Bangka Belitung Islands", capital: "Pangkal Pinang", region: "Sumatra", areaKm2: 16690.2, pop2025: 1550800, density: 93 },
  { name: "West Sulawesi", capital: "Mamuju", region: "Sulawesi", areaKm2: 16590.7, pop2025: 1525300, density: 92 },
  { name: "Central Papua", capital: "Nabire", region: "Papua", areaKm2: 61079.6, pop2025: 1492300, density: 24 },
  { name: "Highland Papua", capital: "Wamena", region: "Papua", areaKm2: 52508.7, pop2025: 1484900, density: 29 },
  { name: "North Maluku", capital: "Sofifi", region: "Maluku Islands", areaKm2: 31466, pop2025: 1373800, density: 42 },
  { name: "Gorontalo", capital: "Gorontalo", region: "Sulawesi", areaKm2: 12025, pop2025: 1242200, density: 103 },
  { name: "Papua", capital: "Jayapura", region: "Papua", areaKm2: 81383.3, pop2025: 1073600, density: 13 },
  { name: "North Kalimantan", capital: "Tanjung Selor", region: "Kalimantan", areaKm2: 69900.9, pop2025: 749400, density: 11 },
  { name: "Southwest Papua", capital: "Sorong", region: "Papua", areaKm2: 39103.1, pop2025: 636400, density: 16 },
  { name: "West Papua", capital: "Manokwari", region: "Papua", areaKm2: 60308.6, pop2025: 587600, density: 10 },
  { name: "South Papua", capital: "Merauke", region: "Papua", areaKm2: 117859, pop2025: 549700, density: 5 },
];

export const REGIONS = ['All regions', 'Java', 'Sumatra', 'Kalimantan', 'Sulawesi', 'Lesser Sunda Islands', 'Maluku Islands', 'Papua'];

// The sources page lists these in full; every chart caption names one.
export const SOURCES = [
  { name: 'World Bank, World Development Indicators', detail: 'National series for Indonesia (population, GDP, prices, trade, health, connectivity), retrieved 26 November 2026 via api.worldbank.org. Indicator codes are named in data.js beside each series.' },
  { name: 'Statistics Indonesia (BPS)', detail: 'Mid-2025 provincial population estimates and land areas; the 2020 census count of 270,203,917; open unemployment 4.76% (Sakernas, February 2025); poverty 8.47% (March 2025); Human Development Index 75.02 (2024).' },
  { name: 'This site', detail: 'Densities and regional totals are arithmetic on the BPS figures above, computed in the browser from the same table the Provinces page shows, so they can be checked against it.' },
];
