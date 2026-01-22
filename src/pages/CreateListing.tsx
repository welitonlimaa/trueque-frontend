import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createListing, autofillListingWithAi } from '../api/listings';
import { ListingRequestDTO } from '../types/api';
import { imageToBase64 } from '../utils/imageToBase64';
import StateCitySelect from '../components/StateCitySelect';
import ImageUploader from '../components/ImageUploader';
import { uploadImages } from '../api/uploads';
import categories from '../data/categories.json';
import conditions from '../data/conditions.json';
import SelectField from '../components/SelectField';

export default function CreateListing() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);

  const [form, setForm] = useState<ListingRequestDTO>({
    title: '',
    description: '',
    category: '',
    condition: '',
    city: '',
    state: '',
    images: [],
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  }

  async function handleAutofillWithAi() {
    try {
      if (!imageFile) {
        setError('Selecione uma imagem para usar a IA');
        return;
      }

      setLoadingAi(true);
      setError('');

      const base64 = await imageToBase64(imageFile);
      const aiData = await autofillListingWithAi(base64);

      setForm((prev) => ({
        ...prev,
        title: aiData.title,
        description: aiData.description,
        category: aiData.category,
      }));
    } catch (err: any) {
      setError(err.message || 'Erro ao usar IA');
    } finally {
      setLoadingAi(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (images.length === 0) {
      setError('Adicione pelo menos uma imagem');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const imageUrls = await uploadImages(images);

      const payload = {
        ...form,
        images: imageUrls,
      };

      const listing = await createListing(payload);
      navigate(`/listings/${listing.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar anúncio');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-6">Criar novo anúncio</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-6 space-y-2">
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button
          type="button"
          onClick={handleAutofillWithAi}
          disabled={loadingAi}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {loadingAi ? 'Analisando imagem...' : 'Preencher com IA'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Descrição"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <SelectField
          value={form.category}
          onChange={(value) =>
            setForm((prev) => ({ ...prev, category: value }))
          }
          options={categories}
          placeholder="Selecione a categoria"
        />

        <SelectField
          value={form.condition}
          onChange={(value) =>
            setForm((prev) => ({ ...prev, condition: value }))
          }
          options={conditions}
          placeholder="Condição"
        />

        <StateCitySelect
          state={form.state}
          city={form.city}
          onChange={({ state, city }) =>
            setForm((prev) => ({ ...prev, state, city }))
          }
        />

        <ImageUploader
          images={images}
          onChange={setImages}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Criando...' : 'Criar anúncio'}
        </button>
      </form>
    </div>
  );
}
