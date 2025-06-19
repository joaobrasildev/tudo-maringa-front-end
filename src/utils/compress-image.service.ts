import imageCompression from 'browser-image-compression';

type ResizeOptions = {
  maxSizeMB: number;
  maxWidthOrHeight: number;
};

export async function compressImage(file: File, options: ResizeOptions): Promise<File> {
  try {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: options.maxSizeMB,
      maxWidthOrHeight: options.maxWidthOrHeight,
      useWebWorker: true,
    });

    return compressedFile;
  } catch (error) {
    console.error('Erro ao comprimir imagem:', error);
    throw error;
  }
}