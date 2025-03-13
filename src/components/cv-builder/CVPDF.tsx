import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { PreviewProps } from "./types";

// Register fonts
Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2",
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiJ-Ek-_EeA.woff2",
      fontWeight: "bold",
    },
  ],
});

export function CVPDF({ cvData, styles }: PreviewProps) {
  const formatDate = (date: string) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  console.log(styles);

  // Create PDF styles
  const pdfStyles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: "Inter",
      fontSize: styles.fontSize.body,
      color: styles.colors.text,
      backgroundColor: styles.colors.background,
      display: "flex",
      flexDirection: "column",
    },
    section: {
      marginBottom: 20,
      display: "flex",
      flexDirection: "column",
      fontSize: styles.fontSize.section,
    },
    header: {
      marginBottom: 32,
      display: "flex",
      flexDirection: "column",
      color: styles.colors.primary,
    },
    name: {
      fontSize: styles.fontSize.headline,
      fontWeight: "bold",
      marginBottom: 8,
    },
    title: {
      fontSize: 20,
      marginBottom: 8,
      color: styles.colors.text,
    },
    contactInfo: {
      marginTop: 4,
      color: styles.colors.text,
    },
    sectionTitle: {
      // fontSize: 16,
      fontWeight: "bold",
      color: styles.colors.primary,
      marginBottom: 8,
    },
    experienceItem: {
      marginBottom: 12,
    },
    experienceHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4,
    },
    experienceTitle: {
      // fontSize: 12,
      fontWeight: "bold",
    },
    experienceCompany: {
      // fontSize: 12,
      color: styles.colors.text,
    },
    experienceDate: {
      // fontSize: 12,
      color: styles.colors.text,
    },
    experienceDescription: {
      // fontSize: 12,
      marginTop: 4,
      lineHeight: 1.4,
    },
    socialLink: {
      fontSize: 14,
      marginBottom: 4,
      color: styles.colors.text,
    },
  });

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {/* Header Section */}
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.name}>{cvData.fullName}</Text>
          <Text style={pdfStyles.title}>{cvData.title}</Text>

          {/* Contact Info */}
          {cvData.contact.email && (
            <Text style={pdfStyles.contactInfo}>{cvData.contact.email}</Text>
          )}
          {cvData.contact.phone && (
            <Text style={pdfStyles.contactInfo}>{cvData.contact.phone}</Text>
          )}
          {cvData.contact.location && (
            <Text style={pdfStyles.contactInfo}>{cvData.contact.location}</Text>
          )}
          {cvData.contact.website && (
            <Text style={pdfStyles.contactInfo}>{cvData.contact.website}</Text>
          )}
        </View>

        {/* Social Links Section */}
        {cvData.socialLinks.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Social Links</Text>
            {cvData.socialLinks.map((link, index) => (
              <Text key={index} style={pdfStyles.socialLink}>
                {link.platform}: {link.url}
              </Text>
            ))}
          </View>
        )}

        {/* Summary Section */}
        {cvData.summary && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Professional Summary</Text>
            <Text style={pdfStyles.experienceDescription}>
              {cvData.summary}
            </Text>
          </View>
        )}

        {/* Work Experience Section */}
        {cvData.workExperience.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Work Experience</Text>
            {cvData.workExperience.map((exp) => (
              <View key={exp.id} style={pdfStyles.experienceItem}>
                <View style={pdfStyles.experienceHeader}>
                  <View>
                    <Text style={pdfStyles.experienceTitle}>
                      {exp.position}
                    </Text>
                    <Text style={pdfStyles.experienceCompany}>
                      {exp.company} • {exp.location}
                    </Text>
                  </View>
                  <Text style={pdfStyles.experienceDate}>
                    {formatDate(exp.startDate)} -{" "}
                    {exp.current ? "Present" : formatDate(exp.endDate)}
                  </Text>
                </View>
                <Text style={pdfStyles.experienceDescription}>
                  {exp.description}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Education Section */}
        {cvData.education.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Education</Text>
            {cvData.education.map((edu) => (
              <View key={edu.id} style={pdfStyles.experienceItem}>
                <View style={pdfStyles.experienceHeader}>
                  <View>
                    <Text style={pdfStyles.experienceTitle}>
                      {edu.degree} in {edu.field}
                    </Text>
                    <Text style={pdfStyles.experienceCompany}>
                      {edu.institution}
                    </Text>
                  </View>
                  <Text style={pdfStyles.experienceDate}>
                    {formatDate(edu.startDate)} -{" "}
                    {edu.current ? "Present" : formatDate(edu.endDate)}
                  </Text>
                </View>
                {edu.description && (
                  <Text style={pdfStyles.experienceDescription}>
                    {edu.description}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
