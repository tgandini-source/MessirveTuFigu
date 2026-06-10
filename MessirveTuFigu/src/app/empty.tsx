import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { PitchActionButton, PitchHeader } from '@/components/pitch-chrome';
import { pitchSideAssets } from '@/data/pitch-side';

export default function EmptyScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <Image source={pitchSideAssets.errorHero} style={StyleSheet.absoluteFill} contentFit="cover" />
      <View style={styles.overlay} />

      <PitchHeader title="Pitch Side Trading" showBack={false} showActions={true} />

      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>⌕</Text>
        </View>

        <Text style={styles.title}>¡Estadio silencioso!</Text>
        <Text style={styles.body}>
          No hay coleccionistas cerca en este momento. Intenta ampliar tu radio de búsqueda o vuelve más tarde.
        </Text>

        <PitchActionButton label="Expandir búsqueda" icon="radar" tone="primary" onPress={() => router.push('/loading' as never)} />

        <Pressable style={({ pressed }) => [styles.textButton, pressed && styles.pressed]}>
          <Text style={styles.textButtonLabel}>Configurar notificaciones</Text>
        </Pressable>

        <View style={styles.miniCard}>
          <View style={styles.miniIcon}>
            <Text style={styles.miniIconText}>◌</Text>
          </View>
          <View>
            <Text style={styles.miniLabel}>Rastreo activo</Text>
            <Text style={styles.miniText}>Radio: 500m</Text>
          </View>
        </View>
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
    backgroundColor: 'rgba(19,19,19,0.68)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 34,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
  },
  iconWrap: {
    width: 94,
    height: 94,
    borderRadius: 47,
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#5b403f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#ffb3b1',
    fontSize: 42,
    fontWeight: '900',
  },
  title: {
    color: '#e5e2e1',
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  body: {
    color: '#f0c2bf',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 640,
  },
  textButton: {
    paddingVertical: 4,
  },
  textButtonLabel: {
    color: '#f0c2bf',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  miniCard: {
    width: '100%',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#5b403f',
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  miniIcon: {
    width: 58,
    height: 58,
    borderRadius: 14,
    backgroundColor: '#353534',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniIconText: {
    color: '#f0c2bf',
    fontSize: 24,
    fontWeight: '900',
  },
  miniLabel: {
    color: '#95d4b3',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  miniText: {
    color: '#e5e2e1',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 2,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
});