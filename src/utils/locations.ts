import axios from 'axios';

export async function getCitiesByState(stateCode: string): Promise<string[]> {
  const res = await axios.get(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateCode}/municipios`
  );

  return res.data.map((city: any) => city.nome);
}