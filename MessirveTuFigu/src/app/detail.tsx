import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PitchBottomNav, PitchHeader, PitchMiniAvatar, PitchPill } from '@/components/pitch-chrome';
import { getCachedPitchSideFeed, pitchSideAssets } from '@/data/pitch-side';

function percentageLabel(value: number) {
  return `${value}%`;
}

export default function DetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ matchId?: string }>();
  const feed = getCachedPitchSideFeed();

  if (!feed) {
    return <View />;
  }

  const match = feed.suggestions.find((entry) => entry.id === params.matchId) ?? feed.suggestions[0];

  return (
    <View style={styles.root}>
      <PitchHeader title="¡Ya falta poco, inicia un chat para coordinar el cambio!" showBack showActions={false} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.cardWrap}>
          <Image source={match.incomingSticker.imageUrl} style={StyleSheet.absoluteFill} contentFit="cover" />
          <View style={styles.cardOverlay} />

          <View style={styles.cardBadges}>
            <PitchPill tone="red">La necesitas</PitchPill>
            <PitchPill tone="mint">{`Rarity: ${match.incomingSticker.rarity}`}</PitchPill>
          </View>

          <View style={styles.flagBubble}>
            <Image source={match.incomingSticker.crestUrl ?? pitchSideAssets.detailHero} style={styles.flagImage} contentFit="cover" />
          </View>

          <View style={styles.cardBottom}>
            <Text style={styles.country}>{match.incomingSticker.nation.toUpperCase()}</Text>
            <Text style={styles.name}>{match.incomingSticker.name}</Text>
            <Text style={styles.meta}>
              {match.incomingSticker.position} · {match.incomingSticker.club}
            </Text>

            <View style={styles.numberRow}>
              <Text style={styles.number}>{match.incomingSticker.number}</Text>
              <Text style={styles.level}>LVL 99</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <StatTile label="Rarity" value={percentageLabel(match.matchPercent + 6)} icon="🏅" />
          <StatTile label="Pos" value="FWD" icon="🏃" />
          <StatTile label="Duplicates" value="12" icon="👥" />
        </View>

        <View style={styles.collectorCard}>
          <View style={styles.collectorTop}>
            <View style={styles.collectorProfile}>
              <PitchMiniAvatar uri={match.collector.avatarUrl} size={54} />
              <View>
                <Text style={styles.collectorName}>{match.collector.name}</Text>
                <Text style={styles.collectorRank}>Collector Rank: {match.collector.rank}</Text>
              </View>
            </View>
            <PitchPill tone="mint">Verified collector</PitchPill>
          </View>

          <View style={styles.collectorMetaRow}>
            <Text style={styles.collectorMeta}>Distancia: {match.collector.distanceKm}km</Text>
            <Text style={styles.collectorMeta}>Rating {match.collector.rating}</Text>
          </View>
        </View>

        <View style={styles.searchHeader}>
          <Text style={styles.sectionTitle}>{match.collector.name} busca...</Text>
          <PitchPill tone="mint">Match potencial</PitchPill>
        </View>

        <View style={styles.wantGrid}>
          <MiniSticker
            sticker={match.incomingSticker}
            tone="missing"
          />
          <MiniSticker
            sticker={match.outgoingSticker}
            tone="duplicate"
          />
        </View>

        <View style={styles.ctaBlock}>
          <Pressable
            style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
            onPress={() => router.push('/success' as never)}>
            <Text style={styles.primaryButtonText}>Cuando realices el intercambio, confirmalo aqui por favor</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
            onPress={() => router.push(`/chat?matchId=${match.id}` as never)}>
            <Text style={styles.secondaryButtonText}>INICIAR UN CHAT</Text>
          </Pressable>
        </View>
      </ScrollView>

      <PitchBottomNav active="explore" />
    </View>
  );
}

