module.exports = () => {
    const data = {
        products: [],
    };

    for (let i = 0;i < 1000;i++) {
        data.products.push({
            id: i + 1,
            price: Number((Math.random() * 100).toFixed(2)),
            title: `Camiseta ${i + 1}`,
        });
    };
    
    return data;
};