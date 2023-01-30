//перший повзунок
const storegeSlider = document.querySelector("#storege-control");
const dataSliderStorege = document.querySelector(".data-storege-slider");

//другий повзунок
const transferSlider = document.querySelector("#transfer-control");
const dataSliderTransfer = document.querySelector(".data-transfer-slider");

// перша діаграма
const elDiagramBackblaze = document.querySelector(".diagram-backblaze");
const elPriceDiagramBackblaze = document.querySelector('.price-backblaze')


// друга діаграма
const elDiagramBunny = document.querySelector(".diagram-bunny");
const elPriceDiagramBunny = document.querySelector('.price-bunny')

// третя діаграма
const elDiagramScaleway = document.querySelector(".diagram-scaleway");
const elPriceDiagramScaleway = document.querySelector('.price-scalevay')

// четверта діаграма
const elDiagramVult = document.querySelector(".diagram-vultr");
const elPriceDiagramvultr = document.querySelector('.price-vultr')


// при змінні значень на повзунках міняємо значення діаграм
storegeSlider.addEventListener('input', e => {
    dataSliderStorege.textContent = e.target.value;
    const storegeSliderPosition = Number(e.target.value);
    const transferSliderPosition = Number(dataSliderTransfer.textContent);

    // GET PRICE
    const priceBackblaze = Number(((Number(dataSliderStorege.textContent) * 0.005) + (Number(dataSliderTransfer.textContent) * 0.01)).toFixed(2));
    const priceBunny = Number(((Number(dataSliderStorege.textContent) * 0.01) + (Number(dataSliderTransfer.textContent) * 0.01)).toFixed(2));

    let priceScaleway;

    if (storegeSliderPosition <= 75 && transferSliderPosition <= 75) {
        priceScaleway = "Free";
    } else if (storegeSliderPosition > 75 && transferSliderPosition > 75) {
        priceScaleway = Number((((Number(dataSliderStorege.textContent) - 75) * 0.03) + ((Number(dataSliderTransfer.textContent) - 75) * 0.02)).toFixed(2));

    } else if (storegeSliderPosition > 75) {
        priceScaleway = (Number(dataSliderStorege.textContent) - 75) * 0.03
    } else {
        priceScaleway = (Number(dataSliderTransfer.textContent) - 75) * 0.02
    }
    const priceVultr = priceBunny;

    //GET WIDTH
    let getWidthBackblaze;

    if (priceBackblaze === 0) {
        getWidthBackblaze = 0;
    }
    else if (priceBackblaze <= 7) {
        getWidthBackblaze = 7 * 100 / 80;
    } else {
        getWidthBackblaze = priceBackblaze * 100 / 80;
    }

    const getWidthBunny = priceBunny * 100 / 80;

    let getWidthScaleway

    if (priceScaleway === 'Free') {
        getWidthScaleway = 0;
    } else {
        getWidthScaleway = priceScaleway * 100 / 80;
    }

    let getWidthVultr;
    if (priceVultr === 0) {
        getWidthVultr = 0;
    } else if (priceVultr < 5) {
        getWidthVultr = 5 * 100 / 80;
    } else {
        getWidthVultr = priceVultr * 100 / 80;
    }




    // SET WIDTH
    elDiagramBackblaze.style.width = `${2 + getWidthBackblaze}%`;

    if (getWidthBunny >= 2 + 12.5) {
        elDiagramBunny.style.width = `${2 + 12.5}%`;
    } else {
        elDiagramBunny.style.width = `${2 + getWidthBunny}%`;
    }
    elDiagramScaleway.style.width = `${2 + getWidthScaleway}%`;

    elDiagramVult.style.width = `${2 + getWidthVultr}%`;


    // SET PRICE 
    // priceBackblaze
    if (priceBackblaze === 0) {
        elPriceDiagramBackblaze.textContent = "Free";
    } else if (priceBackblaze <= 7) {
        elPriceDiagramBackblaze.textContent = "7$";
    } else {
        elPriceDiagramBackblaze.textContent = `${priceBackblaze}$`
    }
    //priceBunny
    if (priceBunny === 0) {
        elPriceDiagramBunny.textContent = "Free";
    } else if (priceBunny < 10) {
        elPriceDiagramBunny.textContent = `${priceBunny}$`
    } else {

        elPriceDiagramBunny.textContent = `10$`
    }
    //priceScaleway
    if (priceScaleway === 'Free') {
        elPriceDiagramScaleway.textContent = `${priceScaleway}`;
    } else {
        elPriceDiagramScaleway.textContent = `${(priceScaleway).toFixed(2)}$`;
    }

    //priceVultr
    if (priceVultr === 0) {
        elPriceDiagramvultr.textContent = "Free";
    } else if (priceVultr <= 5) {
        elPriceDiagramvultr.textContent = "5$";
    } else {
        elPriceDiagramvultr.textContent = `${priceVultr}$`
    }
    //company color



    const finalPrice = {
        colorBackblaze: elPriceDiagramBackblaze.textContent,
        colorBunny: elPriceDiagramBunny.textContent,
        colorSvalavey: elPriceDiagramScaleway.textContent,
        colorVultr: elPriceDiagramvultr.textContent,
    }



    let comparator = 100;
    let primalDiagram;

    for (let key in finalPrice) {
        // console.log(dataSliderStorege.textContent)
        if (dataSliderStorege.textContent === '0' && dataSliderTransfer.textContent === '0') {
            comparator = 100;
            primalDiagram = finalPrice.gray;
            break
        }

        if (finalPrice[key] === 'Free') {
            comparator = 100;
            primalDiagram = key;
            break
        } else if (Number.parseFloat(finalPrice[key]) < comparator) {
            comparator = Number.parseFloat(finalPrice[key]);
            primalDiagram = key;
        }
    }

    //set BC color
    console.log(primalDiagram);
    if (primalDiagram === 'colorBackblaze') {
        elDiagramBackblaze.style.backgroundColor = `#f50000`;
        elDiagramBunny.style.backgroundColor = `#708090`
        elDiagramScaleway.style.backgroundColor = `#708090`
        elDiagramVult.style.backgroundColor = `#708090`
    } else if (primalDiagram === 'colorBunny') {
        elDiagramBackblaze.style.backgroundColor = `#708090`;
        elDiagramBunny.style.backgroundColor = `#f57f00`
        elDiagramScaleway.style.backgroundColor = `#708090`
        elDiagramVult.style.backgroundColor = `#708090`
    } else if (primalDiagram === 'colorSvalavey') {
        elDiagramBackblaze.style.backgroundColor = `#708090`;
        elDiagramBunny.style.backgroundColor = `#708090`
        elDiagramScaleway.style.backgroundColor = `#f500e5`
        elDiagramVult.style.backgroundColor = `#708090`
    } else if (primalDiagram === 'colorVultr') {
        elDiagramBackblaze.style.backgroundColor = `#708090`;
        elDiagramBunny.style.backgroundColor = `#708090`
        elDiagramScaleway.style.backgroundColor = `#708090`
        elDiagramVult.style.backgroundColor = `#3271a8`

    } else {
        elDiagramBackblaze.style.backgroundColor = `#708090`;
        elDiagramBunny.style.backgroundColor = `#708090`
        elDiagramScaleway.style.backgroundColor = `#708090`
        elDiagramVult.style.backgroundColor = `#708090`
        elDiagramVult.style.backgroundColor = `#708090`
    }


})

