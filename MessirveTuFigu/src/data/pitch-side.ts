import { fetchFootballDataTeams, type FootballDataTeam } from '@/config/football-data';

export type PitchSticker = {
  id: string;
  nation: string;
  code: string;
  number: string;
  name: string;
  position: string;
  club: string;
  rarity: string;
  imageUrl: string;
  crestUrl?: string;
  status: 'missing' | 'duplicate';
};

export type CollectorProfile = {
  id: string;
  name: string;
  avatarUrl: string;
  rank: string;
  rating: string;
  trades: number;
  distanceKm: number;
  status: string;
  verified: boolean;
};

export type MatchSuggestion = {
  id: string;
  collector: CollectorProfile;
  incomingSticker: PitchSticker;
  outgoingSticker: PitchSticker;
  matchPercent: number;
  headline: string;
  message: string;
  tags: string[];
};

export type PitchSideFeed = {
  activeTraders: number;
  nearbyRadius: number;
  collectionCompletion: number;
  uploadedNumbers: string[];
  collectors: CollectorProfile[];
  suggestions: MatchSuggestion[];
  spotlightSticker: PitchSticker;
};

const stadiumHero = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCut_lSeHXj7QM6qem5lK5rim7JIOx_HtJRVC2FiV7_JiHmn7Rinl_HYTHovlqhcDjyjrAOPHH0FaHEy3NK8qnPqlnUyytZz6ukrh6M1gbI9yrE-v6ZpPvkrFdYH12s8i4FghbPA5kOZHnGFIO-BXzBzC4x3GKHQQTPS1UGvkn7Ek0X0gmKTXvUr2Bl96A5ZJ4eRFCVdCWPtbRvL-48lUbDo_SrkHKkRbm8Fz3Y0feTs65G8us9O68j1lseVHSOroQKgqkLGPwWCsk';
const loadingHero = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxLe51VLeC-pII3xdCT8PU-nzx5W323IKzBE2MlHt9hnHI4oCUykzPrkOHmDWeFXMcikwVMPgVgAgL13KdxOaKrWvy4AQnF8NnSaKBM_30Pzq78WFeH98UzpFhAyrPBADmSuMs0zwrFqHebqz9ZlCJTqJ1znnGx7WabuqLQyCy8b1bFpe3QgMsYJLc3qUMFpZbYBFmDjJYGz-mVe8LxNSZ4XnO5yCSiLgGt84ZHkGAyjVBV7OhbTmCjFIPcJl6mPgIGl8BMe6vJLw';
const errorHero = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5j8yCeji0DTXabeMOM9gZf0gLsbI0_rt2g9wJyBPRAaKQkXh2JtSAT-Vbgz9p4Jtfh_OUi_e__woL3tMkpXesGV-E_lHd5uYyFIA_02n3A-kRRnE61vRe5PD3R0ZB8fjawTFNsVfjPByWosbN5eiNHJSp8ZccLZcVAzTI61A5dXjZx_X0zEaSpBtowCKzUntu_IB3KAr3gMvcz3RESMtUhQa3SfO6Kplei9_dp-5W1NJNmpBEpWFzzDruJKYmStvP1kmHnzpcwLc';
const successHero = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJAfQGvxebZnxbnXOyupdIAnOf0nkbEAm1R8yAsZwPpz7gLW7QPBVQo0JR8FCRth-CEVCUYUlFH5tlNvUBA0JLxAM64H8S0uKRrXP0Xs9as8gA4ztZCFqGnKjwjtfKnqyOI8rD3rdcADNXf0_51rAXM_eINSxNgJWrLfynoJ62AWbx8m5z1vb4YXWNHSqg9adU-pxn6ASQ_ZRQ1YHqh3aM3VobpyHHmWLuJqRGlzS3FkPghgZaTr-WS8QcavVy865oh_YFrAJ-rjI';
const detailHero = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqDDavPSfIjeUygSJIEbGMw3zjiRLEMDVZ-oacwvkWWleTGqUhqjl9l78bEh6YyeBcSpI9urk2fOLHVRmTfkf8YwJe-q4FwVqHCoh1V3NZSUiLawUjuRe-ifM80wrTHArVLg8kz9T5G8z2V-gYjcIGbNSZhpgzalkqg-6CQYkpoZp8eJ9W-SGPQ_mxSpPEjalDhwK5mzP-Eppywo89N5GtPlrj1PTP0g2GWtr12asI5Eie1Ex4pS0CmWi-gzLHpI4Cvnk2He-7lZI';
const profileMateo = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8iDQNts6_YiEO4-x45RJ9-yyyYKrRK3Vuoc4fI7zOfCuAOgY_X_Sn9XBG6X4afDqkEBvCu1jHIQoVw_T39Z44-t2gtEjcNoqUbi9jw882MbXIfIHWmyDn8UnOt9Xb95c3DQRF7gE89M-y-J01zH-i955QKNFbdjkZ3P6JjynPsRNTbTfk5L9Qeifgo5v3zpVzzeLA5hhm4JoNXXWsntqzcNwcKw4RZEq4USUmEte5TCxKMxr6uaUn2ZBG6ml5BccQQBHj_QbbOA';
const profileCarlos = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAneEFLfhhTxf5iK-tOvx8aX0EBwWOWU4t2RazvIRtt_QoYZ6YH4Ux_o9i9WixPZZuOKFSVxb7I2wnZTzvrQXL3ikamHqUzVCSqVPoo0DUUhxa9E2lZA_nqbIwQDcL0skHycVfjwOb64E-VD-AdfmPcEuAZWmnVF7KcZALKAII-Oprd6whXWUDbCtzG4Iu4P_cKxWoQ3aaYs9LZYz7ujKvL0nR_fFWcbhO3INJNlsoRqIBCz-BmX2bHUhKXoovoSDW7EtNGxGBtvZI';
const profileSarah = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3o6dKABFiiRLKjuzwlTRjqrGrEELtnugvp0KO4J8aNGSEcUIg6yIHfjGrZK1-qpPnQxJjch5RxANeoWQyt7x_Sa1zUiafIfQ1bv6UAFTzAqnY8C9Csll6PzB-IEX9VcQuE0nuMKmuOOPnaujJGh_5CitSpKqsQ28QSZvcwW2Xbl3zllqyDgQvLmBLGFlCh7k1ezz5mdMms2XyPSA1WrVUi1ZzaEQDx7sJwUd2g_CahtQ3rzMhwd9icOiqE7SPFwHl4vLq7_ISFXY';
const profileMarco = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_HII_HKE5Uz6Bzza5Vb9Wm6ElGd1ISckKLctsZ-3zwq3CTXMPmaVGCmXDQndEknMGbcpJSXdyD_k-ea_54Ctlxr6AXaFJgzcoKdC12Wn_Hw_wptze3zmo8IQN1yH8R_0yf9qlikD8sNXd3Fpk1JQnvPwK-AWKzGgKfQ_7N-7JIyp4_vUW7DEaIfdPb3OSGf-GowCYsGV12igQt0wjD-vSIkwTIu1aK0Zx0Gr7RoljxgAoSFj2xGsmciKPVVyyZPvZMvp4sIEFgfc';
const playerMessi = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqDDavPSfIjeUygSJIEbGMw3zjiRLEMDVZ-oacwvkWWleTGqUhqjl9l78bEh6YyeBcSpI9urk2fOLHVRmTfkf8YwJe-q4FwVqHCoh1V3NZSUiLawUjuRe-ifM80wrTHArVLg8kz9T5G8z2V-gYjcIGbNSZhpgzalkqg-6CQYkpoZp8eJ9W-SGPQ_mxSpPEjalDhwK5mzP-Eppywo89N5GtPlrj1PTP0g2GWtr12asI5Eie1Ex4pS0CmWi-gzLHpI4Cvnk2He-7lZI';
const playerMbappe = 'https://lh3.googleusercontent.com/aida-public/AB6AXuATHKCb3ChlwBz4losBrB5MCe-OpBsD-H-9HQh5c9S9CjMZsTeaP0iHOr0x5o_2hZ2_WZEoMPhY3cyd8TkeFMxn9NCYtXjO8des3d2pH-gFfpsqoDhEnHmukow7WmOm4EINVOGOjAZ8ZN_Mdz9xgIuIxJt2EgfQ_cHJp0rGLErqPtDU38hY1-WmJImJAM0IuHBDKG2nkblWlN_F0J4p_BjKsCGJX0NpruAJe9KPY_ebARN8jcVX3Yeftwz3rpjOOXlvpPb_RwTVtUM';
const playerPulisic = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBq-F3VqKYNYnz3Vc1Ba72zX4GjEnoJteKZVyEZAoa00MwXoC8oFCArXhdSJkc1jRKLQ-BiaDno6hp5Gl1sgyjea412e6d7KHDL0gYyquzMDf2ofMCFZHeSTiwTHqSIpHrm1kuOCDSG18xdXXP3IitbA_wKtP60E3IRfhTcj1nFAVhhN3x2WYBVZEqZQpcUGmLNr3EVoh9m4XCOTIX4cl3ShNdCwE6IDDR6A_CsR0UmjCLX5_pnIXerZBQNUKSJJ_BH8H06mJII2jA';
const playerNeymar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcZrTu2vO11gA3Hna7Nra3jEZwMh4Fl_NA5N_24mfRuQi5tw3a4xBXWY2g-V33sF9mYJXBdP2gx_o97l3zvTdCDuVfSdjTI1NTe2HpDkkzgYdgO_C7SA_HM13SDDEOUNSYwqn_-xdDMJQHpImxvzhjwcpGt1bKPoCtBg5K37ljG6-cLwlW3Pj5SlurX6YcVrDKOdpjH01d3UGYH7mJrUqLRoDyAGuE_Vhcjkh8CM1H_pmChJeOGUb2gkfkXOYxLHMiKu7WHQsgAmc';
const playerModric = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_HII_HKE5Uz6Bzza5Vb9Wm6ElGd1ISckKLctsZ-3zwq3CTXMPmaVGCmXDQndEknMGbcpJSXdyD_k-ea_54Ctlxr6AXaFJgzcoKdC12Wn_Hw_wptze3zmo8IQN1yH8R_0yf9qlikD8sNXd3Fpk1JQnvPwK-AWKzGgKfQ_7N-7JIyp4_vUW7DEaIfdPb3OSGf-GowCYsGV12igQt0wjD-vSIkwTIu1aK0Zx0Gr7RoljxgAoSFj2xGsmciKPVVyyZPvZMvp4sIEFgfc';

