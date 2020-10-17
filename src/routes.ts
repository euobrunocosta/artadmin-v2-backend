import { Router } from 'express'
import UsersController from '@controllers/UsersController'
import TenantsController from '@controllers/TenantsController'
import ProductsController from '@controllers/ProductsController'
import ClientsController from '@controllers/ClientsController'
import BabiesController from '@controllers/BabiesController'
import OrdersController from '@controllers/OrdersController'
import PaymentsController from '@controllers/PaymentsController'
import ItemsController from '@controllers/ItemsController'
import MaterialsController from '@controllers/MaterialsController'
import AuthController from '@controllers/AurhController'

const routes = Router()

// User Routes
routes.post('/users/authenticate', UsersController.authenticate)
routes.get('/users', AuthController.index, AuthController.userMasterCheck, UsersController.index)
routes.post('/users', AuthController.index, AuthController.userMasterCheck, UsersController.create)
routes.put('/users/:id', AuthController.index, AuthController.userMasterCheck, UsersController.update)
routes.put('/users/enabled/:id', AuthController.index, AuthController.userMasterCheck, UsersController.toggleEnabled)
routes.delete('/users/:id', AuthController.index, AuthController.userMasterCheck, UsersController.delete)
routes.delete('/users', AuthController.index, AuthController.userMasterCheck, UsersController.deleteMany)

// Tenant Routes
routes.get('/tenants', AuthController.index, AuthController.tenantMasterCheck, TenantsController.index)
routes.post('/tenants', AuthController.index, AuthController.tenantMasterCheck, TenantsController.create)
routes.put('/tenants/:id', AuthController.index, AuthController.tenantMasterCheck, TenantsController.update)
routes.put('/tenants/enabled/:id', AuthController.index, AuthController.tenantMasterCheck, TenantsController.toggleEnabled)
routes.delete('/tenants/:id', AuthController.index, AuthController.tenantMasterCheck, TenantsController.delete)
routes.delete('/tenants', AuthController.index, AuthController.tenantMasterCheck, TenantsController.deleteMany)

// Product Routes
routes.get('/products', AuthController.index, ProductsController.index)
routes.post('/products', AuthController.index, ProductsController.create)
routes.put('/products/:id', AuthController.index, ProductsController.update)
routes.put('/products/enabled/:id', AuthController.index, ProductsController.toggleEnabled)
routes.delete('/products/:id', AuthController.index, ProductsController.delete)
routes.delete('/products', AuthController.index, ProductsController.deleteMany)

// Client Routes
routes.get('/clients', AuthController.index, ClientsController.index)
routes.post('/clients', AuthController.index, ClientsController.create)
routes.put('/clients/:id', AuthController.index, ClientsController.update)
routes.delete('/clients/:id', AuthController.index, ClientsController.delete)
routes.delete('/clients', AuthController.index, ClientsController.deleteMany)

// Baby Routes
routes.get('/babies/client/:client', AuthController.index, BabiesController.index)
routes.post('/babies/client/:client', AuthController.index, BabiesController.create)
routes.put('/babies/:id', AuthController.index, BabiesController.update)
routes.delete('/babies/:id', AuthController.index, BabiesController.delete)
routes.delete('/babies', AuthController.index, BabiesController.deleteMany)

// Order Routes
routes.get('/orders', AuthController.index, OrdersController.index)
routes.get('/orders/:id', AuthController.index, OrdersController.getById)
routes.post('/orders', AuthController.index, OrdersController.create)
routes.put('/orders/:id', AuthController.index, OrdersController.update)
routes.delete('/orders/:id', AuthController.index, OrdersController.delete)
routes.delete('/orders', AuthController.index, OrdersController.deleteMany)

// Payment Routes
routes.get('/payments/order/:order', AuthController.index, PaymentsController.index)
routes.post('/payments/order/:order', AuthController.index, PaymentsController.create)
routes.put('/payments/:id', AuthController.index, PaymentsController.update)
routes.delete('/payments/:id', AuthController.index, PaymentsController.delete)
routes.delete('/payments', AuthController.index, PaymentsController.deleteMany)

// Item Routes
routes.get('/items/order/:order', AuthController.index, ItemsController.index)
routes.post('/items/order/:order/import', AuthController.index, ItemsController.importItem)
routes.post('/items/order/:order', AuthController.index, ItemsController.create)
routes.put('/items/:id', AuthController.index, ItemsController.update)
routes.put('/items/materials/:id', AuthController.index, ItemsController.updateMaterials)
routes.delete('/items/:id', AuthController.index, ItemsController.delete)
routes.delete('/items', AuthController.index, ItemsController.deleteMany)

// Material Routes
routes.get('/materials/item/:item', AuthController.index, MaterialsController.index)
routes.post('/materials/item/:item', AuthController.index, MaterialsController.create)
routes.put('/materials/:id', AuthController.index, MaterialsController.update)
routes.delete('/materials/:id', AuthController.index, MaterialsController.delete)
routes.delete('/materials', AuthController.index, MaterialsController.deleteMany)

export default routes
routes.delete('/materials', AuthController.index, MaterialsController.deleteMany)
routes.delete('/materials', AuthController.index, MaterialsController.deleteMany)
