import { useContact } from "@/hooks";
import { FormEventHandler, useState } from "react";

interface ContactFormProps {
  handleBlur: () => void;
  handleFocus: () => void;
  handleSubmit: FormEventHandler;
  isLoading: boolean;
}

export const ContactForm = ({
  handleBlur,
  handleFocus,
  handleSubmit,
  isLoading,
}: ContactFormProps) => {
  const { formRef } = useContact();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleFieldFocus = (fieldName: string) => {
    setFocusedField(fieldName);
    handleFocus();
  };

  const handleFieldBlur = () => {
    setFocusedField(null);
    handleBlur();
  };

  return (
    <section className="flex-1 min-w-[50%] flex flex-col">
      <h1 className="head-text text-3xl font-bold mb-2">Get in Touch</h1>
      <p className="text-gray-600 mb-8">We'd love to hear from you!</p>

      <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <label 
              htmlFor="name" 
              className={`text-sm font-medium transition-colors duration-200 ${
                focusedField === 'name' ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your name..."
              required
              onFocus={() => handleFieldFocus('name')}
              onBlur={handleFieldBlur}
              className={`px-4 py-3 border-b transition-all duration-200 ${
                focusedField === 'name' 
                  ? 'border-blue-500' 
                  : 'border-gray-300 hover:border-gray-400'
              } focus:outline-none bg-transparent`}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label 
              htmlFor="email" 
              className={`text-sm font-medium transition-colors duration-200 ${
                focusedField === 'email' ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Your email..."
              required
              onFocus={() => handleFieldFocus('email')}
              onBlur={handleFieldBlur}
              className={`px-4 py-3 border-b transition-all duration-200 ${
                focusedField === 'email' 
                  ? 'border-blue-500' 
                  : 'border-gray-300 hover:border-gray-400'
              } focus:outline-none bg-transparent`}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label 
              htmlFor="message" 
              className={`text-sm font-medium transition-colors duration-200 ${
                focusedField === 'message' ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here..."
              required
              rows={5}
              onFocus={() => handleFieldFocus('message')}
              onBlur={handleFieldBlur}
              className={`px-4 py-3 border-b transition-all duration-200 ${
                focusedField === 'message' 
                  ? 'border-blue-500' 
                  : 'border-gray-300 hover:border-gray-400'
              } focus:outline-none bg-transparent resize-none`}
            />
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Send Message
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};