import type { ImageSourcePropType } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable, FlatList, ActivityIndicator, Platform, Animated } from 'react-native';
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
  position?: string;     
  shirtNumber?: string | number; 
  age?: number;          
};

export type TeamCode = 'ARG' | 'ESP' | 'FRA' | 'BRA';

export type AlbumTeam = {
  code: TeamCode;
  flag: string;
  label: string;
  apiId: number;
};

// Configuración de los botones de navegación de equipos
const TEAMS_CONFIG: AlbumTeam[] = [
  { code: 'ARG', flag: '🇦🇷', label: 'ARG', apiId: 762 },
  { code: 'ESP', flag: '🇪🇸', label: 'ESP', apiId: 760 },
  { code: 'FRA', flag: '🇫🇷', label: 'FRA', apiId: 773 },
  { code: 'BRA', flag: '🇧🇷', label: 'BRA', apiId: 764 },
];

// 📋 LISTAS COMPLETAS DE 20 CASILLEROS PANINI REALS (FIELES A TUS IMÁGENES)
const ALBUM_PLAYERS_FIXED: Record<TeamCode, { number: number; name: string }[]> = {
  ARG: [
    { number: 1, name: "Escudo AFA" },
    { number: 2, name: "Emiliano Martínez" },
    { number: 3, name: "Nahuel Molina" },
    { number: 4, name: "Cristian Romero" },
    { number: 5, name: "Nicolás Otamendi" },
    { number: 6, name: "Nicolás Tagliafico" },
    { number: 7, name: "Leonardo Balerdi" },
    { number: 8, name: "Enzo Fernández" },
    { number: 9, name: "Alexis Mac Allister" },
    { number: 10, name: "Rodrigo De Paul" },
    { number: 11, name: "Exequiel Palacios" },
    { number: 12, name: "Leandro Paredes" },
    { number: 13, name: "Foto del Plantel" },
    { number: 14, name: "Nico Paz" },
    { number: 15, name: "Franco Mastantuono" },
    { number: 16, name: "Nicolás González" },
    { number: 17, name: "Lionel Messi" },
    { number: 18, name: "Lautaro Martínez" },
    { number: 19, name: "Julián Álvarez" },
    { number: 20, name: "Giuliano Simeone" }
  ],
  BRA: [
    { number: 1, name: "Escudo CBF" },
    { number: 2, name: "Alisson" },
    { number: 3, name: "Bento" },
    { number: 4, name: "Marquinhos" },
    { number: 5, name: "Éder Militão" },
    { number: 6, name: "Gabriel Magalhães" },
    { number: 7, name: "Danilo" },
    { number: 8, name: "Wesley" },
    { number: 9, name: "Lucas Paquetá" },
    { number: 10, name: "Casemiro" },
    { number: 11, name: "Bruno Guimarães" },
    { number: 12, name: "Luiz Henrique" },
    { number: 13, name: "Foto del Plantel" },
    { number: 14, name: "Vinicius Junior" },
    { number: 15, name: "Rodrygo" },
    { number: 16, name: "João Pedro" },
    { number: 17, name: "Matheus Cunha" },
    { number: 18, name: "Gabriel Martinelli" },
    { number: 19, name: "Raphinha" },
    { number: 20, name: "Estêvão" }
  ],
  ESP: [
    { number: 1, name: "Escudo RFEF" },
    { number: 2, name: "Unai Simón" },
    { number: 3, name: "Robin Le Normand" },
    { number: 4, name: "Aymeric Laporte" },
    { number: 5, name: "Dean Huijsen" },
    { number: 6, name: "Pedro Porro" },
    { number: 7, name: "Dani Carvajal" },
    { number: 8, name: "Marc Cucurella" },
    { number: 9, name: "Martín Zubimendi" },
    { number: 10, name: "Rodri" },
    { number: 11, name: "Pedri" },
    { number: 12, name: "Fabián Ruiz" },
    { number: 13, name: "Foto del Plantel" },
    { number: 14, name: "Mikel Merino" },
    { number: 15, name: "Lamine Yamal" },
    { number: 16, name: "Dani Olmo" },
    { number: 17, name: "Nico Williams" },
    { number: 18, name: "Ferran Torres" },
    { number: 19, name: "Álvaro Morata" },
    { number: 20, name: "Mikel Oyarzabal" }
  ],
  FRA: [
    { number: 1, name: "Escudo FFF" },
    { number: 2, name: "Mike Maignan" },
    { number: 3, name: "Theo Hernández" },
    { number: 4, name: "William Saliba" },
    { number: 5, name: "Jules Koundé" },
    { number: 6, name: "Ibrahima Konaté" },
    { number: 7, name: "Dayot Upamecano" },
    { number: 8, name: "Jonathan Clauss" },
    { number: 9, name: "Aurélien Tchouaméni" },
    { number: 10, name: "Eduardo Camavinga" },
    { number: 11, name: "Youssouf Fofana" },
    { number: 12, name: "Adrien Rabiot" },
    { number: 13, name: "Foto del Plantel" },
    { number: 14, name: "Michael Olise" },
    { number: 15, name: "Ousmane Dembélé" },
    { number: 16, name: "Bradley Barcola" },
    { number: 17, name: "Warren Zaïre-Emery" },
    { number: 18, name: "Kingsley Coman" },
    { number: 19, name: "Randal Kolo Muani" },
    { number: 20, name: "Kylian Mbappé" }
  ]
};

