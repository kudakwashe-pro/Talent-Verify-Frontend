import React from 'react'
import CompanyForm from '../Company/CompanyForm'
import EmployeeForm from '../Employee/EmployeeForm'
import EmployeeList from '../Employee/EmployeeList'
import UploadEmployees from '../Employee/UploadEmployees2'
import MiniVariantDrawer from '../../components/AppDrawer'

import {
  Container,
  createTheme,
  CssBaseline,
  Paper,
  ThemeProvider
} from '@mui/material'
import {
  DashboardOutlined,
  EditNoteSharp,
  MoneyOutlined
} from '@mui/icons-material'
import MyTabs from '../../components/Tabs'

const theme = createTheme({
  palette: {
    background: {
      default: '#FFFFFF' // Your desired background color
    }
  }
})
const PaperStyle = { height: 'auto', marginTop: '70px' }
const bursarItems = [
  {
    text: 'Dashboard',
    icon: <DashboardOutlined />,
    onClick: () => console.log('Dashboard clicked')
  },

  {
    text: 'Fees',
    icon: <MoneyOutlined />,
    nestedItems: [
      {
        nestedText: 'Structures',
        nestedOnClick: () => console.log('Structure clicked'),
        nestedIcons: <EditNoteSharp />
      }
    ]
  }
]

const tabs = [
  {
    label: 'Employees Overview',
    content:<EmployeeList/>
  
  },
  {
    label: 'Employees Records Manipulation',
    content: (
      <CompanyForm onCompanyCreated={() => alert('Company created!')} />
      
    )
  },
  {
    label: 'Company',
    content: (
      <EmployeeForm onEmployeeCreated={() => alert('Employee created!')} />
    )
  },
  {
    label: 'Bulk Upload',
    content: <UploadEmployees />
  },
]

const Home = () => {
  return (
    <Container sx={{ mt: 8 }}>
      <MyTabs header='Application' tabs={tabs} />
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <Paper variant='none' sx={{ width: 'flex' }} style={PaperStyle}>
          <MiniVariantDrawer title='TALENT VERIFY SYSTEM' items={bursarItems} />
        </Paper>
      </ThemeProvider>
    </Container>
  )
}

export default Home
