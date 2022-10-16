import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Box, Typography } from '@mui/material';

import { ThemeProvider } from '@emotion/react';
import useStyles, { theme } from './heroStyles';

function HeroSection() {
  const classes = useStyles();
  return (

    <section className={classes.heroSection}>
      <Box
        className={classes.heroImage}
        component="img"
        alt=""
        // src="../../assets/banner.jpg"
        src="https://carswitch.com/components/choose-country/images/banner.jpg"
      />
      <CssBaseline />
      <Container className={classes.container}>
        <section className={classes.briefStatement}>
          <ThemeProvider theme={theme}>
            <Typography
              variant="h4"
              gutterBottom
            >
              The better way
            </Typography>

            <Typography
              variant="subtitle1"
              gutterBottom
            >
              to buy or sell a used car
            </Typography>

            <Typography
              variant="subtitle2"
              gutterBottom
            >
              Great Value | Trusted Quality | All Online
            </Typography>
          </ThemeProvider>
        </section>
      </Container>
    </section>
  );
}

export default HeroSection;
