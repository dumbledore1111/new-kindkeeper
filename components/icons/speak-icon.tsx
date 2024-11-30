export function SpeakIcon({ className = "" }: { className?: string }) {
    return (
      <svg 
        viewBox="0 0 24 24" 
        className={className}
        width="24"
        height="24"
        fill="currentColor"
      >
        <path d="M12 3C7.5 3 3.6 5.2 2.4 8.2C2.2 8.7 2 9.3 2 10C2 10.7 2.2 11.3 2.4 11.8C3.6 14.8 7.5 17 12 17C12.3 17 12.7 17 13 16.9C13.3 19.2 13 21 13 21H15C15 21 15.3 19.2 15.6 16.9C15.9 17 16.3 17 16.6 17C21.1 17 25 14.8 26.2 11.8C26.4 11.3 26.6 10.7 26.6 10C26.6 9.3 26.4 8.7 26.2 8.2C25 5.2 21.1 3 16.6 3H12Z"/>
      </svg>
    )
  }
  