import { StyleSheet, SafeAreaView, ActivityIndicator, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useKeepAwake } from 'expo-keep-awake';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

export default function App() {
  // 🔥 Empêche l'écran de s'éteindre pendant les appels de Marco
  useKeepAwake(); 
  const [loading, setLoading] = useState(true);

  // L'URL de ton jeu
  const GAME_URL = 'https://mikefri-studio.github.io/frequence-zero/docs/index.html';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#000000" />
      
      {loading && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>FRÉQUENCE ZÉRO</Text>
          <ActivityIndicator size="large" color="#ff3333" />
        </View>
      )}

      <WebView 
        source={{ uri: GAME_URL }} 
        style={{ flex: 1 }}
        backgroundColor="#000000"
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        overScrollMode="never"
        onLoadEnd={() => setLoading(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    zIndex: 10,
  },
  loadingText: {
    color: '#ff3333',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    letterSpacing: 4,
  }
});