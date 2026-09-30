import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button, Col, Container, Row, Form, Table } from 'react-bootstrap'
const apiUrl = import.meta.env.VITE_API_URL
import axios from "axios"
const DiscountList = () => {
    let [discounts, setDiscounts] = useState([])
    const navigate = useNavigate()
    function goToAddDiscount() {
        navigate('/add/discount')
    }
    function goForEdit(id){
        alert(id)
        navigate(`/edit/discount/${id}`)
    }
    useEffect(() => {
        axios({
            url: apiUrl + "/discounts",
            method: 'get'
        }).then((res) => {
            setDiscounts(res.data.data)
            console.log(res.data)
        }).catch((err) => {
            alert(err)
        })
        
    }, []);
  return (
    <>
       <Container>
        <Row>
            <Col>
                <Form>
                    <Form.Group>
                        <Form.Control type="text" placeholder="type book name to search"></Form.Control>
                    </Form.Group>
                </Form>
                <Button className="mt-5" variant="success" style={{float: "right"}} onClick={goToAddDiscount}>Add Discount</Button>
            </Col>
        </Row>
        <Row>
            <h3 className="mt-2 text-center text-danger"> Discounts List </h3>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Discount Name</th>
                        <th>Discount Type</th>
                        <th>Discount Value</th>
                        <th>Book Name</th>
                        <th>Valid From</th>
                        <th>Valid To</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        discounts.map((discount) => 
                            <tr>
                                <td>{discount.discountName}</td>
                                <td>{discount.discountType}</td>
                                <td>{discount.discountValue}</td>
                                <td>{discount.book.bookTitle}</td>
                                <td>{new Date(discount.validFrom).toLocaleDateString('en-GB')}</td>
                                <td>{new Date(discount.validTo).toLocaleDateString('en-GB')}</td>
                                <td className={ discount.status == 'Active'? 'text-success' : 'text-danger'}>{discount.status}</td>   
                                <td>
                                    <Button variant="danger" size="sm" onClick={() => goForEdit(discount._id)}>Edit</Button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </Row>
       </Container>
    </>
  )
}

export default DiscountList