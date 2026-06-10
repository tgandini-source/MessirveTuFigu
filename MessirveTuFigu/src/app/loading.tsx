import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { loadPitchSideFeed, pitchSideAssets } from '@/data/pitch-side';

export default function LoadingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ mode?: string }>();
  const [progress, setProgress] = useState(65);

  useEffect(() => {
    let cancelled = false;
    const interval = setInterval(() => {
      setProgress((current) => Math.min(98, current + Math.random() * 2.5));
    }, 500);

    loadPitchSideFeed({ forceEmpty: params.mode === 'empty' })
      .then((feed) => {
        if (cancelled) {
          return;
        }

        const target = feed.suggestions.length === 0 ? '/empty' : '/explore';
        setTimeout(() => {
          if (!cancelled) {
            router.replace(target as never);
          }
        }, 500);
      })
      .catch(() => {
        if (!cancelled) {
          router.replace('/empty' as never);
        }
      });

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [params.mode, router]);

  return (
    <View style={styles.root}>
      <Image source={pitchSideAssets.loadingHero} style={StyleSheet.absoluteFill} contentFit="cover" />
      <View style={styles.overlay} />

      <View style={styles.badgeLeft}>
        <Text style={styles.badgeMissing}>MISSING</Text>
      </View>
      <View style={styles.badgeRight}>
        <Text style={styles.badgeDuplicate}>DUPLICATE</Text>
      </View>

      <View style={styles.center}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>⚽</Text>
        </View>
        <Text style={styles.title}>Preparando el tiro...</Text>
        <Text style={styles.body}>Estamos procesando tu intercambio. Prepárate para el resultado.</Text>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <Text style={styles.safeBadge}>Transacción segura</Text>
      </View>

      <Text style={styles.version}>Pitch Side Trading v2.4.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#131313',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(19,19,19,0.65)',
  },
  badgeLeft: {
    position: 'absolute',
    top: 20,
    left: 16,
    zIndex: 3,
  },
  badgeRight: {
    position: 'absolute',
    top: 20,
    right: 16,
    zIndex: 3,
  },
  badgeMissing: {
    backgroundColor: '#ffb3b1',
    color: '#5b000e',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
    transform: [{ rotate: '-2deg' }],
  },
  badgeDuplicate: {
    backgroundColor: '#95d4b3',
    color: '#00311f',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
    transform: [{ rotate: '2deg' }],
  },
  center: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#5b403f',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ff535b',
    shadowOpacity: 0.2,
    shadowRadius: 18,
  },
  icon: {
    fontSize: 36,
  },
  title: {
    color: '#e5e2e1',
    fontSize: 26,
    fontWeight: '900',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  body: {
    color: '#f0c2bf',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  progressTrack: {
    width: '100%',
    height: 12,
    borderRadius: 999,
    backgroundColor: '#334a6d',
    overflow: 'hidden',
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ff535b',
    borderRadius: 999,
  },
  safeBadge: {
    color: '#95d4b3',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 4,
    backgroundColor: 'rgba(15, 81, 50, 0.72)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  version: {
    position: 'absolute',
    bottom: 48,
    color: '#f0c2bf',
    fontSize: 14,
    opacity: 0.55,
  },
});