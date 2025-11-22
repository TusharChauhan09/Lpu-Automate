import { useState, useEffect } from 'react';
import { IconUser, IconLock, IconPower, IconMoon, IconSun, IconDeviceFloppy } from '@tabler/icons-react';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Load saved credentials and settings
    chrome.storage.local.get(['lpu_username', 'lpu_password', 'lpu_auto_connect_enabled', 'lpu_global_dark_mode'], (result: { lpu_username?: string; lpu_password?: string; lpu_auto_connect_enabled?: boolean; lpu_global_dark_mode?: boolean }) => {
      if (result.lpu_username) setUsername(result.lpu_username);
      if (result.lpu_password) setPassword(result.lpu_password);
      if (result.lpu_auto_connect_enabled !== undefined) setIsEnabled(result.lpu_auto_connect_enabled);
      if (result.lpu_global_dark_mode !== undefined) setIsDarkMode(result.lpu_global_dark_mode);
    });
  }, []);

  const handleSave = () => {
    chrome.storage.local.set(
      { 
        lpu_username: username, 
        lpu_password: password,
        lpu_auto_connect_enabled: isEnabled,
        lpu_global_dark_mode: isDarkMode
      },
      () => {
        setStatus('Updated!');
        setTimeout(() => setStatus(''), 2000);
      }
    );
  };

  const toggleExtension = () => {
      const newState = !isEnabled;
      setIsEnabled(newState);
      chrome.storage.local.set({ lpu_auto_connect_enabled: newState });
  };

  const toggleDarkMode = () => {
      const newState = !isDarkMode;
      setIsDarkMode(newState);
      chrome.storage.local.set({ lpu_global_dark_mode: newState });
  };

  return (
    <div className={`w-96 p-4 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
             {/* Dark Mode Toggle */}
            <button 
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                title="Toggle Global Dark Mode"
            >
                {isDarkMode ? <IconMoon size={20} /> : <IconSun size={20} />}
            </button>
          </div>
          
          {/* Enable Toggle */}
          <button 
            onClick={toggleExtension}
            className={`p-2 rounded-full transition-colors ${isEnabled ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}
            title={isEnabled ? "Extension Enabled" : "Extension Disabled"}
          >
            <IconPower size={20} />
          </button>
      </div>

      <div className={`space-y-4 transition-opacity duration-300 ${!isEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IconUser size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`block w-full pl-10 pr-3 py-2 rounded-md border transition-all duration-200 outline-none
                ${isDarkMode 
                    ? 'bg-gray-800 border-gray-700 focus:border-orange-500 text-white placeholder-gray-500' 
                    : 'bg-gray-50 border-gray-300 focus:border-orange-500 text-gray-900 placeholder-gray-400'
                }
            `}
            placeholder="Reg No / UID"
          />
        </div>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IconLock size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`block w-full pl-10 pr-3 py-2 rounded-md border transition-all duration-200 outline-none
                ${isDarkMode 
                    ? 'bg-gray-800 border-gray-700 focus:border-orange-500 text-white placeholder-gray-500' 
                    : 'bg-gray-50 border-gray-300 focus:border-orange-500 text-gray-900 placeholder-gray-400'
                }
            `}
            placeholder="Password"
          />
        </div>
        <button
          onClick={handleSave}
          className="w-full py-2 px-4 rounded-md font-medium text-white bg-orange-600 hover:bg-orange-700 transition-colors flex justify-center items-center space-x-2"
        >
          <IconDeviceFloppy size={18} />
          <span>Update</span>
        </button>
      </div>
       {status && (
          <div className="mt-4 p-2 rounded bg-green-100 text-green-700 text-center text-sm font-medium animate-pulse">
            {status}
          </div>
        )}
        {!isEnabled && (
            <p className={`mt-4 text-center text-xs italic ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Extension is disabled.
            </p>
        )}
    </div>
  );
}

export default App;
