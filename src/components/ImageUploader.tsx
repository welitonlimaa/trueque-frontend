import { useRef } from 'react';

type Props = {
  images: File[];
  onChange: (files: File[]) => void;
};

export default function ImageUploader({ images, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleSelectImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    onChange([...images, ...files]);
  }

  function removeImage(index: number) {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  }

  return (
    <div>
      {/* BOTÃO */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 w-full text-center hover:bg-gray-50"
      >
        📷 Adicionar imagens
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleSelectImages}
      />

      {/* PREVIEW */}
      {images.length > 0 && (
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {images.map((file, index) => (
            <div
              key={index}
              className="relative min-w-[120px] h-[120px] border rounded overflow-hidden"
            >
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-6 h-6 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}