transferSlider.addEventListener('input', e => {
    dataSliderTransfer.textContent = e.target.value;
    const transferSliderPosition = Number(e.target.value);
    const storegeSliderPosition = Number(dataSliderStorege.textContent);



    // GET PRICE
    const priceBackblaze = Number(((Number(dataSliderStorege.textContent) * 0.005) + (Number(dataSliderTransfer.textContent) * 0.01)).toFixed(2));
    const priceBunny = Number(((Number(dataSliderStorege.textContent) * 0.01) + (Number(dataSliderTransfer.textContent) * 0.01)).toFixed(2));

    let priceScaleway;

    if (storegeSliderPosition <= 75 && transferSliderPosition <= 75) {
        priceScaleway = "Free";
    } else if (storegeSliderPosition > 75 && transferSliderPosition > 75) {
        priceScaleway = Number((((Number(dataSliderStorege.textContent) - 75) * 0.03) + ((Number(dataSliderTransfer.textContent) - 75) * 0.02)).toFixed(2));

    } else if (storegeSliderPosition > 75) {
        priceScaleway = (Number(dataSliderStorege.textContent) - 75) * 0.03

    } else {
        priceScaleway = (Number(dataSliderTransfer.textContent) - 75) * 0.02;
        console.log(priceScaleway);
    }
    const priceVultr = priceBunny;

    //GET WIDTH
    let getWidthBackblaze;

    if (priceBackblaze === 0) {
        getWidthBackblaze = 0;
    }
    else if (priceBackblaze <= 7) {
        getWidthBackblaze = 7 * 100 / 80;
    } else {
        getWidthBackblaze = priceBackblaze * 100 / 80;
    }
    const getWidthBunny = priceBunny * 100 / 80;

    let getWidthScaleway

    if (priceScaleway === 'Free') {
        getWidthScaleway = 0;
    } else {
        getWidthScaleway = priceScaleway * 100 / 80;
    }

    let getWidthVultr;
    if (priceVultr === 0) {
        getWidthVultr = 0;
    } else if (priceVultr < 5) {
        getWidthVultr = 5 * 100 / 80;
    } else {
        getWidthVultr = priceVultr * 100 / 80;
    }

    // SET WIDTH
    elDiagramBackblaze.style.width = `${2 + getWidthBackblaze}%`;

    if (getWidthBunny >= 2 + 12.5) {
        elDiagramBunny.style.width = `${2 + 12.5}%`;
    } else {
        elDiagramBunny.style.width = `${2 + getWidthBunny}%`;
    }
    elDiagramScaleway.style.width = `${2 + getWidthScaleway}%`;

    elDiagramVult.style.width = `${2 + getWidthVultr}%`;


    // SET PRICE 
    // priceBackblaze
    if (priceBackblaze === 0) {
        elPriceDiagramBackblaze.textContent = "Free";
    } else if (priceBackblaze <= 7) {
        elPriceDiagramBackblaze.textContent = "7$";
    } else {
        elPriceDiagramBackblaze.textContent = `${priceBackblaze}$`
    }
    //priceBunny
    if (priceBunny === 0) {
        elPriceDiagramBunny.textContent = "Free";
    } else if (priceBunny < 10) {
        elPriceDiagramBunny.textContent = `${priceBunny}$`
    } else {

        elPriceDiagramBunny.textContent = `10$`
    }
    //priceScaleway
    if (priceScaleway === 'Free') {
        elPriceDiagramScaleway.textContent = `${priceScaleway}`;
    } else {
        elPriceDiagramScaleway.textContent = `${(priceScaleway).toFixed(2)}$`;
    }

    //priceVultr
    if (priceVultr === 0) {
        elPriceDiagramvultr.textContent = "Free";
    } else if (priceVultr <= 5) {
        elPriceDiagramvultr.textContent = "5$";
    } else {
        elPriceDiagramvultr.textContent = `${priceVultr}$`
    }

    // color company 
    //company color



    const finalPrice = {
        colorBackblaze: elPriceDiagramBackblaze.textContent,
        colorBunny: elPriceDiagramBunny.textContent,
        colorSvalavey: elPriceDiagramScaleway.textContent,
        colorVultr: elPriceDiagramvultr.textContent,
    }



    let comparator = 100;
    let primalDiagram;

    for (let key in finalPrice) {
        // console.log(dataSliderStorege.textContent)
        if (dataSliderStorege.textContent === '0' && dataSliderTransfer.textContent === '0') {
            comparator = 100;
            primalDiagram = finalPrice.gray;
            break
        }

        if (finalPrice[key] === 'Free') {
            comparator = 100;
            primalDiagram = key;
            break
        } else if (Number.parseFloat(finalPrice[key]) < comparator) {
            comparator = Number.parseFloat(finalPrice[key]);
            primalDiagram = key;
        }
    }

    //set BC color
    console.log(primalDiagram);
    if (primalDiagram === 'colorBackblaze') {
        elDiagramBackblaze.style.backgroundColor = `#f50000`;
        elDiagramBunny.style.backgroundColor = `#708090`
        elDiagramScaleway.style.backgroundColor = `#708090`
        elDiagramVult.style.backgroundColor = `#708090`
    } else if (primalDiagram === 'colorBunny') {
        elDiagramBackblaze.style.backgroundColor = `#708090`;
        elDiagramBunny.style.backgroundColor = `#f57f00`
        elDiagramScaleway.style.backgroundColor = `#708090`
        elDiagramVult.style.backgroundColor = `#708090`
    } else if (primalDiagram === 'colorSvalavey') {
        elDiagramBackblaze.style.backgroundColor = `#708090`;
        elDiagramBunny.style.backgroundColor = `#708090`
        elDiagramScaleway.style.backgroundColor = `#f500e5`
        elDiagramVult.style.backgroundColor = `#708090`
    } else if (primalDiagram === 'colorVultr') {
        elDiagramBackblaze.style.backgroundColor = `#708090`;
        elDiagramBunny.style.backgroundColor = `#708090`
        elDiagramScaleway.style.backgroundColor = `#708090`
        elDiagramVult.style.backgroundColor = `#3271a8`

    } else {
        elDiagramVult.style.backgroundColor = `#708090`
        elDiagramBackblaze.style.backgroundColor = `#708090`;
        elDiagramBunny.style.backgroundColor = `#708090`
        elDiagramScaleway.style.backgroundColor = `#708090`
        elDiagramVult.style.backgroundColor = `#708090`


    }
})




