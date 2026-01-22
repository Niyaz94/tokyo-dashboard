import React, { use, useEffect, useRef, useState } from 'react';
import { Grid, Box, Button, IconButton, Typography } from '@mui/material';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import SlideshowIcon from '@mui/icons-material/Slideshow';

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

interface PreviewItem {
  url: string;
  type: string;
}

const getFileIcon = (type: string) => {
  if (type.includes('pdf')) return <PictureAsPdfIcon fontSize="large" />;
  if (type.includes('word')) return <DescriptionIcon fontSize="large" />;
  if (type.includes('presentation')) return <SlideshowIcon fontSize="large" />;
  return <DescriptionIcon fontSize="large" />;
};

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

  const [previews, setPreviews] = useState<PreviewItem[]>(
    initialImages.map(url => ({
      url,
      type: url.split('/').pop().split('.').pop(),
      name:url.split('/').pop()
    }))
  );

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const files = event.target.files;
    if (!files) 
      return;

    const fileArray = Array.from(files);

  
    const previews = fileArray.map((file) => ({url:URL.createObjectURL(file),type:file.type,name: file.name}));

    setPreviewUrls(prev => multiple ? [...prev, ...previews.map(({url})=>url)] : previews.map(({url})=>url));
    setPreviews(prev => (multiple ? [...prev, ...previews] : previews));

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
        {multiple ? 'Upload Files' : 'Upload File'}
      </Button>

      <input
        type="file" 
        accept="image/*,.pdf,.doc,.docx,.ppt,.pptx"
        multiple={multiple} ref={fileInputRef} hidden onChange={handleFileChange}
      />

      <Grid container spacing={1} mt={1}>
      {previewUrls.map((url, index) => {
        
        const file_name= url.split("/").pop()
        const file_format= url.split(".").pop()
        let is_new_image = false
        for (const item of previews) {
           if(file_name==item.url.split("/").pop() && item.type.startsWith('image/')){
            is_new_image = true
            break
          }
        }

        return (
          <Grid key={index}>
            <Box position="relative" width={200}>
              {["jpg","jpeg","png","webp","svg"].includes(file_format) || is_new_image? (
                <ImagePreview
                  src={`${url.startsWith('blob') ? '' : 'http://127.0.0.1:8000/media/'}${url}`}
                  alt={file_name}
                />
              ) : (
                <Box height={200} display="flex" flexDirection="column" alignItems="center" justifyContent="center" border="1px solid #ddd" borderRadius={2}>
                  {getFileIcon(file_format)}
                  <Typography variant="caption" mt={1} noWrap>
                    {file_name.length>15?`...${file_name.slice(-15)}`:file_name}
                  </Typography>
                </Box>
              )}
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
        )
      })}
      </Grid>
    </Box>


  );
};

export default ImageUploadInput;
