import authClient from './authClient';

export async function uploadImages(files: File[]): Promise<string[]> {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await authClient.post<string[]>(
    '/api/uploads/images',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
}