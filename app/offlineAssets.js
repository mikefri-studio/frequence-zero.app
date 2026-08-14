import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

// 📦 Le jeu embarqué dans l'APK
const FILES = {
  'index.html': require('./assets/web/index.bin'),
  'css/style.css': require('./assets/web/css/style.bin'),
  'js/game.js': require('./assets/web/js/game.bin'),
  'js/nuit1.js': require('./assets/web/js/nuit1.bin'),
  'js/nuit2.js': require('./assets/web/js/nuit2.bin'),
  'js/nuit3.js': require('./assets/web/js/nuit3.bin'),
  'js/nuit4.js': require('./assets/web/js/nuit4.bin'),
  'assets/images/ancien.jpg': require('./assets/web/assets/images/ancien.jpg'),
  'assets/images/marco.jpg': require('./assets/web/assets/images/marco.jpg'),
  'assets/images/sonia.jpg': require('./assets/web/assets/images/sonia.jpg'),
  'assets/images/standard.jpg': require('./assets/web/assets/images/standard.jpg'),
  'assets/images/studio.jpg': require('./assets/web/assets/images/studio.jpg'),
};

// Décompresse le jeu dans le stockage du téléphone et retourne le chemin
export async function prepareOfflineGame() {
  const base = FileSystem.documentDirectory + 'fz-web/';
  for (const [rel, mod] of Object.entries(FILES)) {
    const asset = Asset.fromModule(mod);
    await asset.downloadAsync();
    const dest = base + rel;
    const dir = dest.substring(0, dest.lastIndexOf('/') + 1);
    const info = await FileSystem.getInfoAsync(dir);
    if (!info.exists) await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
    await FileSystem.copyAsync({ from: asset.localUri, to: dest });
  }
  return base + 'index.html';
}