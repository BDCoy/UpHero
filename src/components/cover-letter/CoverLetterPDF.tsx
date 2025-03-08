import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import type { PDFProps } from './types';

// Register a web-safe font that doesn't require downloading
Font.register({
  family: 'Helvetica',
  fonts: [
    {
      src: 'https://fonts.cdnfonts.com/s/29107/Helvetica.woff',
      fontWeight: 'normal',
    },
    {
      src: 'https://fonts.cdnfonts.com/s/29107/Helvetica-Bold.woff',
      fontWeight: 'bold',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Helvetica',
    fontSize: 12,
    lineHeight: 1.5,
    color: '#001e00',
  },
  header: {
    marginBottom: 40,
  },
  name: {
    fontSize: 24,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    marginBottom: 12,
    color: '#5e6d55',
  },
  contactInfo: {
    fontSize: 12,
    color: '#5e6d55',
    marginBottom: 4,
  },
  recipient: {
    marginBottom: 20,
  },
  recipientText: {
    marginBottom: 4,
  },
  greeting: {
    marginBottom: 20,
  },
  paragraph: {
    marginBottom: 15,
    textAlign: 'justify',
  },
  closing: {
    marginTop: 30,
  },
  closingText: {
    marginBottom: 4,
  },
  signature: {
    fontWeight: 'bold',
  },
});

export function CoverLetterPDF({ coverLetter }: PDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{coverLetter.header.name}</Text>
          <Text style={styles.title}>{coverLetter.header.title}</Text>
          {coverLetter.header.contact.address && (
            <Text style={styles.contactInfo}>{coverLetter.header.contact.address}</Text>
          )}
          {coverLetter.header.contact.cityStateZip && (
            <Text style={styles.contactInfo}>{coverLetter.header.contact.cityStateZip}</Text>
          )}
          {coverLetter.header.contact.phone && (
            <Text style={styles.contactInfo}>{coverLetter.header.contact.phone}</Text>
          )}
          {coverLetter.header.contact.email && (
            <Text style={styles.contactInfo}>{coverLetter.header.contact.email}</Text>
          )}
        </View>

        {/* Recipient Section */}
        <View style={styles.recipient}>
          <Text style={styles.recipientText}>{coverLetter.content.recipient.name}</Text>
          <Text style={styles.recipientText}>{coverLetter.content.recipient.company}</Text>
        </View>

        {/* Content Section */}
        <Text style={styles.greeting}>{coverLetter.content.greeting}</Text>

        {coverLetter.content.paragraphs.map((paragraph, index) => (
          <Text key={index} style={styles.paragraph}>
            {paragraph}
          </Text>
        ))}

        {/* Closing Section */}
        <View style={styles.closing}>
          <Text style={styles.closingText}>{coverLetter.content.closing.salutation},</Text>
          <Text style={styles.signature}>{coverLetter.content.closing.name}</Text>
        </View>
      </Page>
    </Document>
  );
}