const fallbackTeams = [
  { name: 'Argentina', tla: 'ARG', crest: 'https://flagcdn.com/w80/ar.png' },
  { name: 'France', tla: 'FRA', crest: 'https://flagcdn.com/w80/fr.png' },
  { name: 'United States', tla: 'USA', crest: 'https://flagcdn.com/w80/us.png' },
  { name: 'Brazil', tla: 'BRA', crest: 'https://flagcdn.com/w80/br.png' },
];

const collectorBase: CollectorProfile[] = [
  {
    id: 'mateo',
    name: 'Mateo',
    avatarUrl: profileMateo,
    rank: 'Pro',
    rating: '5.0',
    trades: 42,
    distanceKm: 2,
    status: 'Active match',
    verified: true,
  },
  {
    id: 'carlos',
    name: 'Carlos',
    avatarUrl: profileCarlos,
    rank: 'Elite',
    rating: '4.9',
    trades: 31,
    distanceKm: 1,
    status: 'Active match',
    verified: true,
  },
  {
    id: 'sarah',
    name: 'Sarah_88',
    avatarUrl: profileSarah,
    rank: 'Gold',
    rating: '5.0',
    trades: 24,
    distanceKm: 3,
    status: '3 km away',
    verified: false,
  },
  {
    id: 'marco',
    name: 'Marco Polo',
    avatarUrl: profileMarco,
    rank: 'Veteran',
    rating: '4.8',
    trades: 19,
    distanceKm: 5,
    status: 'Last seen 5m ago',
    verified: false,
  },
];

