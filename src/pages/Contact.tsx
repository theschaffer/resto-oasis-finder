
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Send, Check } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const validateForm = (): boolean => {
    const newErrors: {
      name?: string;
      email?: string;
      message?: string;
    } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
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
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message
      setIsSuccess(true);
      toast({
        title: "Message envoyé!",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1">
        <div className="resto-container py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-8">
              <h1 className="font-bold text-3xl sm:text-4xl mb-2">Contactez-nous</h1>
              <p className="text-muted-foreground">
                Une question ? Une suggestion ? N'hésitez pas à nous contacter !
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-subtle">
              <form onSubmit={handleSubmit} className="animate-scale space-y-6">
                <div className="space-y-4">
                  {/* Name input */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1 block text-sm font-medium text-foreground"
                    >
                      Nom complet <span className="text-resto-accent">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full rounded-md border bg-background px-4 py-2.5 input-focus-ring ${
                        errors.name ? "border-resto-accent" : "border-input"
                      }`}
                      placeholder="Votre nom et prénom"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-resto-accent">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email input */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-sm font-medium text-foreground"
                    >
                      Email <span className="text-resto-accent">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full rounded-md border bg-background px-4 py-2.5 input-focus-ring ${
                        errors.email ? "border-resto-accent" : "border-input"
                      }`}
                      placeholder="votre@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-resto-accent">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone input */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1 block text-sm font-medium text-foreground"
                    >
                      Téléphone{" "}
                      <span className="text-muted-foreground text-xs font-normal">
                        (optionnel)
                      </span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-4 py-2.5 input-focus-ring"
                      placeholder="Votre numéro de téléphone"
                    />
                  </div>

                  {/* Message input */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1 block text-sm font-medium text-foreground"
                    >
                      Message <span className="text-resto-accent">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full rounded-md border bg-background px-4 py-3 input-focus-ring ${
                        errors.message ? "border-resto-accent" : "border-input"
                      }`}
                      placeholder="Votre message..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-resto-accent">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`group relative flex w-full items-center justify-center overflow-hidden rounded-md bg-resto-accent px-6 py-3 text-white transition-all duration-300 hover:bg-resto-accent-light ${
                    isSubmitting ? "cursor-wait opacity-90" : ""
                  } ${isSuccess ? "bg-green-500 hover:bg-green-600" : ""}`}
                >
                  <span className="absolute inset-0 flex items-center justify-center">
                    {isSubmitting ? (
                      <svg
                        className="h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : isSuccess ? (
                      <Check size={20} className="text-white" />
                    ) : (
                      <Send
                        size={18}
                        className="mr-2 text-white group-hover:translate-x-1 transition-transform duration-200"
                      />
                    )}
                  </span>
                  <span
                    className={`transform transition-all duration-300 ${
                      isSubmitting || isSuccess
                        ? "translate-y-16 opacity-0"
                        : "translate-y-0 opacity-100"
                    }`}
                  >
                    Envoyer le message
                  </span>
                  <span
                    className={`absolute inset-0 flex items-center justify-center font-medium transition-all duration-300 ${
                      isSubmitting
                        ? "translate-y-0 opacity-100"
                        : "translate-y-16 opacity-0"
                    }`}
                  >
                    Envoi en cours...
                  </span>
                  <span
                    className={`absolute inset-0 flex items-center justify-center font-medium transition-all duration-300 ${
                      isSuccess
                        ? "translate-y-0 opacity-100"
                        : "translate-y-16 opacity-0"
                    }`}
                  >
                    Message envoyé!
                  </span>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-4 rounded-lg border border-border bg-card">
                <div className="bg-muted p-3 rounded-full mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-resto-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium">Téléphone</h3>
                <p className="mt-1 text-muted-foreground">+33 1 23 45 67 89</p>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded-lg border border-border bg-card">
                <div className="bg-muted p-3 rounded-full mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-resto-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium">Email</h3>
                <p className="mt-1 text-muted-foreground">contact@resto-coin.com</p>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded-lg border border-border bg-card">
                <div className="bg-muted p-3 rounded-full mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-resto-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium">Adresse</h3>
                <p className="mt-1 text-muted-foreground">
                  123 Avenue des Restaurants, 75001 Paris
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
