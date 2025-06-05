import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Camera } from 'lucide-react';

interface Meal {
  id: string;
  name: string;
  calories: number;
  imageUrl?: string;
  notes?: string;
  timestamp: Date;
}

interface DashboardProps {
  meals: Meal[];
  dailyGoal: number;
  onAddMeal: (meal: Omit<Meal, 'id'>) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ meals, dailyGoal, onAddMeal }) => {
  const totalCaloriesToday = meals
    .filter(meal => {
      const today = new Date();
      return meal.timestamp.getDate() === today.getDate() &&
             meal.timestamp.getMonth() === today.getMonth() &&
             meal.timestamp.getFullYear() === today.getFullYear();
    })
    .reduce((sum, meal) => sum + meal.calories, 0);

  const progressValue = (totalCaloriesToday / dailyGoal) * 100;

  return (
    <div className="space-y-6 py-6">
      {/* Daily Goal Progress Card */}
      <Card className="bg-white shadow-lg rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Daily Calories Intake</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => onAddMeal({ name: 'Sample Meal', calories: 500, timestamp: new Date() })}>
            <Camera className="w-4 h-4 mr-2" /> Add Meal (Placeholder)
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-gray-900">{totalCaloriesToday} / {dailyGoal} kcal</div>
          <Progress value={progressValue} className="mt-4 h-2 bg-green-100 [&>*]:bg-green-500" />
          <p className="text-xs text-gray-500 mt-2">{dailyGoal - totalCaloriesToday} kcal remaining</p>
        </CardContent>
      </Card>

      {/* Recent Meals Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Meals</h2>
        <div className="space-y-4">
          {meals.length === 0 ? (
            <p className="text-gray-500 text-center">No meals logged yet. Snap a meal to get started!</p>
          ) : (
            meals.map(meal => (
              <Card key={meal.id} className="bg-white shadow-md rounded-lg">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{meal.name}</p>
                    <p className="text-sm text-gray-500">{meal.calories} kcal</p>
                    {meal.notes && <p className="text-sm text-gray-600 mt-1">Notes: {meal.notes}</p>}
                  </div>
                  {meal.imageUrl && (
                    <img src={meal.imageUrl} alt={meal.name} className="w-16 h-16 object-cover rounded-md ml-4" />
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;