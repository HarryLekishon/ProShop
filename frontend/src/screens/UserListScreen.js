import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Table, Button, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { listUsers } from '../actions/userActions'

function UserListScreen() {
    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    useEffect(() => {
        dispatch(listUsers())
        console.log(users)
    }, [dispatch])

    const deleteHandler = () => {
        console.log('delete')
    }
    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Table stripped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>ADMIN</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.className}</td>
                                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                    <td>
                                        {user.isAdmin ? (<i className='fas fa-check' style={
                                            { color: 'green' }}></i>) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        <Nav.Link as={Link} to={`/user/${user._id}/edit`}>
                                            <Button varaint='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                            <Button variant='danger' className='btn-sm' onClick={() =>
                                                deleteHandler(user._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Nav.Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )
            }
        </>
    )
}

export default UserListScreen