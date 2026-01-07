import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createListing, autofillListingWithAi } from '../api/listings';
import { ListingRequestDTO } from '../types/api';
import { imageToBase64 } from '../utils/imageToBase64';

export default function CreateListing() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

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

  function handleImagesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      images: value.split(',').map((url) => url.trim()),
    }));
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
        condition: aiData.condition,
      }));
    } catch (err: any) {
      setError(err.message || 'Erro ao usar IA');
    } finally {
      setLoadingAi(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');

      const listing = await createListing(form);
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

      {/* IA */}
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

      {/* FORM */}
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

        <input
          name="category"
          placeholder="Categoria"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="condition"
          placeholder="Condição (Novo, Usado...)"
          value={form.condition}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="city"
            placeholder="Cidade"
            value={form.city}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="state"
            placeholder="Estado"
            value={form.state}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <input
          placeholder="URLs das imagens (separadas por vírgula)"
          onChange={handleImagesChange}
          className="w-full border p-2 rounded"
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
