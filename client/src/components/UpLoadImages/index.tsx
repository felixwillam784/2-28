import { CloudUpload } from '@mui/icons-material';
import { Button, CircularProgress } from '@mui/material';
import {
  ref, getDownloadURL, uploadBytes,
} from 'firebase/storage';
import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SnackBarContext } from '../../contexts';
import storage from '../../firebase/firebaseConfig';
import { SnackBarContextTypeWithDispatch } from '../../interfaces';
import httpInstance from '../../services/axiosConfig';
import './style.css';

function UploadFiles({ carId }:{ carId:string | undefined }) {
  const [file, setFile] = useState<FileList | null>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setSnackBarProperties }:SnackBarContextTypeWithDispatch = useContext(SnackBarContext);

  const saveImages = async (urls: Array<string>) => {
    const images = urls.map((url) => ({ image: url, carId }));
    const result = await httpInstance
      .post(
        `/cars/images/${carId}`,
        { images },
      );
    return result;
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
      .then(() => {
        if (fileInput.current) {
          fileInput.current.value = null;
        }
        setFile(undefined);
        setLoading(false);
        navigate(`/car/${carId}`);
      })
      .catch(() => {
        setSnackBarProperties({ open: true, message: 'something went wrong!', type: 'error' });
      });
  };
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
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
    </>
  );
}

export default UploadFiles;
