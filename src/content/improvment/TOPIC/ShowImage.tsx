import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Button } from "@mui/material";
import { useParams } from 'react-router-dom';
import { useFetch, FetchData }  from "../../../utility/customHook";
import { useState,useEffect, use} from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';

interface TopicImageInterface {
    image: string;
    id: number;
}   
export default function MyImageGrid() {

    const navigate = useNavigate();

    const { id:edit_page_id }     = useParams();
    const { data:fetchEditData,success:editReturnSuccess}: FetchData<TopicImageInterface[]>  = useFetch <TopicImageInterface[]>(edit_page_id ?`notes/topic/images/${edit_page_id}`: null,{});

    const [images, setImages] = useState<{ image: string; id: number }[]>([]);

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

                onClick={() => navigate("/improvment/topic")}
                sx={{fontSize: '1rem',padding: '10px 20px',borderRadius: '8px',textTransform: 'none'}}
            >
                Return To The Main Page
            </Button>
            <ImageList 
            // cols={3} gap={8}
                sx={{ width: "100%", height: "auto" }}
                variant="quilted"
                cols={2}
                // rowHeight={121}
            >
            {images.map(({image,id}) => (
                <ImageListItem key={id}>
                <img
                    src={`http://127.0.0.1:8000/media/${image}`}
                    // alt={item.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                </ImageListItem>
            ))}
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
