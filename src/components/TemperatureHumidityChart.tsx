import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DataPoint {
  time: string;
  temperature: number;
  humidity: number;
}

interface Props {
  data: DataPoint[];
  temperatureUnit: 'C' | 'F';
}

const TemperatureHumidityChart = ({ data, temperatureUnit }: Props) => {
  const convertTemperature = (temp: number) => {
    return temperatureUnit === 'F' ? (temp * 9/5) + 32 : temp;
  };

  const chartData = data.map(point => ({
    ...point,
    temperature: convertTemperature(point.temperature)
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-card">
          <p className="text-sm font-medium text-card-foreground">{`Time: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'temperature' 
                ? `Temperature: ${entry.value.toFixed(1)}°${temperatureUnit}`
                : `Humidity: ${entry.value.toFixed(1)}%`
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80 bg-gradient-card rounded-xl p-6 shadow-card animate-slide-up">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="temperature" 
            stroke="hsl(var(--temperature-hot))"
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--temperature-hot))', r: 4 }}
            activeDot={{ r: 6, stroke: 'hsl(var(--temperature-hot))', strokeWidth: 2 }}
            name={`Temperature (°${temperatureUnit})`}
          />
          <Line 
            type="monotone" 
            dataKey="humidity" 
            stroke="hsl(var(--humidity-high))"
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--humidity-high))', r: 4 }}
            activeDot={{ r: 6, stroke: 'hsl(var(--humidity-high))', strokeWidth: 2 }}
            name="Humidity (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureHumidityChart;