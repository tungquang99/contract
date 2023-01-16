import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import React from 'react';
import { Tabs } from '@mui/material';
import Code from './code';
import ReadContract from './ReadContract';
import WriteContract from './WriteContract';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabContract = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="CODE" {...a11yProps(0)} />
            <Tab label="READ CONTRACT" {...a11yProps(1)} />
            <Tab label=" WRITE CONTRACT" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Code />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ReadContract type="view" />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <WriteContract type="nonpayable" />
        </TabPanel>
      </Box>
    );
};


export default TabContract;