import { Thermometer, Droplets } from 'lucide-react';

interface Props {
  averageTemperature: number;
  averageHumidity: number;
  temperatureUnit: 'C' | 'F';
}

const AverageDisplay = ({ averageTemperature, averageHumidity, temperatureUnit }: Props) => {
  const convertTemperature = (temp: number) => {
    return temperatureUnit === 'F' ? (temp * 9/5) + 32 : temp;
  };

  const displayTemp = convertTemperature(averageTemperature);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
      {/* Average Temperature */}
      <div className="bg-gradient-temperature rounded-xl p-6 shadow-glow-temp hover:shadow-glow-temp transition-all duration-300 hover:scale-105">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
            <Thermometer className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Average Temperature</h3>
            <p className="text-3xl font-bold text-white">
              {displayTemp.toFixed(1)}°{temperatureUnit}
            </p>
          </div>
        </div>
      </div>

      {/* Average Humidity */}
      <div className="bg-gradient-humidity rounded-xl p-6 shadow-glow-humidity hover:shadow-glow-humidity transition-all duration-300 hover:scale-105">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
            <Droplets className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Average Humidity</h3>
            <p className="text-3xl font-bold text-white">
              {averageHumidity.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AverageDisplay;