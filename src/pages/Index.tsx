import { useState, useEffect } from 'react';
import LiveClock from '@/components/LiveClock';
import TemperatureHumidityChart from '@/components/TemperatureHumidityChart';
import AverageDisplay from '@/components/AverageDisplay';
import TemperatureToggle from '@/components/TemperatureToggle';

interface DataPoint {
  time: string;
  temperature: number;
  humidity: number;
}

const Index = () => {
  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>('C');
  const [data, setData] = useState<DataPoint[]>([]);

  // Mock data generation for demonstration
  useEffect(() => {
    const generateMockData = () => {
      const now = new Date();
      const mockData: DataPoint[] = [];
      
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 5 * 60 * 1000); // 5-minute intervals
        mockData.push({
          time: time.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          temperature: 20 + Math.sin(i * 0.2) * 8 + Math.random() * 4 - 2, // Temperature between 10-32°C
          humidity: 45 + Math.cos(i * 0.15) * 20 + Math.random() * 10 - 5, // Humidity between 20-75%
        });
      }
      
      setData(mockData);
    };

    generateMockData();
    
    // Update data every 5 minutes to simulate real-time updates
    const interval = setInterval(() => {
      generateMockData();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate averages
  const averageTemperature = data.length > 0 
    ? data.reduce((sum, point) => sum + point.temperature, 0) / data.length 
    : 0;
  
  const averageHumidity = data.length > 0 
    ? data.reduce((sum, point) => sum + point.humidity, 0) / data.length 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-dashboard p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground flex items-center space-x-3">
            <span>🌡️</span>
            <span>Real-time Temperature & Humidity Dashboard</span>
          </h1>
          <LiveClock />
        </div>

        {/* Temperature Unit Toggle */}
        <TemperatureToggle 
          temperatureUnit={temperatureUnit}
          onToggle={setTemperatureUnit}
        />

        {/* Chart */}
        <TemperatureHumidityChart 
          data={data}
          temperatureUnit={temperatureUnit}
        />

        {/* Average Display */}
        <AverageDisplay 
          averageTemperature={averageTemperature}
          averageHumidity={averageHumidity}
          temperatureUnit={temperatureUnit}
        />
      </div>
    </div>
  );
};

export default Index;
