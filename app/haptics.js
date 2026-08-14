import * as Haptics from 'expo-haptics';

// 🕵️ Script injecté dans le jeu : détecte les ✅ et les ❌ sans modifier le jeu
export const HAPTICS_INJECTED = `
(function () {
  var prevOk = 0, lastErr = 0;
  function nbOk() {
    var n = 0;
    document.querySelectorAll('#enigmes h3').forEach(function (h) {
      if (h.textContent.indexOf('✅') !== -1) n++;
    });
    return n;
  }
  function send(m) {
    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
      window.ReactNativeWebView.postMessage(m);
    }
  }
  prevOk = nbOk();
  var obs = new MutationObserver(function () {
    var ok = nbOk();
    if (ok > prevOk) send('succes');
    prevOk = ok;
    var now = Date.now();
    if (document.querySelector('.secousse') && now - lastErr > 600) {
      lastErr = now;
      send('erreur');
    }
  });
  obs.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
})();
true;
`;

// 📳 Côté natif : on fait vibrer le téléphone
export function onHaptics(event) {
  const data = event.nativeEvent.data;
  if (data === 'succes') {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } else if (data === 'erreur') {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }
}