import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { PitchActionButton, PitchBottomNav, PitchHeader, PitchPill } from '@/components/pitch-chrome';
import { getCachedPitchSideFeed, pitchSideAssets } from '@/data/pitch-side';

export default function UploadScreen() {
  const router = useRouter();
  const feed = getCachedPitchSideFeed();

  return (
    <View style={styles.root}>
      <Image source={pitchSideAssets.hero} style={StyleSheet.absoluteFill} contentFit="cover" />
      <View style={styles.overlay} />

      <PitchHeader title="Carga de listas" subtitle="Números detectados" location="Doha, Qatar" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCopy}>
          <Text style={styles.title}>Subí tu lista de repetidas</Text>
          <Text style={styles.body}>
            Este bloque está prototipado. La app acepta una lista simulada de números y la usa para
            armar coincidencias rápidas con la feed local o la API pública.
          </Text>
        </View>

        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>Lista pegada</Text>
          <TextInput
            value={(feed?.uploadedNumbers ?? ['07', '10', '12', '24']).join(', ')}
            editable={false}
            style={styles.input}
          />
          <Text style={styles.helper}>Formato de ejemplo: 07, 10, 12, 24, 31, 44</Text>
        </View>

        <View style={styles.chipGrid}>
          {(feed?.uploadedNumbers ?? ['07', '10', '12', '24', '31', '44', '58', '61']).map((number) => (
            <PitchPill key={number} tone="neutral">#{number}</PitchPill>
          ))}
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelLabel}>Estado de lectura</Text>
          <Text style={styles.panelTitle}>10 figuritas listas para matchear</Text>
          <Text style={styles.panelText}>
            No hay login real ni validación de identidad. Todo queda hardcodeado para el prototipo.
          </Text>
        </View>

        <View style={styles.footerActions}>
          <PitchActionButton
            label="Procesar lista"
            icon="arrow.right"
            tone="primary"
            onPress={() => router.push('/loading' as never)}
          />
          <Pressable onPress={() => router.push('/home' as never)} style={({ pressed }) => [styles.ghostButton, pressed && styles.pressed]}>
            <Text style={styles.ghostButtonText}>Volver al dashboard</Text>
          </Pressable>
        </View>
      </ScrollView>

      <PitchBottomNav active="upload" />
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
    paddingTop: 20,
    paddingBottom: 24,
    gap: 18,
  },
  heroCopy: {
    gap: 10,
  },
  title: {
    color: '#e5e2e1',
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 34,
  },
  body: {
    color: '#f0c2bf',
    fontSize: 16,
    lineHeight: 24,
  },
  inputCard: {
    backgroundColor: 'rgba(30, 30, 30, 0.82)',
    borderWidth: 1,
    borderColor: '#5b403f',
    borderRadius: 18,
    padding: 16,
    gap: 10,
  },
  inputLabel: {
    color: '#95d4b3',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  input: {
    borderRadius: 14,
    backgroundColor: '#201f1f',
    borderWidth: 1,
    borderColor: '#353534',
    color: '#e5e2e1',
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  helper: {
    color: '#f0c2bf',
    fontSize: 13,
    lineHeight: 20,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  panel: {
    borderRadius: 18,
    backgroundColor: '#201f1f',
    borderWidth: 1,
    borderColor: '#5b403f',
    padding: 16,
    gap: 8,
  },
  panelLabel: {
    color: '#95d4b3',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  panelTitle: {
    color: '#e5e2e1',
    fontSize: 24,
    fontWeight: '900',
  },
  panelText: {
    color: '#f0c2bf',
    fontSize: 15,
    lineHeight: 22,
  },
  footerActions: {
    gap: 12,
  },
  ghostButton: {
    minHeight: 64,
    borderWidth: 2,
    borderColor: '#f5f4f3',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  ghostButtonText: {
    color: '#e5e2e1',
    fontSize: 18,
    fontWeight: '900',
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
});