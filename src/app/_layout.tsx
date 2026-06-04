import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import Providers from "../Providers";
import { useAuthStore } from "../features/auth/store/auth-store";
import { useUniwind } from "uniwind";

/**
 * AppShell sits inside Providers so it has access to the
 * HeroUI / Uniwind context needed for useUniwind().
 */
function AppShell({ children }: { children: React.ReactNode }) {
  const { theme } = useUniwind();
  // status-bar icons should contrast the background
  const statusBarStyle = theme === "dark" ? "light" : "dark";

  return (
    <>
      <StatusBar style={statusBarStyle} />
      {children}
    </>
  );
}

export default function RootLayout() {
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
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(app)" />
        </Stack>
      </AppShell>
    </Providers>
  );
}
