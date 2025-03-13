import React from 'react';
import type { PreviewProps } from './types';

export function Preview({ cvData, styles }: PreviewProps) {
  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div
      className="min-h-[1056px] bg-white p-8"
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

      {/* Work Experience */}
      {cvData.workExperience.length > 0 && (
        <section
          className="mb-8"
          style={{ marginBottom: styles.spacing.section }}
        >
          <h3
            className="text-lg font-semibold mb-4"
            style={{
              fontSize: styles.fontSize.section,
              color: styles.colors.primary
            }}
          >
            Work Experience
          </h3>
          <div className="space-y-6">
            {cvData.workExperience.map((exp) => (
              <div key={exp.id} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium" style={{ fontSize: styles.fontSize.body }}>
                      {exp.position}
                    </h4>
                    <div className="text-sm text-upwork-gray-light">
                      {exp.company} • {exp.location}
                    </div>
                  </div>
                  <div className="text-sm text-upwork-gray-light">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                <p className="text-sm" style={{ fontSize: styles.fontSize.body }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {cvData.education.length > 0 && (
        <section
          className="mb-8"
          style={{ marginBottom: styles.spacing.section }}
        >
          <h3
            className="text-lg font-semibold mb-4"
            style={{
              fontSize: styles.fontSize.section,
              color: styles.colors.primary
            }}
          >
            Education
          </h3>
          <div className="space-y-6">
            {cvData.education.map((edu) => (
              <div key={edu.id} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium" style={{ fontSize: styles.fontSize.body }}>
                      {edu.degree} in {edu.field}
                    </h4>
                    <div className="text-sm text-upwork-gray-light">
                      {edu.institution}
                    </div>
                  </div>
                  <div className="text-sm text-upwork-gray-light">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </div>
                </div>
                {edu.description && (
                  <p className="text-sm" style={{ fontSize: styles.fontSize.body }}>
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}