const uploadedNumbers = ['07', '10', '12', '24', '31', '44', '58', '61', '78', '89'];

const baseSuggestions: MatchSuggestion[] = [
  {
    id: 'mateo-mbappe-pulisic',
    collector: collectorBase[0],
    incomingSticker: {
      id: 'fra-mbappe',
      nation: 'France',
      code: 'FRA',
      number: '#742',
      name: 'Kylian Mbappé',
      position: 'Forward',
      club: 'Paris Saint-Germain',
      rarity: 'Legendary',
      imageUrl: playerMbappe,
      crestUrl: 'https://flagcdn.com/w80/fr.png',
      status: 'missing',
    },
    outgoingSticker: {
      id: 'usa-pulisic',
      nation: 'United States',
      code: 'USA',
      number: '#129',
      name: 'Christian Pulisic',
      position: 'Forward',
      club: 'AC Milan',
      rarity: 'Duplicate',
      imageUrl: playerPulisic,
      crestUrl: 'https://flagcdn.com/w80/us.png',
      status: 'duplicate',
    },
    matchPercent: 92,
    headline: 'Mateo busca un perfil de intercambio 92%',
    message: 'Tiene la Mbappé que te falta y acepta tu duplicada.',
    tags: ['Near you', 'Verified collector'],
  },
  {
    id: 'sarah-messi-kane',
    collector: collectorBase[2],
    incomingSticker: {
      id: 'arg-messi',
      nation: 'Argentina',
      code: 'ARG',
      number: '#10',
      name: 'Lionel Messi',
      position: 'Forward',
      club: 'Inter Miami CF',
      rarity: 'Legendary',
      imageUrl: playerMessi,
      crestUrl: 'https://flagcdn.com/w80/ar.png',
      status: 'missing',
    },
    outgoingSticker: {
      id: 'eng-kane',
      nation: 'England',
      code: 'ENG',
      number: '#09',
      name: 'Harry Kane',
      position: 'Forward',
      club: 'Bayern Munich',
      rarity: 'Duplicate',
      imageUrl: playerPulisic,
      crestUrl: 'https://flagcdn.com/w80/gb-eng.png',
      status: 'duplicate',
    },
    matchPercent: 88,
    headline: 'Sarah_88 tiene coincidencia parcial',
    message: 'Intercambio rápido, misma zona y una figurita clave.',
    tags: ['3 km away', 'Match potential'],
  },
  {
    id: 'marco-modric-neymar',
    collector: collectorBase[3],
    incomingSticker: {
      id: 'cro-modric',
      nation: 'Croatia',
      code: 'CRO',
      number: '#10',
      name: 'Luka Modrić',
      position: 'Midfielder',
      club: 'Real Madrid',
      rarity: 'Elite',
      imageUrl: playerModric,
      crestUrl: 'https://flagcdn.com/w80/hr.png',
      status: 'missing',
    },
    outgoingSticker: {
      id: 'bra-neymar',
      nation: 'Brazil',
      code: 'BRA',
      number: '#10',
      name: 'Neymar Jr',
      position: 'Forward',
      club: 'Al Hilal',
      rarity: 'Duplicate',
      imageUrl: playerNeymar,
      crestUrl: 'https://flagcdn.com/w80/br.png',
      status: 'duplicate',
    },
    matchPercent: 84,
    headline: 'Marco Polo sigue activo',
    message: 'Queda como backup para cerrar otra transacción.',
    tags: ['Last seen 5m ago', 'Backup'],
  },
];

