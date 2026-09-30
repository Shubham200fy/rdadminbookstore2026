import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { Container, Row, Form, Button, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
const DiscountForEdit = () => {
  let params = useParams();
  let id = params.id;
  let navigate = useNavigate();
  let [books, setBooks] = useState([])
  let [discount, setDiscount] = useState({
    book: '',
    discountName: '',
    discountType: '',
    discountValue: 0,
    validFrom: '',
    validTo: ''
  })
  useEffect(() => {
    axios({
      url: `${apiUrl}/discount/for/edit/${id}`,
      method: 'get'
    }).then((res) => {
      setDiscount(res.data.data)
      setBooks(res.data.books)
    }).catch((err) => {
      alert(err)
    })
  }, [])

  const editDiscount = () => {
    axios({
      url: apiUrl + '/edit/discount/' + id,
      method: 'put',
      data: discount
    }).then((res) => {
      alert("Discount has been updated successfully....")
      navigate('/discounts')
    }).catch((err) => {
      alert(err)
    })
  }
  function manageUpdate(e){
    let name = e.target.name;
    let value = e.target.value;
    setDiscount((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h3 className="text-center text-danger">Edit Discount</h3>
            <Form.Group>
              <Form.Label>Select Book</Form.Label>
              <Form.Select name="book" value={discount.book} onChange={manageUpdate}>
                {
                  books.map((book) =>
                    <option value={book._id}>{book.bookTitle}</option>
                  )
                }
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-2">
          <Form.Group>
            <Form.Label>Discount Name</Form.Label>
            <Form.Control type="text" name="discountName" value={discount.discountName} onChange={manageUpdate}></Form.Control>
          </Form.Group>
        </Row>
        <Row className="mt-3">
          <Form.Group>
            <Form.Label>Discount Type</Form.Label>
            <Form.Select name="discountType" value={discount.discountType} onChange={manageUpdate}>
              <option value="Percentage">Percentage</option>
              <option value="Fixed">Fixed</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mt-3">
          <Form.Group>
            <Form.Label>Discount Value(in Number Only)</Form.Label>
            <Form.Control type="text" name="discountValue" value={discount.discountValue} onChange={manageUpdate}></Form.Control>
          </Form.Group>
        </Row>
        <Row className="mt-3">
          <Form.Group>
            <Form.Label>Valid Form</Form.Label>
            <Form.Control type="date" name="validFrom" value={discount.validFrom.split('T')[0]} onChange={manageUpdate}></Form.Control>
          </Form.Group>
        </Row>
        <Row className="mt-3">
          <Form.Group>
            <Form.Label>Valid to</Form.Label>
            <Form.Control type="date" name="validTo" value={discount.validTo.split('T')[0]} onChange={manageUpdate}></Form.Control>
          </Form.Group>
        </Row>
        <Button className="mt-3" variant="success" onClick={editDiscount}>Edit Button</Button>
      </Container>
    </>
  )
}

export default DiscountForEdit
