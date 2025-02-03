'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ContactProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  phoneNumber?: string;
  email?: string;
  whatsappNumber?: string;
}

const WIN95_COLORS = {
  background: '#c0c0c0',
  white: '#ffffff',
  gray: '#808080',
  darkGray: '#404040',
  navy: '#000080',
  button: '#dfdfdf',
  buttonHover: '#efefef',
  buttonActive: '#c0c0c0',
  input: '#ececec',
} as const;

const WIN95_BORDERS = {
  raised: "border-t-white border-l-white border-r-gray-800 border-b-gray-800",
  sunken: "border-t-gray-800 border-l-gray-800 border-r-white border-b-white",
} as const;

const Win95Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => (
  <button
    className={cn(
      "px-6 py-2 bg-[#dfdfdf]",
      "border-t-2 border-l-2 border-b-2 border-r-2",
      WIN95_BORDERS.raised,
      "active:border-t-gray-800 active:border-l-gray-800 active:border-r-white active:border-b-white",
      "font-['MS Sans Serif'] font-bold",
      "focus:outline-none focus:ring-2 focus:ring-black",
      "disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

const Win95Panel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div
    className={cn(
      "border-2",
      WIN95_BORDERS.sunken,
      "bg-[#ececec] p-3",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const Contact: React.FC<ContactProps> = ({
  className,
  phoneNumber = "555-555-5555",
  email = "bonatto@e-mail.com",
  whatsappNumber = "555555555555",
  ...props
}) => {
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  return (
    <section
      id="Contact"
      className={cn(
        "w-4/5 mx-auto bg-[#c0c0c0] mt-5",
        "border-2",
        WIN95_BORDERS.raised,
        "p-3",
        className
      )}
      {...props}
    >
      <div className="flex gap-6">
        {/* Left Panel */}
        <div className="w-1/3">
          <div className={cn(
            "bg-[#c0c0c0] h-full p-4",
            "border-2",
            WIN95_BORDERS.raised
          )}>
            <h2 className="text-4xl font-bold text-center mb-6 font-['MS Sans Serif'] select-none">
              Contact
            </h2>
            <div className="text-center space-y-3 font-['MS Sans Serif']">
              <h3 className="text-xl font-bold text-[#000080] select-none">Get in touch!</h3>
              <p className="text-sm leading-relaxed">
                Come talk to me and learn a bit more, expand your network, and even have a coffee!
              </p>
              <Win95Button
                onClick={handleWhatsAppClick}
                className="mt-6 w-full max-w-xs mx-auto"
              >
                Message on WhatsApp
              </Win95Button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-2/3">
          <div className={cn(
            "bg-white h-full p-6",
            "border-2",
            WIN95_BORDERS.sunken
          )}>
            <div className="space-y-6 font-['MS Sans Serif']">
              <Win95Panel>
                <p className="leading-relaxed flex items-center gap-2">
                  <span className="font-bold underline select-none">Phone:</span>
                  <span className="font-mono bg-white px-2 py-1 border border-gray-400 flex-grow">
                    {phoneNumber}
                  </span>
                </p>
              </Win95Panel>
              <Win95Panel>
                <p className="leading-relaxed flex items-center gap-2">
                  <span className="font-bold underline select-none">Email:</span>
                  <a
                    href={`mailto:${email}`}
                    className="font-mono bg-white px-2 py-1 border border-gray-400 flex-grow
                             text-blue-800 hover:text-blue-600 visited:text-purple-800
                             hover:underline"
                  >
                    {email}
                  </a>
                </p>
              </Win95Panel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
