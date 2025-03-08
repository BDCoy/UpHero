import React from 'react';
import { useFormik } from 'formik';
import { Button } from '../Button';
import { signupValidationSchemas } from '../../lib/validation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface ContactStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData: {
    phone: string;
    country: string;
    city: string;
  };
}

export function ContactStep({ onNext, onBack, initialData }: ContactStepProps) {
  const formik = useFormik({
    initialValues: initialData,
    validationSchema: signupValidationSchemas.contact,
    onSubmit: (values) => {
      onNext({
        ...values
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <div className="relative">
          <PhoneInput
            country={'us'}
            value={formik.values.phone}
            onChange={(phone, data: any) => {
              formik.setFieldValue('phone', phone);
              formik.setFieldValue('country', data.name);
            }}
            onBlur={formik.handleBlur}
            inputProps={{
              name: 'phone',
              required: true,
              className: `${formik.touched.phone && formik.errors.phone ? 'error' : ''}`,
              'aria-label': 'Phone number'
            }}
            enableSearch
            searchPlaceholder="Search countries"
            specialLabel=""
            preferredCountries={['us', 'gb', 'ca', 'au']}
            enableAreaCodes={true}
            enableTerritories={true}
            buttonClass="custom-phone-input-button"
            containerStyle={{
              width: '100%',
            }}
            inputStyle={{
              width: '100%',
              height: '40px',
              fontSize: '16px',
              borderRadius: '6px',
              border: '1px solid #D1D5DB',
              paddingLeft: '48px',
            }}
            buttonStyle={{
              border: 'none',
              borderRadius: '6px 0 0 6px',
              backgroundColor: 'transparent',
              padding: '0 6px',
              background: 'none',
              }}
            dropdownStyle={{
              borderRadius: '6px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          
            }}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="mt-2 text-sm text-red-600">{formik.errors.phone}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <div className="mt-1">
          <input
            id="country"
            {...formik.getFieldProps('country')}
            type="text"
            readOnly
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed"
            placeholder="Selected from phone number"
          />
        </div>
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          City
        </label>
        <div className="mt-1">
          <input
            id="city"
            {...formik.getFieldProps('city')}
            type="text"
            className={`appearance-none block w-full px-3 py-2 border ${
              formik.touched.city && formik.errors.city ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {formik.touched.city && formik.errors.city && (
            <p className="mt-2 text-sm text-red-600">{formik.errors.city}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack} className="w-full mr-2">
          Back
        </Button>
        <Button type="submit" disabled={!formik.isValid || formik.isSubmitting} className="w-full ml-2">
          Next
        </Button>
      </div>
    </form>
  );
}