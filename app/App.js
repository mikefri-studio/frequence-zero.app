import { StyleSheet, SafeAreaView, ActivityIndicator, View, Text, BackHandler, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useKeepAwake } from 'expo-keep-awake';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { prepareOfflineGame } from './offlineAssets';

const GAME_URL_ONLINE = 'https://mikefri-studio.github.io/frequence-zero/docs/index.html';

export default function App() {
  useKeepAwake();
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const webviewRef = useRef(null);

  // 📴 Mode hors-ligne : on extrait le jeu embarqué dans l'APK
  useEffect(() => {
    (async () => {
      try {
        const localPath = await prepareOfflineGame();
        setSource({ uri: localPath });
      } catch (e) {
        setSource({ uri: GAME_URL_ONLINE }); // secours en ligne
      }
    })();
  }, []);

  // 🔙 Bouton retour Android
  useEffect(() => {
    const onBack = () => {
      if (canGoBack && webviewRef.current) {
        webviewRef.current.goBack();
        return true;
      }
      Alert.alert(
        'Raccrocher le casque ?',
        'La ligne 0 grésille encore… Ta progression est sauvegardée au studio.',
        [
          { text: 'Rester en antenne', style: 'cancel' },
          { text: 'Quitter', style: 'destructive', onPress: () => BackHandler.exitApp() },
        ]
      );
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBack);
  }, [canGoBack]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#000000" />

      {(loading || !source) && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>FRÉQUENCE ZÉRO</Text>
          <ActivityIndicator size="large" color="#ff3333" />
        </View>
      )}

      {source && (
        <WebView
          ref={webviewRef}
          source={source}
          style={{ flex: 1 }}
          backgroundColor="#000000"
          allowFileAccess={true}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          cacheEnabled={true}
          cacheMode="LOAD_DEFAULT"
          overScrollMode="never"
          pullToRefreshEnabled={false}
          setSupportMultipleWindows={false}
          onNavigationStateChange={(nav) => setCanGoBack(nav.canGoBack)}
          onLoadEnd={() => setLoading(false)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
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
  },
});