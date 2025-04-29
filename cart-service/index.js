
const Cart = require('./cart')

const cart = new Cart()

// Add items to cart
cart.addItem({ productId: 'product1', quantity: 1, price: 10 }) // add product 1 with qty 1
cart.addItem({ productId: 'product2', quantity: 1, price: 20 }) // add product 2 with qty 1
cart.updateItem('product1', 5) // update product 1 to qty 5
cart.removeItem('product2') // remove product 2

console.log('Cart Items:', cart.listAllCartItems())
console.log('Is product 1 exists in cart:', cart.checkIfItemExists('product1'))
console.log('Is product 2 exists in cart:', cart.checkIfItemExists('product2'))
console.log('Is empty cart:', cart.isEmptyCart())
console.log('Unique cart item count:', cart.getCountUniqueItems())
console.log('Total items:', cart.getTotalItems())

cart.clearAll() // clear all items
console.log('Cart items:', cart.listAllCartItems())
console.log('Is empty cart:', cart.isEmptyCart())

cart.addItem({ productId: 'product3', quantity: 50, price: 10 }) // Add product 3 with 50 Qty
console.log('Total without discount:', cart.getTotalWithoutDiscount()) // total without discount

// Apply discounts
cart.addDiscount({ name: 'fixed_discount_100', type: 'fixed', amount: 100 })
cart.addDiscount({ name: 'percentage_discount_10', type: 'percentage', amount: 10, max: 100 })
console.log('Total price:', cart.getTotalAmount()) // total after discount

// Remove discount
cart.removeDiscount('fixed_discount_100')
console.log('Total price:', cart.getTotalAmount()) // total after discount

// Freebies
cart.addFreebieProduct({ mainProductId: 'product3', freeProductId: 'product3', quantity: 1 }) // add product3 as freebie if product3 is bought
console.log('After freebies:', cart.getTotalItems())
