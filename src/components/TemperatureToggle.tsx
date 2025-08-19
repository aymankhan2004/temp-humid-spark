import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface Props {
  temperatureUnit: 'C' | 'F';
  onToggle: (unit: 'C' | 'F') => void;
}

const TemperatureToggle = ({ temperatureUnit, onToggle }: Props) => {
  const handleToggle = (checked: boolean) => {
    onToggle(checked ? 'F' : 'C');
  };

  return (
    <div className="flex items-center space-x-3 bg-gradient-card rounded-lg p-4 shadow-card animate-slide-up">
      <Label htmlFor="temp-toggle" className="text-sm font-medium text-card-foreground">
        °C
      </Label>
      <Switch
        id="temp-toggle"
        checked={temperatureUnit === 'F'}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-temperature-hot data-[state=unchecked]:bg-temperature-cold"
      />
      <Label htmlFor="temp-toggle" className="text-sm font-medium text-card-foreground">
        °F
      </Label>
      <div className="ml-4 text-sm text-muted-foreground">
        Current: <span className="font-semibold text-primary">°{temperatureUnit}</span>
      </div>
    </div>
  );
};

export default TemperatureToggle;