import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface QueryInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

const placeholderExamples = [
  "What are my fundamental rights?",
  "What happens after an arrest?",
  "What does Article 21 of the Constitution say?",
  "Explain the right to equality under the Constitution"
];

export function QueryInput({ value, onChange, onSubmit, isLoading }: QueryInputProps) {
  const [placeholderIndex] = useState(() => 
    Math.floor(Math.random() * placeholderExamples.length)
  );

  const handleSubmit = () => {
    onSubmit(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative bg-[#faf6f0]/95 backdrop-blur-sm rounded-sm shadow-2xl p-10 border-4 border-[#8b6914]"
         style={{ boxShadow: '0 8px 32px rgba(61,40,23,0.4), inset 0 0 40px rgba(212,175,55,0.1)' }}>
      
      {/* Ornate corner decorations */}
      <svg className="absolute top-0 left-0 w-14 h-14 text-[#d4af37]" viewBox="0 0 60 60" fill="currentColor">
        <path d="M0,0 L20,0 Q8,6 8,20 L8,0 Z M0,0 L0,20 Q6,8 20,8 L0,0 Z" opacity="0.7" />
        <circle cx="5" cy="5" r="2.5" />
        <circle cx="15" cy="5" r="1.5" opacity="0.6" />
        <circle cx="5" cy="15" r="1.5" opacity="0.6" />
      </svg>
      <svg className="absolute top-0 right-0 w-14 h-14 text-[#d4af37] transform scale-x-[-1]" viewBox="0 0 60 60" fill="currentColor">
        <path d="M0,0 L20,0 Q8,6 8,20 L8,0 Z M0,0 L0,20 Q6,8 20,8 L0,0 Z" opacity="0.7" />
        <circle cx="5" cy="5" r="2.5" />
        <circle cx="15" cy="5" r="1.5" opacity="0.6" />
        <circle cx="5" cy="15" r="1.5" opacity="0.6" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-14 h-14 text-[#d4af37] transform scale-y-[-1]" viewBox="0 0 60 60" fill="currentColor">
        <path d="M0,0 L20,0 Q8,6 8,20 L8,0 Z M0,0 L0,20 Q6,8 20,8 L0,0 Z" opacity="0.7" />
        <circle cx="5" cy="5" r="2.5" />
        <circle cx="15" cy="5" r="1.5" opacity="0.6" />
        <circle cx="5" cy="15" r="1.5" opacity="0.6" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-14 h-14 text-[#d4af37] transform scale-[-1]" viewBox="0 0 60 60" fill="currentColor">
        <path d="M0,0 L20,0 Q8,6 8,20 L8,0 Z M0,0 L0,20 Q6,8 20,8 L0,0 Z" opacity="0.7" />
        <circle cx="5" cy="5" r="2.5" />
        <circle cx="15" cy="5" r="1.5" opacity="0.6" />
        <circle cx="5" cy="15" r="1.5" opacity="0.6" />
      </svg>

      {/* Decorative border lines */}
      <div className="absolute top-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-40"></div>
      <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-40"></div>

      {/* Header with ornamental divider */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <svg className="w-20 h-4 text-[#8b6914]" viewBox="0 0 80 12" fill="none" stroke="currentColor">
            <path d="M0,6 L28,6 M52,6 L80,6" strokeWidth="1" opacity="0.6" />
            <circle cx="40" cy="6" r="5" strokeWidth="1" fill="currentColor" opacity="0.5" />
          </svg>
        </div>

        <h2 className="text-center text-2xl text-[#3d2817] tracking-[0.25em] mb-3" 
            style={{ fontFamily: "'Cinzel', serif" }}>
          SUBMIT THY QUERY
        </h2>
        
        <p className="text-center text-base text-[#6b5644] italic" style={{ fontFamily: "'Crimson Text', serif" }}>
          Pose thy question regarding the Statutory Laws of India
        </p>

        {/* Small decorative line */}
        <div className="flex justify-center mt-4">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#8b6914] to-transparent"></div>
        </div>
      </div>
      
      <Textarea
        id="legal-query"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholderExamples[placeholderIndex]}
        disabled={isLoading}
        className="min-h-[150px] text-lg resize-none bg-[#fffcf7] border-3 border-[#b8935f] focus:border-[#d4af37] focus:ring-[#d4af37]/40 text-[#3a2a1a] placeholder:text-[#8b7355]/40 placeholder:italic rounded-none shadow-inner"
        style={{ 
          fontFamily: "'EB Garamond', serif",
          boxShadow: 'inset 0 2px 8px rgba(61,40,23,0.15)'
        }}
      />
      
      <div className="flex items-center justify-between mt-8">
        <p className="text-sm text-[#8b7355] italic" style={{ fontFamily: "'Crimson Text', serif" }}>
          Press Enter to submit • Shift + Enter for new line
        </p>
        
        <Button
          onClick={handleSubmit}
          disabled={!value.trim() || isLoading}
          className="relative bg-gradient-to-b from-[#5a3825] via-[#4a2f1f] to-[#3d2817] hover:from-[#6b4530] hover:via-[#5a3825] hover:to-[#4a2f1f] text-[#e6d4b8] px-10 py-4 h-auto border-3 border-[#8b6914] shadow-2xl rounded-none overflow-hidden group"
          style={{ 
            fontFamily: "'Cinzel', serif", 
            letterSpacing: '0.15em',
            boxShadow: '0 6px 20px rgba(61,40,23,0.5), inset 0 1px 0 rgba(212,175,55,0.3)'
          }}
        >
          {/* Gold shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Decorative top border on button */}
          <div className="absolute top-0 left-4 right-4 h-px bg-[#d4af37] opacity-50"></div>
          
          {isLoading ? (
            <>
              <svg className="inline-block w-5 h-5 mr-3 animate-spin text-[#d4af37]" style={{ animationDuration: '1.5s' }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.3"/>
                <path d="M12 2C6.48 2 2 6.48 2 12h2c0-4.41 3.59-8 8-8s8 3.59 8 8h2c0-5.52-4.48-10-10-10z"/>
              </svg>
              CONSULTING ARCHIVES...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-3 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
              CONSULT VIDHAN-AI
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
