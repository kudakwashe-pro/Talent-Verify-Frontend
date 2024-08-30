import React from 'react';
import EmployeeList from '../Employee/EmployeeList';
import MiniVariantDrawer from '../../components/AppDrawer';

import {
  Container,
  Paper,
} from '@mui/material'
import {
  DashboardOutlined,
} from '@mui/icons-material'
import MyTabs from '../../components/Tabs'
import CompanyList from '../Company/CompanyList';
import BulkUpload from '../BulkUpload/UploadBulk';

const PaperStyle = { height: 'auto', marginTop: '70px' }
const bursarItems = [
  {
    text: 'Dashboard',
    icon: <DashboardOutlined />,
    onClick: () => window.location.href = '/home'
  },
]

const tabs = [
  {
    label: 'Employees Management',
    content: <EmployeeList />
  },
  {
    label: 'Companies Management',
    content: (
      <CompanyList />
    )
  },
  {
    label: 'Bulk Upload',
    content: <BulkUpload />
  }
]

const Home = () => {
  return(
    <Container sx={{ mt: 8 }}>
      <MyTabs header='Application' tabs={tabs} />
        <Paper variant='none' sx={{ width: 'flex' }} style={PaperStyle}>
          <MiniVariantDrawer title='TALENT VERIFY SYSTEM' items={bursarItems} />
        </Paper>
    </Container>
  )
}

export default Home
