class Shop {
    constructor(pavadinimas, valiuta) {
        this.pavadinimas = pavadinimas;
        this.valiuta = valiuta;
        this.itemList = [];
        this.cart = [];
        this.cheque = 0;
    }
    intro() {
        console.log(`Hi we are "${this.pavadinimas}". \nUse .items() method to get list of items to purchase.\nUse .order() method to get your order details.`);
    }
    addItem(item, price) {
        if (!this.isValidItem(item) || !this.isValidPrice(price)) {
            return false;
        }
        let formatedPrice = price / 100;
        let formatedItem = item.charAt(0).toUpperCase() + item.slice(1);
        this.itemList.push({
            item: formatedItem,
            price: formatedPrice
        })
        console.log(this.itemList);
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
                element.price = priceUpdate / 100;
            }

        }
        console.log(`"Meskiuko kioskas" updated price and sells ${itemKey} for ${priceUpdate / 100}0 EUR now!`);
    }

    createCart(buyer) {
        this.cart.push({
            owner: buyer,
            items: []
        })

        // console.log(this.cart);
        console.log(`${buyer} has an open cart at "Meskiuko kioskas"!`);
    }


    addItemToCart(name, id, count) {
        for (let i = 0; i < this.cart.length; i++) {
            const element = this.cart[i];
            if (element.owner === name) {

                element.items.push({
                    id: id,
                    count: count
                })
            }

        }
        // console.log(this.cart);
    }

    order(name) {
        for (const entry of this.cart)
            if (entry.owner === name) {
                console.log(entry);
            }
    }

    orderPrice(buyer) {
        let idsAndCounts = [];

        for (let i = 0; i < this.cart.length; i++) {
            const element = this.cart[i];
            if (element.owner === buyer) {
                idsAndCounts = element.items
                break;
            }
        }
        let cheque = 0;
        for (let i = 0; i < idsAndCounts.length; i++) {
            const value = idsAndCounts[i];
            console.log('------');
            console.log(cheque, value);
            let itemIndex = value.id - 1
            cheque += this.itemList[itemIndex].price * value.count

        }

        console.log(idsAndCounts);
        console.log(`${buyer} order: ${cheque} EUR.`);
    }

    removeItem(item) {
        let updatedList = []
        for (let i = 0; i < this.itemList.length; i++) {
            const element = this.itemList[i];
            if (element.item.toLowerCase() !== item) {
                updatedList.push(element)
            }

        }
        this.itemList = updatedList;
        console.log(` No more ${item} at "Meskiuko kioskas"!`);
    }

    pay(buyer, price) {

    }

    shopSummary() {

    }

}

module.exports = Shop;