'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ContactProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  phoneNumber?: string;
  email?: string;
  whatsappNumber?: string;
}

const WIN95_BORDERS = {
  raised: "border-t-white border-l-white border-r-gray-800 border-b-gray-800",
  sunken: "border-t-gray-800 border-l-gray-800 border-r-white border-b-white",
} as const;

const Win95Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => (
  <button
    className={cn(
      "px-4 py-2 md:px-6 md:py-2 bg-[#dfdfdf]",
      "border-t-2 border-l-2 border-b-2 border-r-2",
      WIN95_BORDERS.raised,
      "active:border-t-gray-800 active:border-l-gray-800 active:border-r-white active:border-b-white",
      "font-['MS Sans Serif'] font-bold",
      "focus:outline-none focus:ring-2 focus:ring-black",
      "disabled:opacity-50",
      "text-sm md:text-base",
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
      "bg-[#ececec] p-2 md:p-3",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const Contact: React.FC<ContactProps> = ({
  className,
  phoneNumber = "+55(61)99183-5555",
  email = "bonatto@tutanota.com",
  whatsappNumber = "61991835555",
  ...props
}) => {
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  return (
    <section
      id="Contact"
      className={cn(
        "w-full max-w-6xl mx-auto bg-[#c0c0c0] my-5",
        "border-2",
        WIN95_BORDERS.raised,
        "p-3 md:w-4/5",
        className
      )}
      {...props}
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Left Panel */}
        <div className="w-full md:w-1/3">
          <div className={cn(
            "bg-[#c0c0c0] h-full p-3 md:p-4",
            "border-2",
            WIN95_BORDERS.raised
          )}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 md:mb-6 font-['MS Sans Serif'] select-none">
              Contact
            </h2>
            <div className="text-center space-y-3 font-['MS Sans Serif']">
              <h3 className="text-lg md:text-xl font-bold text-[#000080] select-none">Get in touch!</h3>
              <p className="text-xs md:text-sm leading-relaxed px-2">
                Come talk to me and learn a bit more, expand your network, and even have a coffee!
              </p>
              <Win95Button
                onClick={handleWhatsAppClick}
                className="mt-4 md:mt-6 w-full max-w-xs mx-auto"
              >
                Message on WhatsApp
              </Win95Button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-2/3">
          <div className={cn(
            "bg-white h-full p-4 md:p-6",
            "border-2",
            WIN95_BORDERS.sunken
          )}>
            <div className="space-y-4 md:space-y-6 font-['MS Sans Serif']">
              <Win95Panel>
                <p className="leading-relaxed flex flex-col md:flex-row items-start md:items-center gap-2 text-sm md:text-base">
                  <span className="font-bold underline select-none">Phone:</span>
                  <span className="font-mono bg-white px-2 py-1 border border-gray-400 w-full md:flex-grow">
                    {phoneNumber}
                  </span>
                </p>
              </Win95Panel>
              <Win95Panel>
                <p className="leading-relaxed flex flex-col md:flex-row items-start md:items-center gap-2 text-sm md:text-base">
                  <span className="font-bold underline select-none">Email:</span>
                  <a
                    href={`mailto:${email}`}
                    className="font-mono bg-white px-2 py-1 border border-gray-400 w-full md:flex-grow
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
