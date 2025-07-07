
interface ThemeToggleProps {
  darkMode: boolean;
  onToggle: () => void;
}

const ThemeToggle = ({ darkMode, onToggle }: ThemeToggleProps) => {
  return (
    <button className="theme-toggle" onClick={onToggle} title="Toggle theme">
      <div className="toggle-track">
        <div className={`toggle-thumb ${darkMode ? 'dark' : 'light'}`}>
          {darkMode ? '🌙' : '☀️'}
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
