import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card';
import LoginByGoogle from './LoginByGoogle'
import { Box, CardContent, TextField, FormControl, makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    width: '100%',
    maxWidth: '30vw',
  },
  card: {
    width: '100%',
  },
}))

const Login = ({ history }) => {
  const classes = useStyles()

  const onLoginSuccess = (token, userDetails) => {
    window.localStorage.setItem('token', token)
    window.localStorage.setItem('userDetails', JSON.stringify(userDetails))
    history.push('/dashboard')
  }
  return (
    <Box height='100%' display='flex' justifyContent='center' alignItems='center'>
      <Box className={classes.cardContainer} display='flex' variant='outlined'>
        <Card className={classes.card}>
          <CardContent>
            <Box display='flex'>
              <LoginByGoogle onSuccess={onLoginSuccess} />
            </Box>
            <form noValidate autoComplete='off'>
              <Box display='flex' flexDirection='column'>
                <FormControl fullWidth>
                  <TextField id='email' label='email' variant='outlined' margin='normal' />
                </FormControl>
                <FormControl fullWidth>
                  <TextField id='password' label='password' variant='outlined' margin='normal' />
                </FormControl>
                <Button variant='contained' color='primary'>
                  Sign In
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
    
  )
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
}
export default Login
