/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const primaryMain = '#3D7BFF';
const textPrimary = '#FFFFFF';
const textSecondary = '#B0B8C4';
const backgroundDark = '#0A101A';
const surfaceMain = '#182233';

export const Colors = {
  light: {
    text: textSecondary,
    background: surfaceMain,
    tint: primaryMain,
    icon: textSecondary,
    tabIconDefault: textSecondary,
    tabIconSelected: primaryMain,
  },
  dark: {
    text: textPrimary,
    background: backgroundDark,
    tint: primaryMain,
    icon: textSecondary,
    tabIconDefault: textSecondary,
    tabIconSelected: primaryMain,
  },
};