import { CloudUpload } from '@mui/icons-material';
import { Button, CircularProgress } from '@mui/material';
import {
  ref, getDownloadURL, uploadBytes,
} from 'firebase/storage';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import storage from '../../firebase/firebaseConfig';
import httpInstance from '../../services/axiosConfig';
import CustomizedSnackbars from '../snackbar';
import './style.css';

function UploadFiles({ carId }:{ carId:string | undefined }) {
  const [file, setFile] = useState<FileList | null>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [
    snackData,
    setSnackData,
  ] = useState<{ type: 'error' | 'success' | 'info', message: string }>({ type: 'info', message: '' });

  const saveImages = async (urls: Array<string>) => {
    const images:Array<object> = [];
    await urls.map((url) => images.push({ image: url, carId }));
    const result = await httpInstance
      .post(
        '/cars/images',
        { images },
      );
    return result;
  };

  const handleCloseSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fileInput = useRef<any>(null);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setFile(fileList);
  };
  const handleUpload = () => {
    if (!file) return;

    setLoading(true);
    const toUploadfiles = [];
    for (let i = 0; i < file.length; i += 1) {
      const storageRef = ref(storage, `/Cars' Images/${carId}/${file[i].name}`);
      const toUploadFile = uploadBytes(storageRef, file[i]);
      toUploadfiles.push(toUploadFile);
    }
    Promise.all(toUploadfiles)
      .then((snapshots) => {
        const getImagesUrls = snapshots.map(({ ref: snapshotRef }) => getDownloadURL(snapshotRef));
        return getImagesUrls;
      })
      .then((toDownloadUrls) => Promise.all(toDownloadUrls))
      .then((urls) => {
        saveImages(urls);
      })
      .then(() => httpInstance.put(`/cars/${carId}`, { state: 'on-market' }))
      .then(() => {
        if (fileInput.current) {
          fileInput.current.value = null;
        }
        setFile(undefined);
        setLoading(false);
        setSnackData({ type: 'success', message: 'Uploaded successfully' });
        setOpen(true);
      })
      .then(() => navigate('/admin'))
      .catch(() => {
        setSnackData({ type: 'error', message: 'Somthing went wrong' });
        setOpen(true);
      });
  };
  return (
    <>
      {file ? (
        <div className="contaner">
          <div className="uploading-step">
            <label htmlFor="file" className="custom-file-upload">
              <input multiple ref={fileInput} type="file" onChange={handleChange} id="file" accept="/image/*" />
              <CloudUpload sx={{ mr: '0.3rem' }} />
              Open files
            </label>
            {`${file.length} images`}
          </div>
          {' '}
          <Button
            disabled={!(file.length > 0) || loading}
            className="upload-btn"
            variant={!(file.length > 0) ? undefined : 'contained'}
            type="submit"
            onClick={handleUpload}
            color={loading ? undefined : 'success'}
          >
            {loading ? (
              <>
                Uploading
                <CircularProgress disableShrink />
              </>
            ) : 'save'}
          </Button>
        </div>

      ) : (
        <div className="contaner">
          <div className="uploading-step">
            <label htmlFor="file" className="custom-file-upload">
              <input multiple ref={fileInput} type="file" onChange={handleChange} id="file" accept="/image/*" />
              <CloudUpload sx={{ mr: '0.3rem' }} />
              Open files
            </label>
            No images
          </div>
          <Button
            className="upload-btn"
            disabled
          >
            Save
          </Button>
        </div>
      )}

      <CustomizedSnackbars
        open={open}
        handleClose={handleCloseSnack}
        message={snackData.message}
        type={snackData.type}
      />
    </>
  );
}

export default UploadFiles;
