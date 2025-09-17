export const Logo = ({ className = "h-8 w-auto" }) => {
  return (
    <svg 
      viewBox="0 0 400 120" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* City Skyline */}
      <g fill="#1B7F47">
        {/* Buildings from left to right */}
        <rect x="10" y="45" width="8" height="25"/>
        <rect x="20" y="40" width="12" height="30"/>
        <rect x="35" y="35" width="10" height="35"/>
        <rect x="48" y="30" width="15" height="40"/>
        <rect x="52" y="25" width="7" height="45"/>
        <rect x="52" y="20" width="3" height="50"/>
        <rect x="68" y="38" width="8" height="32"/>
        <rect x="80" y="32" width="18" height="38"/>
        <rect x="85" y="28" width="8" height="42"/>
        <rect x="102" y="40" width="10" height="30"/>
        <rect x="115" y="42" width="8" height="28"/>
        
        {/* Dollar Sign */}
        <g transform="translate(130, 15)">
          <path d="M12 2 C18 2 22 6 22 12 C22 16 20 19 17 20 C20 21 23 24 23 29 C23 35 19 39 13 39 L13 42 L11 42 L11 39 C5 39 1 35 1 29 L3 29 C3 33 7 37 11 37 L11 23 C6 22 2 18 2 12 C2 6 6 2 12 2 Z M11 4 C8 4 5 7 5 12 C5 17 8 20 11 20 L11 4 Z M13 23 L13 37 C16 37 19 34 19 29 C19 26 16 23 13 23 Z"/>
          <rect x="11" y="0" width="2" height="44"/>
        </g>
        
        {/* Upward Arrow */}
        <path d="M150 25 L165 20 L162 23 L175 23 L175 27 L162 27 L165 30 Z"/>
        
        {/* Curved line under buildings */}
        <path d="M8 70 Q80 65 152 70" stroke="#1B7F47" strokeWidth="3" fill="none"/>
      </g>
      
      {/* Text */}
      <g fill="#1B7F47">
        <text x="10" y="90" fontSize="16" fontWeight="bold" fontFamily="Arial, sans-serif">DETROIT</text>
        <text x="10" y="105" fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif">CAPITAL</text>
        <text x="10" y="118" fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif">CONNECT</text>
      </g>
    </svg>
  );
};
