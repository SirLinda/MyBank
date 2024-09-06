import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Dimensions, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  // Define the HTML for the Leaflet map
  const leafletHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Leaflet Map</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
      <style>
        #map {
          height: 100vh;
          width: 100%;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
      <script>
        // Initialize the map
        var map = L.map('map').setView([-26.2041, 28.0473], 13); // Centered on Johannesburg
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(map);
        L.marker([-26.2041, 28.0473]).addTo(map)
          .bindPopup('Johannesburg')
          .openPopup();
      </script>
    </body>
    </html>
  `;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
      
      {/* Conditionally render Leaflet Map or Fallback based on platform */}
      {Platform.OS === 'web' ? (
        <View style={styles.mapContainer}>
          <WebView
            originWhitelist={['*']}
            source={{ html: leafletHTML }}
            style={styles.webview}
          />
        </View>
      ) : (
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackText}>
            Leaflet maps are currently supported only on the web version of this app.
          </Text>
        </View>
      )}

      <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      {/* Other Collapsible sections */}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  mapContainer: {
    height: Dimensions.get('window').height / 2, // Adjust height as needed
    width: '100%',
  },
  webview: {
    flex: 1,
  },
  fallbackContainer: {
    height: Dimensions.get('window').height / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    color: '#555',
    fontSize: 16,
  },
});
