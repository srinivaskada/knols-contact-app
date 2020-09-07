import React, { useEffect, useContext } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button, Avatar, TableContainer, Box, Table, TableHead, TableCell, TableBody, TableRow, Paper } from '@material-ui/core'
import { BASE_URL } from '../environment'
import { AppStateContext } from '../Contexts/AppStateContext';
import Axios from 'axios';

const Dashboard = () => {
  const {
    setState,
    state: { token, users }
  } = useContext(AppStateContext)
  const loadUsers = async () => {
    try {
      const response = await Axios.get(`${BASE_URL}/users`, {
        headers: {
          'x-auth-token': token,
        },
      })
      setState({
        users: response.data.data,
      })
    } catch (ex) {
      alert('Unable to load users')
      throw ex
    }
  }
  useEffect(() => {
    if (token) {
      loadUsers()
    }
  }, [token])
  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <IconButton color='inherit' aria-label='menu'>
            <Avatar alt='User' src='/static/images/avatar/1.jpg' />
          </IconButton>
          <Typography variant='h6'>News</Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
      <Box>
        <TableContainer component={Paper}>
          <Table aria-label='contacts table'>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component='th' scope='row'>
                    <Box display='flex' alignItems='center'>
                      <Avatar src={row.picture}></Avatar>
                      <span>{row.name}</span>
                    </Box>
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}
export default Dashboard
