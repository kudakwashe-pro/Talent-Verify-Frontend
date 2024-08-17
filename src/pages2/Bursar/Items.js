import {ChecklistOutlined, DashboardOutlined, EditNoteSharp, FindReplaceOutlined, Inventory2Outlined, MoneyOutlined,PaymentTwoTone, ReceiptOutlined} from '@mui/icons-material'
import AddToQueue from '@mui/icons-material/AddToQueue'
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet'
import ApprovalOutlined from '@mui/icons-material/ApprovalOutlined'

import React, { Component } from 'react'

export class Items extends Component {
  render() {
    return  [
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
            },
            {
              nestedText: 'Tracks',
              nestedOnClick: () => console.log('Roles clicked'),
              nestedIcons: <FindReplaceOutlined />
            },
            {
              nestedText: 'Invoices',
              nestedOnClick: () => console.log('Employees clicked'),
              nestedIcons:<Inventory2Outlined />
            }
          ]
        },
        {
          text: 'Payments',
          icon: <PaymentTwoTone/>,
          nestedItems: [
            {
              nestedText: 'New',
              nestedOnClick: () => console.log('new clicked'),
              nestedIcons: <AddToQueue />
            },
            {
              nestedText: 'Receipts',
              nestedOnClick: () => console.log('Receipts clicked'),
              nestedIcons: <ReceiptOutlined />
            },
            {
              nestedText: 'Invoices',
              nestedOnClick: () => console.log('Employees clicked'),
              nestedIcons:<Inventory2Outlined />
            },
          ]},{
              text: 'Budgets',
              icon: <AccountBalanceWallet/>,
              nestedItems: [
                {
                  nestedText: 'Monitor',
                  nestedOnClick: () => console.log('Employees clicked'),
                  nestedIcons:<ChecklistOutlined/>
                },
                {
                  nestedText: 'Expenditures',
                  nestedOnClick: () => console.log('new clicked'),
                  nestedIcons: <ApprovalOutlined/>
                },
                {
                  nestedText: 'Reports',
                  nestedOnClick: () => console.log('Receipts clicked'),
                  nestedIcons: <ReceiptOutlined />
                }
          ]
        }
      ]
  }
}

export default Items

