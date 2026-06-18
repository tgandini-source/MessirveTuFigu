import type { ImageSourcePropType } from 'react-native';
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// ---------------------------------------------------------------------------
// TIPOS E INTERFACES
// ---------------------------------------------------------------------------
export type StickerStatus = 'have' | 'repeated' | 'missing';

export type AlbumPlayer = {
  number: number;
  name: string;
  status: StickerStatus;
  repeatedCount?: number;
  apiPlayerId?: string;
};

export type TeamCode = 'ARG' | 'ESP' | 'FRA' | 'BRA';

export type AlbumTeam = {
  code: TeamCode;
  flag: string;
  label: string;
  players: AlbumPlayer[];
};

export const pitchSideAssets = {
  hero: { uri: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?w=1200&q=60' } as ImageSourcePropType,
};

// Todos los jugadores inicializados en 'missing' por defecto
export const albumTeams: AlbumTeam[] = [
  {
    code: 'ARG',
    flag: '🇦🇷',
    label: 'ARG',
    players: [
      { number: 1, name: 'E. Martínez', status: 'missing' },
      { number: 2, name: 'N. Molina', status: 'missing' },
      { number: 3, name: 'C. Romero', status: 'missing' },
      { number: 4, name: 'G. Montiel', status: 'missing' },
      { number: 5, name: 'N. Otamendi', status: 'missing' },
      { number: 6, name: 'L. Martínez', status: 'missing' },
      { number: 7, name: 'R. De Paul', status: 'missing' },
      { number: 8, name: 'E. Fernández', status: 'missing' },
      { number: 9, name: 'J. Álvarez', status: 'missing' },
      { number: 10, name: 'L. Messi', status: 'missing' },
      { number: 11, name: 'A. Di María', status: 'missing' },
      { number: 12, name: 'L. Paredes', status: 'missing' },
      { number: 13, name: 'T. Almada', status: 'missing' },
      { number: 14, name: 'G. Lo Celso', status: 'missing' },
      { number: 15, name: 'A. Mac Allister', status: 'missing' },
      { number: 16, name: 'F. Rulli', status: 'missing' },
      { number: 17, name: 'L. Acuña', status: 'missing' },
      { number: 18, name: 'M. Palacios', status: 'missing' },
    ],
  },
  {
    code: 'ESP',
    flag: '🇪🇸',
    label: 'ESP',
    players: [
      { number: 1, name: 'Unai Simón', status: 'missing' },
      { number: 2, name: 'D. Carvajal', status: 'missing' },
      { number: 3, name: 'R. Le Normand', status: 'missing' },
      { number: 4, name: 'Pau Cubarsí', status: 'missing' },
      { number: 5, name: 'A. Laporte', status: 'missing' },
      { number: 6, name: 'M. Merino', status: 'missing' },
      { number: 7, name: 'Á. Morata', status: 'missing' },
      { number: 8, name: 'Fabián Ruiz', status: 'missing' },
      { number: 9, name: 'Joselu', status: 'missing' },
      { number: 10, name: 'Pedri', status: 'missing' },
      { number: 11, name: 'Ferran Torres', status: 'missing' },
      { number: 12, name: 'M. Oyarzabal', status: 'missing' },
      { number: 13, name: 'M. Cucurella', status: 'missing' },
      { number: 14, name: 'Rodri', status: 'missing' },
      { number: 15, name: 'Dani Olmo', status: 'missing' },
      { number: 16, name: 'Nico Williams', status: 'missing' },
      { number: 17, name: 'Lamine Yamal', status: 'missing' },
      { number: 18, name: 'Jesús Navas', status: 'missing' },
    ],
  },
  {
    code: 'FRA',
    flag: '🇫🇷',
    label: 'FRA',
    players: [
      { number: 1, name: 'M. Maignan', status: 'missing' },
      { number: 2, name: 'J. Koundé', status: 'missing' },
      { number: 3, name: 'D. Upamecano', status: 'missing' },
      { number: 4, name: 'I. Konaté', status: 'missing' },
      { number: 5, name: 'T. Hernández', status: 'missing' },
      { number: 6, name: 'A. Tchouaméni', status: 'missing' },
      { number: 7, name: 'A. Griezmann', status: 'missing' },
      { number: 8, name: 'A. Rabiot', status: 'missing' },
      { number: 9, name: 'O. Giroud', status: 'missing' },
      { number: 10, name: 'K. Mbappé', status: 'missing' },
      { number: 11, name: 'O. Dembélé', status: 'missing' },
      { number: 12, name: 'M. Thuram', status: 'missing' },
      { number: 13, name: 'E. Camavinga', status: 'missing' },
      { number: 14, name: 'K. Coman', status: 'missing' },
      { number: 15, name: 'R. Kolo Muani', status: 'missing' },
      { number: 16, name: 'B. Barcola', status: 'missing' },
      { number: 17, name: 'L. Hernández', status: 'missing' },
      { number: 18, name: 'W. Saliba', status: 'missing' },
    ],
  },
  {
    code: 'BRA',
    flag: '🇧🇷',
    label: 'BRA',
    players: [
      { number: 1, name: 'Alisson', status: 'missing' },
      { number: 2, name: 'Danilo', status: 'missing' },
      { number: 3, name: 'Marquinhos', status: 'missing' },
      { number: 4, name: 'É. Militão', status: 'missing' },
      { number: 5, name: 'Casemiro', status: 'missing' },
      { number: 6, name: 'Alex Sandro', status: 'missing' },
      { number: 7, name: 'Raphinha', status: 'missing' },
      { number: 8, name: 'B. Guimarães', status: 'missing' },
      { number: 9, name: 'G. Jesus', status: 'missing' },
      { number: 10, name: 'Neymar', status: 'missing' },
      { number: 11, name: 'Rodrygo', status: 'missing' },
      { number: 12, name: 'Endrick', status: 'missing' },
      { number: 13, name: 'G. Magalhães', status: 'missing' },
      { number: 14, name: 'L. Paquetá', status: 'missing' },
      { number: 15, name: 'Wendell', status: 'missing' },
      { number: 16, name: 'Martinelli', status: 'missing' },
      { number: 17, name: 'Vinícius Jr.', status: 'missing' },
      { number: 18, name: 'Richarlison', status: 'missing' },
    ],
  },
];

export function summarizeTeam(players: AlbumPlayer[]) {
  return players.reduce(
    (acc, player) => {
      if (player.status === 'have') acc.have += 1;
      else if (player.status === 'repeated') acc.repeated += 1;
      else acc.missing += 1;
      return acc;
    },
    { have: 0, repeated: 0, missing: 0 }
  );
}

// ---------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ---------------------------------------------------------------------------
export default function UploadScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  const [teams, setTeams] = useState<AlbumTeam[]>(albumTeams);
  const [selectedTeamCode, setSelectedTeamCode] = useState<TeamCode>('ARG');

  const selectedTeam = useMemo(() => teams.find(t => t.code === selectedTeamCode), [teams, selectedTeamCode]);

  const handlePressPlayer = (player: AlbumPlayer) => {
    setTeams(prevTeams => {
      const newTeams = [...prevTeams];
      const teamIndex = newTeams.findIndex(t => t.code === selectedTeamCode);
      if (teamIndex === -1) return prevTeams;
      
      const newTeam = { ...newTeams[teamIndex] };
      const newPlayers = [...newTeam.players];
      const playerIndex = newPlayers.findIndex(p => p.number === player.number);
      if (playerIndex === -1) return prevTeams;

      const p = { ...newPlayers[playerIndex] };
      
      if (p.status === 'missing') {
        p.status = 'have';
      } else if (p.status === 'have') {
        p.status = 'repeated';
        p.repeatedCount = 2;
      } else if (p.status === 'repeated') {
        if ((p.repeatedCount || 2) < 4) {
          p.repeatedCount = (p.repeatedCount || 2) + 1;
        } else {
          p.status = 'missing';
          p.repeatedCount = undefined;
        }
      }

      newPlayers[playerIndex] = p;
      newTeam.players = newPlayers;
      newTeams[teamIndex] = newTeam;
      
      return newTeams;
    });
  };

  const getTotalRepeated = () => {
    let total = 0;
    teams.forEach(t => {
      t.players.forEach(p => {
        if (p.status === 'repeated') {
          total += (p.repeatedCount || 2) - 1; 
        }
      });
    });
    return total;
  };

  const summary = useMemo(() => {
    if (!selectedTeam) return { have: 0, repeated: 0, missing: 0 };
    return summarizeTeam(selectedTeam.players);
  }, [selectedTeam]);

  const totalRepeated = getTotalRepeated();

  // Función modificada para redirigir a /home
  const handlePublish = () => {
    console.log(`Publicando ${totalRepeated} repetidas y volviendo al inicio...`);
    
    // Redirige reemplazando la pantalla actual en el stack
    router.replace('/home');
  };

  const renderStickerItem = ({ item: player }: { item: AlbumPlayer }) => {
    const isMissing = player.status === 'missing';
    const isHave = player.status === 'have';
    const isRepeated = player.status === 'repeated';

    let stickerStyle = styles.stickerMissing;
    let numStyle = styles.stickerNumMissing;
    let nameStyle = styles.stickerNameMissing;

    if (isHave) {
      stickerStyle = styles.stickerHave;
      numStyle = styles.stickerNumHave;
      nameStyle = styles.stickerNameHave;
    } else if (isRepeated) {
      stickerStyle = styles.stickerRepeated;
      numStyle = styles.stickerNumRepeated;
      nameStyle = styles.stickerNameRepeated;
    }

    return (
      <View style={styles.stickerWrapper}>
        <Pressable 
          style={[styles.sticker, stickerStyle]}
          onPress={() => handlePressPlayer(player)}
        >
          <Text style={[styles.stickerNumber, numStyle]}>{player.number}</Text>
          <Text style={[styles.stickerName, nameStyle]} numberOfLines={1} adjustsFontSizeToFit>{player.name}</Text>

          {isHave && (
            <View style={[styles.badge, styles.badgeHave]}>
              <Ionicons name="checkmark" size={12} color="#131313" />
            </View>
          )}
          {isRepeated && (
            <View style={[styles.badge, styles.badgeRepeated]}>
              <Text style={styles.badgeText}>x{player.repeatedCount || 2}</Text>
            </View>
          )}
        </Pressable>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.title}>Mi Álbum</Text>
          <Text style={styles.subtitle}>Tocá cada figurita para marcarla</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Team Tabs */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
          {teams.map(team => {
            const isSelected = team.code === selectedTeamCode;
            return (
              <TouchableOpacity
                key={team.code}
                style={[styles.tabButton, isSelected && styles.tabButtonSelected]}
                onPress={() => setSelectedTeamCode(team.code)}
              >
                <Text style={[styles.tabFlag, isSelected && styles.tabTextSelected]}>{team.flag}</Text>
                <Text style={[styles.tabText, isSelected && styles.tabTextSelected]}>{team.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <View style={[styles.summaryDot, { backgroundColor: '#22C55E' }]} />
          <Text style={styles.summaryText}>{summary.have} tengo</Text>
        </View>
        <View style={styles.summaryItem}>
          <View style={[styles.summaryDot, { backgroundColor: '#FBBF24' }]} />
          <Text style={styles.summaryText}>{summary.repeated} repetidas</Text>
        </View>
        <View style={styles.summaryItem}>
          <View style={[styles.summaryDot, { backgroundColor: '#4B5563' }]} />
          <Text style={styles.summaryText}>{summary.missing} faltan</Text>
        </View>
        <View style={{ flex: 1 }} />
        <Text style={styles.summaryHelp}>tocá para cambiar</Text>
      </View>

      {/* Stickers Grid */}
      <FlatList
        data={selectedTeam?.players || []}
        keyExtractor={(item) => `${selectedTeamCode}-${item.number}`}
        renderItem={renderStickerItem}
        numColumns={4}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContent}
      />

      {/* Publish Button */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
          <Text style={styles.publishText}>PUBLICAR {totalRepeated} REPETIDAS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// ESTILOS
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitles: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '900',
  },
  subtitle: {
    color: '#8A8A8E',
    fontSize: 14,
    marginTop: 2,
  },
  filterButton: {
    padding: 4,
  },
  tabsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#1C1C1E',
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  tabButtonSelected: {
    backgroundColor: '#DE3C3F',
    borderColor: '#DE3C3F',
  },
  tabFlag: {
    marginRight: 6,
    fontSize: 14,
  },
  tabText: {
    color: '#8A8A8E',
    fontSize: 15,
    fontWeight: '700',
  },
  tabTextSelected: {
    color: '#FFF',
    opacity: 1,
  },
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },
  summaryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  summaryText: {
    color: '#8A8A8E',
    fontSize: 12,
  },
  summaryHelp: {
    color: '#666',
    fontSize: 12,
  },
  gridContent: {
    paddingHorizontal: 12,
    paddingBottom: 120,
  },
  row: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  stickerWrapper: {
    flex: 1 / 4,
    padding: 4,
  },
  sticker: {
    flex: 1,
    aspectRatio: 0.85,
    borderRadius: 12,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  stickerMissing: {
    backgroundColor: '#1A1C1E',
    borderColor: '#2C2C2E',
  },
  stickerHave: {
    backgroundColor: '#0A2012',
    borderColor: '#1A5331',
  },
  stickerRepeated: {
    backgroundColor: '#271E0B',
    borderColor: '#785315',
  },
  stickerNumber: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 4,
  },
  stickerNumMissing: {
    color: '#5C5C5E',
  },
  stickerNumHave: {
    color: '#22C55E',
  },
  stickerNumRepeated: {
    color: '#FBBF24',
  },
  stickerName: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  stickerNameMissing: {
    color: '#5C5C5E',
  },
  stickerNameHave: {
    color: '#22C55E',
  },
  stickerNameRepeated: {
    color: '#FBBF24',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#131313', 
  },
  badgeHave: {
    backgroundColor: '#22C55E',
  },
  badgeRepeated: {
    backgroundColor: '#FBBF24',
  },
  badgeText: {
    color: '#131313',
    fontSize: 8,
    fontWeight: '900',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#131313',
    borderTopWidth: 1,
    borderTopColor: '#1C1C1E',
  },
  publishButton: {
    backgroundColor: '#DE3C3F',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#DE3C3F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  publishText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  }
});