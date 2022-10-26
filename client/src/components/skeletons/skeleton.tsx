import Skeleton from '@mui/material/Skeleton';

export default function CustomSkeleton() {
  return (
    <div
      style={{
        width: '40%',
        height: '24rem',
        marginBottom: '3rem',
      }}
    >

      <Skeleton variant="rectangular" width={210} height={118} />
      <Skeleton />
      <Skeleton width="60%" />
      <Skeleton variant="rectangular" width="80%" height={60} />
    </div>
  );
}
