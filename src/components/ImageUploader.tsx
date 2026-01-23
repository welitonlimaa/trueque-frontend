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
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      {/* DROP / SELECT */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="
          w-full rounded-lg border-2 border-dashed border-gray-300
          bg-white px-4 py-6 text-center
          text-sm text-gray-600
          hover:border-blue-500 hover:bg-blue-50
          transition
        "
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl">📷</span>
          <span className="font-medium">
            Adicionar imagens
          </span>
          <span className="text-xs text-gray-500">
            JPG, PNG • até 5MB
          </span>
        </div>
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
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((file, index) => (
            <div
              key={index}
              className="
                relative h-28 w-28 flex-shrink-0
                overflow-hidden rounded-lg border bg-gray-100
              "
            >
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="
                  absolute right-1 top-1
                  rounded-full bg-black/70
                  px-1.5 py-0.5
                  text-xs text-white
                  hover:bg-red-600
                "
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