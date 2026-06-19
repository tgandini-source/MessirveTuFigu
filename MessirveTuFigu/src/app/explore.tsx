import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PitchBottomNav, PitchHeader, PitchMiniAvatar, PitchPill } from '@/components/pitch-chrome';
import { getCachedPitchSideFeed, pitchSideAssets } from '@/data/pitch-side';

export default function ExploreScreen() {
  const router = useRouter();
  const feed = getCachedPitchSideFeed();

  return (
    <View style={styles.root}>
      <Image source={pitchSideAssets.hero} style={StyleSheet.absoluteFill} contentFit="cover" />
      <View style={styles.overlay} />

      <PitchHeader title="¡La que te falta esta cada ves mas cerca!" subtitle="Intercambios disponibles" showBack={false} showActions={true} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroBlock}>
          <Text style={styles.title}>Tus matches</Text>
          <Text style={styles.body}>
            Hemos encontrado {feed?.suggestions.length ?? 0} coleccionistas que buscan tus figuritas repetidas.
          </Text>
        </View>

        <View style={styles.feedList}>
          {feed?.suggestions.map((match) => (
            <Pressable
              key={match.id}
              style={({ pressed }) => [styles.matchCard, pressed && styles.pressed]}
              onPress={() => router.push(`/detail?matchId=${match.id}` as never)}
            >
              <View style={styles.cardHeader}>
                <View style={styles.collectorInfo}>
                  <PitchMiniAvatar uri={match.collector.avatarUrl} size={40} />
                  <View>
                    <Text style={styles.collectorName}>{match.collector.name}</Text>
                    <Text style={styles.collectorDistance}>{match.collector.distanceKm} km cerca</Text>
                  </View>
                </View>
                <PitchPill tone="mint">{match.matchPercent}% Match</PitchPill>
              </View>

              <View style={styles.cardBody}>
                <Text style={styles.headline}>{match.headline}</Text>
                <Text style={styles.message}>{match.message}</Text>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.viewDetailsText}>Ver detalle →</Text>
              </View>
            </Pressable>
          ))}
          {feed?.suggestions.length === 0 && (
             <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>No hay matches en este momento.</Text>
             </View>
          )}
        </View>
      </ScrollView>

      <PitchBottomNav active="explore" />
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
    paddingBottom: 24,
    gap: 18,
  },
  heroBlock: {
    gap: 8,
  },
  title: {
    color: '#e5e2e1',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
  },
  body: {
    color: '#f0c2bf',
    fontSize: 16,
    lineHeight: 24,
  },
  feedList: {
    gap: 12,
  },
  matchCard: {
    backgroundColor: 'rgba(30, 30, 30, 0.82)',
    borderWidth: 1,
    borderColor: '#5b403f',
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collectorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  collectorName: {
    color: '#e5e2e1',
    fontSize: 18,
    fontWeight: '900',
  },
  collectorDistance: {
    color: '#f0c2bf',
    fontSize: 12,
  },
  cardBody: {
    gap: 4,
  },
  headline: {
    color: '#95d4b3',
    fontSize: 16,
    fontWeight: '900',
  },
  message: {
    color: '#f0c2bf',
    fontSize: 14,
    lineHeight: 20,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(243, 215, 214, 0.12)',
    paddingTop: 12,
    marginTop: 4,
    alignItems: 'flex-end',
  },
  viewDetailsText: {
    color: '#ff535b',
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  emptyCard: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(30, 30, 30, 0.5)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#5b403f',
  },
  emptyText: {
    color: '#f0c2bf',
    fontSize: 16,
  }
});