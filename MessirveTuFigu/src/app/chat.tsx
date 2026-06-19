import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { PitchMiniAvatar } from '@/components/pitch-chrome';
import { getCachedPitchSideFeed } from '@/data/pitch-side';

export default function ChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ matchId?: string }>();
  const feed = getCachedPitchSideFeed();
  const match = feed?.suggestions.find((entry) => entry.id === params.matchId) ?? feed?.suggestions[0];

  if (!match) {
    return <View />;
  }

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <Text style={styles.iconButtonText}>←</Text>
        </Pressable>
        <View style={styles.headerCenter}>
          <PitchMiniAvatar uri={match.collector.avatarUrl} size={42} />
          <View>
            <Text style={styles.title}>{match.collector.name}</Text>
            <Text style={styles.subtitle}>Collector rank: {match.collector.rank}</Text>
          </View>
        </View>
        <Pressable style={styles.iconButton}>
          <Text style={styles.iconButtonText}>⋯</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.offerCard}>
          <View style={styles.offerSide}>
            <Text style={styles.offerLabel}>La necesitas</Text>
            <Text style={styles.offerName}>{match.incomingSticker.name}</Text>
          </View>
          <Text style={styles.swap}>⇄</Text>
          <View style={styles.offerSideRight}>
            <Text style={styles.offerLabelRight}>La tenes repetida</Text>
            <Text style={styles.offerNameRight}>{match.outgoingSticker.name}</Text>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
          onPress={() => router.push('/success' as never)}>
          <Text style={styles.primaryButtonText}>Confirma el intercambio</Text>
        </Pressable>

        <View style={styles.messageRow}>
          <PitchMiniAvatar uri={match.collector.avatarUrl} size={32} />
          <View style={styles.messageBubbleLeft}>
            <Text style={styles.messageText}>
              Hey! Yo tengo a {match.incomingSticker.name}, me interesa la que vos tenes, {match.outgoingSticker.name}
            </Text>
            <Text style={styles.messageTime}>14:23</Text>
          </View>
        </View>

        <View style={[styles.messageRow, styles.messageRowReverse]}>
          <View style={styles.myBubble}>
            <Text style={styles.myBubbleText}>
              Si, seguro, sin problema, como hacemos?
            </Text>
            <Text style={styles.messageTimeRight}>14:25 ✓✓</Text>
          </View>
          <View style={styles.meBadge}>
            <Text style={styles.meBadgeText}>ME</Text>
          </View>
        </View>

        <View style={styles.messageRow}>
          <PitchMiniAvatar uri={match.collector.avatarUrl} size={32} />
          <View style={styles.messageBubbleLeft}>
            <Text style={styles.messageText}>Te parece si nos juntamos en la plaza 25 de Mayo el viernes a las 8?</Text>
            <Text style={styles.messageTime}>Justo ahora</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.inputBar}>
        <View style={styles.inputShell}>
          <Text style={styles.plus}>＋</Text>
          <TextInput placeholder="Escribe tu mensaje..." placeholderTextColor="#60708a" style={styles.input} />
          <Text style={styles.plus}>☺</Text>
          <Pressable style={styles.sendButton} onPress={() => router.push('/success' as never)}>
            <Text style={styles.sendButtonText}>➤</Text>
          </Pressable>
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
  header: {
    minHeight: 72,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#5b403f',
    backgroundColor: '#131313',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  iconButtonText: {
    color: '#f0c2bf',
    fontSize: 18,
    fontWeight: '900',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    color: '#e5e2e1',
    fontSize: 22,
    fontWeight: '900',
  },
  subtitle: {
    color: '#95d4b3',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    gap: 18,
  },
  offerCard: {
    backgroundColor: 'rgba(30,30,30,0.82)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#5b403f',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  offerSide: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: '#201f1f',
    padding: 12,
    gap: 6,
  },
  offerSideRight: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: '#201f1f',
    padding: 12,
    gap: 6,
    alignItems: 'flex-end',
  },
  offerLabel: {
    color: '#ffb3b1',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  offerLabelRight: {
    color: '#95d4b3',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  offerName: {
    color: '#e5e2e1',
    fontSize: 22,
    fontWeight: '900',
  },
  offerNameRight: {
    color: '#b0c7f1',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'right',
  },
  swap: {
    color: '#f0c2bf',
    fontSize: 28,
    fontWeight: '900',
  },
  confirmButton: {
    minHeight: 60,
    backgroundColor: '#f5f4f3',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmText: {
    color: '#5b000e',
    fontSize: 18,
    fontWeight: '900',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    maxWidth: '100%',
  },
  messageRowReverse: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
  },
  messageBubbleLeft: {
    flex: 1,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#5b403f',
    backgroundColor: '#2a2a2a',
    padding: 14,
    gap: 8,
  },
  messageText: {
    color: '#e5e2e1',
    fontSize: 16,
    lineHeight: 22,
  },
  messageTime: {
    color: '#f0c2bf',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  myBubble: {
    flex: 1,
    borderRadius: 18,
    borderBottomRightRadius: 4,
    backgroundColor: '#4d6690',
    padding: 14,
    gap: 8,
  },
  myBubbleText: {
    color: '#dce7f7',
    fontSize: 16,
    lineHeight: 22,
  },
  messageTimeRight: {
    color: '#f0c2bf',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    textAlign: 'right',
  },
  meBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#ff535b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  meBadgeText: {
    color: '#5b000e',
    fontSize: 11,
    fontWeight: '900',
  },
  inputBar: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#5b403f',
    backgroundColor: '#1c1b1b',
  },
  inputShell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#5b403f',
    backgroundColor: '#131313',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  plus: {
    color: '#f0c2bf',
    fontSize: 20,
    fontWeight: '900',
  },
  input: {
    flex: 1,
    color: '#e5e2e1',
    fontSize: 16,
    paddingVertical: 0,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff535b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#5b000e',
    fontSize: 18,
    fontWeight: '900',
  },
  primaryButton: {
    minHeight: 64,
    borderRadius: 18,
    backgroundColor: '#f5f4f3',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  primaryButtonText: {
    color: '#5b000e',
    fontSize: 20,
    fontWeight: '900',
  },
});