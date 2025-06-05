import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SettingsProps {
  dailyGoal: number;
  onGoalChange: (goal: number) => void;
}

const SettingsPage: React.FC<SettingsProps> = ({ dailyGoal, onGoalChange }) => {
  const [newGoal, setNewGoal] = useState(dailyGoal);

  const handleSave = () => {
    if (newGoal > 0) {
      onGoalChange(newGoal);
      alert('Daily goal updated!'); // Use a more sophisticated notification later
    } else {
      alert('Please enter a valid goal.');
    }
  };

  return (
    <div className="space-y-6 py-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Settings</h2>

      <Card className="bg-white shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">Daily Calorie Goal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dailyGoal">Set Your Daily Goal (kcal)</Label>
            <Input
              id="dailyGoal"
              type="number"
              value={newGoal}
              onChange={(e) => setNewGoal(parseInt(e.target.value) || 0)}
              placeholder="e.g., 2000"
            />
          </div>
          <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white shadow-lg">
            Save Goal
          </Button>
        </CardContent>
      </Card>

      {/* Add other settings here later */}
    </div>
  );
};

export default SettingsPage;