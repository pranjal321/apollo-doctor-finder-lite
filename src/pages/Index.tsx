
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: Auto-redirect to doctors page after a short delay
    // const timeout = setTimeout(() => navigate('/doctors'), 3000);
    // return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-4xl font-bold mb-4 text-docfinder-blue">Welcome to DocFinder</h1>
        <p className="text-xl text-gray-600 mb-8">
          Your platform to find and consult with top doctors online. Get professional medical advice from the comfort of your home.
        </p>
        <Button 
          onClick={() => navigate('/doctors')}
          className="bg-docfinder-blue hover:bg-docfinder-darkblue text-white px-8 py-6 rounded-lg text-lg"
        >
          Find Doctors Now
        </Button>
      </div>
    </div>
  );
};

export default Index;
