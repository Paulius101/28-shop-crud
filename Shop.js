class Shop {
    constructor() {
        this.itemList = [];
        this.cart = [];
    }
    intro() {
        console.log('Hi we are "Meskiuko kioskas".');
    }
    addItem(item, price) {
        if (!this.isValidItem(item) || !this.isValidPrice(price)) {
            return false;
        }
        let formatedPrice = price / 100;
        let formatedItem = item.charAt(0).toUpperCase() + item.slice(1);
        this.itemList.push({
            'item': formatedItem,
            'price': formatedPrice
        })
        console.log(`"Meskiuko kioskas" sells ${item} for ${formatedPrice} EUR now! `);

    }
    isValidItem(item) {
        if (typeof item !== 'string' ||
            item === '' ||
            item !== item.toLowerCase()) {
            console.error('ERROR: nevalidi prekes ivestis');
            return false;
        }
        return true;
    }

    isValidPrice(price) {
        if (typeof price !== 'number' ||
            price < 0) {
            console.error('ERROR: nevalidi prekes kaina');
            return false;
        }
        return true;
    }

    items() {
        console.log('Items for sale at "Meskiuko kioskas":');
        console.log('====================');
        for (let i = 0; i < this.itemList.length; i++) {
            const entry = this.itemList[i];
            console.log(`${i + 1}) ${entry.item} - ${entry.price} EUR;`);
        }
        console.log('====================')
    }

    updatePrice(itemKey, priceUpdate) {
        for (let i = 0; i < this.itemList.length; i++) {
            const element = this.itemList[i];

            if (itemKey === element.item.toLowerCase()) {
                element.price === priceUpdate / 100;
            }

        }
        console.log(this.itemList);
        console.log(`"Meskiuko kioskas" updated price and sells ${itemKey} for ${priceUpdate / 100} EUR now!`);
    }

    createCart(name) {
        console.log(`${name} has an open cart at "Meskiuko kioskas"!`);
    }


    addItemToCart(name, id, count) {
        this.cart.push({
            name: name,
            id: id,
            count: count
        })
    }

    order(name) {

        console.log(`
    {
        owner: '${name}',
        items: ${list}
    }`
        );
    }

}

module.exports = Shop;