import axios from "axios"
import { useState, useEffect } from "react"
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap"
const apiUrl = import.meta.env.VITE_API_URL
const UserList = () => {
    let [users, setUsers] = useState([])
    useEffect(() => {
        axios({
            url: apiUrl + '/users',
            method: 'get'
        }).then((res) => {
            console.log(res.data.data)
            setUsers(res.data.data)
        }).catch((err) => {
            console.log(err)
            alert(err)
        })
    }, [])
  return (
    <>
      <Container>
        <Row>
            <Col>
                <h2 className="text-danger text-center"> Users List</h2>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => 
                            <tr>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td className={user.status == 'active'? 'text-success': ""}>{user.status}</td>
                            </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Col>
        </Row>
      </Container>
    </>
  )
}

export default UserList
