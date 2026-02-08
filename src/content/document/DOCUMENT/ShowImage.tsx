import ImageList from '@mui/material/ImageList';
import { useParams } from 'react-router-dom';
import { useFetch, FetchData }  from "../../../utility/customHook";
import { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import { Grid, Box, Button, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import GetAppIcon from '@mui/icons-material/GetApp';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import {axiosGetData} from '../../../utility/Axios'

import { useSelector}          from 'react-redux'
import { RootState }                from '../../../store/Reducer';

interface DocumentImageInterface {
    file: string;
    id: number;
}   
const getFileIcon = (type: string) => {
  if (type.includes('pdf')) return <PictureAsPdfIcon fontSize="large" />;
  if (type.includes('word')) return <DescriptionIcon fontSize="large" />;
  if (type.includes('presentation')) return <SlideshowIcon fontSize="large" />;
  return <DescriptionIcon fontSize="large" />;
};
const ImagePreview = styled('img')({
  width: "100%",
  height: 'auto',
  objectFit: 'cover',
  borderRadius: 8,
  border: '1px solid #ddd',
});
export default function MyImageGrid() {

    const loginDetail = useSelector((state: RootState) =>state.auth);


    const downloadFile=(id)=>{
        // fetch(`http://127.0.0.1:8000/document/document/${id}/download/`)
        window.location.href =`http://127.0.0.1:8000/document/document/${id}/download/`;
        // axiosGetData(`document/document/${id}/download/`,loginDetail.token)
    }

    const navigate = useNavigate();

    const { id:edit_page_id }     = useParams();
    const { data:fetchEditData,success:editReturnSuccess}: FetchData<DocumentImageInterface[]>  = useFetch <DocumentImageInterface[]>(edit_page_id ?`document/document/images/${edit_page_id}`: null,{});

    const [images, setImages] = useState<DocumentImageInterface[]>([]);

    useEffect(() => {
        if (editReturnSuccess) {
            setImages(fetchEditData?.["data"] || []);
        }
    }, [editReturnSuccess, fetchEditData]);
    return (
        <Paper sx={{ padding: 2 }}>
            <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/documents/document")}
                sx={{fontSize: '1rem',padding: '10px 20px',borderRadius: '8px',textTransform: 'none'}}
            >
                Return To The Main Page
            </Button>
            <ImageList  gap={8} sx={{ width: "100%", height: "auto" }} variant="quilted" cols={2}>
                {images.map(({file,id}) => {


                    const file_name= file.split("/").pop()
                    const file_format= file.split(".").pop()
                    return (
                    <Grid key={id}>
                        <Box position="relative" >
                        {["jpg","jpeg","png"].includes(file_format) ? (
                            <ImagePreview
                            src={`http://127.0.0.1:8000/media/${file}`}
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
                            size="large"
                            onClick={() => downloadFile(id)}
                            sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            // backgroundColor: '#fff',
                            }}
                        >
                            <GetAppIcon fontSize="large" />
                        </IconButton>
                        </Box>
                    </Grid>
                )
                })}
            </ImageList>
            
        </Paper>


        // <Box sx={{ display: 'grid',gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',gap: 2,}}>
        //     {images.map(({image,id}) => (
        //         <Box
        //         key={id}
        //         component="img"
        //         // src={src}
        //         src={`http://127.0.0.1:8000/media/${image}`}
        //         alt=""
        //         sx={{
        //             width: '100%',
        //             // height: 150,
        //             borderRadius: 2,
        //             objectFit: 'cover',
        //         }}
        //         />
        //     ))}
        // </Box>
    );
}
