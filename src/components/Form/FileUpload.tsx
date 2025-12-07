import React, { use, useEffect, useRef, useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import { styled } from '@mui/material/styles';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';


interface ImageUploadInputProps {
  name: string;
  label?: string;
  multiple?: boolean;
  initialImages?: string[]; // URLs for edit mode
  onChange: (files:File[], filesUrl:string[]) => void;
}

const ImagePreview = styled('img')({
  width: 200,
  height: 200,
  objectFit: 'cover',
  borderRadius: 8,
  border: '1px solid #ddd',
});

const ImageUploadInput: React.FC<ImageUploadInputProps> = ({name,label = 'Upload Image',multiple = false,initialImages = [],onChange
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>(initialImages);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const files = event.target.files;
    if (!files) 
      return;

    const fileArray = Array.from(files);
    const previews = fileArray.map((file) => URL.createObjectURL(file));

    setPreviewUrls(prev => multiple ? [...prev, ...previews] : previews);
    setSelectedFiles(prev => multiple ? [...prev, ...fileArray] : fileArray);

  };

  useEffect(() => {
    onChange(selectedFiles,previewUrls);
  }, [selectedFiles.length, previewUrls.length]);

  // Remove one image
  const handleRemove = (index: number) => {
    const updatedPreviews = [...previewUrls];
    const updatedFiles = [...selectedFiles];


    const count_old_images = updatedPreviews.filter(url => !url.startsWith("blob")).length || 0;
    if(index >= count_old_images)
      updatedFiles.splice(index-count_old_images, 1);

    updatedPreviews.splice(index, 1);


    setPreviewUrls(updatedPreviews);
    setSelectedFiles(updatedFiles);


    // onChange(updatedFiles,updatedPreviews);
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
      <Button variant="outlined" startIcon={<ImageIcon />} onClick={() => fileInputRef.current?.click()}>
        {multiple ? 'Upload Images' : 'Upload Image'}
      </Button>

      <input
        type="file" accept="image/*" multiple={multiple} ref={fileInputRef} hidden onChange={handleFileChange}
      />

      <Grid container spacing={1} mt={1}>
        {previewUrls.map((url, index) => (
          <Grid  key={index}>
            <Box position="relative">
              <ImagePreview src={`${url.startsWith("blob") ?"": "http://127.0.0.1:8000/media/"}${url}`} alt={`preview-${index}`} />
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