function StatTile({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <View style={styles.statTile}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

function MiniSticker({
  sticker,
  tone,
}: {
  sticker: { nation: string; name: string; number: string; code: string; imageUrl: string };
  tone: 'missing' | 'duplicate';
}) {
  return (
    <View style={styles.miniSticker}>
      <View style={[styles.miniTopLabel, tone === 'missing' ? styles.missingLabel : styles.duplicateLabel]}>
        <Text style={styles.miniTopLabelText}>{tone === 'missing' ? 'Missing' : 'Duplicate'}</Text>
      </View>
      <View style={styles.miniImageWrap}>
        <Image source={sticker.imageUrl} style={StyleSheet.absoluteFill} contentFit="cover" />
      </View>
      <Text style={styles.miniCountry}>{sticker.nation.toUpperCase()}</Text>
      <Text style={styles.miniName}>{sticker.name}</Text>
      <Text style={styles.miniCode}>
        {sticker.code} · {sticker.number}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#131313',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 16,
  },
  cardWrap: {
    minHeight: 520,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#5b403f',
    backgroundColor: '#201f1f',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(10,10,10,0.2)',
  },
  cardBadges: {
    position: 'absolute',
    top: 14,
    left: 14,
    gap: 8,
    zIndex: 3,
  },
  flagBubble: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 54,
    height: 54,
    borderRadius: 27,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.18)',
    zIndex: 3,
  },
  flagImage: {
    width: '100%',
    height: '100%',
  },
  cardBottom: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    zIndex: 3,
    gap: 4,
  },
  country: {
    color: '#f0c2bf',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  name: {
    color: '#e5e2e1',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 34,
  },
  meta: {
    color: '#f0c2bf',
    fontSize: 14,
    lineHeight: 20,
  },
  numberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 4,
  },
  number: {
    color: '#e5e2e1',
    fontSize: 20,
    fontWeight: '900',
  },
  level: {
    color: '#95d4b3',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  statTile: {
    flex: 1,
    backgroundColor: '#201f1f',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#353534',
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 6,
  },
  statIcon: {
    fontSize: 18,
  },
  statLabel: {
    color: '#f0c2bf',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  statValue: {
    color: '#e5e2e1',
    fontSize: 24,
    fontWeight: '900',
  },
  collectorCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#5b403f',
    backgroundColor: '#201f1f',
    padding: 16,
    gap: 10,
  },
  collectorTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  collectorProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  collectorName: {
    color: '#e5e2e1',
    fontSize: 24,
    fontWeight: '900',
  },
  collectorRank: {
    color: '#95d4b3',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  collectorMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(240,194,191,0.12)',
    paddingTop: 10,
  },
  collectorMeta: {
    color: '#f0c2bf',
    fontSize: 20,
  },
  searchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#e5e2e1',
    fontSize: 30,
    fontWeight: '900',
  },
  wantGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  miniSticker: {
    flex: 1,
    backgroundColor: '#201f1f',
    borderWidth: 1,
    borderColor: '#353534',
    borderRadius: 16,
    padding: 8,
    gap: 6,
  },
  miniTopLabel: {
    borderRadius: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  missingLabel: {
    backgroundColor: '#ff535b',
  },
  duplicateLabel: {
    backgroundColor: '#95d4b3',
  },
  miniTopLabelText: {
    color: '#131313',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  miniImageWrap: {
    height: 164,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#2a2a2a',
  },
  miniCountry: {
    color: '#f0c2bf',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  miniName: {
    color: '#e5e2e1',
    fontSize: 18,
    fontWeight: '900',
  },
  miniCode: {
    color: '#f0c2bf',
    fontSize: 12,
    fontWeight: '800',
  },
  ctaBlock: {
    gap: 12,
    marginTop: 4,
  },
  primaryButton: {
    minHeight: 64,
    borderRadius: 18,
    backgroundColor: '#f5f4f3',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primaryButtonText: {
    color: '#5b000e',
    fontSize: 20,
    fontWeight: '900',
  },
  secondaryButton: {
    minHeight: 64,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#f5f4f3',
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