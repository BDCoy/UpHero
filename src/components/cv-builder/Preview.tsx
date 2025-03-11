import React from 'react';
import type { PreviewProps } from './types';

export function Preview({ cvData, styles }: PreviewProps) {
  return (
    <div
      className="min-h-[1056px] bg-white"
      style={{
        fontFamily: styles.fontFamily,
        color: styles.colors.text,
        backgroundColor: styles.colors.background
      }}
    >
      {/* Header */}
      <header className="mb-8">
        <h1
          className="text-4xl font-bold mb-2"
          style={{
            fontSize: styles.fontSize.headline,
            color: styles.colors.primary
          }}
        >
          {cvData.fullName || 'Your Name'}
        </h1>
        <h2
          className="text-xl mb-4"
          style={{ color: styles.colors.text }}
        >
          {cvData.title || 'Professional Title'}
        </h2>
        
        {/* Contact Info */}
        <div className="space-y-1 text-sm">
          {cvData.contact.email && (
            <div>{cvData.contact.email}</div>
          )}
          {cvData.contact.phone && (
            <div>{cvData.contact.phone}</div>
          )}
          {cvData.contact.location && (
            <div>{cvData.contact.location}</div>
          )}
          {cvData.contact.website && (
            <div>{cvData.contact.website}</div>
          )}
        </div>

        {/* Social Links */}
        {cvData.socialLinks.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {cvData.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm"
                style={{ color: styles.colors.primary }}
              >
                {link.platform}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Summary */}
      {cvData.summary && (
        <section
          className="mb-8"
          style={{ marginBottom: styles.spacing.section }}
        >
          <h3
            className="text-lg font-semibold mb-2"
            style={{
              fontSize: styles.fontSize.section,
              color: styles.colors.primary
            }}
          >
            Professional Summary
          </h3>
          <p style={{ fontSize: styles.fontSize.body }}>
            {cvData.summary}
          </p>
        </section>
      )}

      {/* Placeholder for other sections */}
      <div className="text-center text-upwork-gray-light py-8">
        Additional sections (Experience, Education, Skills, etc.) will appear here as you add them.
      </div>
    </div>
  );
}