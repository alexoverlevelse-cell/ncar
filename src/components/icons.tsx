type IconProps = { className?: string };

export function HomeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M3 10.5 12 3l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 9.5V20h13V9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M3 16v-3l2-5.2A2 2 0 0 1 6.9 6.5h10.2A2 2 0 0 1 19 7.8L21 13v3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 16h18" strokeLinecap="round" />
      <circle cx="7.5" cy="16.5" r="1.6" />
      <circle cx="16.5" cy="16.5" r="1.6" />
    </svg>
  );
}

export function WrenchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path
        d="M15.5 3.5a5 5 0 0 0-4.6 6.9L3.8 17.5a1.8 1.8 0 0 0 2.6 2.6l7.1-7.1a5 5 0 0 0 6.1-6.6l-2.7 2.7-2.6-.7-.7-2.6 2.7-2.7a5 5 0 0 0-.8-.1Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path
        d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TelegramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21.8 4.3 18.9 19c-.2 1-.8 1.2-1.6.8l-4.4-3.3-2.1 2c-.2.3-.4.5-.9.5l.3-4.5 8.1-7.3c.3-.3-.1-.5-.6-.2l-10 6.3-4.3-1.3c-.9-.3-1-.9.2-1.4l16.9-6.5c.8-.3 1.4.2 1.2 1.2Z" />
    </svg>
  );
}

export function DocumentIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <path d="M9 8.5h6M9 12h6M9 15.5h3.5" strokeLinecap="round" />
    </svg>
  );
}

export function PersonIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.8 20.2a7.2 7.2 0 0 1 14.4 0" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M4 12h15m0 0-6-6m6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowLeftIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M20 12H5m0 0 6-6m-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M12 3.2 5 6v5.6c0 4 2.9 7.6 7 9.2 4.1-1.6 7-5.2 7-9.2V6l-7-2.8Z" strokeLinejoin="round" />
      <path d="m9 12 2.2 2.2L15.5 10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

export function TrashIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M4 7h16M9.5 7V4.8h5V7M6.5 7l.8 12.2a1 1 0 0 0 1 .8h7.4a1 1 0 0 0 1-.8L17.5 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PencilIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M15.8 4.6 19.4 8.2M4.5 19.5l4-.8L19.4 8.2a1.3 1.3 0 0 0 0-1.8l-1.8-1.8a1.3 1.3 0 0 0-1.8 0L5.3 15.5l-.8 4Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M12 21s6.5-5.6 6.5-10.4A6.5 6.5 0 0 0 5.5 10.6C5.5 15.4 12 21 12 21Z" strokeLinejoin="round" />
      <circle cx="12" cy="10.3" r="2.3" />
    </svg>
  );
}

export function TagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M3.5 11.3V4.5a1 1 0 0 1 1-1h6.8a1 1 0 0 1 .7.3l8.2 8.2a1 1 0 0 1 0 1.4l-6.8 6.8a1 1 0 0 1-1.4 0L3.8 12a1 1 0 0 1-.3-.7Z" strokeLinejoin="round" />
      <circle cx="8" cy="8" r="1.4" />
    </svg>
  );
}

// Заглушка вместо фотографии — пока владельцы не загрузили реальные снимки.
export function CarPlaceholderIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 32" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <path d="M4 24v-5l4-8a4 4 0 0 1 3.6-2.3h24.8A4 4 0 0 1 39.6 10L46 19h10a4 4 0 0 1 4 4v1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 24h56" strokeLinecap="round" />
      <circle cx="17" cy="24" r="3.5" />
      <circle cx="46" cy="24" r="3.5" />
    </svg>
  );
}

// Флаги рисуем сами, а не эмодзи 🇺🇦/🇬🇧: Windows не имеет глифов для флагов
// и показывает вместо них буквы «UA» и «GB».
export function FlagUkraineIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden="true">
      <rect width="60" height="20" fill="#005BBB" />
      <rect y="20" width="60" height="20" fill="#FFD500" />
    </svg>
  );
}

// Пропорция 3:2 — как у украинского флага рядом, чтобы оба заняли одинаковую
// рамку. Настоящий Union Jack вдвое длиннее, здесь он подогнан под соседа.
export function FlagUnitedKingdomIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden="true">
      <clipPath id="uk-flag-counterchange">
        <path d="M30,20 h30 v20 z v20 h-30 z h-30 v-20 z v-20 h30 z" />
      </clipPath>
      <rect width="60" height="40" fill="#012169" />
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#FFF" strokeWidth="8" />
      <path
        d="M0,0 L60,40 M60,0 L0,40"
        clipPath="url(#uk-flag-counterchange)"
        stroke="#C8102E"
        strokeWidth="5"
      />
      <path d="M30,0 v40 M0,20 h60" stroke="#FFF" strokeWidth="13" />
      <path d="M30,0 v40 M0,20 h60" stroke="#C8102E" strokeWidth="8" />
    </svg>
  );
}
