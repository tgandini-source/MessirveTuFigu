import type { ExpoConfig } from 'expo/config';

export default ({ config }: { config: ExpoConfig }): ExpoConfig => ({
  ...config,
  userInterfaceStyle: 'dark',
  extra: {
    ...(config.extra ?? {}),
    footballDataApiKey: process.env.EXPO_PUBLIC_FOOTBALL_DATA_API_KEY ?? '',
    footballDataBaseUrl: 'https://api.football-data.org/v4',
    footballDataCompetition: 'WC',
  },
});