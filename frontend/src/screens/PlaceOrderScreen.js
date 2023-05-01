import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckOutSteps from '../components/CheckOutSteps'
import { Form, Button, Col,  ListGroup, Image, Card, Row, ListGroupItem } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import { Link } from 'react-router-dom';

function PlaceOrderScreen() {

  const cart = useSelector(state => state.cart )

  //calc prices
  const addDecimals = (num) => {
    return (Math.round(num * 100)/ 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty, 0))

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)

  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))

  cart.totalPrice = (
    Number(cart.itemsPrice) + 
    Number(cart.shippingPrice) + 
    Number(cart.taxPrice)
    ).toFixed(2)


  
  const placeOrderHandler = () => {
    console.log('Order Placed')
  }
  return (
    <>
      <CheckOutSteps step1 step2 step3 step4/>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method:</strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? <Message>Your cart is empty
              </Message> : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name}
                            fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} * ksh {item.price}  = ksh{item.qty
                           * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup varaint='flush'>
              <ListGroup.Item>
              <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>ksh{cart.itemsPrice}</Col>
                </Row>

                <Row>
                  <Col>Shipping</Col>
                  <Col>ksh{cart.shippingPrice}</Col>
                </Row>

                <Row>
                  <Col>Tax</Col>
                  <Col>ksh{cart.taxPrice}</Col>
                </Row>

                <Row>
                  <Col>Total</Col>
                  <Col>ksh{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button type='button' className='btn-block' disabled={cart.
                  cartItems === 0} onClick={placeOrderHandler}>Place Order</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen