import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useThemeColor } from "heroui-native";
import { useEffect, useState } from "react";
import Providers from "../Providers";
import { useAuthStore } from "../features/auth/store/auth-store";
import { useUniwind } from "uniwind";

function AppShell({ children }: { children: React.ReactNode }) {
  const { theme } = useUniwind();
  const style = theme === "dark" ? "light" : "dark";

  return (
    <>
      <StatusBar style={style} />
      {children}
    </>
  );
}

export default function RootLayout() {
  const [background] = useThemeColor(["background"]);
  const hydrate = useAuthStore((state) => state.hydrate);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const init = async () => {
      await hydrate();
      setHydrated(true);
    };
    init();
  }, []);

  if (!hydrated) return null;

  return (
    <Providers>
      <AppShell>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: background },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(app)" />
        </Stack>
      </AppShell>
    </Providers>
  );
}
