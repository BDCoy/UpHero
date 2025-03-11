import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { PreviewProps } from './types';

export function CVPDF({ cvData, styles }: PreviewProps) {
  const pdfStyles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: styles.fontFamily,
      color: styles.colors.text,
      backgroundColor: styles.colors.background
    },
    header: {
      marginBottom: 20
    },
    name: {
      fontSize: parseInt(styles.fontSize.headline),
      color: styles.colors.primary,
      marginBottom: 5
    },
    title: {
      fontSize: parseInt(styles.fontSize.section),
      marginBottom: 10
    },
    contact: {
      fontSize: parseInt(styles.fontSize.body),
      marginBottom: 2
    },
    section: {
      marginBottom: parseInt(styles.spacing.section)
    },
    sectionTitle: {
      fontSize: parseInt(styles.fontSize.section),
      color: styles.colors.primary,
      marginBottom: 10
    },
    text: {
      fontSize: parseInt(styles.fontSize.body),
      lineHeight: 1.5
    }
  });

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.name}>{cvData.fullName}</Text>
          <Text style={pdfStyles.title}>{cvData.title}</Text>
          
          {/* Contact Info */}
          {cvData.contact.email && (
            <Text style={pdfStyles.contact}>{cvData.contact.email}</Text>
          )}
          {cvData.contact.phone && (
            <Text style={pdfStyles.contact}>{cvData.contact.phone}</Text>
          )}
          {cvData.contact.location && (
            <Text style={pdfStyles.contact}>{cvData.contact.location}</Text>
          )}
          {cvData.contact.website && (
            <Text style={pdfStyles.contact}>{cvData.contact.website}</Text>
          )}
        </View>

        {/* Summary */}
        {cvData.summary && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Professional Summary</Text>
            <Text style={pdfStyles.text}>{cvData.summary}</Text>
          </View>
        )}

        {/* Social Links */}
        {cvData.socialLinks.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Social Links</Text>
            {cvData.socialLinks.map((link, index) => (
              <Text key={index} style={pdfStyles.text}>
                {link.platform}: {link.url}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}