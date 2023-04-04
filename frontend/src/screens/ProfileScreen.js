import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate} from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails } from '../actions/userActions'

function ProfileScreen() {
    const [name, setName] = useState('')
    const [ email, setEmail ] = useState('')
    const [password, setPassword ] = useState('')
    const [confirmPassowrd, setConfirmPassowrd] = useState('')
    const [message, setMessage] = useState(null)
    const location = useLocation();
    const history = useNavigate();

    const dispatch = useDispatch()
    
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} = userLogin


    useEffect(() => {
        if(!userInfo){
            history('/login')
        }else{
            if(!user.name){
                dispatch(getUserDetails('profile'))
            }else {
                setName(user.name)
                setEmail(user.Email)
            }
        }
    },[ dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassowrd) {
            setMessage('Passwords do not match')
        }else {
       //dispaTCH UPDATE PROFILE
        }
    }


  return (
    <Row>
        <Col md={3}>
        <h2>User Profile</h2>
        {error && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>

        <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmpassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassowrd}
                onChange={(e) => setConfirmPassowrd(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button className='my-3' type='submit' variant='primary'>
                Update
            </Button>
        </Form>
        </Col>
        <Col md={9}>
            <h2>My orders</h2>
        </Col>
    </Row>
  )
}

export default ProfileScreen