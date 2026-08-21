import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function SeasonMenu({ onSelectSeason }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>FRÉQUENCE ZÉRO</Text>
        <Text style={styles.subtitle}>Choisis ta fréquence...</Text>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity style={[styles.seasonCard, styles.s1Card]} onPress={() => onSelectSeason('saison1')} activeOpacity={0.8}>
          <Text style={styles.seasonNumber}>SAISON 01</Text>
          <Text style={styles.seasonTitle}>Les Origines</Text>
          <Text style={styles.seasonDesc}>Nuits 1 à 4 • Le studio s'éveille</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.seasonCard, styles.s2Card]} onPress={() => onSelectSeason('saison2')} activeOpacity={0.8}>
          <Text style={styles.seasonNumber}>SAISON 02</Text>
          <Text style={styles.seasonTitle}>L'Écho Fantôme</Text>
          <Text style={styles.seasonDesc}>Nouveau chapitre • Bientôt disponible</Text>
          <View style={styles.badge}><Text style={styles.badgeText}>NOUVEAU</Text></View>
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>v2.0 • Mikefri Studio</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },
  header: { padding: 40, alignItems: 'center' },
  title: { color: '#ff3333', fontSize: 32, fontWeight: '900', letterSpacing: 6, marginBottom: 10 },
  subtitle: { color: '#888', fontSize: 16, fontStyle: 'italic', letterSpacing: 2 },
  menu: { flex: 1, paddingHorizontal: 20, justifyContent: 'center', gap: 20 },
  seasonCard: { padding: 25, borderRadius: 12, borderWidth: 1, position: 'relative' },
  s1Card: { borderColor: '#ff3333', backgroundColor: 'rgba(255, 51, 51, 0.05)' },
  s2Card: { borderColor: '#33ff33', backgroundColor: 'rgba(51, 255, 51, 0.05)' },
  seasonNumber: { color: '#666', fontSize: 12, fontWeight: 'bold', letterSpacing: 3, marginBottom: 8 },
  seasonTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 8 }, 
  seasonDesc: { color: '#aaa', fontSize: 14 },
  badge: { position: 'absolute', top: 15, right: 15, backgroundColor: '#33ff33', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  badgeText: { color: '#000', fontSize: 10, fontWeight: '900' },
  footer: { textAlign: 'center', color: '#444', fontSize: 12, marginBottom: 20, letterSpacing: 1 }
});
