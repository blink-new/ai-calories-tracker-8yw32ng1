import { useState, useEffect } from 'react';
import { Camera, Home, BarChart3, Settings } from 'lucide-react';
import { Button } from './components/ui/button';
import Dashboard from './components/Dashboard';
import CameraCapture from './components/CameraCapture';
import Analytics from './components/Analytics';
import SettingsPage from './components/Settings';

type Tab = 'dashboard' | 'camera' | 'analytics' | 'settings';

interface Meal {
  id: string;
  name: string;
  calories: number;
  imageUrl?: string;
  notes?: string;
  timestamp: Date;
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [meals, setMeals] = useState<Meal[]>([]);
  const [dailyGoal, setDailyGoal] = useState(2000);

  // Load data from localStorage on app start
  useEffect(() => {
    const savedMeals = localStorage.getItem('ai-calories-meals');
    const savedGoal = localStorage.getItem('ai-calories-goal');
    
    if (savedMeals) {
      try {
        const parsedMeals: Meal[] = JSON.parse(savedMeals).map((meal: Meal) => ({
          ...meal,
          timestamp: new Date(meal.timestamp)
        }));
        setMeals(parsedMeals);
      } catch (error) {
        console.error('Error loading meals:', error);
      }
    }
    
    if (savedGoal) {
      setDailyGoal(parseInt(savedGoal));
    }
  }, []);

  // Save meals to localStorage whenever meals change
  useEffect(() => {
    localStorage.setItem('ai-calories-meals', JSON.stringify(meals));
  }, [meals]);

  // Save goal to localStorage whenever goal changes
  useEffect(() => {
    localStorage.setItem('ai-calories-goal', dailyGoal.toString());
  }, [dailyGoal]);

  const addMeal = (meal: Omit<Meal, 'id'>) => {
    const newMeal: Meal = {
      ...meal,
      id: Date.now().toString()
    };
    setMeals(prev => [newMeal, ...prev]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard meals={meals} dailyGoal={dailyGoal} onAddMeal={addMeal} />;
      case 'camera':
        return <CameraCapture onMealCaptured={addMeal} onClose={() => setActiveTab('dashboard')} />;
      case 'analytics':
        return <Analytics meals={meals} dailyGoal={dailyGoal} />;
      case 'settings':
        return <SettingsPage dailyGoal={dailyGoal} onGoalChange={setDailyGoal} />;
      default:
        return <Dashboard meals={meals} dailyGoal={dailyGoal} onAddMeal={addMeal} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">CalorieTracker</h1>
            </div>
            {activeTab === 'dashboard' && (
              <Button
                onClick={() => setActiveTab('camera')}
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white shadow-lg"
              >
                <Camera className="w-4 h-4 mr-2" />
                Snap
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 pb-20">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-green-100">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex items-center justify-around">
            <Button
              variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('dashboard')}
              className={`flex flex-col items-center py-3 px-6 h-auto ${activeTab === 'dashboard' ? 'bg-green-500 text-white' : 'text-gray-600 hover:text-green-600'}`}
            >
              <Home className="w-5 h-5 mb-1" />
              <span className="text-xs">Home</span>
            </Button>
            
            <Button
              variant={activeTab === 'camera' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('camera')}
              className={`flex flex-col items-center py-3 px-6 h-auto ${activeTab === 'camera' ? 'bg-green-500 text-white' : 'text-gray-600 hover:text-green-600'}`}
            >
              <Camera className="w-5 h-5 mb-1" />
              <span className="text-xs">Camera</span>
            </Button>
            
            <Button
              variant={activeTab === 'analytics' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('analytics')}
              className={`flex flex-col items-center py-3 px-6 h-auto ${activeTab === 'analytics' ? 'bg-green-500 text-white' : 'text-gray-600 hover:text-green-600'}`}
            >
              <BarChart3 className="w-5 h-5 mb-1" />
              <span className="text-xs">Stats</span>
            </Button>
            
            <Button
              variant={activeTab === 'settings' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('settings')}
              className={`flex flex-col items-center py-3 px-6 h-auto ${activeTab === 'settings' ? 'bg-green-500 text-white' : 'text-gray-600 hover:text-green-600'}`}
            >
              <Settings className="w-5 h-5 mb-1" />
              <span className="text-xs">Settings</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;