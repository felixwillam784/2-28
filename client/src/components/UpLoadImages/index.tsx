import { Button } from '@mui/material';
import {
  ref, getDownloadURL, uploadBytes,
} from 'firebase/storage';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import storage from '../../firebase/firebaseConfig';
import httpInstance from '../../services';
import CustomizedSnackbars from '../snackbar';

function UploadFiles({ carId }:{ carId:string | undefined }) {
  console.log(Number(carId), 'car id');

  const [file, setFile] = useState<FileList | null>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [
    snackData,
    setSnackData,
  ] = useState<{ type: 'error' | 'success' | 'info', message: string }>({ type: 'info', message: '' });

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
    if (!file) {
      setSnackData({ type: 'info', message: 'You should choose an image befor upload' });
      setOpen(true);
    } else {
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
        .then((toDownloadUrls) => {
          Promise.all(toDownloadUrls)
            .then((urls) => {
              const rows: Array<object> = [];
              urls.map((url) => rows.push({ image: url, carId }));
              httpInstance.post('/cars/images', rows);
              console.log('rows', rows);
            }).then(() => httpInstance.put(`/cars/${carId}`, { state: 'on-market' }));
        })
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
    }
  };
  return (
    <div>
      <input ref={fileInput} multiple type="file" onChange={handleChange} accept="/image/*" />
      {loading
        ? (
          <>
            <Button disabled>Upload</Button>
            <p>Uploading ...</p>
          </>
        )
        : <Button onClick={handleUpload}>Upload</Button>}
      <CustomizedSnackbars
        open={open}
        handleClose={handleCloseSnack}
        message={snackData.message}
        type={snackData.type}
      />

    </div>
  );
}

export default UploadFiles;
