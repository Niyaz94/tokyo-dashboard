import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Grid2 as Grid, IconButton, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';

interface ImageUploadInputProps {
  label?: string;
  multiple?: boolean;
  initialImages?: string[]; // URLs for edit mode
  onChange: (files: File[]) => void;
}

const ImagePreview = styled('img')({
  width: 100,
  height: 100,
  objectFit: 'cover',
  borderRadius: 8,
  border: '1px solid #ddd',
});

const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  label = 'Upload Image',
  multiple = false,
  initialImages = [],
  onChange
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>(initialImages);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previews);
    setSelectedFiles(fileArray);
    onChange(fileArray);
  };

  // Remove one image
  const handleRemove = (index: number) => {
    const updatedPreviews = [...previewUrls];
    const updatedFiles = [...selectedFiles];
    updatedPreviews.splice(index, 1);
    updatedFiles.splice(index, 1);
    setPreviewUrls(updatedPreviews);
    setSelectedFiles(updatedFiles);
    onChange(updatedFiles);
  };

  // Reset previews when initialImages changes (edit case)
  useEffect(() => {
    if (initialImages.length && selectedFiles.length === 0) {
      setPreviewUrls(initialImages);
    }
  }, [initialImages]);

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>

      <Button
        variant="outlined"
        startIcon={<ImageIcon />}
        onClick={() => fileInputRef.current?.click()}
      >
        {multiple ? 'Upload Images' : 'Upload Image'}
      </Button>

      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        ref={fileInputRef}
        hidden
        onChange={handleFileChange}
      />

      <Grid container spacing={1} mt={1}>
        {previewUrls.map((url, index) => (
          <Grid  key={index}>
            <Box position="relative">
              <ImagePreview src={url} alt={`preview-${index}`} />
              <IconButton
                size="small"
                onClick={() => handleRemove(index)}
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: '#fff',
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageUploadInput;
