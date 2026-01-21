# Vite to React Native Migration Prompt

Transform my Vite React application into a React Native Expo application following the exact architecture, patterns, and implementation style of this project.

## Target Architecture & Tech Stack

**Core Technologies:**
- React Native 0.81.4 with Expo 54
- Expo Router 6 (file-based routing - NO React Router)
- TypeScript 5.9 with strict typing
- Supabase for backend (auth + database + real-time)
- StyleSheet API with centralized theming (NO CSS, NO Tailwind)
- Lucide React Native for icons

## Critical Implementation Patterns to Follow

### 1. File-Based Routing (Expo Router)

Convert all routes to file-based structure:
```
app/
  _layout.tsx          # Root layout with providers
  +not-found.tsx       # 404 page
  (tabs)/              # Tab navigation group
    _layout.tsx        # Tab bar configuration
    index.tsx          # Main screen
    [other-tabs].tsx   # Other tab screens
```

**Key Requirements:**
- Use `expo-router` Stack and Tabs components
- Screen names match filenames
- Nested layouts for different navigation patterns
- NO react-router-dom, NO BrowserRouter, NO Routes

### 2. Context + Custom Hooks Pattern

**AuthContext Pattern** (see [contexts/AuthContext.tsx](contexts/AuthContext.tsx)):
```typescript
- Create React Context for auth state
- Provider wraps entire app in root _layout.tsx
- Include: session, user, loading, signIn, signUp, signOut
- Use Supabase auth.getSession() and onAuthStateChange()
- Export custom useAuth() hook
```

**Data Hooks Pattern** (see [hooks/useEntries.ts](hooks/useEntries.ts)):
```typescript
- Custom hooks for all data fetching
- Include: data, loading, error states
- CRUD operations: add, update, delete, fetch
- Optimistic UI updates (update local state immediately)
- Use Supabase client for queries
- Auto-fetch on mount with useEffect
```

### 3. Type-Safe Database Layer

**Database Types** (see [types/database.ts](types/database.ts)):
```typescript
- Generate TypeScript types from Supabase schema
- Use Database generic type with supabase client
- Define Row, Insert, Update types for each table
- Use typed queries throughout the app
```

**Supabase Client** (see [lib/supabase.ts](lib/supabase.ts)):
```typescript
- Import 'react-native-url-polyfill/auto'
- Use createClient with Database generic
- Configure auth: autoRefreshToken, persistSession
- Use environment variables: EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY
```

### 4. Theming System

**Create centralized theme files:**

**colors.ts** (see [theme/colors.ts](theme/colors.ts)):
- Export single colors object
- Categories: background, surface, primary, secondary, text, border, semantic
- Use specific color values (hex codes)
- Design tokens approach

**typography.ts** (see [theme/typography.ts](theme/typography.ts)):
- Font families, sizes, weights, line heights
- Text style objects ready to spread into components

### 5. Component Architecture

**Styling Approach:**
```typescript
// NO CSS modules, NO className, NO Tailwind
// Use StyleSheet.create() at bottom of each file
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

const Component = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Title</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
  },
});
```

**HTML to React Native Primitives:**
- `<div>` → `<View>`
- `<span>`, `<p>`, `<h1>` → `<Text>`
- `<button>` → `<TouchableOpacity>` or `<Pressable>`
- `<input>` → `<TextInput>`
- `<img>` → `<Image>`
- Scrolling containers → `<ScrollView>` or `<FlatList>`

**Layout Patterns:**
- Use flexbox (default flex direction is column)
- NO CSS Grid - use nested flex containers
- Use flex: 1 for full height/width
- SafeAreaView for notch/status bar handling
- LinearGradient from expo-linear-gradient for gradients

### 6. Navigation Patterns

**Tab Navigation** (see [app/(tabs)/_layout.tsx](app/(tabs)/_layout.tsx)):
```typescript
import { Tabs } from 'expo-router';
import { IconName } from 'lucide-react-native';

<Tabs screenOptions={{
  headerShown: false,
  tabBarActiveTintColor: colors.primary,
  tabBarStyle: { backgroundColor: colors.surface }
}}>
  <Tabs.Screen
    name="index"
    options={{
      title: 'Dashboard',
      tabBarIcon: ({ size, color }) => <IconName size={size} color={color} />
    }}
  />
</Tabs>
```

**Stack Navigation** (see [app/_layout.tsx](app/_layout.tsx)):
```typescript
import { Stack } from 'expo-router';

<Stack screenOptions={{ headerShown: false }}>
  <Stack.Screen name="(tabs)" />
  <Stack.Screen name="+not-found" />
</Stack>
```

**Programmatic Navigation:**
```typescript
import { useRouter } from 'expo-router';
const router = useRouter();
router.push('/path'); // NOT navigate() or useNavigate
```

### 7. State Management

**NO Redux, NO Zustand** - Use:
- React Context for global auth/user state
- Custom hooks for data fetching
- useState for local component state
- useMemo for computed values
- useEffect for side effects

### 8. Data Fetching Pattern

