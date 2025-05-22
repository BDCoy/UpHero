import { Upload } from 'lucide-react';
import type { PreviewProps } from './types';
import { DownloadButton } from './DownloadButton';

export function Preview({ generatedLetter }: PreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 min-h-[600px]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-upwork-gray">Generated Cover Letter</h2>
        {generatedLetter && <DownloadButton generatedLetter={generatedLetter} />}
      </div>

      {generatedLetter ? (
        <div className="prose max-w-none">
          <div className="mb-8 pb-8 border-b border-upwork-background">
            <h3 className="text-xl font-bold text-upwork-gray">{generatedLetter.header.name}</h3>
            <p className="text-upwork-gray-light">{generatedLetter.header.title}</p>
            {generatedLetter.header.contact.address && (
              <p className="text-upwork-gray-light">{generatedLetter.header.contact.address}</p>
            )}
            {generatedLetter.header.contact.cityStateZip && (
              <p className="text-upwork-gray-light">{generatedLetter.header.contact.cityStateZip}</p>
            )}
            {generatedLetter.header.contact.phone && (
              <p className="text-upwork-gray-light">{generatedLetter.header.contact.phone}</p>
            )}
            {generatedLetter.header.contact.email && (
              <p className="text-upwork-gray-light">{generatedLetter.header.contact.email}</p>
            )}
          </div>

          <div className="mb-6 ">
            <p className="font-medium text-upwork-gray">
              {generatedLetter.content.recipient.name}
              <br />
              {generatedLetter.content.recipient.company}
            </p>
          </div>

          <p className="mb-6 text-upwork-gray">{generatedLetter.content.greeting}</p>

          {generatedLetter.content.paragraphs.map((paragraph: string, index: number) => (
            <p key={index} className="mb-6 text-upwork-gray leading-relaxed text-justify">
              {paragraph}
            </p>
          ))}

          <div className="mt-8 pt-8 border-t border-upwork-background">
            <p className="text-upwork-gray">{generatedLetter.content.closing.salutation},</p>
            <p className="font-medium text-upwork-gray">{generatedLetter.content.closing.name}</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Upload className="h-12 w-12 text-upwork-gray-light mx-auto mb-4" />
          <p className="text-upwork-gray">Your generated cover letter will appear here</p>
          <p className="text-sm text-upwork-gray-light mt-2">
            Upload your CV and fill in the job details to get started
          </p>
        </div>
      )}
    </div>
  );
}