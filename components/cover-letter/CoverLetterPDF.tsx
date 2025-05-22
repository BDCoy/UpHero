import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import type { PDFProps } from "./types";

// Register web-safe fonts for PDF
Font.register({
  family: "Helvetica",
  fonts: [
    {
      src: "https://fonts.cdnfonts.com/s/29107/Helvetica.woff",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.cdnfonts.com/s/29107/Helvetica-Bold.woff",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Helvetica",
    fontSize: 12,
    lineHeight: 1.5,
    color: "#001e00", // Default text color
  },
  header: {
    marginBottom: 32,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#f7faf7", // Border color for bottom
  },
  name: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: "bold", // Equivalent to Tailwind's font-bold
  },
  title: {
    fontSize: 12,
    marginTop: 4,
    color: "#5e6d55", // Tailwind `text-upwork-gray-light`
  },
  contactInfo: {
    fontSize: 12,
    color: "#5e6d55", // Tailwind `text-upwork-gray-light`
    marginBottom: 4,
  },
  recipient: {
    marginBottom: 24,
  },
  recipientText: {
    marginBottom: 4,
  },
  greeting: {
    marginBottom: 20,
  },
  paragraph: {
    marginBottom: 15,
    textAlign: "justify", // Justify text like in the Tailwind example
    color: "#001e00", // Tailwind `text-upwork-gray`
  },
  closing: {
    marginTop: 30,
    paddingTop: 30,
    borderTopWidth: 1,
    borderTopColor: "#f7faf7", // Border top color
  },
  closingText: {
    marginBottom: 4,
    color: "#001e00", // Tailwind `text-upwork-gray`
  },
  signature: {
    fontWeight: "bold", // Equivalent to Tailwind's font-bold
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
            <Text style={styles.contactInfo}>
              {coverLetter.header.contact.address}
            </Text>
          )}
          {coverLetter.header.contact.cityStateZip && (
            <Text style={styles.contactInfo}>
              {coverLetter.header.contact.cityStateZip}
            </Text>
          )}
          {coverLetter.header.contact.phone && (
            <Text style={styles.contactInfo}>
              {coverLetter.header.contact.phone}
            </Text>
          )}
          {coverLetter.header.contact.email && (
            <Text style={styles.contactInfo}>
              {coverLetter.header.contact.email}
            </Text>
          )}
        </View>

        {/* Recipient Section */}
        <View style={styles.recipient}>
          <Text style={styles.recipientText}>
            {coverLetter.content.recipient.name}
          </Text>
          <Text style={styles.recipientText}>
            {coverLetter.content.recipient.company}
          </Text>
        </View>

        {/* Greeting */}
        <Text style={styles.greeting}>{coverLetter.content.greeting}</Text>

        {/* Paragraphs */}
        {coverLetter.content.paragraphs.map((paragraph, index) => (
          <Text key={index} style={styles.paragraph}>
            {paragraph}
          </Text>
        ))}

        {/* Closing Section */}
        <View style={styles.closing}>
          <Text style={styles.closingText}>
            {coverLetter.content.closing.salutation},
          </Text>
          <Text style={styles.signature}>
            {coverLetter.content.closing.name}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
