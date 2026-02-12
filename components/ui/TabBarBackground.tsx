// This is a shim for web and Android where the tab bar is generally opaque.
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabBarBackground() {
    return (
        <View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'white',
            }}
        />
    );
}

export function useBottomTabOverflow() {
    const tabHeight = useBottomTabBarHeight();
    const { bottom } = useSafeAreaInsets();
    return tabHeight - bottom;
}
