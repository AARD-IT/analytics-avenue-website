import type { Metadata } from "next";
import Footer from "@/components/scaffolds/footer/footer";
import Navbar from "@/components/scaffolds/navbar/navbar";
import ContactForm from "./components/contact-form";
import ContactIntro from "./components/contact-intro";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_WHATSAPP_DISPLAY,
  CONTACT_WHATSAPP_URL,
} from "@/lib/contact-details";

export const metadata: Metadata = {
  title: "Contact Us — Analytics Avenue",
  description:
    "Get in touch with Analytics Avenue. Reach our Chennai team on WhatsApp or email, and send your message through the contact form.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--aa-surface-soft)] pb-28 sm:pb-24">
      <a
        href="#contact-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:shadow-lg"
      >
        Skip to contact content
      </a>
      <Navbar />

      <main id="contact-main">
        <ContactIntro
          address={CONTACT_ADDRESS}
          whatsappDisplay={CONTACT_WHATSAPP_DISPLAY}
          whatsappUrl={CONTACT_WHATSAPP_URL}
          email={CONTACT_EMAIL}
        />

        <section
          className="aa-section bg-[var(--aa-surface-soft)] pb-12 pt-10 sm:pb-16 sm:pt-12"
          aria-labelledby="send-message-heading"
        >
          <div className="aa-container px-4 sm:px-6">
            <div className="mx-auto max-w-3xl">
              <h2
                id="send-message-heading"
                className="font-[family-name:var(--font-heading)] text-xl font-bold text-slate-900"
              >
                Send Message
              </h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
