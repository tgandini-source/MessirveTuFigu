import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type NavigationKey = 'home' | 'explore' | 'upload' | 'chat';

type PitchHeaderProps = {
  title: string;
  subtitle?: string;
  location?: string;
  showBack?: boolean;
  showActions?: boolean;
};

type PillProps = {
  children: React.ReactNode;
  tone?: 'mint' | 'blue' | 'red' | 'neutral';
};

type ActionButtonProps = {
  label: string;
  icon?: string;
  tone?: 'primary' | 'ghost' | 'surface';
  onPress?: () => void;
};

export function PitchHeader({ title, subtitle, location, showBack, showActions = true }: PitchHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.headerSide}>
        {showBack ? (
          <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
            <SymbolView name="chevron.left" tintColor="#f0c2bf" size={22} />
          </Pressable>
        ) : (
          <View style={styles.locationBlock}>
            <SymbolView name="location" tintColor="#f0c2bf" size={20} />
            <Text style={styles.locationText}>{location ?? ''}</Text>
          </View>
        )}
      </View>

      <View style={styles.titleBlock}>
        <Text style={styles.headerTitle}>{title}</Text>
        {subtitle ? <Text style={styles.headerSubtitle}>{subtitle}</Text> : null}
      </View>

      <View style={[styles.headerSide, styles.rightSide]}>
        {showActions ? (
          <Pressable style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
            <SymbolView name="slider.horizontal.3" tintColor="#f0c2bf" size={22} />
          </Pressable>
        ) : (
          <View style={styles.headerSpacer} />
        )}
      </View>
    </View>
  );
}

export function PitchPill({ children, tone = 'neutral' }: PillProps) {
  return <Text style={[styles.pill, pillToneStyles[tone]]}>{children}</Text>;
}

export function PitchActionButton({ label, icon, tone = 'surface', onPress }: ActionButtonProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.actionBase, actionToneStyles[tone], pressed && styles.pressed]}>
      {icon ? <SymbolView name={icon} tintColor={tone === 'primary' ? '#5b000e' : '#f0c2bf'} size={18} /> : null}
      <Text style={[styles.actionLabel, tone === 'primary' ? styles.primaryLabel : styles.surfaceLabel]}>{label}</Text>
    </Pressable>
  );
}

export function PitchBottomNav({ active }: { active: NavigationKey }) {
  const router = useRouter();

  const items: Array<{ key: NavigationKey; label: string; icon: string; route: string }> = [
    { key: 'home', label: 'Inicio', icon: 'square.grid.2x2', route: '/home' },
    { key: 'explore', label: 'Matches', icon: 'sparkles', route: '/explore' },
    { key: 'upload', label: 'Subir', icon: 'square.and.arrow.up', route: '/upload' },
    { key: 'chat', label: 'Chat', icon: 'bubble.left.and.bubble.right', route: '/chat' },
  ];

  return (
    <View style={styles.bottomNav}>
      {items.map((item) => {
        const isActive = item.key === active;

        return (
          <Pressable
            key={item.key}
            onPress={() => router.push(item.route as never)}
            style={({ pressed }) => [styles.navItem, isActive && styles.navItemActive, pressed && styles.pressed]}>
            <SymbolView
              name={item.icon}
              tintColor={isActive ? '#5b000e' : '#f0c2bf'}
              size={20}
              weight={isActive ? 'bold' : 'regular'}
            />
            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function PitchHeroImage({ uri }: { uri: string }) {
  return <Image source={uri} style={styles.heroImage} contentFit="cover" transition={250} />;
}

export function PitchMiniAvatar({ uri, size = 40 }: { uri: string; size?: number }) {
  return <Image source={uri} style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]} contentFit="cover" />;
}

const pillToneStyles = StyleSheet.create({
  mint: {
    backgroundColor: '#0f5132',
    color: '#95d4b3',
  },
  blue: {
    backgroundColor: '#334a6d',
    color: '#b0c7f1',
  },
  red: {
    backgroundColor: '#ff535b',
    color: '#5b000e',
  },
  neutral: {
    backgroundColor: '#1e1d1d',
    color: '#f0c2bf',
  },
});

const actionToneStyles = StyleSheet.create({
  primary: {
    backgroundColor: '#f5f4f3',
    borderColor: '#f5f4f3',
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: '#f5f4f3',
  },
  surface: {
    backgroundColor: '#201f1f',
    borderColor: '#5b403f',
  },
});

const styles = StyleSheet.create({
  header: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#5b403f',
    backgroundColor: '#131313',
  },
  headerSide: {
    width: 92,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSide: {
    justifyContent: 'flex-end',
  },
  titleBlock: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#e5e2e1',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -1,
    textAlign: 'center',
  },
  headerSubtitle: {
    marginTop: 2,
    color: '#95d4b3',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  locationBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationText: {
    color: '#f0c2bf',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  bottomNav: {
    height: 84,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#1c1b1b',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    width: 74,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    gap: 4,
  },
  navItemActive: {
    backgroundColor: '#ff535b',
  },
  navLabel: {
    color: '#f0c2bf',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  navLabelActive: {
    color: '#5b000e',
  },
  pill: {
    overflow: 'hidden',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  actionBase: {
    minHeight: 64,
    borderWidth: 2,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  actionLabel: {
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  primaryLabel: {
    color: '#5b000e',
  },
  surfaceLabel: {
    color: '#e5e2e1',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  heroImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  avatar: {
    backgroundColor: '#2a2a2a',
  },
});