// Auxiliar para calcular edad exacta en vivo
const calcularEdad = (fechaNacimiento: string): number => {
  const hoy = new Date();
  const cumple = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - cumple.getFullYear();
  const mes = hoy.getMonth() - cumple.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < cumple.getDate())) {
    edad--;
  }
  return edad;
};

export default function Upload() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  const [selectedTeam, setSelectedTeam] = useState<AlbumTeam>(TEAMS_CONFIG[0]);
  const [players, setPlayers] = useState<AlbumPlayer[]>([]);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ title: string, message: string, type: 'success' | 'error' } | null>(null);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const showToast = (title: string, message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ title, message, type });
    Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
        setToastMessage(null);
        if (type === 'success') router.navigate('/home');
      });
    }, 2500);
  };

  const fetchPlayersFromAPI = useCallback(async (team: AlbumTeam) => {
    setLoading(true);
    setError(null);
    setPlayers([]);

    const apiKey = process.env.EXPO_PUBLIC_FOOTBALL_DATA_API_KEY;

    try {
      const targetUrl = `https://api.football-data.org/v4/teams/${team.apiId}`;
      const fetchUrl = Platform.OS === 'web' 
        ? `https://corsproxy.io/?url=${encodeURIComponent(targetUrl)}` 
        : targetUrl;

      const response = await fetch(fetchUrl, {
        method: 'GET',
        headers: { 'X-Auth-Token': apiKey || '' },
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Demasiadas solicitudes. Límite de la API gratis (10 por min).');
        }
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      const apiSquad = data.squad || [];

      const fixedList = ALBUM_PLAYERS_FIXED[team.code];
      const mappedPlayers: AlbumPlayer[] = fixedList.map((fixedPlayer) => {
        const apiPlayer = apiSquad.find((p: any) => p.name.toLowerCase() === fixedPlayer.name.toLowerCase());
        
        let posicionTraducida = "—";
        if (apiPlayer?.position) {
          switch (apiPlayer.position) {
            case 'Goalkeeper': posicionTraducida = 'ARQ'; break;
            case 'Defence': posicionTraducida = 'DEF'; break;
            case 'Midfield': posicionTraducida = 'MED'; break;
            case 'Offence': posicionTraducida = 'DEL'; break;
          }
        }

        return {
          number: fixedPlayer.number, 
          name: fixedPlayer.name,     
          status: 'missing', // Localmente arrancan todas en faltante
          repeatedCount: undefined,
          position: posicionTraducida,
          shirtNumber: apiPlayer?.shirtNumber || "—",
          age: apiPlayer?.dateOfBirth ? calcularEdad(apiPlayer.dateOfBirth) : undefined,
        };
      });

      setPlayers(mappedPlayers);
    } catch (err: any) {
      setError(err.message || 'Error de red. Verifica tu conexión.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlayersFromAPI(selectedTeam);
  }, [selectedTeam, fetchPlayersFromAPI]);

  const handlePressPlayer = (playerNumber: number) => {
    setPlayers(prevPlayers => prevPlayers.map(p => {
      if (p.number !== playerNumber) return p;
      if (p.status === 'missing') return { ...p, status: 'have' };
      if (p.status === 'have') return { ...p, status: 'repeated', repeatedCount: 2 };
      if (p.status === 'repeated') {
        if ((p.repeatedCount || 2) < 4) {
          return { ...p, repeatedCount: (p.repeatedCount || 2) + 1 };
        } else {
          return { ...p, status: 'missing', repeatedCount: undefined };
        }
      }
      return p;
    }));
  };

  const summary = React.useMemo(() => {
    return players.reduce(
      (acc, p) => {
        if (p.status === 'have') acc.have += 1;
        else if (p.status === 'repeated') acc.repeated += 1;
        else acc.missing += 1;
        return acc;
      },
      { have: 0, repeated: 0, missing: 0 }
    );
  }, [players]);

  const totalRepeated = React.useMemo(() => {
    return players.reduce((total, p) => p.status === 'repeated' ? total + ((p.repeatedCount || 2) - 1) : total, 0);
  }, [players]);

  const handleSimulateSave = () => {
    // Como no hay Supabase, simulamos un éxito local que vuelve a la home
    showToast('¡Guardado !', 'Cambios guardados .', 'success');
  };

  const renderStickerItem = ({ item: player }: { item: AlbumPlayer }) => {
    const isMissing = player.status === 'missing';
    const isHave = player.status === 'have';
    const isRepeated = player.status === 'repeated';

    let stickerStyle = styles.stickerMissing;
    let numStyle = styles.stickerMissing;
    let nameStyle = styles.stickerNameMissing;
    let infoTextStyle = styles.infoTextMissing; 

    if (isHave) {
      stickerStyle = styles.stickerHave;
      numStyle = styles.stickerNumHave;
      nameStyle = styles.stickerNameHave;
      infoTextStyle = styles.infoTextHave;
    } else if (isRepeated) {
      stickerStyle = styles.stickerRepeated;
      numStyle = styles.stickerNumRepeated;
      nameStyle = styles.stickerNameRepeated;
      infoTextStyle = styles.infoTextRepeated;
    }

    return (
      <View style={styles.stickerWrapper}>
        <Pressable style={[styles.sticker, stickerStyle]} onPress={() => handlePressPlayer(player.number)}>
          
          {/* TOP ROW */}
          <View style={styles.stickerHeaderRow}>
            <Text style={[styles.stickerNumber, numStyle]}>#{player.number}</Text>
            <Text style={[styles.stickerPositionTag, isMissing && styles.positionTagMissing]}>
              {player.position}
            </Text>
          </View>

          {/* MIDDLE ROW */}
          <Text style={[styles.stickerName, nameStyle]} numberOfLines={2} adjustsFontSizeToFit>
            {player.name}
          </Text>
          
          {/* BOTTOM ROW */}
          <View style={styles.stickerFooterRow}>
            {player.shirtNumber && player.shirtNumber !== "—" ? (
              <Text style={[styles.stickerFooterText, infoTextStyle]}>
                👕 {player.shirtNumber}
              </Text>
            ) : (
              <View /> 
            )}
            
            {player.age ? (
              <Text style={[styles.stickerFooterText, infoTextStyle]}>
                🎂 {player.age}a
              </Text>
            ) : (
              <Text style={[styles.stickerFooterText, infoTextStyle]}>—</Text>
            )}
          </View>

          {/* Badges Flotantes */}
          {isHave && (
            <View style={[styles.badge, styles.badgeHave]}>
              <Ionicons name="checkmark" size={10} color="#131313" />
            </View>
          )}
          {isRepeated && (
            <View style={[styles.badge, styles.badgeRepeated]}>
              <Text style={styles.badgeText}>+{player.repeatedCount ? player.repeatedCount - 1 : 1}</Text>
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
        <TouchableOpacity 
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace('/'); // O '/home' según cómo se llame tu pantalla principal
            }
          }} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.title}>Mi Álbum Real ⚽</Text>
        </View>
      </View>

      {/* Selector de Pestañas */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
          {TEAMS_CONFIG.map(team => {
            const isSelected = team.code === selectedTeam.code;
            return (
              <TouchableOpacity
                key={team.code}
                style={[styles.tabButton, isSelected && styles.tabButtonSelected]}
                onPress={() => !loading && setSelectedTeam(team)}
              >
                <Text style={styles.tabFlag}>{team.flag}</Text>
                <Text style={[styles.tabText, isSelected && styles.tabTextSelected]}>{team.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* CARGAS Y ERRORES */}
      {loading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#DE3C3F" />
          <Text style={styles.infoText}>Consultando plantilla de la API de Fútbol...</Text>
        </View>
      )}

      {error && (
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#DE3C3F" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => fetchPlayersFromAPI(selectedTeam)}>
            <Text style={styles.retryButtonText}>Reintentar conexión</Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading && !error && players.length === 0 && (
        <View style={styles.centerContainer}>
          <Ionicons name="folder-open-outline" size={48} color="#8A8A8E" />
          <Text style={styles.infoText}>No se pudieron inicializar los casilleros.</Text>
        </View>
      )}

      {!loading && !error && players.length > 0 && (
        <>
          {/* Panel de Control de Totales */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <View style={[styles.summaryDot, { backgroundColor: '#4ADE80' }]} />
              <Text style={styles.summaryText}>{summary.have} tengo</Text>
            </View>
            <View style={styles.summaryItem}>
              <View style={[styles.summaryDot, { backgroundColor: '#FBBF24' }]} />
              <Text style={styles.summaryText}>{summary.repeated} con repes</Text>
            </View>
            <View style={styles.summaryItem}>
              <View style={[styles.summaryDot, { backgroundColor: '#4B5563' }]} />
              <Text style={styles.summaryText}>{summary.missing} faltan</Text>
            </View>
          </View>

          {/* Grilla Principal */}
          <FlatList
            data={players}
            keyExtractor={(item) => `${selectedTeam.code}-${item.number}`}
            renderItem={renderStickerItem}
            numColumns={4}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.gridContent}
          />

          {/* Barra Inferior */}
          <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
            <TouchableOpacity style={styles.publishButton} onPress={handleSimulateSave}>
              <Text style={styles.publishText}>FINALIZAR REVISIÓN (+{totalRepeated} REPES)</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Toast Animado */}
      {toastMessage && (
        <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
          <View style={styles.toast}>
            <Ionicons name="checkmark-circle" size={24} color="#FFF" />
            <View style={styles.toastTextContainer}>
              <Text style={styles.toastTitle}>{toastMessage.title}</Text>
              <Text style={styles.toastMessage}>{toastMessage.message}</Text>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

// ---------------------------------------------------------------------------
// ESTILOS PREMIUM
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#131313' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  backButton: { padding: 4 },
  headerTitles: { flex: 1, marginLeft: 12 },
  title: { color: '#FFF', fontSize: 22, fontWeight: '900' },
  subtitle: { color: '#8A8A8E', fontSize: 14, marginTop: 2 },
  tabsContainer: { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  tabButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 24, backgroundColor: '#1C1C1E', borderWidth: 1, borderColor: '#2C2C2E' },
  tabButtonSelected: { backgroundColor: '#DE3C3F', borderColor: '#DE3C3F' },
  tabFlag: { marginRight: 6, fontSize: 14 },
  tabText: { color: '#8A8A8E', fontSize: 15, fontWeight: '700' },
  tabTextSelected: { color: '#FFF' },
  summaryContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 16 },
  summaryItem: { flexDirection: 'row', alignItems: 'center', marginRight: 14 },
  summaryDot: { width: 10, height: 10, borderRadius: 5, marginRight: 6 },
  summaryText: { color: '#8A8A8E', fontSize: 12 },
  centerContainer: { flex: 0.6, justifyContent: 'center', alignItems: 'center', padding: 32 },
  infoText: { color: '#8A8A8E', fontSize: 14, marginTop: 12, textAlign: 'center' },
  errorText: { color: '#DE3C3F', fontSize: 14, marginTop: 12, textAlign: 'center', fontWeight: '600' },
  retryButton: { backgroundColor: '#1C1C1E', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12, marginTop: 16, borderWidth: 1, borderColor: '#DE3C3F' },
  retryButtonText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  
  gridContent: { paddingHorizontal: 12, paddingBottom: 120 },
  row: { flex: 1, justifyContent: 'flex-start' },
  
  stickerWrapper: { flex: 1 / 4, padding: 4 },
  sticker: { 
    flex: 1, 
    aspectRatio: 0.72, 
    borderRadius: 14, 
    padding: 8, 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    borderWidth: 1.5 
  },
  
  stickerMissing: { backgroundColor: '#1A1C1E', borderColor: '#2C2C2E' },
  stickerHave: { backgroundColor: '#0B2916', borderColor: '#1E6B37' },
  stickerRepeated: { backgroundColor: '#2E220A', borderColor: '#8A6218' },
  
  stickerHeaderRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' },
  stickerNumber: { fontSize: 13, fontWeight: '900' },
  numMissing: { color: '#4E5256' },
  stickerNumHave: { color: '#4ADE80' },
  stickerNumRepeated: { color: '#FBBF24' },
  
  stickerPositionTag: { fontSize: 8, fontWeight: '800', color: '#FFF', backgroundColor: '#B91C1C', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 5 },
  positionTagMissing: { backgroundColor: '#3A3D40', color: '#8A8A8E' },

  stickerName: { fontSize: 11, fontWeight: '800', textAlign: 'center', width: '100%', marginVertical: 4 },
  stickerNameMissing: { color: '#6B7280' },
  stickerNameHave: { color: '#FFF' },
  stickerNameRepeated: { color: '#FFF' },
  
  stickerFooterRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'rgba(255,255,255,0.08)', paddingTop: 4 },
  stickerFooterText: { fontSize: 9, fontWeight: '600' },
  infoTextMissing: { color: '#4E5256' },
  infoTextHave: { color: '#A7F3D0' },
  infoTextRepeated: { color: '#FDE68A' },
  
  badge: { position: 'absolute', top: -5, right: -5, width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#131313' },
  badgeHave: { backgroundColor: '#4ADE80' },
  badgeRepeated: { backgroundColor: '#FBBF24' },
  badgeText: { color: '#131313', fontSize: 9, fontWeight: '900' },
  
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 16, paddingTop: 16, backgroundColor: '#131313', borderTopWidth: 1, borderTopColor: '#1C1C1E' },
  publishButton: { backgroundColor: '#DE3C3F', borderRadius: 16, paddingVertical: 16, alignItems: 'center' },
  publishText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
  toastContainer: { position: 'absolute', top: 60, left: 20, right: 20, alignItems: 'center', zIndex: 1000 },
  toast: { flexDirection: 'row', backgroundColor: '#22C55E', padding: 16, borderRadius: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 6 },
  toastTextContainer: { marginLeft: 12, flex: 1 },
  toastTitle: { color: '#FFF', fontSize: 16, fontWeight: '800' },
  toastMessage: { color: '#FFF', fontSize: 14, marginTop: 2 }
});