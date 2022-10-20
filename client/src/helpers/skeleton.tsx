import Skeleton from '@mui/material/Skeleton';

export default function CustomSkeleton() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: '12rem',
        justifyContent: 'space-between',
        width: '55vw',
        marginBottom: '2rem',
      }}
    >

      <Skeleton variant="circular" width={150} height={150} />
      <div>
        <Skeleton variant="text" width={510} height={60} />
        <Skeleton variant="rounded" width={510} height={60} />
      </div>
    </div>
  );
}
