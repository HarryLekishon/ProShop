import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { Form, Button, Col, ListGroup, Image, Card, Row, ListGroupItem } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'
import { PayPalButton } from 'react-paypal-button-v2'

function OrderScreen() {

  const dispatch = useDispatch()
  const orderId = useParams();
  const history = useNavigate();

  const [sdkReady, setSdkReady] = useState(false)
  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading:loadingPay, success:successPay } = orderPay

  if (!loading) {
    //calc prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty, 0))
  }


  useEffect(() => {

    const addPayPalScript = async () => {

      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true

      script.onload = () => {
        setSdkReady(true)
      }

      document.body.appendChild(script)
    }

    addPayPalScript()

    if (!order || successPay ) {
      dispatch ({ type: ORDER_PAY_RESET})
      dispatch(getOrderDetails(orderId.id))
    }
    else if(!order.isPaid) {
      if(!window.paypal){
        addPayPalScript()
      }else {
        setSdkReady(true)
      }
    }
    // eslint-disable-next-line
  }, [order, orderId.id])

  const successPaymentHandler = (paymentResult) => {
    console(paymentResult)
    dispatch(payOrder(orderId.id, paymentResult))
  }

  return loading ? <Loader /> : error ? <Message variant='danger'>{error}
  </Message> : <>

    <h1>Order {order._id}</h1>
    <Row>
      <Col md={8}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p><strong>Name:</strong>{order.user.name}</p>
            <p>
              <strong>Email:</strong>
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <p>
              {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
              {order.shippingAddress.postalCode},{' '}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Message variant='success'>Delivered on {order.deliveredAt}</Message>
            ) : (
              <Message variant='danger'>Not Delivered</Message>)}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Payment Method</h2>
            <p>
              <strong>Method:</strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> :
              <Message variant='danger'>Not paid</Message>}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? <Message>Order is empty
            </Message> : (
              <ListGroup variant='flush'>
                {order.orderItems.map((item, index) => (
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
                <Col>ksh{order.itemsPrice}</Col>
              </Row>

              <Row>
                <Col>Shipping</Col>
                <Col>ksh{order.shippingPrice}</Col>
              </Row>

              <Row>
                <Col>Tax</Col>
                <Col>ksh{order.taxPrice}</Col>
              </Row>

              <Row>
                <Col>Total</Col>
                <Col>ksh{order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loader/>}
                {!sdkReady ? <Loader/> : (
                  <PayPalButton amount={order.totalPrice}
                                onSuccess={successPaymentHandler}/>
                )}
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  </>
}

export default OrderScreen