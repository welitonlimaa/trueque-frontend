import { useEffect, useState } from 'react';
import states from '../data/states.json';
import { getCitiesByState } from '../utils/locations';
import SelectField from './ui/SelectField';

type Props = {
  state: string;
  city: string;
  onChange: (data: { state: string; city: string }) => void;
};

export default function StateCitySelect({ state, city, onChange }: Props) {
  const [cities, setCities] = useState<string[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadedState, setLoadedState] = useState<string | null>(null);

  useEffect(() => {
    setCities([]);
    setLoadedState(null);

    if (city) {
      onChange({ state, city: '' });
    }
  }, [state]);

  async function loadCities() {
    if (!state || loadedState === state) return;

    try {
      setLoadingCities(true);
      const data = await getCitiesByState(state);
      setCities(data);
      setLoadedState(state);
    } finally {
      setLoadingCities(false);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* ESTADO */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Estado</label>
        <SelectField
          value={state}
          onChange={(value) =>
            onChange({ state: value, city: '' })
          }
          options={states}
          placeholder="Selecione o estado"
        />
      </div>

      {/* CIDADE */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Cidade</label>
        <SelectField
          value={city}
          disabled={!state}
          onOpen={loadCities}
          onChange={(value) =>
            onChange({ state, city: value })
          }
          options={cities.map((c) => ({ code: c, name: c }))}
          placeholder={
            !state
              ? 'Selecione o estado...'
              : loadingCities
              ? 'Carregando cidades...'
              : 'Selecione a cidade'
          }
        />
      </div>
    </div>
  );
}
