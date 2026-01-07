export async function imageToBase64(file?: File): Promise<string> {
  if (!file) {
    throw new Error('Nenhuma imagem selecionada');
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('O arquivo precisa ser uma imagem');
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error('A imagem deve ter no máximo 5MB');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Erro ao ler imagem'));

    reader.readAsDataURL(file);
  });
}

