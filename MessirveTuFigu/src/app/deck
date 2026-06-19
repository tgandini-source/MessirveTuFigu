import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { PitchHeader, PitchMiniAvatar, PitchPill } from '@/components/pitch-chrome';
import { getCachedPitchSideFeed, pitchSideAssets } from '@/data/pitch-side';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth - 32;

interface StickerCard {
  id: string;
  playerName: string;
  country: string;
  position: string;
  number: number;
  level: number;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isMissing: boolean;
  matchingCollector?: {
    name: string;
    handle: string;
    avatar: string;
  };
}

const STICKER_DECK: StickerCard[] = [
  {
    id: '1',
    playerName: 'Lionel Messi',
    country: 'Argentina',
    position: 'FW',
    number: 10,
    level: 99,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdFeflO_ejhOyxmMHW2ZkGmgD9wMmb3WxYoZet2Su5EEtLzDJL0gjs4T13SSpqjSdBcmTlQHXeEonO4bC7JrHJChmmdn1Ns6wyr7jc6lit0ldeEBZ-i5XmufrnJmIDHtO1MPgyj2No3OlV70R3vdyhuJ4f_TAcztsGYp9QF1R7llQe8FSkBBkPxZYU4ReWxdKEWYoCi4kytOvoYt3g1Jcxnk3E2Pp60jCRv70EGX38aj-8XO0RZaaJG-VqBGMh5CZOFwOhfu6-Ljc',
    rarity: 'legendary',
    isMissing: true,
    matchingCollector: {
      name: 'Starkle',
      handle: '@starkle',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPcm_10bMqd5pBJSxDA6wUxbektXpbWPmST1t2PW6H_f7EpHVocDEI8CXTkke3D4Lpf7YA11mQnQL0S891umXYyNb3i2exu9qbu0gsrih7S64Po9Y41REwTmVU1qAHif9G2FrE0ZrF8878Tjcp3xcJ3LjMP5t9Karwp5VpeTtGydZdvx6y_Q6Grc4KIr7xEdoxGKkm788StuhHBE628kHOwz6X-AE-Kl5D8h0xFd5wUz3qzVQiN6zk7_rOZOiN3rUuGORDD9IKIlw',
    },
  },
  {
    id: '2',
    playerName: 'Cristiano Ronaldo',
    country: 'Portugal',
    position: 'FW',
    number: 7,
    level: 98,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdFeflO_ejhOyxmMHW2ZkGmgD9wMmb3WxYoZet2Su5EEtLzDJL0gjs4T13SSpqjSdBcmTlQHXeEonO4bC7JrHJChmmdn1Ns6wyr7jc6lit0ldeEBZ-i5XmufrnJmIDHtO1MPgyj2No3OlV70R3vdyhuJ4f_TAcztsGYp9QF1R7llQe8FSkBBkPxZYU4ReWxdKEWYoCi4kytOvoYt3g1Jcxnk3E2Pp60jCRv70EGX38aj-8XO0RZaaJG-VqBGMh5CZOFwOhfu6-Ljc',
    rarity: 'legendary',
    isMissing: false,
  },
  {
    id: '3',
    playerName: 'Kylian Mbappé',
    country: 'France',
    position: 'FW',
    number: 10,
    level: 97,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdFeflO_ejhOyxmMHW2ZkGmgD9wMmb3WxYoZet2Su5EEtLzDJL0gjs4T13SSpqjSdBcmTlQHXeEonO4bC7JrHJChmmdn1Ns6wyr7jc6lit0ldeEBZ-i5XmufrnJmIDHtO1MPgyj2No3OlV70R3vdyhuJ4f_TAcztsGYp9QF1R7llQe8FSkBBkPxZYU4ReWxdKEWYoCi4kytOvoYt3g1Jcxnk3E2Pp60jCRv70EGX38aj-8XO0RZaaJG-VqBGMh5CZOFwOhfu6-Ljc',
    rarity: 'epic',
    isMissing: true,
    matchingCollector: {
      name: 'Mateo',
      handle: '@mateo_trades',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPcm_10bMqd5pBJSxDA6wUxbektXpbWPmST1t2PW6H_f7EpHVocDEI8CXTkke3D4Lpf7YA11mQnQL0S891umXYyNb3i2exu9qbu0gsrih7S64Po9Y41REwTmVU1qAHif9G2FrE0ZrF8878Tjcp3xcJ3LjMP5t9Karwp5VpeTtGydZdvx6y_Q6Grc4KIr7xEdoxGKkm788StuhHBE628kHOwz6X-AE-Kl5D8h0xFd5wUz3qzVQiN6zk7_rOZOiN3rUuGORDD9IKIlw',
    },
  },
  {
    id: '4',
    playerName: 'Neymar Jr',
    country: 'Brazil',
    position: 'FW',
    number: 10,
    level: 96,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdFeflO_ejhOyxmMHW2ZkGmgD9wMmb3WxYoZet2Su5EEtLzDJL0gjs4T13SSpqjSdBcmTlQHXeEonO4bC7JrHJChmmdn1Ns6wyr7jc6lit0ldeEBZ-i5XmufrnJmIDHtO1MPgyj2No3OlV70R3vdyhuJ4f_TAcztsGYp9QF1R7llQe8FSkBBkPxZYU4ReWxdKEWYoCi4kytOvoYt3g1Jcxnk3E2Pp60jCRv70EGX38aj-8XO0RZaaJG-VqBGMh5CZOFwOhfu6-Ljc',
    rarity: 'epic',
    isMissing: false,
  },
  {
    id: '5',
    playerName: 'Vinícius Júnior',
    country: 'Brazil',
    position: 'LW',
    number: 20,
    level: 95,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdFeflO_ejhOyxmMHW2ZkGmgD9wMmb3WxYoZet2Su5EEtLzDJL0gjs4T13SSpqjSdBcmTlQHXeEonO4bC7JrHJChmmdn1Ns6wyr7jc6lit0ldeEBZ-i5XmufrnJmIDHtO1MPgyj2No3OlV70R3vdyhuJ4f_TAcztsGYp9QF1R7llQe8FSkBBkPxZYU4ReWxdKEWYoCi4kytOvoYt3g1Jcxnk3E2Pp60jCRv70EGX38aj-8XO0RZaaJG-VqBGMh5CZOFwOhfu6-Ljc',
    rarity: 'rare',
    isMissing: true,
  },
];

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'legendary':
      return '#ffb3b1';
    case 'epic':
      return '#b0c7f1';
    case 'rare':
      return '#95d4b3';
    default:
      return '#f0c2bf';
  }
};

