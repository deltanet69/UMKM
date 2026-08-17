import { Tabs } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 85,
          paddingBottom: 8,
          paddingTop: 10,
        },
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              {focused && <View style={styles.activeIndicator} />}
              <View style={styles.iconContainer}>
                <Image
                  source={require('@/assets/images/icon/home.png')}
                  style={[styles.icon, { opacity: focused ? 1 : 0.5 }]}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.label, { opacity: focused ? 1 : 0.5 }]}>Home</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tugas UMKM',
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              {focused && <View style={styles.activeIndicator} />}
              <View style={styles.iconContainer}>
                <Image
                  source={require('@/assets/images/icon/tugas.png')}
                  style={[styles.icon, { opacity: focused ? 1 : 0.5 }]}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.label, { opacity: focused ? 1 : 0.5 }]}>Tugas UMKM</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="strategy"
        options={{
          title: 'Strategi',
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              {focused && <View style={styles.activeIndicator} />}
              <View style={styles.iconContainer}>
                <Image
                  source={require('@/assets/images/icon/target.png')}
                  style={[styles.icon, { opacity: focused ? 1 : 0.5 }]}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.label, { opacity: focused ? 1 : 0.5 }]}>Strategi</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              {focused && <View style={styles.activeIndicator} />}
              <View style={styles.iconContainer}>
                <Image
                  source={require('@/assets/images/icon/profil.png')}
                  style={[styles.icon, { opacity: focused ? 1 : 0.5 }]}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.label, { opacity: focused ? 1 : 0.5 }]}>Profil</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    width: 100,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
    marginTop: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    marginTop: 4,
  },
  activeIndicator: {
    position: 'absolute',
    top: 10,
    width: 30,
    height: 3,
    backgroundColor: '#4E74F9',
    borderRadius: 2,
  },
});
