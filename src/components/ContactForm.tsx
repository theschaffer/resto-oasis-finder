
import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { toast } from 'sonner';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setIsSuccess(true);
      toast.success('Message envoyé avec succès!');
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
        setIsSuccess(false);
      }, 2000);
      
    } catch (error) {
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="animate-scale space-y-6">
      <div className="space-y-4">
        {/* Name input */}
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-resto-800">
            Nom complet <span className="text-resto-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`w-full rounded-md border bg-white px-4 py-2.5 input-focus-ring ${
              errors.name ? 'border-resto-accent' : 'border-resto-200'
            }`}
            placeholder="Votre nom et prénom"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-resto-accent">{errors.name}</p>
          )}
        </div>
        
        {/* Email input */}
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-resto-800">
            Email <span className="text-resto-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full rounded-md border bg-white px-4 py-2.5 input-focus-ring ${
              errors.email ? 'border-resto-accent' : 'border-resto-200'
            }`}
            placeholder="votre@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-resto-accent">{errors.email}</p>
          )}
        </div>
        
        {/* Phone input */}
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-resto-800">
            Téléphone <span className="text-resto-500 text-xs font-normal">(optionnel)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-md border border-resto-200 bg-white px-4 py-2.5 input-focus-ring"
            placeholder="Votre numéro de téléphone"
          />
        </div>
        
        {/* Message input */}
        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-resto-800">
            Message <span className="text-resto-accent">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className={`w-full rounded-md border bg-white px-4 py-3 input-focus-ring ${
              errors.message ? 'border-resto-accent' : 'border-resto-200'
            }`}
            placeholder="Votre message..."
          />
          {errors.message && (
            <p className="mt-1 text-xs text-resto-accent">{errors.message}</p>
          )}
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting || isSuccess}
        className={`group relative flex w-full items-center justify-center overflow-hidden rounded-md bg-resto-accent px-6 py-3 text-white transition-all duration-300 hover:bg-resto-accent-light ${
          isSubmitting ? 'cursor-wait opacity-90' : ''
        } ${isSuccess ? 'bg-green-500 hover:bg-green-600' : ''}`}
      >
        <span className="absolute inset-0 flex items-center justify-center">
          {isSubmitting ? (
            <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : isSuccess ? (
            <Check size={20} className="text-white" />
          ) : (
            <Send size={18} className="mr-2 text-white group-hover:translate-x-1 transition-transform duration-200" />
          )}
        </span>
        <span
          className={`transform transition-all duration-300 ${
            isSubmitting || isSuccess ? 'translate-y-16 opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          Envoyer le message
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center font-medium transition-all duration-300 ${
            isSubmitting ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          Envoi en cours...
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center font-medium transition-all duration-300 ${
            isSuccess ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          Message envoyé!
        </span>
      </button>
    </form>
  );
};

export default ContactForm;
