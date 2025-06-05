import React from 'react';
import { Button } from './ui/button';
import { Camera } from 'lucide-react';

interface CameraCaptureProps {
  onMealCaptured: (meal: { name: string; calories: number; imageUrl?: string; notes?: string; timestamp: Date }) => void;
  onClose: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onMealCaptured, onClose }) => {
  // Placeholder for camera functionality
  const handleCapture = () => {
    // Simulate capturing a meal
    const simulatedMeal = {
      name: 'Captured Meal (Placeholder)',
      calories: Math.floor(Math.random() * 800) + 200, // Random calories between 200 and 1000
      imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e9dc99aa28?fit=crop&w=100&q=80', // Placeholder image
      notes: 'Simulated capture',
      timestamp: new Date(),
    };
    onMealCaptured(simulatedMeal);
    onClose(); // Close camera view after capture
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 space-y-6">
      <Camera size={64} className="text-green-500" />
      <p className="text-xl font-semibold text-gray-700">Camera View (Placeholder)</p>
      <p className="text-gray-500 text-center">Imagine your camera feed is here. Tap the button to simulate capturing a meal.</p>
      <Button onClick={handleCapture} className="bg-green-500 hover:bg-green-600 text-white shadow-lg">
        Simulate Snap & Log Meal
      </Button>
      <Button variant="outline" onClick={onClose} className="text-gray-600 border-gray-300">
        Cancel
      </Button>
    </div>
  );
};

export default CameraCapture;