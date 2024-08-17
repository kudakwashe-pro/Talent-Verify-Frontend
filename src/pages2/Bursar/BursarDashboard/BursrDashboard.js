import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import {
  Container,
  Box,
  CircularProgress,
} from '@mui/material'
import StudentFee from '../components/StudentFee'

import MyTabs from '../../../components/Tabs'
import Payments from '../components/payments'
import Budgets from '../components/Budgets'
import FinancialAid from '../components/FinancialAid'
import FinancialReports from '../components/FinancialReports'

const BursarDashboard = () => {
  const [students, setStudents] = useState([])
  const [payments, setPayments] = useState([])
  const [scholarships, setScholarships] = useState([])
  const [budgets, setBudgets] = useState([])
  const [financialReports, setFinancialReports] = useState([])
  const [loading, setLoading] = useState(false)
  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [
        studentsRes,
        paymentsRes,
        scholarshipsRes,
        budgetsRes,
        financialReportsRes
      ] = await Promise.all([
        axios.get('/api/studentReg/'),
        axios.get('/api/feesPayment/'),
        axios.get('/api/scholarships'),
        axios.get('/api/budgets'),
        axios.get('/api/financial-reports')
      ])
      setStudents(studentsRes.data)
      setPayments(paymentsRes.data)
      setScholarships(scholarshipsRes.data)
      setBudgets(budgetsRes.data)
      setFinancialReports(financialReportsRes.data)
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }, [])
  useEffect(() => {
    fetchData()
  }, [fetchData])
  

  if (loading) {
    return (
      <Container>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='100vh
'
        >
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  const tabs = [
    {
      label: 'Student Fee Management',
      content: <StudentFee students={students} />
    },
    {
      label: 'Payments',
      content: <Payments payments={payments} />
    },
    {
      label: 'Budgets',
      content: <Budgets budgets={budgets} />
    },
    {
      label: 'Financial Aids',
      content: <FinancialAid scholarships={scholarships} />
    },
    {
      label: 'Financial Reports',
      content: <FinancialReports financialReports={financialReports}/>
    }
  ]

  return (
    <Container>
      <MyTabs header='BURSAR' tabs={tabs} />
    </Container>
  )
}
export default BursarDashboard
