import express from 'express'
import { addOrderItems, getMyOrders, getOrderById, updateOrderTopaid} from '../controllers/orderController.js'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderTopaid)
export default router