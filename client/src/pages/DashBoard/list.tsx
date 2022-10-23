/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100vh',
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1, borderColor: 'divider', width: '13%', marginTop: '0px',
        }}
      >
        <Tab sx={{ fontSize: '24px' }} label="New requests" {...a11yProps(0)} />
        <Tab sx={{ fontSize: '24px' }} label="To check" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        New requests
      </TabPanel>
      <TabPanel value={value} index={1}>
        To check
      </TabPanel>
    </Box>
  );
}

// /* eslint-disable react/jsx-props-no-spreading */
// import * as React from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import './styles.css';

// interface TabPanelProps {
//   children: React.ReactNode;
//   index: number;
//   value: number;
// }

// function TabPanel(props: TabPanelProps) {
//   const {
//     children, value, index, ...other
//   } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       // eslint-disable-next-line react/jsx-props-no-spreading
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// function a11yProps(index: number) {
//   return {
//     id: `vertical-tab-${index}`,
//     'aria-controls': `vertical-tabpanel-${index}`,
//   };
// }

// export default function VerticalTabs() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//   };

//   return (
//     <Box
//       className="box1"
//       sx={{
//         flexGrow: 1, bgcolor: 'background.paper', display: 'flex', color: '#000',
//       }}
//     >
//       <Tabs
//         orientation="vertical"
// style={{
//   width: '13%',
// }}
//         variant="scrollable"
//         value={value}
//         onChange={handleChange}
//         aria-label="Vertical tabs example"
//         sx={{ borderRight: 1, borderColor: 'divider' }}
//       >
//         <Tab
//           className="Tab"
//           label="Item One"
//           {...a11yProps(0)}
//           style={{
//             marginTop: '50px',
//             fontSize: '30px',
//             color: '#000',
//           }}
//         />
//         <Tab
//           style={{
//             color: '#000',
//             fontSize: '30px',
//           }}
//           className="Tab1"
//           label="Item Two"
//           {...a11yProps(1)}
//         />
//       </Tabs>
//       <TabPanel value={value} index={0}>
//         Item One
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         Item Two
//       </TabPanel>
//     </Box>
//   );
// }
