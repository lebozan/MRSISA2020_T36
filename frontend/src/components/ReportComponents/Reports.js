import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel'
import ClinicEarnings from './ClinicEarnings';
import DailyReport from './DailyReport';
import WeeklyReport from './WeeklyReport';
import MonthlyReport from './MonthlyReport';

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

export default function Reports() {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {

  }, []);

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
      <TabPanel children={<ClinicEarnings data={data} />} value={value} index={3}/>
      

    </div>
  )
}
