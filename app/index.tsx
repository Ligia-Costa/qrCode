import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Vibration,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function QRReader() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState("");
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const linePosition = useSharedValue(0);

  useEffect(() => {
    requestPermission();
    animateLine();
  }, []);

  // Função para animação da moldura
  const animateLine = () => {
    linePosition.value = withRepeat(withTiming(1, { duration: 1500 }), -1, true);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: linePosition.value * 200 }],
    opacity: 0.8,
  }));

  // Som e vibração ao detectar o QR
  async function playBeep() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("./beep.mp3") // coloque um som curto "beep.mp3" na mesma pasta
      );
      setSound(sound);
      await sound.playAsync();
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Vibration.vibrate(100);
    } catch (error) {
      console.log("Erro ao tocar som:", error);
    }
  }

  // Função disparada ao ler o QR
  const handleBarcodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setData(data);
    playBeep();
  };

  // Abrir QR se for link
  const openQRCode = async () => {
    if (data.startsWith("http://") || data.startsWith("https://")) {
      await Linking.openURL(data);
    } else {
      alert("O conteúdo não é um link: " + data);
    }
  };

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Solicitando permissão da câmera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>
          Permissão negada. Ative a câmera nas configurações.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* --- Câmera --- */}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />

      {/* --- Moldura --- */}
      <View style={styles.frame}>
        <Animated.View style={[styles.scanLine, animatedStyle]} />
      </View>

      {/* --- Resultado --- */}
      <View style={styles.overlay}>
        {scanned ? (
          <>
            <Text style={styles.resultText}>QR detectado:</Text>
            <Text style={styles.dataText}>{data}</Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#1e90ff" }]}
                onPress={openQRCode}
              >
                <Text style={styles.buttonText}>Abrir</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#32CD32" }]}
                onPress={() => {
                  setScanned(false);
                  setData("");
                }}
              >
                <Text style={styles.buttonText}>Ler novamente</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text style={styles.instructionText}>
            Aponte a câmera para um QR Code
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "#fff", fontSize: 16 },
  frame: {
    position: "absolute",
    top: "30%",
    left: "15%",
    width: "70%",
    height: 250,
    borderWidth: 3,
    borderColor: "#00FF7F",
    borderRadius: 10,
    overflow: "hidden",
  },
  scanLine: {
    width: "100%",
    height: 3,
    backgroundColor: "#00FF7F",
  },
  overlay: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  instructionText: { color: "#fff", fontSize: 18, textAlign: "center" },
  resultText: {
    color: "#00FF7F",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dataText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});