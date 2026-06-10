import Constants from 'expo-constants';

type FootballDataExtra = {
  footballDataApiKey?: string;
  footballDataBaseUrl?: string;
  footballDataCompetition?: string;
};

export type FootballDataTeam = {
  id: number;
  name: string;
  tla?: string;
  crest?: string;
  area?: {
    name?: string;
    code?: string;
  };
};

export function getFootballDataConfig() {
  const extra = Constants.expoConfig?.extra as FootballDataExtra | undefined;

  // Read from process.env (EXPO_PUBLIC_* variables) first, then fall back to app.config.ts
  const apiKey =
    process.env.EXPO_PUBLIC_FOOTBALL_DATA_API_KEY ||
    extra?.footballDataApiKey ||
    '';
  
  const baseUrl =
    process.env.EXPO_PUBLIC_FOOTBALL_DATA_BASE_URL ||
    extra?.footballDataBaseUrl ||
    'https://api.football-data.org/v4';
  
  const competitionCode =
    process.env.EXPO_PUBLIC_FOOTBALL_DATA_COMPETITION ||
    extra?.footballDataCompetition ||
    'WC';

  return {
    apiKey,
    baseUrl,
    competitionCode,
  };
}

export function hasFootballDataApiKey() {
  return getFootballDataConfig().apiKey.trim().length > 0;
}

export async function fetchFootballDataTeams(): Promise<FootballDataTeam[]> {
  const { apiKey, baseUrl, competitionCode } = getFootballDataConfig();

  if (!apiKey) {
    throw new Error('Missing football-data.org API key.');
  }

  const response = await fetch(`${baseUrl}/competitions/${competitionCode}/teams`, {
    headers: {
      Accept: 'application/json',
      'X-Auth-Token': apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`football-data.org request failed with ${response.status}`);
  }

  const payload = (await response.json()) as { teams?: FootballDataTeam[] };

  return Array.isArray(payload.teams) ? payload.teams : [];
}