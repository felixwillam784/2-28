import { Alert, Button, Snackbar } from '@mui/material';
import {
  ref, getDownloadURL, uploadBytes,
} from 'firebase/storage';
import { useRef, useState } from 'react';
import storage from '../../firebase/firebaseConfig';

function UploadFiles() {
  const [file, setFile] = useState<FileList | never>();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [errSnack, setErrSnack] = useState(false);
  const [sucsSnack, setSucsSnack] = useState(false);

  const handleCloseSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(false);
  };
  const handleCloseErrSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrSnack(false);
  };
  const handleCloseSucsSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSucsSnack(false);
  };

  const fileInput = useRef<any>(null);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const fileList = e.target.files;
    if (!fileList) return;
    const list: Array<File> = [];
    for (let i = 0; i < fileList.length; i += 1) {
      list.push(fileList[i]);
    }
    setFile(list);
  };
  const handleUpload = () => {
    if (!file) {
      setSnackbar(true);
    } else {
      setLoading(true);
      const toUploadfiles = [];
      for (let i = 0; i < file.length; i += 1) {
        const storageRef = ref(storage, `/Images/cars/carId/${file[i].name}`);
        const touploadFile = uploadBytes(storageRef, file[i]);
        toUploadfiles.push(touploadFile);
      }
      Promise.all(toUploadfiles)
        .then((d) => {
          const getImages = d.map(({ ref: snapshotRef }) => getDownloadURL(snapshotRef));
          return getImages;
        })
        .then((t) => Promise.all(t))
        .then(() => {
          setLoading(false);
          setSucsSnack(true);
          setFile(undefined);
          if (fileInput.current) {
            fileInput.current.value = null;
          }
        })
        .catch(() => {
          setErrSnack(true);
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
      <Snackbar open={snackbar} autoHideDuration={4000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="info" sx={{ width: '100%' }}>
          You should choose an image befor upload
        </Alert>
      </Snackbar>
      <Snackbar open={errSnack} autoHideDuration={4000} onClose={handleCloseErrSnack}>
        <Alert onClose={handleCloseErrSnack} severity="error" sx={{ width: '100%' }}>
          somthing went wrong
        </Alert>
      </Snackbar>
      <Snackbar open={sucsSnack} autoHideDuration={4000} onClose={handleCloseSucsSnack}>
        <Alert onClose={handleCloseSucsSnack} severity="success" sx={{ width: '100%' }}>
          Uploaded successfully
        </Alert>
      </Snackbar>

    </div>
  );
}

export default UploadFiles;
