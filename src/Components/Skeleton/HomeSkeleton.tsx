import { Box, Skeleton } from "@mui/material";

export const HomeSkeleton = () => {
  const skeletonStyle = {
    background : {

      navbar: "rgb(30 41 59)",
      modal: "#1e293b",
    }
  };

  return (
    <>
      <Skeleton
        variant="rectangular"
        height={80}
        sx={{
          bgcolor: skeletonStyle.background.navbar,
        }}
      />

      <div className="flex justify-center">
        <Skeleton
          sx={{
            bgcolor: skeletonStyle.background.navbar,
          }}
          style={{
            marginTop: 30,
          }}
          width="15%"
        />
      </div>

      <div className="flex justify-center items-center min-h-screen">
        <Box
          sx={{
            bgcolor: skeletonStyle.background.modal,
            borderRadius: "16px",
          }}
          height={500}
          width={500}
        >

          <div className="flex gap-2 mt-7 ml-4">
            <Skeleton variant="circular" height={50} width={50} />
            <Skeleton sx={{fontSize: '0.5rem'}} width={90} />
          </div>

            <Skeleton sx={
              {marginTop: 3,
                marginLeft: 3
              }
            } width={150} />

                        <Skeleton sx={
              {marginTop: 3,
                marginLeft: 3
              }
            } width={300} />

            <Skeleton
            variant="rectangular"
            sx={{
              marginTop: 5,
              mx: 'auto'
            }}

            width='90%'
            height={250}
            />
        </Box>
      </div>
    </>
  );
};