let cachedFeed: PitchSideFeed | null = null;

function normalizeTeams(teams: FootballDataTeam[]) {
  const source = teams.length > 0 ? teams : fallbackTeams;

  return source.slice(0, 4).map((team, index) => ({
    ...team,
    name: team.name ?? fallbackTeams[index].name,
    tla: team.tla ?? fallbackTeams[index].tla,
    crest: team.crest ?? fallbackTeams[index].crest,
  }));
}

function buildFeedFromTeams(teams: FootballDataTeam[], forceEmpty: boolean): PitchSideFeed {
  if (forceEmpty) {
    return {
      activeTraders: 0,
      nearbyRadius: 500,
      collectionCompletion: 48,
      uploadedNumbers,
      collectors: [],
      suggestions: [],
      spotlightSticker: {
        id: 'empty-spotlight',
        nation: 'Argentina',
        code: 'ARG',
        number: '#10',
        name: 'Lionel Messi',
        position: 'Forward',
        club: 'Inter Miami CF',
        rarity: 'Legendary',
        imageUrl: detailHero,
        crestUrl: 'https://flagcdn.com/w80/ar.png',
        status: 'missing',
      },
    };
  }

  const normalizedTeams = normalizeTeams(teams);

  const suggestions = baseSuggestions.map((suggestion, index) => {
    const team = normalizedTeams[index % normalizedTeams.length];
    return {
      ...suggestion,
      incomingSticker: {
        ...suggestion.incomingSticker,
        nation: team.name,
        code: team.tla ?? suggestion.incomingSticker.code,
        crestUrl: team.crest ?? suggestion.incomingSticker.crestUrl,
      },
      headline: `${suggestion.collector.name} busca ${team.name}`,
    };
  });

  return {
    activeTraders: 128 + normalizedTeams.length * 11,
    nearbyRadius: 500,
    collectionCompletion: 78,
    uploadedNumbers,
    collectors: collectorBase,
    suggestions,
    spotlightSticker: {
      id: 'spotlight-messi',
      nation: normalizedTeams[0]?.name ?? 'Argentina',
      code: normalizedTeams[0]?.tla ?? 'ARG',
      number: '#10',
      name: 'Lionel Messi',
      position: 'Forward',
      club: 'Inter Miami CF',
      rarity: 'Legendary',
      imageUrl: detailHero,
      crestUrl: normalizedTeams[0]?.crest ?? 'https://flagcdn.com/w80/ar.png',
      status: 'missing',
    },
  };
}

export async function loadPitchSideFeed(options?: { forceEmpty?: boolean }) {
  const teams = options?.forceEmpty ? [] : await fetchFootballDataTeams().catch(() => []);
  const feed = buildFeedFromTeams(teams, options?.forceEmpty ?? false);
  cachedFeed = feed;
  return feed;
}

export function getCachedPitchSideFeed() {
  return cachedFeed;
}

export function setCachedPitchSideFeed(feed: PitchSideFeed | null) {
  cachedFeed = feed;
}

export const pitchSideAssets = {
  hero: stadiumHero,
  loadingHero,
  errorHero,
  successHero,
  detailHero,
};

export const pitchSideMockCollectors = collectorBase;