async function main() {

    const response = await fetch('https://api.twelvedata.com/time_series?apikey=1af71d652d0a4e2293b7c4feac49b873&interval=10min&format=JSON&symbol=GME,DIS,MSFT,BNTX');
    let result = await response.json();
    const { GME, DIS, MSFT, BNTX } = result;
    let stocks = [GME, DIS, MSFT, BNTX]
    stocks.forEach(stock => stock.values.reverse());
    stocks.map(stock => {
        getAveragePrice(stock.meta.symbol);
    })
    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
                borderWidth: 1
            }))
        },
    });
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: [GME.meta.symbol, MSFT.meta.symbol, DIS.meta.symbol, BNTX.meta.symbol],
            datasets: [{
                label: 'highest price',
                data: [getHighestPrice(GME.meta.symbol), getHighestPrice(MSFT.meta.symbol), getHighestPrice(DIS.meta.symbol), getHighestPrice(BNTX.meta.symbol)],
                backgroundColor: [getColor(GME.meta.symbol), getColor(MSFT.meta.symbol), getColor(DIS.meta.symbol), getColor(BNTX.meta.symbol)],
                borderColor: [getColor(GME.meta.symbol), getColor(MSFT.meta.symbol), getColor(DIS.meta.symbol), getColor(BNTX.meta.symbol)],
                borderWidth: 1
            }]
        },
    });
    new Chart(averagePriceChartCanvas.getContext('2d'), {
        type: 'pie',
        data: {
            labels: [GME.meta.symbol, MSFT.meta.symbol, DIS.meta.symbol, BNTX.meta.symbol],
            datasets: [{
                label: 'average price',
                data: [getAveragePrice(GME.meta.symbol), getAveragePrice(MSFT.meta.symbol), getAveragePrice(DIS.meta.symbol), getAveragePrice(BNTX.meta.symbol)],
                backgroundColor: [getColor(GME.meta.symbol), getColor(MSFT.meta.symbol), getColor(DIS.meta.symbol), getColor(BNTX.meta.symbol)],
                borderColor: [getColor(GME.meta.symbol), getColor(MSFT.meta.symbol), getColor(DIS.meta.symbol), getColor(BNTX.meta.symbol)],
                borderWidth: 1
            }]
        },
    })
    function getColor(stock) {
        if (stock === "GME") {
            return 'rgba(61, 161, 61, 0.7)'
        }
        if (stock === "MSFT") {
            return 'rgba(209, 4, 25, 0.7)'
        }
        if (stock === "DIS") {
            return 'rgba(18, 4, 209, 0.7)'
        }
        if (stock === "BNTX") {
            return 'rgba(166, 43, 158, 0.7)'
        }
    }
    function getHighestPrice(stock) {
        let highest = 0
        if (stock === "GME") {
            for (let i = 0; i < GME.values.length; i++) {
                if (GME.values[i].high > highest) {
                    highest = GME.values[i].high;

                }
            }
        }
        else if (stock === "MSFT") {
            for (let i = 0; i < MSFT.values.length; i++) {
                if (MSFT.values[i].high > highest) {
                    highest = MSFT.values[i].high;
                }
            }
        }
        else if (stock === "DIS") {
            for (let i = 0; i < DIS.values.length; i++) {
                if (DIS.values[i].high > highest) {
                    highest = DIS.values[i].high;
                }
            }
        }
        else if (stock === "BNTX") {
            for (let i = 0; i < BNTX.values.length; i++) {
                if (BNTX.values[i].high > highest) {
                    highest = BNTX.values[i].high;
                }
            }
        }
        return highest;
    }
    function getAveragePrice(stock) {
        let sum = 0
        if (stock === "GME") {
            for (let i = 0; i < GME.values.length; i++) {
                sum += Number(GME.values[i].high);
            }
            return Number(sum / GME.values.length);
        }
        else if (stock === "MSFT") {
            for (let i = 0; i < MSFT.values.length; i++) {
                sum += Number(MSFT.values[i].high);
            }
            return Number(sum / MSFT.values.length);
        }
        else if (stock === "DIS") {
            for (let i = 0; i < DIS.values.length; i++) {
                sum += Number(DIS.values[i].high);
            }
            return Number(sum / DIS.values.length);
        }
        else if (stock === "BNTX") {
            for (let i = 0; i < BNTX.values.length; i++) {
                sum += Number(BNTX.values[i].high);
            }
            return Number(sum / BNTX.values.length);
        }
    }
}

main()

//+apikey=b2b0e11651294ee9a789558a1625b754