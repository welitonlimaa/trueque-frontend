import { useRef } from 'react';
import Button from './ui/Button';

type Props = {
  loadingAi: boolean;
  onFileSelect: (file: File) => void;
  onAutofillWithAi: () => void;
  selectedFile: File | null;
};

export default function ImageUploadWithAI({
  loadingAi,
  onFileSelect,
  onAutofillWithAi,
  selectedFile,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 space-y-5 mb-4">
      {/* Upload */}
      <div
        onClick={() => inputRef.current?.click()}
        className="
          cursor-pointer
          flex flex-col
          items-center
          justify-center
          gap-2
          text-center
          p-6
          rounded-md
          bg-white
          hover:bg-gray-100
          transition
        "
      >
        <span className="text-sm text-gray-600">
          {selectedFile
            ? 'Imagem selecionada'
            : 'Clique para selecionar uma imagem'}
        </span>

        {selectedFile && (
          <span className="text-xs text-gray-500 truncate max-w-full">
            {selectedFile.name}
          </span>
        )}

        <span className="text-xs text-gray-400">
          JPG, PNG ou WEBP
        </span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelect(file);
        }}
      />

      {/* IA CTA */}
      <div className="flex flex-col items-center gap-2">
        <Button
          type="button"
          variant="ai"
          loading={loadingAi}
          onClick={onAutofillWithAi}
          className="w-full sm:w-auto"
        >
          Preencher com IA
        </Button>

        <p className="text-xs text-gray-500 text-center max-w-xs">
          A IA analisa a imagem e sugere título, categoria e descrição
        </p>
      </div>
    </div>
  );
}