export default function DeckScreen() {
  const router = useRouter();
  const [cardIndex, setCardIndex] = useState(0);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const pan = useRef(new Animated.ValueXY()).current;

  const currentCard = STICKER_DECK[cardIndex];

  const handleLike = () => {
    setSelectedCards([...selectedCards, currentCard.id]);
    if (cardIndex < STICKER_DECK.length - 1) {
      setCardIndex(cardIndex + 1);
    } else {
      router.push('/home' as never);
    }
  };

  const handleSkip = () => {
    if (cardIndex < STICKER_DECK.length - 1) {
      setCardIndex(cardIndex + 1);
    } else {
      router.push('/home' as never);
    }
  };

  const handleFinish = () => {
    router.push('/home' as never);
  };

  if (!currentCard) {
    return (
      <View style={styles.root}>
        <PitchHeader title="Pitch Side Trading" location="Doha, Qatar" />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>¡Bien hecho! Ya revisaste todo</Text>
          <Pressable
            style={({ pressed }) => [styles.ctaButton, pressed && styles.ctaPressed]}
            onPress={handleFinish}>
            <Text style={styles.ctaText}>Ir al Dashboard</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Image
        source={pitchSideAssets.hero}
        style={[StyleSheet.absoluteFill]}
        contentFit="cover"
      />
      <View style={styles.overlay} />

      <PitchHeader title="Pitch Side Trading" location="Doha, Qatar" />

      <View style={styles.container}>
        {/* Card Counter */}
        <View style={styles.counter}>
          <Text style={styles.counterText}>
            {cardIndex + 1} / {STICKER_DECK.length}
          </Text>
        </View>

        {/* Sticker Card */}
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            <Image
              source={currentCard.image}
              style={styles.cardImage}
              contentFit="cover"
            />
            <View style={styles.cardOverlay} />

            {/* Top Left Badges */}
            <View style={styles.badgesTop}>
              {currentCard.isMissing && (
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: 'rgba(255, 83, 91, 0.85)' },
                  ]}>
                  <Text style={styles.badgeText}>MISSING</Text>
                </View>
              )}
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: 'rgba(42, 42, 42, 0.9)',
                    borderWidth: 1,
                    borderColor: getRarityColor(currentCard.rarity),
                  },
                ]}>
                <Text style={[styles.badgeText, { color: getRarityColor(currentCard.rarity) }]}>
                  {currentCard.rarity.toUpperCase()}
                </Text>
              </View>
            </View>

            {/* Bottom Content */}
            <View style={styles.cardBottom}>
              <View style={styles.playerInfo}>
                <View style={styles.playerLeft}>
                  <Text style={styles.countryLabel}>
                    {currentCard.country} • {currentCard.position}
                  </Text>
                  <Text style={styles.playerName}>{currentCard.playerName}</Text>
                </View>
                <View style={styles.playerRight}>
                  <Text style={styles.numberLabel}>#{currentCard.number}</Text>
                  <Text style={styles.levelLabel}>LVL {currentCard.level}</Text>
                </View>
              </View>

              {/* Matching Collector */}
              {currentCard.matchingCollector && (
                <View style={styles.matchingCard}>
                  <PitchMiniAvatar uri={currentCard.matchingCollector.avatar} size={32} />
                  <Text style={styles.matchingText}>
                    MATCH! <Text style={styles.matchingHandle}>{currentCard.matchingCollector.handle}</Text> HAS THIS
                    STICKER
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [styles.skipButton, pressed && styles.skipPressed]}
            onPress={handleSkip}>
            <Text style={styles.skipIcon}>✕</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.likeButton, pressed && styles.likePressed]}
            onPress={handleLike}>
            <Text style={styles.likeIcon}>♥</Text>
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
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(19,19,19,0.72)',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    marginBottom: 16,
  },
  counterText: {
    color: '#f0c2bf',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  cardWrapper: {
    width: '100%',
    height: 500,
    marginBottom: 24,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#201f1f',
    borderWidth: 1,
    borderColor: '#5b403f',
  },
  cardImage: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#201f1f',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  badgesTop: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 20,
    gap: 8,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: '#e5e2e1',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  cardBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    padding: 16,
    gap: 12,
  },
  playerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  playerLeft: {
    flex: 1,
  },
  playerRight: {
    alignItems: 'flex-end',
  },
  countryLabel: {
    color: '#ffb3b1',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  playerName: {
    color: '#f5f4f3',
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 32,
  },
  numberLabel: {
    color: 'rgba(245, 244, 243, 0.5)',
    fontSize: 14,
    fontWeight: '900',
  },
  levelLabel: {
    color: '#95d4b3',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginTop: 2,
  },
  matchingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(8px)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  matchingText: {
    color: 'rgba(245, 244, 243, 0.8)',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    flex: 1,
  },
  matchingHandle: {
    color: '#95d4b3',
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(30, 30, 30, 0.82)',
    borderWidth: 1,
    borderColor: '#5b403f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  skipIcon: {
    fontSize: 32,
    color: '#ffb3b1',
    fontWeight: '900',
  },
  likeButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#95d4b3',
    borderWidth: 1,
    borderColor: '#6ba895',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likePressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  likeIcon: {
    fontSize: 32,
    color: '#131313',
    fontWeight: '900',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    color: '#e5e2e1',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  ctaButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: '#f5f4f3',
    borderRadius: 14,
  },
  ctaPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  ctaText: {
    color: '#5b000e',
    fontSize: 16,
    fontWeight: '900',
  },
});
