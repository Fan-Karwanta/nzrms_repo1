import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useIsFocused } from '@react-navigation/native'

import i18n from '@/lang/i18n'
import * as UserService from '@/services/UserService'
import Layout from '@/components/Layout'

const ToSScreen = ({ navigation, route }: NativeStackScreenProps<StackParams, 'ToS'>) => {
  const isFocused = useIsFocused()

  const [reload, setReload] = useState(false)
  const [visible, setVisible] = useState(false)

  const _init = async () => {
    setVisible(false)
    const language = await UserService.getLanguage()
    i18n.locale = language
    setVisible(true)
  }

  useEffect(() => {
    if (isFocused) {
      _init()
      setReload(true)
    } else {
      setVisible(false)
    }
  }, [route.params, isFocused])

  const onLoad = () => {
    setReload(false)
  }

  return (
    <Layout style={styles.master} navigation={navigation} route={route} onLoad={onLoad} reload={reload}>
      {visible && (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" nestedScrollEnabled>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/about_logo.png')} // Update the path to your image
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>Terms of Service</Text>

          {/* Content */}
          <Text style={styles.description}>
            Welcome to NZ RMS! By using our platform, you agree to the following terms and conditions:
          </Text>
            <Text style={styles.description}>
            <Text style={{ fontWeight: 'bold' }}>1. Acceptance of Terms</Text>: By accessing and using NZ RMS, you agree to comply with these Terms of Service and any
            other policies that may apply. If you do not agree with any part of the terms, you must not use the services.
            </Text>
          <Text style={styles.description}>
          <Text style={{ fontWeight: 'bold' }}>2. Use of Services</Text>: You may use our services only for lawful purposes and in accordance with the terms set forth. 
            You are responsible for maintaining the confidentiality of your account and ensuring the accuracy of your information.
          </Text>
          <Text style={styles.description}>
          <Text style={{ fontWeight: 'bold' }}>3. Privacy Policy</Text>: We value your privacy and are committed to protecting your personal information. Please review our 
            Privacy Policy to understand how we collect, use, and disclose your data.
          </Text>
          <Text style={styles.description}>
          <Text style={{ fontWeight: 'bold' }}>4. Limitation Liability</Text> : NZ RMS is not liable for any damages or losses resulting from the use of the platform. 
            We make no guarantees regarding the accuracy, availability, or security of our services.
          </Text>
          <Text style={styles.description}>
          <Text style={{ fontWeight: 'bold' }}>5.Termination</Text>: We reserve the right to suspend or terminate your access to the platform at any time, without prior notice, 
            if we believe that you have violated any terms of use.
          </Text>
          <Text style={styles.description}>
          <Text style={{ fontWeight: 'bold' }}>6.Changes Terms</Text>: We may update or modify these Terms of Service at any time. Any changes will be posted on this page.
            It is your responsibility to review these terms regularly.
          </Text>
          <Text style={styles.description}>
            If you have any questions or concerns about these terms, please contact us.
          </Text>
        </ScrollView>
      )}
    </Layout>
  )
}

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
})

export default ToSScreen
