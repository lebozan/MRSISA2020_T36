import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel'
import ClinicEarnings from './ClinicEarnings';
import DailyReport from './DailyReport';
import WeeklyReport from './WeeklyReport';
import MonthlyReport from './MonthlyReport';

// Component for rendering all report types clinic admin can request
export default function Reports() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <h2>Clinic work reports</h2>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Daily appointments" />
          <Tab label="Weekly appointments" />
          <Tab label="Monthly appointments" />
          <Tab label="Clinic earnings" />
        </Tabs>
      </AppBar>

      <TabPanel children={<DailyReport />} value={value} index={0}/>
      <TabPanel children={<WeeklyReport />} value={value} index={1}/>
      <TabPanel children={<MonthlyReport />} value={value} index={2}/>
      <TabPanel children={<ClinicEarnings />} value={value} index={3}/>

    </div>
  )
}
