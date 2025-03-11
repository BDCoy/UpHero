import React from 'react';
import { ChromePicker } from 'react-color';
import type { StylesEditorProps } from './types';

export function StylesEditor({ styles, onUpdate }: StylesEditorProps) {
  const [showColorPicker, setShowColorPicker] = React.useState<string | null>(null);

  const handleColorChange = (color: string, field: keyof typeof styles.colors) => {
    onUpdate({
      colors: {
        ...styles.colors,
        [field]: color
      }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-upwork-gray">Style Customization</h2>

      <div>
        <label className="block text-sm font-medium text-upwork-gray mb-2">
          Font Family
        </label>
        <select
          value={styles.fontFamily}
          onChange={(e) => onUpdate({ fontFamily: e.target.value })}
          className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
        >
          <option value="Inter">Inter</option>
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Georgia">Georgia</option>
        </select>
      </div>

      <div>
        <h3 className="text-sm font-medium text-upwork-gray mb-2">Font Sizes</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-upwork-gray-light mb-1">
              Headline
            </label>
            <select
              value={styles.fontSize.headline}
              onChange={(e) =>
                onUpdate({
                  fontSize: { ...styles.fontSize, headline: e.target.value }
                })
              }
              className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
            >
              {['20px', '24px', '28px', '32px', '36px'].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-upwork-gray-light mb-1">
              Section Headers
            </label>
            <select
              value={styles.fontSize.section}
              onChange={(e) =>
                onUpdate({
                  fontSize: { ...styles.fontSize, section: e.target.value }
                })
              }
              className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
            >
              {['16px', '18px', '20px', '22px', '24px'].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-upwork-gray-light mb-1">
              Body Text
            </label>
            <select
              value={styles.fontSize.body}
              onChange={(e) =>
                onUpdate({
                  fontSize: { ...styles.fontSize, body: e.target.value }
                })
              }
              className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
            >
              {['12px', '14px', '16px', '18px'].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-upwork-gray mb-2">Colors</h3>
        <div className="space-y-3">
          {Object.entries(styles.colors).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm text-upwork-gray-light mb-1 capitalize">
                {key}
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowColorPicker(showColorPicker === key ? null : key)}
                  className="w-10 h-10 rounded border"
                  style={{ backgroundColor: value }}
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleColorChange(e.target.value, key as keyof typeof styles.colors)}
                  className="flex-1 rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
                />
                {showColorPicker === key && (
                  <div className="absolute z-10">
                    <div
                      className="fixed inset-0"
                      onClick={() => setShowColorPicker(null)}
                    />
                    <ChromePicker
                      color={value}
                      onChange={(color) => handleColorChange(color.hex, key as keyof typeof styles.colors)}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}