**Example from [hooks/useEntries.ts](hooks/useEntries.ts):**
```typescript
export function useEntries() {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('table')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    setData(data);
  };

  const addItem = async (item) => {
    const { data, error } = await supabase
      .from('table')
      .insert(item)
      .select()
      .single();

    setData(prev => [data, ...prev]); // Optimistic update
    return data;
  };

  return { data, loading, error, fetchData, addItem };
}
```

### 9. Component Examples

**Card Component** (see [components/Card.tsx](components/Card.tsx)):
- Reusable container with consistent styling
- Accept children and style props
- Use theme colors and shadows

**Button Component** (see [components/Button.tsx](components/Button.tsx):
- TouchableOpacity with consistent styling
- Variants (primary, secondary, etc.)
- Loading and disabled states

**Loading States** (see [components/LoadingScreen.tsx](components/LoadingScreen.tsx)):
- Full-screen loading component
- ActivityIndicator from react-native

### 10. Package.json Structure

**Required Dependencies:**
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.58.0",
    "expo": "^54.0.10",
    "expo-router": "~6.0.8",
    "expo-linear-gradient": "~15.0.7",
    "expo-constants": "~18.0.9",
    "expo-font": "~14.0.10",
    "lucide-react-native": "^0.544.0",
    "react": "19.1.0",
    "react-native": "0.81.4",
    "react-native-safe-area-context": "~5.6.0",
    "react-native-screens": "~4.16.0",
    "react-native-svg": "15.12.1",
    "react-native-url-polyfill": "^2.0.0"
  },
  "scripts": {
    "dev": "expo start",
    "build:web": "expo export --platform web"
  }
}
```

### 11. Environment Variables

Create `.env` file (not tracked):
```
EXPO_PUBLIC_SUPABASE_URL=your_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_key
```

Access with: `process.env.EXPO_PUBLIC_SUPABASE_URL`

### 12. Font Loading

**Pattern** (see [app/_layout.tsx](app/_layout.tsx)):
```typescript
import { useFonts, Quicksand_400Regular } from '@expo-google-fonts/quicksand';

const [fontsLoaded] = useFonts({
  Quicksand_400Regular,
});

if (!fontsLoaded) return null;
```

## Migration Checklist

### Phase 1: Setup
- [ ] Initialize Expo project with `npx create-expo-app --template blank-typescript`
- [ ] Install all dependencies from package.json
- [ ] Set up Expo Router file structure
- [ ] Configure TypeScript with strict mode

### Phase 2: Backend
- [ ] Set up Supabase project
- [ ] Create database tables with migrations
- [ ] Generate TypeScript types from schema
- [ ] Create supabase.ts client configuration
- [ ] Set up environment variables

### Phase 3: Architecture
- [ ] Create theme files (colors.ts, typography.ts)
- [ ] Create AuthContext with Supabase auth
- [ ] Create custom hooks for data fetching
- [ ] Set up root _layout.tsx with providers

### Phase 4: Navigation
- [ ] Convert routes to file-based structure
- [ ] Set up tab navigation
- [ ] Configure stack navigation
- [ ] Replace all useNavigate with useRouter

### Phase 5: Components
- [ ] Convert all HTML elements to React Native primitives
- [ ] Replace CSS with StyleSheet
- [ ] Create reusable components (Card, Button, etc.)
- [ ] Apply theme throughout

### Phase 6: Features
- [ ] Migrate each screen one by one
- [ ] Convert forms to React Native inputs
- [ ] Update all API calls to Supabase
- [ ] Test auth flow
- [ ] Test data CRUD operations

## Key Differences from Vite

| Vite/React | React Native/Expo |
|------------|-------------------|
| React Router | Expo Router (file-based) |
| CSS/Tailwind | StyleSheet + theme |
| HTML elements | View, Text, etc. |
| fetch/axios | Supabase client |
| localStorage | Supabase + AsyncStorage |
| onClick | onPress |
| className | style prop |
| div/span | View/Text |
| button | TouchableOpacity |
| CSS flexbox (row default) | RN flexbox (column default) |

## Testing Commands

```bash
npm run dev          # Start Expo dev server
expo start --web     # Test web version
expo start --ios     # iOS simulator
expo start --android # Android emulator
```

## Final Requirements

- Preserve exact UI/UX from Vite app
- Keep same color scheme (adapt to theme/colors.ts)
- Match all functionality
- Maintain type safety throughout
- Use absolute imports with @ alias
- Follow patterns from this codebase exactly
- Do NOT use web-specific libraries
- Test on iOS/Android, not just web

## Reference Files to Study

1. [app/_layout.tsx](app/_layout.tsx) - Root layout pattern
2. [app/(tabs)/_layout.tsx](app/(tabs)/_layout.tsx) - Tab navigation
3. [contexts/AuthContext.tsx](contexts/AuthContext.tsx) - Auth pattern
4. [hooks/useEntries.ts](hooks/useEntries.ts) - Data fetching pattern
5. [lib/supabase.ts](lib/supabase.ts) - Backend client
6. [theme/colors.ts](theme/colors.ts) - Theming approach
7. [app/(tabs)/index.tsx](app/(tabs)/index.tsx) - Screen implementation example

Start the migration by setting up the project structure first, then migrate screen by screen, preserving all UI and functionality from the Vite app while following these exact patterns.
