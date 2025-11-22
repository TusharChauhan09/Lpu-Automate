import { useState, useEffect } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Load saved credentials and toggle state
    chrome.storage.local.get(['lpu_username', 'lpu_password', 'lpu_auto_connect_enabled'], (result: { lpu_username?: string; lpu_password?: string; lpu_auto_connect_enabled?: boolean }) => {
      if (result.lpu_username) setUsername(result.lpu_username);
      if (result.lpu_password) setPassword(result.lpu_password);
      if (result.lpu_auto_connect_enabled !== undefined) setIsEnabled(result.lpu_auto_connect_enabled);
    });
  }, []);

  const handleSave = () => {
    chrome.storage.local.set(
      { 
        lpu_username: username, 
        lpu_password: password,
        lpu_auto_connect_enabled: isEnabled
      },
      () => {
        setStatus('Settings updated!');
        setTimeout(() => setStatus(''), 2000);
      }
    );
  };

  const toggleExtension = () => {
      const newState = !isEnabled;
      setIsEnabled(newState);
      // Auto-save toggle state immediately for better UX
      chrome.storage.local.set({ lpu_auto_connect_enabled: newState });
  };

  return (
    <div className="w-80 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-orange-600">
            LPU Auto Connect
          </h1>
          <button 
            onClick={toggleExtension}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${isEnabled ? 'bg-green-500' : 'bg-gray-200'}`}
          >
            <span className="sr-only">Enable Auto Connect</span>
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
      </div>

      <div className={`space-y-4 ${!isEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username (Reg No / UID)
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            placeholder="Enter your Reg No"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          onClick={handleSave}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 cursor-pointer"
        >
          Update Credentials
        </button>
      </div>
       {status && (
          <p className="mt-4 text-center text-sm text-green-600 font-medium">
            {status}
          </p>
        )}
        {!isEnabled && (
            <p className="mt-4 text-center text-sm text-gray-500 italic">
                Extension is currently disabled.
            </p>
        )}
    </div>
  );
}

export default App;
