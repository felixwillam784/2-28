import { Button } from '@mui/material';
import {
  ref, getDownloadURL, uploadBytes,
} from 'firebase/storage';
import { useRef, useState } from 'react';
import storage from '../../firebase/firebaseConfig';
import CustomizedSnackbars from '../snackbar';

function UploadFiles() {
  const [file, setFile] = useState<FileList | null>();
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
        const storageRef = ref(storage, `/Images/cars/carId/${file[i].name}`);
        const touploadFile = uploadBytes(storageRef, file[i]);
        toUploadfiles.push(touploadFile);
      }
      Promise.all(toUploadfiles)
        .then((snapshots) => {
          const getImages = snapshots.map(({ ref: snapshotRef }) => getDownloadURL(snapshotRef));
          return getImages;
        })
        .then((todownloadImages) => Promise.all(todownloadImages))
        .then(() => {
          setLoading(false);
          setFile(undefined);
          setSnackData({ type: 'success', message: 'Uploaded successfully' });
          setOpen(true);
          if (fileInput.current) {
            fileInput.current.value = null;
          }
        })
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
