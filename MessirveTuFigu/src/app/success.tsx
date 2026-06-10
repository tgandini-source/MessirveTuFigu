import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { PitchActionButton, PitchHeader, PitchPill } from '@/components/pitch-chrome';
import { getCachedPitchSideFeed, pitchSideAssets } from '@/data/pitch-side';

export default function SuccessScreen() {
  const router = useRouter();
  const feed = getCachedPitchSideFeed();
  const received = feed?.suggestions[0].incomingSticker ?? {
    name: 'Lionel Messi',
    nation: 'Argentina',
    imageUrl: pitchSideAssets.successHero,
  };

  return (
    <View style={styles.root}>
      <Image source={pitchSideAssets.successHero} style={StyleSheet.absoluteFill} contentFit="cover" />
      <View style={styles.overlay} />

      <PitchHeader title="Pitch Side Trading" showBack={false} showActions={true} />

      <View style={styles.content}>
        <PitchPill tone="mint">¡LOGRADO!</PitchPill>
        <Text style={styles.kicker}>¡GOOOOOL!</Text>
        <Text style={styles.title}>Intercambio Exitoso</Text>

        <View style={styles.resultCard}>
          <View>
            <Text style={styles.resultLabel}>Recibiste</Text>
            <Text style={styles.resultName}>{received.name}</Text>
          </View>
          <View style={styles.resultThumb}>
            <Image source={received.imageUrl} style={StyleSheet.absoluteFill} contentFit="cover" />
          </View>
        </View>

        <PitchActionButton label="Ver mis figuritas" icon="square.grid.2x2" tone="primary" onPress={() => router.push('/home' as never)} />

        <Pressable style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]} onPress={() => router.push('/explore' as never)}>
          <Text style={styles.secondaryButtonText}>Seguir explorando</Text>
        </Pressable>
      </View>
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
    backgroundColor: 'rgba(19,19,19,0.55)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
    gap: 14,
    justifyContent: 'center',
  },
  kicker: {
    color: '#e5e2e1',
    fontSize: 24,
    fontWeight: '900',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  title: {
    color: '#ff535b',
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: 'rgba(30,30,30,0.78)',
    borderWidth: 1,
    borderColor: '#5b403f',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  resultLabel: {
    color: '#f0c2bf',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  resultName: {
    color: '#e5e2e1',
    fontSize: 28,
    fontWeight: '900',
    marginTop: 4,
  },
  resultThumb: {
    width: 82,
    height: 82,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#5b403f',
    backgroundColor: '#2a2a2a',
  },
  secondaryButton: {
    minHeight: 64,
    borderWidth: 2,
    borderColor: '#f5f4f3',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#e5e2e1',
    fontSize: 18,
    fontWeight: '900',
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
});