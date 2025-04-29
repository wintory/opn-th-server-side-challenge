class Cart {
  constructor() {
    this.items = new Map()
    this.discount = new Map()
  }

  // Product can be added to cart via product id
  addItem({ productId, quantity, price }) {
    const existingProductQuantity = this.items.get(productId) || 0
    if (existingProductQuantity) {
      this.items.set(productId, { quantity: existingProductQuantity + quantity, price })
    } else {
      this.items.set(productId, { quantity, price })
    }
  }

  // Product can be remove from cart via product id
  removeItem(productId) {
    this.items.delete(productId)
  }

  // Cart can be updated via product id. This update must be an absolute update
  updateItem(productId, quantity) {
    if (quantity <= 0) {
      this.deleteItem(productId)
    } else {
      this.items.set(productId, { quantity: quantity, price: this.items.get(productId)?.price || 0 })
    }
  }

  // Cart can be destroyed
  clearAll() {
    this.items.clear()
  }

  // Utilities
  // Can check if product already exists
  checkIfItemExists(productId) {
    return this.items.has(productId)
  }

  // Can check if cart is empty
  isEmptyCart() {
    return this.items.size === 0
  }

  // Can list all items in cart
  listAllCartItems() {
    return Array.from(this.items.entries()).map(([productId, { quantity, price }]) => ({
      productId,
      quantity,
      price
    }))
  }

  // Can count number of unique items in cart
  getCountUniqueItems() {
    let count = 0

    for (const item of this.items.values()) {
      if (item?.quantity <= 1) {
        count += item?.quantity
      }
    }

    return count
  }

  // Can return the total amount of items in cart
  getTotalItems() {
    let total = 0

    for (const item of this.items.values()) {
      total += item?.quantity
    }

    return total
  }

  getTotalWithoutDiscount() {
    let total = 0

    for (const item of this.items.values()) {
      total += item?.quantity * item?.price
    }

    return total
  }

  // Discount
  // Discount should be apply to cart which directly changes the total amount of the cart
  addDiscount({ name, amount, type, max_discount = Infinity }) {
    if (this.discount.has(name)) {
      throw new Error('Discount already exists')
    }

    if (type !== 'percentage' && type !== 'fixed') {
      throw new Error('Wrong discount type')
    }

    if (max_discount && amount > max_discount) {
      throw new Error('Discount amount exceeds max discount')
    }

    this.discount.set(name, { amount, type, max_discount })
  }

  calculateDiscount() {
    let discount = 0

    for (const [_, { amount, type, max_discount }] of this.discount.entries()) {
      let currentDiscount = 0
      if (type === 'percentage') {
        currentDiscount = (this.getTotalWithoutDiscount() / 100) * amount
      } else if (type === 'fixed') {
        currentDiscount = amount
      } else {
        throw new Error('Wrong discount type')
      }

      if (amount > max_discount) {
        discount += max_discount
      } else {
        discount += currentDiscount
      }
    }

    return discount
  }

  // Should be able to remove discount by name
  removeDiscount(name) {
    this.discount.delete(name)
  }

  getDiscountTotal(total) {
    let discountTotal = 0

    for (const discount of this.discount.values()) {
      total += discountTotal
    }

    return discountTotal
  }

  // Calculate total and apply discount
  getTotalAmount() {
    let total = this.getTotalWithoutDiscount()
    let discountTotal = this.calculateDiscount()

    return total - discountTotal
  }

  // Freebie - "Buy A get B for free!"
  // Freebie should be able to be apply to the cart with the following conditions
  // If a cart contains the a product then add freebie product into the cart
  addFreebieProduct({ mainProductId, freeProductId, quantity }) {
    const existingProductQuantity = this.items.get(mainProductId) || 0

    if (existingProductQuantity) {
      const freeProducts = this.items.get(freeProductId) || 0
      if (freeProducts) {
        this.items.set(freeProductId, { ...freeProducts, quantity: freeProducts?.quantity + quantity })
      } else {
        throw new Error('Free product does not exist in cart')
      }
    }
  }
}

module.exports = Cart
