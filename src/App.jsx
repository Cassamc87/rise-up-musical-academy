import React, { useState } from 'react';
import { Calendar, CreditCard, Book, Home, User, LogOut } from 'lucide-react';

const TEST_ACCOUNTS = [
  { 
    email: 'studente@riseup.it', 
    password: 'test123', 
    name: 'Mario Rossi',
    role: 'student',
    courses: ['Canto', 'Recitazione']
  },
  { 
    email: 'insegnante@riseup.it', 
    password: 'test123', 
    name: 'Serena Carradori',
    role: 'teacher',
    courses: ['Canto', 'Musical']
  }
];

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Tentativo di login con:', email, password);

    const user = TEST_ACCOUNTS.find(
      account => account.email === email && account.password === password
    );

    if (user) {
      console.log('Utente trovato:', user);
      onLogin(user);
    } else {
      setError('Credenziali non valide');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="w-full max-w-md border-t-4 border-t-purple-500 bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">
            Rise Up Musical Academy
          </h2>
          
          <div className="mb-6 p-4 bg-blue-50 rounded">
            <h3 className="font-semibold text-blue-700 mb-2">Account di Test:</h3>
            <div className="space-y-2 text-sm text-blue-600">
              <p><strong>Studente:</strong><br/>
                Email: studente@riseup.it<br/>
                Password: test123</p>
              <p><strong>Insegnante:</strong><br/>
                Email: insegnante@riseup.it<br/>
                Password: test123</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            
            {error && (
              <div className="p-2 text-red-600 bg-red-50 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded hover:from-purple-700 hover:to-pink-700 transition-colors"
            >
              Accedi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    console.log('Login effettuato:', userData);
    setUser(userData);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Rise Up Musical Academy</h1>
            <div className="flex items-center space-x-4">
              <span className="text-white">{user.name}</span>
              <button
                onClick={() => setUser(null)}
                className="text-white hover:text-pink-200 transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-4 py-3">
            <button
              onClick={() => setCurrentSection('home')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                currentSection === 'home' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'hover:bg-purple-50 text-purple-600 hover:text-purple-700'
              }`}
            >
              <Home size={20} />
              <span>Home</span>
            </button>
            <button
              onClick={() => setCurrentSection('profile')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                currentSection === 'profile' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'hover:bg-purple-50 text-purple-600 hover:text-purple-700'
              }`}
            >
              <User size={20} />
              <span>Profilo</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center text-2xl">
          Benvenuto/a, {user.name}!
        </div>
      </main>
    </div>
  );
};

export default App;