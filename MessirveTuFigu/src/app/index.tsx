import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PitchActionButton, PitchHeroImage, PitchMiniAvatar, PitchPill } from '@/components/pitch-chrome';
import { pitchSideAssets, pitchSideMockCollectors } from '@/data/pitch-side';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <PitchHeroImage uri={pitchSideAssets.hero} />
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.brandRow}>
            <Text style={styles.brand}>MUNDIAL DE FUTBOL FIFA 2026</Text>
          </View>

          <View style={styles.pillRow}>
            <PitchPill tone="mint">USA, MEXICO Y CANADA</PitchPill>
            <PitchPill tone="blue">INTERCAMBIOS EN VIVO</PitchPill>
          </View>

          <View style={styles.heroCopy}>
            <Text style={styles.display}>Completa tu <Text style={styles.displayAccent}>Álbum</Text></Text>
            <Text style={styles.body}>
              Únete a la mayor comunidad de coleccionistas. Encuentra las figuritas que te faltan y
              cambia tus repetidas en segundos.
            </Text>
          </View>

          <View style={styles.actionGrid}>
            <Pressable
              style={({ pressed }) => [styles.featureCard, styles.featureCardNeutral, pressed && styles.pressed]}
              onPress={() => router.push('/deck' as never)}>
              <Text style={styles.featureLabel}>Cerca de ti</Text>
              <Text style={styles.featureTitle}>Explorar figuritas cerca</Text>
              <Text style={styles.featureIcon}>⌖</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.featureCard, styles.featureCardPrimary, pressed && styles.pressed]}
              onPress={() => router.push('/upload')}>
              <Text style={styles.featureLabelDark}>Escanear pack</Text>
              <Text style={styles.featureTitleDark}>Subir mis repetidas</Text>
              <Text style={styles.featureIconDark}>▣</Text>
            </Pressable>
          </View>

          <View style={styles.statusRow}>
            <View style={styles.avatarStack}>
              <PitchMiniAvatar uri={pitchSideMockCollectors[0].avatarUrl} size={40} />
              <View style={styles.avatarOverlap}>
                <PitchMiniAvatar uri={pitchSideMockCollectors[2].avatarUrl} size={40} />
              </View>
              <View style={styles.moreBubble}>
                <Text style={styles.moreText}>+8k</Text>
              </View>
            </View>
            <Text style={styles.statusText}>
              <Text style={styles.statusStrong}>128 usuarios</Text> activos ahora mismo en tu zona.
            </Text>
          </View>

          <View style={styles.footerActions}>
            <PitchActionButton
              label="Empezar a buscar"
              icon="favorite"
              tone="primary"
              onPress={() => router.push('/deck' as never)}
            />
            <Pressable
              onPress={() => router.push('/home' as never)}
              style={({ pressed }) => [styles.textLink, pressed && styles.pressed]}>
              <Text style={styles.textLinkLabel}>Ver dashboard</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#131313',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFill, //...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(19, 19, 19, 0.68)',
  },
  brandRow: {
    position: 'absolute',
    top: 18,
    left: 16,
    right: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  brand: {
    color: '#e5e2e1',
    fontSize: 22,
    fontWeight: '900',
    fontStyle: 'italic',
    textTransform: 'uppercase',
    margin: 20,
  },
  brandAccent: {
    color: '#ff535b',
    fontSize: 20,
    fontWeight: '900',
    fontStyle: 'italic',
    textTransform: 'uppercase',
    letterSpacing: -1.2,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  heroCopy: {
    gap: 10,
  },
  display: {
    color: '#e5e2e1',
    fontSize: 40,
    fontWeight: '900',
    lineHeight: 50,
    letterSpacing: -2,
  },
  displayAccent: {
    color: '#ff535b',
    fontSize: 40,
    fontWeight: '900',
    lineHeight: 50,
    letterSpacing: -2,
  },
  body: {
    color: '#f0c2bf',
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 620,
  },
  actionGrid: {
    gap: 12,
  },
  featureCard: {
    minHeight: 118,
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 18,
    justifyContent: 'space-between',
  },
  featureCardNeutral: {
    backgroundColor: 'rgba(30, 30, 30, 0.82)',
    borderColor: '#5b403f',
  },
  featureCardPrimary: {
    backgroundColor: '#ff535b',
    borderColor: '#ff535b',
  },
  featureLabel: {
    color: '#95d4b3',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  featureLabelDark: {
    color: '#5b000e',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  featureTitle: {
    color: '#e5e2e1',
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 30,
  },
  featureTitleDark: {
    color: '#5b000e',
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 30,
  },
  featureIcon: {
    position: 'absolute',
    right: 18,
    bottom: 10,
    fontSize: 54,
    color: 'rgba(149, 212, 179, 0.35)',
  },
  featureIconDark: {
    position: 'absolute',
    right: 18,
    bottom: 10,
    fontSize: 54,
    color: 'rgba(91, 0, 14, 0.2)',
  },
  statusRow: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(243, 215, 214, 0.12)',
    paddingTop: 14,
    gap: 14,
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarOverlap: {
    marginLeft: -8,
  },
  moreBubble: {
    marginLeft: -6,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2b2a2a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreText: {
    color: '#f0c2bf',
    fontSize: 12,
    fontWeight: '900',
  },
  statusText: {
    color: '#f0c2bf',
    fontSize: 18,
    lineHeight: 26,
  },
  statusStrong: {
    color: '#95d4b3',
    fontWeight: '900',
  },
  footerActions: {
    gap: 12,
  },
  textLink: {
    alignSelf: 'center',
    paddingVertical: 8,
  },
  textLinkLabel: {
    color: '#f0c2bf',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },
});
