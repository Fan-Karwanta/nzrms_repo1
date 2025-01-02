import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused } from '@react-navigation/native';

import i18n from '@/lang/i18n';
import * as UserService from '@/services/UserService';
import Layout from '@/components/Layout';

const AboutScreen = ({ navigation, route }: NativeStackScreenProps<StackParams, 'About'>) => {
  const isFocused = useIsFocused();
  const [reload, setReload] = useState(false);
  const [visible, setVisible] = useState(false);

  const _init = async () => {
    setVisible(false);
    const language = await UserService.getLanguage();
    i18n.locale = language;
    setVisible(true);
  };

  useEffect(() => {
    if (isFocused) {
      _init();
      setReload(true);
    } else {
      setVisible(false);
    }
  }, [route.params, isFocused]);

  const onLoad = () => {
    setReload(false);
  };

  return (
    <Layout style={styles.master} navigation={navigation} route={route} onLoad={onLoad} reload={reload}>
      {visible && (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" nestedScrollEnabled>
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/about_logo.png')} // Update the path to your image
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>About Us</Text>
          <Text style={styles.description}>
            NZ RMS is an innovative web solution designed to revolutionize the Real Estate Management System. It
            features both a web app for clients, admins, and agencies, as well as a mobile app for users who prefer
            accessing services on the go.
          </Text>
          <Text style={styles.description}>
            Our platform is tailored to help individuals find their ideal real estate properties based on their unique
            preferences and specifications. Whether you're searching for residential, commercial, or other types of
            properties, NZ RMS simplifies the process and connects you with the best options available.
          </Text>
          <Text style={styles.description}>
            By integrating cutting-edge technology with user-friendly design, NZ RMS empowers clients and agencies to
            navigate the real estate market with ease and efficiency. Join us in transforming the way people discover
            and manage real estate.
          </Text>
        </ScrollView>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  master: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0056b3',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    color: '#333',
    marginBottom: 15,
  },

    line: {
    height: 1, 
    backgroundColor: 'gray', 
    marginVertical: 10, // Add spacing above and below the line
  },
});

export default AboutScreen;
