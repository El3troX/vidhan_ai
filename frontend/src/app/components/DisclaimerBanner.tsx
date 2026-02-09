export function DisclaimerBanner() {
  return (
    <div className="relative bg-[#faf6f0]/95 backdrop-blur-sm rounded-sm shadow-2xl p-8 border-4 border-[#8b6914]"
         style={{ 
           boxShadow: '0 8px 32px rgba(61,40,23,0.4), inset 0 0 40px rgba(212,175,55,0.1)',
         }}>
      
      {/* Ornate corner decorations */}
      <svg className="absolute top-0 left-0 w-12 h-12 text-[#d4af37]" viewBox="0 0 50 50" fill="currentColor">
        <path d="M0,0 L15,0 Q5,5 5,15 L5,0 Z M0,0 L0,15 Q5,5 15,5 L0,0 Z" opacity="0.8" />
        <circle cx="3" cy="3" r="2" />
      </svg>
      <svg className="absolute top-0 right-0 w-12 h-12 text-[#d4af37] transform scale-x-[-1]" viewBox="0 0 50 50" fill="currentColor">
        <path d="M0,0 L15,0 Q5,5 5,15 L5,0 Z M0,0 L0,15 Q5,5 15,5 L0,0 Z" opacity="0.8" />
        <circle cx="3" cy="3" r="2" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-12 h-12 text-[#d4af37] transform scale-y-[-1]" viewBox="0 0 50 50" fill="currentColor">
        <path d="M0,0 L15,0 Q5,5 5,15 L5,0 Z M0,0 L0,15 Q5,5 15,5 L0,0 Z" opacity="0.8" />
        <circle cx="3" cy="3" r="2" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-12 h-12 text-[#d4af37] transform scale-[-1]" viewBox="0 0 50 50" fill="currentColor">
        <path d="M0,0 L15,0 Q5,5 5,15 L5,0 Z M0,0 L0,15 Q5,5 15,5 L0,0 Z" opacity="0.8" />
        <circle cx="3" cy="3" r="2" />
      </svg>

      {/* Decorative border lines */}
      <div className="absolute top-3 left-3 right-3 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50"></div>
      <div className="absolute bottom-3 left-3 right-3 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50"></div>
      <div className="absolute left-3 top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-[#d4af37] to-transparent opacity-50"></div>
      <div className="absolute right-3 top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-[#d4af37] to-transparent opacity-50"></div>
      
      <div className="relative pt-2 pb-1">
        {/* Header with ornamental design */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <svg className="w-8 h-8 text-[#8b6914]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <div className="absolute -top-1 -left-6 w-5 h-5 border-2 border-[#d4af37] rounded-full opacity-40"></div>
            <div className="absolute -top-1 -right-6 w-5 h-5 border-2 border-[#d4af37] rounded-full opacity-40"></div>
          </div>
        </div>

        <h3 className="text-center text-2xl text-[#3d2817] tracking-[0.2em] mb-6 drop-shadow-sm" 
            style={{ fontFamily: "'Cinzel', serif" }}>
          NOTICE TO THE READER
        </h3>
        
        {/* Decorative line */}
        <div className="flex justify-center mb-6">
          <svg className="w-32 h-3 text-[#8b6914]" viewBox="0 0 130 10" fill="none" stroke="currentColor">
            <path d="M0,5 L45,5 M85,5 L130,5" strokeWidth="1" opacity="0.6" />
            <circle cx="65" cy="5" r="4" strokeWidth="1" fill="currentColor" opacity="0.6" />
            <path d="M50,5 L58,2 M58,2 L58,8 M72,5 L80,2 M80,2 L80,8" strokeWidth="0.8" opacity="0.6" />
          </svg>
        </div>
        
        <div className="text-center text-[#4a3326] leading-loose px-4" style={{ fontFamily: "'Crimson Text', serif" }}>
          <p className="text-lg mb-4">
            This instrument provides <span className="font-semibold">general legal information</span> drawn from 
            the Statutory Laws of the Republic of India, including but not limited to the 
            <span className="italic"> Constitution of India</span>, the <span className="italic">Bharatiya Nyaya Sanhita</span>, 
            and the <span className="italic">Bharatiya Nagarik Suraksha Sanhita</span>.
          </p>
          <p className="text-lg">
            It does <span className="font-bold text-[#8b6914] text-xl underline decoration-2 decoration-[#d4af37]">NOT</span> constitute 
            legal advice, counsel, or professional opinion. For matters requiring legal determination or representation, 
            consultation with a duly qualified and licensed legal practitioner is <span className="font-semibold">imperative and indispensable</span>.
          </p>
        </div>

        {/* Bottom flourish */}
        <div className="flex justify-center mt-6">
          <svg className="w-24 h-6 text-[#8b6914]" viewBox="0 0 100 20" fill="currentColor">
            <path d="M20,10 Q30,5 40,10 T60,10 T80,10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <circle cx="50" cy="10" r="3" opacity="0.6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
