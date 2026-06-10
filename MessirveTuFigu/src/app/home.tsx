import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PitchBottomNav, PitchHeader, PitchMiniAvatar, PitchPill } from '@/components/pitch-chrome';
import { hasFootballDataApiKey } from '@/config/football-data';
import { getCachedPitchSideFeed, pitchSideAssets } from '@/data/pitch-side';

function ActionCard({
  title,
  subtitle,
  icon,
  accent,
  onPress,
}: {
  title: string;
  subtitle: string;
  icon: string;
  accent: 'mint' | 'coral';
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.actionCard, accent === 'mint' ? styles.mintCard : styles.coralCard, pressed && styles.pressed]}
      onPress={onPress}>
      <View style={styles.actionCardTop}>
        <Text style={styles.actionCardLabel}>{subtitle}</Text>
        <Text style={styles.actionCardIcon}>{icon}</Text>
      </View>
      <Text style={[styles.actionCardTitle, accent === 'mint' ? styles.mintTitle : styles.coralTitle]}>
        {title}
      </Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const feed = getCachedPitchSideFeed();

  return (
    <View style={styles.root}>
      <Image source={pitchSideAssets.hero} style={StyleSheet.absoluteFill} contentFit="cover" />
      <View style={styles.overlay} />

      <PitchHeader title="Pitch Side Trading" location="Doha, Qatar" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.pillRow}>
          <PitchPill tone="mint">MÉXICO 2024</PitchPill>
          <PitchPill tone="blue">LIVE TRADES</PitchPill>
        </View>

        <View style={styles.heroBlock}>
          <Text style={styles.heroTitle}>Completa tu</Text>
          <Text style={styles.heroAccent}>Álbum</Text>
          <Text style={styles.heroText}>
            Únete a la mayor comunidad de coleccionistas. Encuentra las figuritas que te faltan y
            cambia tus repetidas en segundos.
          </Text>
        </View>

        <View style={styles.actionList}>
          <ActionCard
            title="Explorar figuritas cerca"
            subtitle="Cerca de ti"
            icon="⌖"
            accent="mint"
            onPress={() => router.push('/loading' as never)}
          />
          <ActionCard
            title="Subir mis repetidas"
            subtitle="Escanear pack"
            icon="▣"
            accent="coral"
            onPress={() => router.push('/upload' as never)}
          />
        </View>

        <Pressable onPress={() => router.push('/loading?mode=empty' as never)} style={({ pressed }) => [styles.emptyLink, pressed && styles.pressed]}>
          <Text style={styles.emptyLinkText}>Forzar estado vacío</Text>
        </Pressable>

        <View style={styles.statsBlock}>
          <View style={styles.avatarRow}>
            {feed ? (
              <>
                <PitchMiniAvatar uri={feed.collectors[0].avatarUrl} size={40} />
                <View style={styles.avatarOffset}>
                  <PitchMiniAvatar uri={feed.collectors[2].avatarUrl} size={40} />
                </View>
                <View style={styles.moreCount}>
                  <Text style={styles.moreCountText}>+8k</Text>
                </View>
              </>
            ) : (
              <>
                <PitchMiniAvatar uri={pitchSideAssets.detailHero} size={40} />
                <View style={styles.avatarOffset}>
                  <PitchMiniAvatar uri={pitchSideAssets.successHero} size={40} />
                </View>
                <View style={styles.moreCount}>
                  <Text style={styles.moreCountText}>+8k</Text>
                </View>
              </>
            )}
          </View>
          <Text style={styles.statsText}>
            <Text style={styles.statsStrong}>{feed?.activeTraders ?? 128} traders</Text> activos
            ahora mismo en tu zona.
          </Text>
          <Text style={styles.apiBadge}>{hasFootballDataApiKey() ? 'API listada' : 'API key pendiente'}</Text>
        </View>
      </ScrollView>

      <PitchBottomNav active="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#131313',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(19,19,19,0.72)',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 18,
    gap: 18,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 10,
  },
  heroBlock: {
    gap: 10,
  },
  heroTitle: {
    color: '#e5e2e1',
    fontSize: 54,
    fontWeight: '900',
    lineHeight: 56,
    letterSpacing: -2,
  },
  heroAccent: {
    color: '#ff535b',
    fontSize: 54,
    fontWeight: '900',
    lineHeight: 56,
    letterSpacing: -2,
  },
  heroText: {
    color: '#f0c2bf',
    fontSize: 18,
    lineHeight: 28,
  },
  actionList: {
    gap: 12,
  },
  actionCard: {
    minHeight: 120,
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  mintCard: {
    backgroundColor: 'rgba(30, 30, 30, 0.82)',
    borderColor: '#5b403f',
  },
  coralCard: {
    backgroundColor: '#ff535b',
    borderColor: '#ff535b',
  },
  actionCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCardLabel: {
    color: '#95d4b3',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  actionCardIcon: {
    fontSize: 54,
    lineHeight: 54,
  },
  actionCardTitle: {
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 30,
    maxWidth: 280,
  },
  mintTitle: {
    color: '#e5e2e1',
  },
  coralTitle: {
    color: '#5b000e',
  },
  emptyLink: {
    alignSelf: 'center',
    paddingVertical: 4,
  },
  emptyLinkText: {
    color: '#f0c2bf',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  statsBlock: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(243, 215, 214, 0.12)',
    paddingTop: 14,
    gap: 12,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarOffset: {
    marginLeft: -8,
  },
  moreCount: {
    marginLeft: -6,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2b2a2a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreCountText: {
    color: '#f0c2bf',
    fontSize: 12,
    fontWeight: '900',
  },
  statsText: {
    color: '#f0c2bf',
    fontSize: 18,
    lineHeight: 26,
  },
  statsStrong: {
    color: '#95d4b3',
    fontWeight: '900',
  },
  apiBadge: {
    color: '#95d4b3',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
});