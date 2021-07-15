class Shop {
    constructor(pavadinimas, valiuta) {
        this.pavadinimas = pavadinimas;
        this.valiuta = valiuta;
        this.itemList = [];
        this.cart = [];

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
            price: formatedPrice,
            present: true
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
            items: [],
            alreadyPayed: false
        })

        // console.log(this.cart);
        console.log(`${buyer} has an open cart at "Meskiuko kioskas"!`);
    }


    addItemToCart(name, id, count) {
        for (let i = 0; i < this.cart.length; i++) {
            const element = this.cart[i];

            if (element.owner === name && element.alreadyPayed === false && this.itemList[id - 1].present === true) {

                element.items.push({
                    id: id,
                    count: count
                })

            }
            if (element.owner === name && element.alreadyPayed === true) {
                console.log(`You can not add items to already paid cart!`);
            }

            if (element.owner === name && this.itemList[id - 1].present === false && element.alreadyPayed === true) {
                console.log(`Item is out of stock!`);
            }



        }
        // console.log(this.cart);
    }

    order(name) {
        for (const entry of this.cart) {
            if (entry.owner === name) {
                console.log(entry);
            }
        }
    }

    orderPrice(buyer, notification = true) {
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
            // console.log('------');
            // console.log(cheque, value);
            let itemIndex = value.id - 1
            cheque += this.itemList[itemIndex].price * value.count;

        }

        // console.log(idsAndCounts);
        if (notification) { console.log(`${buyer} order: ${cheque} EUR.`) };
        return cheque

    }

    removeItem(item) {
        for (let i = 0; i < this.itemList.length; i++) {
            const element = this.itemList[i];
            if (element.item.toLowerCase() === item) {
                element.present = false;

            }
        }
        // console.log(this.itemList);
        console.log(` No more ${item} at "Meskiuko kioskas"!`);
    }

    pay(buyer, price) {
        const graza = price / 100 - this.orderPrice(buyer, false);

        if (graza > 0) {
            console.log(`Here is your ${graza.toFixed(2)} EUR change!\nThank you for purchasing at "Meskiuko kioskas"!`);
        }

        if (graza < 0) {
            console.log(`Need more money!`);
        }

        if (graza === 0) {
            console.log(`Thank you for purchasing at "Meskiuko kioskas"!`);
        }



        for (let i = 0; i < this.cart.length; i++) {
            const element = this.cart[i];
            if (element.owner === buyer) {
                element.alreadyPayed = true;
            }

        }
    }

    shopSummary() {
        // Items sold part
        let idAndCount = [];

        for (let i = 0; i < this.cart.length; i++) {
            const element = this.cart[i];
            idAndCount = [...idAndCount, ...element.items]
            // console.log(`------`);
            // console.log(idAndCount);
        }
        let itemsSold = 0
        for (const valueHolder of idAndCount) {
            itemsSold += valueHolder.count
        }
        // console.log(idAndCount);

        //Orders completed and orders in progress
        let ordersCompleted = 0;
        let ordersInProgress = 0;
        for (const cart of this.cart) {
            if (cart.alreadyPayed === true) {
                ordersCompleted++
            }
            else {
                ordersInProgress++
            }
        }

        //Profit and possible profit
        let sum = 0;
        let possibleSum = 0;
        for (const cart of this.cart) {
            // console.log(cart);
            if (cart.alreadyPayed === true) {
                sum += this.orderPrice(cart.owner)
            }
            else {
                possibleSum += this.orderPrice(cart.owner)
            }
        }

        console.log(`Summary for the "${this.pavadinimas}"`);
        console.log('====================');
        console.log(`Items sold: ${itemsSold}`)
        console.log(`Orders completed: ${ordersCompleted}`)
        console.log(`Orders in progress: ${ordersInProgress}`)
        console.log(`Profit: ${sum} EUR`)
        console.log(`Possible profit: ${possibleSum} EUR`)
        console.log('====================');
    }

}

module.exports = Shop;