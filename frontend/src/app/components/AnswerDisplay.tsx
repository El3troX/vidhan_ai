import { Badge } from "./ui/badge";

interface AnswerDisplayProps {
  response: {
    type: "answer" | "clarification" | "refusal";
    content: string;
    sources?: string[];
  } | null;
  isLoading: boolean;
}

export function AnswerDisplay({ response, isLoading }: AnswerDisplayProps) {
  if (isLoading) {
    return (
      <div className="relative bg-[#faf6f0]/95 backdrop-blur-sm rounded-sm shadow-2xl p-16 border-4 border-[#8b6914]"
           style={{ boxShadow: '0 8px 32px rgba(61,40,23,0.4), inset 0 0 40px rgba(212,175,55,0.1)' }}>
        
        {/* Corner ornaments for loading state */}
        <svg className="absolute top-2 left-2 w-8 h-8 text-[#d4af37] opacity-60" viewBox="0 0 40 40" fill="currentColor">
          <circle cx="6" cy="6" r="3" />
          <path d="M0,0 L15,0 L15,2 L2,2 L2,15 L0,15 Z" opacity="0.6" />
        </svg>
        <svg className="absolute top-2 right-2 w-8 h-8 text-[#d4af37] opacity-60 transform scale-x-[-1]" viewBox="0 0 40 40" fill="currentColor">
          <circle cx="6" cy="6" r="3" />
          <path d="M0,0 L15,0 L15,2 L2,2 L2,15 L0,15 Z" opacity="0.6" />
        </svg>

        <div className="flex flex-col items-center justify-center gap-6 text-[#6b5644]">
          {/* Ornate loading animation - stack of books with scales */}
          <div className="relative">
            <svg className="w-20 h-20 text-[#8b6914] animate-pulse" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V4C20,2.9,19.1,2,18,2z M6,4h5v8l-2.5-1.5L6,12V4z" opacity="0.7"/>
            </svg>
            <svg className="absolute top-0 left-0 w-20 h-20 text-[#d4af37] animate-spin" style={{ animationDuration: '3s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" opacity="0.3"/>
              <path d="M12 2 A10 10 0 0 1 22 12" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="text-center">
            <p className="text-xl tracking-wide mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              CONSULTING THE ARCHIVES
            </p>
            <div className="flex justify-center mb-3">
              <svg className="w-32 h-2 text-[#8b6914]" viewBox="0 0 100 6" fill="currentColor">
                <rect x="0" y="2" width="100" height="2" opacity="0.3"/>
                <rect className="animate-pulse" x="20" y="0" width="60" height="6" rx="3" opacity="0.6"/>
              </svg>
            </div>
            <p className="text-base italic text-[#8b7355]" style={{ fontFamily: "'Crimson Text', serif" }}>
              Searching the ancient texts of statutory law...<br/>
              <span className="text-sm">The compendium is being consulted for thy answer</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!response) {
    return null;
  }

  const getHeaderStyle = () => {
    switch (response.type) {
      case "answer":
        return {
          bg: "bg-gradient-to-r from-[#3d5a3d]/30 via-[#3d5a3d]/20 to-[#3d5a3d]/30",
          border: "border-[#2d4a2d]",
          text: "text-[#2d4a2d]"
        };
      case "clarification":
        return {
          bg: "bg-gradient-to-r from-[#2d4a6b]/30 via-[#2d4a6b]/20 to-[#2d4a6b]/30",
          border: "border-[#1e3a5f]",
          text: "text-[#1e3a5f]"
        };
      case "refusal":
        return {
          bg: "bg-gradient-to-r from-[#8b6914]/30 via-[#8b6914]/20 to-[#8b6914]/30",
          border: "border-[#8b6914]",
          text: "text-[#8b6914]"
        };
    }
  };

  const getHeaderText = () => {
    switch (response.type) {
      case "answer":
        return "LEGAL EXPOSITION";
      case "clarification":
        return "CLARIFICATION REQUIRED";
      case "refusal":
        return "BEYOND THE SCOPE";
    }
  };

  const getIcon = () => {
    switch (response.type) {
      case "answer":
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        );
      case "clarification":
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "refusal":
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
    }
  };

  const style = getHeaderStyle();

  return (
    <div className="relative bg-[#faf6f0]/95 backdrop-blur-sm rounded-sm shadow-2xl overflow-hidden border-4 border-[#8b6914]"
         style={{ boxShadow: '0 8px 32px rgba(61,40,23,0.4), inset 0 0 40px rgba(212,175,55,0.1)' }}>
      
      {/* Ornate corner decorations */}
      <svg className="absolute top-0 left-0 w-16 h-16 text-[#d4af37] z-10" viewBox="0 0 60 60" fill="currentColor">
        <path d="M0,0 L22,0 Q10,7 10,22 L10,0 Z M0,0 L0,22 Q7,10 22,10 L0,0 Z" opacity="0.6" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="1.5" opacity="0.5" />
        <circle cx="6" cy="18" r="1.5" opacity="0.5" />
      </svg>
      <svg className="absolute top-0 right-0 w-16 h-16 text-[#d4af37] z-10 transform scale-x-[-1]" viewBox="0 0 60 60" fill="currentColor">
        <path d="M0,0 L22,0 Q10,7 10,22 L10,0 Z M0,0 L0,22 Q7,10 22,10 L0,0 Z" opacity="0.6" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="1.5" opacity="0.5" />
        <circle cx="6" cy="18" r="1.5" opacity="0.5" />
      </svg>

      {/* Decorative Header */}
      <div className={`relative px-10 py-6 border-b-3 ${style.border} ${style.bg}`}>
        {/* Side accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-[#d4af37] via-[#c9a961] to-[#d4af37]"></div>
        
        <div className="flex items-center gap-5">
          <div className={`${style.text} drop-shadow-sm`}>
            {getIcon()}
          </div>
          <div className="flex-1">
            <h2 className={`text-2xl tracking-[0.2em] ${style.text} drop-shadow-sm`} style={{ fontFamily: "'Cinzel', serif" }}>
              {getHeaderText()}
            </h2>
            {response.type === "answer" && (
              <p className="text-sm text-[#6b5644] italic mt-1.5" style={{ fontFamily: "'Crimson Text', serif" }}>
                Drawn from the Statutory Records and Legal Compendium
              </p>
            )}
          </div>
          <svg className={`w-10 h-10 ${style.text} opacity-40`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M18,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V4C20,2.9,19.1,2,18,2z M9,4h2v5l-1-0.75L9,9V4z"/>
          </svg>
        </div>

        {/* Decorative bottom line */}
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-20"></div>
      </div>

      {/* Content */}
      <div className="px-10 py-10">
        {/* Main text content */}
        <div className="text-[#3a2a1a] leading-loose" style={{ fontFamily: "'EB Garamond', serif" }}>
          {response.content.split('\n\n').map((paragraph, index) => {
            const isFirstParagraph = index === 0;
            const firstLetter = paragraph.charAt(0);
            const restOfFirstWord = paragraph.slice(1);
            
            if (paragraph.trim().match(/^\d+\./)) {
              // Numbered list item
              const items = paragraph.split('\n').filter(line => line.trim());
              return (
                <div key={index} className="mb-6 ml-6">
                  {items.map((item, itemIndex) => (
                    <p key={itemIndex} className="mb-4 text-lg leading-loose text-justify">
                      {item}
                    </p>
                  ))}
                </div>
              );
            }
            
            if (isFirstParagraph && response.type === "answer") {
              return (
                <p key={index} className="mb-6 text-lg leading-loose text-justify">
                  <span className="float-left text-7xl leading-none mr-3 mt-2 font-bold text-[#8b6914] drop-shadow-md" 
                        style={{ fontFamily: "'Cinzel', serif" }}>
                    {firstLetter}
                  </span>
                  <span className="text-sm tracking-wider uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                    {restOfFirstWord.split(' ')[0]}
                  </span>
                  {restOfFirstWord.slice(restOfFirstWord.indexOf(' '))}
                </p>
              );
            }
            
            return (
              <p key={index} className="mb-6 text-lg leading-loose last:mb-0 text-justify">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Sources Section */}
        {response.sources && response.sources.length > 0 && (
          <div className="mt-12 pt-10 border-t-2 border-[#d4af37]/40 relative">
            {/* Ornamental divider */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-[#faf6f0] px-4">
                <svg className="w-16 h-8 text-[#8b6914]" viewBox="0 0 80 30" fill="currentColor">
                  <circle cx="40" cy="15" r="10" opacity="0.3"/>
                  <circle cx="40" cy="15" r="6" opacity="0.6"/>
                  <path d="M20,15 L32,15 M48,15 L60,15" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
                  <circle cx="15" cy="15" r="3" opacity="0.4"/>
                  <circle cx="65" cy="15" r="3" opacity="0.4"/>
                </svg>
              </div>
            </div>

            <div className="text-center pt-6">
              <h3 className="text-lg tracking-[0.3em] text-[#5c4433] mb-8 drop-shadow-sm" style={{ fontFamily: "'Cinzel', serif" }}>
                AUTHORITIES CITED
              </h3>
              
              {/* Decorative underline */}
              <div className="flex justify-center mb-8">
                <svg className="w-40 h-3 text-[#8b6914]" viewBox="0 0 160 10" fill="none" stroke="currentColor">
                  <path d="M0,5 L65,5 M95,5 L160,5" strokeWidth="1" opacity="0.5" />
                  <circle cx="80" cy="5" r="4" strokeWidth="1" fill="currentColor" opacity="0.5" />
                </svg>
              </div>

              <div className="flex flex-wrap justify-center gap-5">
                {response.sources.map((source, index) => (
                  <div
                    key={index}
                    className="relative bg-gradient-to-b from-[#fffef9] to-[#faf8f0] border-3 border-[#8b6914] px-8 py-4 shadow-lg"
                    style={{ boxShadow: '0 4px 12px rgba(61,40,23,0.2), inset 0 1px 0 rgba(212,175,55,0.2)' }}
                  >
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-3 h-3">
                      <div className="absolute top-0 left-0 w-full h-px bg-[#d4af37]"></div>
                      <div className="absolute top-0 left-0 w-px h-full bg-[#d4af37]"></div>
                      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#d4af37] opacity-60"></div>
                    </div>
                    <div className="absolute top-0 right-0 w-3 h-3">
                      <div className="absolute top-0 right-0 w-full h-px bg-[#d4af37]"></div>
                      <div className="absolute top-0 right-0 w-px h-full bg-[#d4af37]"></div>
                      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#d4af37] opacity-60"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-3 h-3">
                      <div className="absolute bottom-0 left-0 w-full h-px bg-[#d4af37]"></div>
                      <div className="absolute bottom-0 left-0 w-px h-full bg-[#d4af37]"></div>
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#d4af37] opacity-60"></div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3">
                      <div className="absolute bottom-0 right-0 w-full h-px bg-[#d4af37]"></div>
                      <div className="absolute bottom-0 right-0 w-px h-full bg-[#d4af37]"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#d4af37] opacity-60"></div>
                    </div>
                    
                    <span className="text-base text-[#3d2817] tracking-wide font-medium" style={{ fontFamily: "'Crimson Text', serif" }}>
                      {source}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Notice for Answers */}
      {response.type === "answer" && (
        <div className="relative px-10 py-6 bg-gradient-to-r from-[#f0e8d8] via-[#f5ede0] to-[#f0e8d8] border-t-3 border-[#d4af37]/40">
          {/* Decorative top border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60"></div>
          
          <div className="flex items-start gap-4">
            <svg className="w-6 h-6 text-[#8b6914] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 9h-2V7h2m0 10h-2v-6h2m-1-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2z"/>
            </svg>
            <p className="text-sm text-[#5c4433] leading-relaxed italic" style={{ fontFamily: "'Crimson Text', serif" }}>
              The foregoing exposition is furnished for <span className="font-semibold">educational purposes only</span> and 
              is derived from statutory provisions of Indian Law. It is not intended to serve as, nor should it be construed as, 
              a substitute for personalized legal counsel from a duly qualified and licensed practitioner of law.
            </p>
          </div>
        </div>
      )}

      {/* Bottom ornate corner decorations */}
      <svg className="absolute bottom-0 left-0 w-16 h-16 text-[#d4af37] z-10 transform scale-y-[-1]" viewBox="0 0 60 60" fill="currentColor">
        <path d="M0,0 L22,0 Q10,7 10,22 L10,0 Z M0,0 L0,22 Q7,10 22,10 L0,0 Z" opacity="0.6" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="1.5" opacity="0.5" />
        <circle cx="6" cy="18" r="1.5" opacity="0.5" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-16 h-16 text-[#d4af37] z-10 transform scale-[-1]" viewBox="0 0 60 60" fill="currentColor">
        <path d="M0,0 L22,0 Q10,7 10,22 L10,0 Z M0,0 L0,22 Q7,10 22,10 L0,0 Z" opacity="0.6" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="1.5" opacity="0.5" />
        <circle cx="6" cy="18" r="1.5" opacity="0.5" />
      </svg>
    </div>
  );
}
