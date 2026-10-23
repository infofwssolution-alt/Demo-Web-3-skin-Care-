import React from "react";

export function ProductVisual({ svgType, accentColor = "#E8DED2", accentHighlight = "#D4C5B3", className = "w-full h-full" }) {
  switch (svgType) {
    case "pump-bottle":
      return (
        <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`grad-${svgType}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={accentColor} />
              <stop offset="100%" stopColor={accentHighlight} />
            </linearGradient>
            <linearGradient id="bodyGradPump" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9"/>
              <stop offset="45%" stopColor="#FAF7F2" stopOpacity="0.98"/>
              <stop offset="100%" stopColor="#E2DDD5" stopOpacity="0.8"/>
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="220" rx="44" ry="10" fill="#141615" fillOpacity="0.12"/>
          {/* Pump Mechanism */}
          <rect x="85" y="32" width="30" height="8" rx="2" fill="#202221"/>
          <path d="M96 32 V18 C96 14 100 12 108 12 H124 C128 12 130 14 130 18 C130 20 128 22 124 22 H110 V32" fill="#202221"/>
          <rect x="94" y="38" width="12" height="12" fill="#E8ECE9"/>
          <rect x="88" y="50" width="24" height="10" rx="3" fill="#C5CDC7"/>
          {/* Bottle Body */}
          <rect x="62" y="60" width="76" height="152" rx="18" fill="url(#bodyGradPump)"/>
          <rect x="68" y="90" width="64" height="84" rx="6" fill={`url(#grad-${svgType})`}/>
          <rect x="76" y="105" width="48" height="4" rx="2" fill="#141615" fillOpacity="0.5"/>
          <rect x="82" y="115" width="36" height="3" rx="1.5" fill="#141615" fillOpacity="0.3"/>
          <rect x="80" y="145" width="40" height="2" rx="1" fill="#FF5A26"/>
        </svg>
      );

    case "dropper-bottle":
      return (
        <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`grad-${svgType}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={accentColor} />
              <stop offset="100%" stopColor={accentHighlight} />
            </linearGradient>
            <linearGradient id="glassGradDrop" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95"/>
              <stop offset="40%" stopColor="#FAF8F5" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#DBD4C8" stopOpacity="0.5"/>
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="220" rx="40" ry="9" fill="#141615" fillOpacity="0.12"/>
          {/* Rubber Bulb */}
          <path d="M92 24 C92 14 108 14 108 24 L108 30 H92 Z" fill="#1E201F"/>
          <rect x="88" y="30" width="24" height="8" rx="2" fill="#D2C9BE"/>
          <rect x="86" y="38" width="28" height="14" rx="3" fill="#E6DFD5"/>
          {/* Glass Body */}
          <rect x="66" y="52" width="68" height="158" rx="16" fill="url(#glassGradDrop)"/>
          {/* Inner Liquid */}
          <rect x="72" y="80" width="56" height="122" rx="10" fill={`url(#grad-${svgType})`} fillOpacity="0.85"/>
          {/* Label */}
          <rect x="76" y="105" width="48" height="65" rx="4" fill="#FFFFFF" fillOpacity="0.96"/>
          <rect x="84" y="120" width="32" height="3" rx="1.5" fill="#141615" fillOpacity="0.7"/>
          <rect x="88" y="128" width="24" height="2" rx="1" fill="#FF5A26"/>
          <rect x="86" y="152" width="28" height="2" rx="1" fill="#141615" fillOpacity="0.3"/>
        </svg>
      );

    case "cream-jar":
    case "gel-jar":
      return (
        <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`grad-${svgType}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={accentColor} />
              <stop offset="100%" stopColor={accentHighlight} />
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="216" rx="54" ry="12" fill="#141615" fillOpacity="0.12"/>
          {/* Jar Lid */}
          <rect x="52" y="90" width="96" height="22" rx="6" fill="#202221"/>
          <ellipse cx="100" cy="91" rx="48" ry="7" fill="#3D423F"/>
          {/* Jar Body */}
          <rect x="56" y="112" width="88" height="92" rx="18" fill={`url(#grad-${svgType})`}/>
          <path d="M56 122 C56 112 60 112 100 112 C140 112 144 112 144 122 V184 C144 198 132 204 100 204 C68 204 56 198 56 184 Z" fill="#FFFFFF" fillOpacity="0.45"/>
          <rect x="68" y="132" width="64" height="42" rx="4" fill="#FFFFFF" fillOpacity="0.96"/>
          <rect x="76" y="146" width="48" height="3" rx="1.5" fill="#141615" fillOpacity="0.7"/>
          <rect x="84" y="155" width="32" height="2" rx="1" fill="#FF5A26"/>
        </svg>
      );

    case "gel-tube":
    case "sunscreen-tube":
      return (
        <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`grad-${svgType}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={accentColor} />
              <stop offset="100%" stopColor={accentHighlight} />
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="222" rx="38" ry="8" fill="#141615" fillOpacity="0.12"/>
          <path d="M68 40 L132 40 L130 52 L70 52 Z" fill="#C5C2BA"/>
          <path d="M70 52 L130 52 C126 120 122 170 118 186 L82 186 C78 170 74 120 70 52 Z" fill={`url(#grad-${svgType})`}/>
          <rect x="80" y="186" width="40" height="26" rx="4" fill="#202221"/>
          <rect x="84" y="212" width="32" height="6" rx="2" fill="#3D423F"/>
          <rect x="78" y="80" width="44" height="70" rx="4" fill="#FFFFFF" fillOpacity="0.9"/>
          <rect x="84" y="96" width="32" height="3" rx="1.5" fill="#141615" fillOpacity="0.7"/>
          <rect x="88" y="106" width="24" height="2" rx="1" fill="#FF5A26"/>
        </svg>
      );

    case "set-box":
      return (
        <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`grad-${svgType}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={accentColor} />
              <stop offset="100%" stopColor={accentHighlight} />
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="222" rx="60" ry="12" fill="#141615" fillOpacity="0.12"/>
          <rect x="42" y="80" width="116" height="132" rx="12" fill={`url(#grad-${svgType})`}/>
          <rect x="38" y="68" width="124" height="26" rx="6" fill="#202221"/>
          <rect x="94" y="68" width="12" height="144" fill="#FF5A26"/>
          <ellipse cx="100" cy="67" rx="14" ry="7" fill="#FF5A26"/>
          <rect x="56" y="120" width="88" height="54" rx="6" fill="#FAF8F5" fillOpacity="0.96"/>
          <rect x="68" y="136" width="64" height="4" rx="2" fill="#141615" fillOpacity="0.7"/>
          <rect x="76" y="148" width="48" height="3" rx="1.5" fill="#FF5A26"/>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect x="65" y="60" width="70" height="146" rx="20" fill={accentColor}/>
          <rect x="80" y="40" width="40" height="20" rx="4" fill="#202221"/>
        </svg>
      );
  }
}
