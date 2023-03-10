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

//перемикач
const elChatacteristickBunny = document.querySelector('.chatacteristick-bunny');
const elChatacteristickScaleway = document.querySelector('.chatacteristick-scalawey');
const elMulti = document.querySelector('.multi');
const elSingle = document.querySelector('.single');
const elHdd = document.querySelector('.hdd');
const elSsd = document.querySelector('.ssd');

// при змінні значень на повзунках міняємо значення діаграм
storegeSlider.addEventListener('input', _.throttle(e => {

    dataSliderStorege.textContent = e.target.value;
    const storegeSliderPosition = Number(e.target.value);
    const transferSliderPosition = Number(dataSliderTransfer.textContent);

    // GET PRICE
    const priceBackblaze = getPrice('backblaze');
    const priceBunny = getPrice('banny');
    const priceScaleway = getPrice('scaleway', storegeSliderPosition, transferSliderPosition);
    const priceVultr = priceBunny;

    // SET PRICE 
    setPrice(priceBackblaze, priceBunny, priceScaleway, priceVultr);

    //GET WIDTH
    const getWidthBackblaze = getWidthDiagram('backblaze', priceBackblaze);
    const getWidthBunny = getWidthDiagram('bunny', 0, priceBunny);
    const getWidthScaleway = getWidthDiagram('scaleway', 0, 0, priceScaleway);
    const getWidthVultr = getWidthDiagram('vultr', 0, 0, 0, priceVultr);

    // SET WIDTH
    setWidthDiagram(getWidthBackblaze, getWidthBunny, getWidthScaleway, getWidthVultr);

    //company color
    getCompanyColor();


}, 100));

transferSlider.addEventListener('input', _.throttle(e => {
    dataSliderTransfer.textContent = e.target.value;
    const transferSliderPosition = Number(e.target.value);
    const storegeSliderPosition = Number(dataSliderStorege.textContent);

    // GET PRICE
    const priceBackblaze = getPrice('backblaze')
    const priceBunny = getPrice('banny');
    const priceScaleway = getPrice('scaleway', storegeSliderPosition, transferSliderPosition);
    const priceVultr = priceBunny;

    //GET WIDTH
    const getWidthBackblaze = getWidthDiagram('backblaze', priceBackblaze);
    const getWidthBunny = getWidthDiagram('bunny', 0, priceBunny);
    const getWidthScaleway = getWidthDiagram('scaleway', 0, 0, priceScaleway);
    const getWidthVultr = getWidthDiagram('vultr', 0, 0, 0, priceVultr)

    // SET WIDTH
    setWidthDiagram(getWidthBackblaze, getWidthBunny, getWidthScaleway, getWidthVultr)

    // SET PRICE 
    setPrice(priceBackblaze, priceBunny, priceScaleway, priceVultr);

    //company color
    getCompanyColor()


}, 100));

elChatacteristickBunny.addEventListener('click', e => {
    elHdd.classList.toggle('active')
    elSsd.classList.toggle('active')

    if (elHdd.classList.contains('active')) {
        const priceBunny = Number(((Number(dataSliderStorege.textContent) * 0.01) + (Number(dataSliderTransfer.textContent) * 0.01)).toFixed(2));

        if (priceBunny <= 10) {
            elDiagramBunny.style.width = `${2 + priceBunny * 100 / 80}%`
        } else {
            elDiagramBunny.style.width = `14.5%`
        }

        if (elPriceDiagramBunny.textContent === 'Free') {
            elPriceDiagramBunny.textContent = 'Free'
        } else if (priceBunny > 10) {
            elPriceDiagramBunny.textContent = `10$`
        }
        else {
            elPriceDiagramBunny.textContent = `${priceBunny}$`
        }

    } else {
        const priceBunny = Number(((Number(dataSliderStorege.textContent) * 0.02) + (Number(dataSliderTransfer.textContent) * 0.01)).toFixed(2));

        if (priceBunny <= 10) {
            elDiagramBunny.style.width = `${2 + priceBunny * 100 / 80}%`
        } else {
            elDiagramBunny.style.width = `14.5%`
        }

        if (elPriceDiagramBunny.textContent === 'Free') {
            elPriceDiagramBunny.textContent = 'Free'
        } else if (priceBunny > 10) {
            elPriceDiagramBunny.textContent = `10$`
        }
        else {
            elPriceDiagramBunny.textContent = `${priceBunny}$`
        }

    };
    //company color
    getCompanyColor()
}
);

elChatacteristickScaleway.addEventListener('click', e => {
    elMulti.classList.toggle('active')
    elSingle.classList.toggle('active')

    if (elSingle.classList.contains('active')) {
        let priceScaleway;
        if (Number(dataSliderStorege.textContent) <= 75 && Number(dataSliderTransfer.textContent) <= 75) {
            priceScaleway = "Free";
        } else if (Number(dataSliderStorege.textContent) > 75 && Number(dataSliderTransfer.textContent) > 75) {
            priceScaleway = Number((((Number(dataSliderStorege.textContent) - 75) * 0.03) + ((Number(dataSliderTransfer.textContent) - 75) * 0.02)).toFixed(2));

        } else if (Number(dataSliderStorege.textContent) > 75) {
            priceScaleway = (Number(dataSliderStorege.textContent) - 75) * 0.03
        } else {
            priceScaleway = (Number(dataSliderTransfer.textContent) - 75) * 0.02
        }
        elDiagramScaleway.style.width = `${2 + (priceScaleway * 100 / 80)}%`

        if (elPriceDiagramScaleway.textContent === 'Free') {
            elPriceDiagramScaleway.textContent = 'Free'
        } else {
            elPriceDiagramScaleway.textContent = `${priceScaleway.toFixed(2)}$`
        }

    } else {
        let priceScaleway;
        if (Number(dataSliderStorege.textContent) <= 75 && Number(dataSliderTransfer.textContent) <= 75) {
            priceScaleway = "Free";
        } else if (Number(dataSliderStorege.textContent) > 75 && Number(dataSliderTransfer.textContent) > 75) {
            priceScaleway = Number((((Number(dataSliderStorege.textContent) - 75) * 0.06) + ((Number(dataSliderTransfer.textContent) - 75) * 0.02)).toFixed(2));

        } else if (Number(dataSliderStorege.textContent) > 75) {
            priceScaleway = (Number(dataSliderStorege.textContent) - 75) * 0.06
        } else {
            priceScaleway = (Number(dataSliderTransfer.textContent) - 75) * 0.02
        }
        elDiagramScaleway.style.width = `${2 + (priceScaleway * 100 / 80)}%`

        if (elPriceDiagramScaleway.textContent === 'Free') {
            elPriceDiagramScaleway.textContent = 'Free'
        } else {
            elPriceDiagramScaleway.textContent = `${priceScaleway.toFixed(2)}$`
        }

    };
    getCompanyColor()

})

///Function
function getCompanyColor() {
    //company color
    const finalPrice = {
        colorBackblaze: elPriceDiagramBackblaze.textContent,
        colorBunny: elPriceDiagramBunny.textContent,
        colorSvalavey: elPriceDiagramScaleway.textContent,
        colorVultr: elPriceDiagramvultr.textContent,
    }

    let comparator = 100;
    let primalDiagram;
    let masive = [];

    for (let key in finalPrice) {
        // console.log(dataSliderStorege.textContent)
        if (dataSliderStorege.textContent === '0' && dataSliderTransfer.textContent === '0') {
            comparator = 100;
            break
        }

        if (finalPrice[key] === 'Free') {
            comparator = 100;
            primalDiagram = key;
            masive = []
            masive.push(key);
            break
        }
        if (Number.parseFloat(finalPrice[key]) < comparator) {
            comparator = Number.parseFloat(finalPrice[key]);
            masive = []
            masive.push(key);
            primalDiagram = key;

        } else if (Number.parseFloat(finalPrice[key]) === comparator) {
            masive.push(key);

        }
    }

    if (masive.length === 0) {
        setBasicColorDiagram();
    } else if (masive.length === 1) {

        for (let key in masive) {

            setBasicColorDiagram();

            if (masive[key] === 'colorBackblaze') {
                elDiagramBackblaze.style.backgroundColor = `#f50000`;
            };
            if (masive[key] === 'colorBunny') {
                elDiagramBunny.style.backgroundColor = `#f57f00`
            };
            if (masive[key] === 'colorSvalavey') {
                elDiagramScaleway.style.backgroundColor = `#f500e5`
            };
            if (masive[key] === 'colorVultr') {
                elDiagramVult.style.backgroundColor = `#3271a8`
            };
        }

    } else {
        setBasicColorDiagram();

        for (let key in masive) {

            if (masive[key] === 'colorBackblaze') {
                elDiagramBackblaze.style.backgroundColor = `#f50000`;
            };
            if (masive[key] === 'colorBunny') {
                elDiagramBunny.style.backgroundColor = `#f57f00`
            };
            if (masive[key] === 'colorSvalavey') {
                elDiagramScaleway.style.backgroundColor = `#f500e5`
            };
            if (masive[key] === 'colorVultr') {
                elDiagramVult.style.backgroundColor = `#3271a8`
            };
        };
    }
};

function setBasicColorDiagram() {
    elDiagramBackblaze.style.backgroundColor = `#708090`;
    elDiagramBunny.style.backgroundColor = `#708090`
    elDiagramScaleway.style.backgroundColor = `#708090`
    elDiagramVult.style.backgroundColor = `#708090`
};

function getPrice(company, storegeSliderPosition, transferSliderPosition) {

    if (company === 'backblaze') {
        const priceBackblaze = Number(((Number(dataSliderStorege.textContent) * 0.005) + (Number(dataSliderTransfer.textContent) * 0.01)).toFixed(2));
        return priceBackblaze;
    }
    if (company === 'banny') {
        let priceBunny;
        if (elHdd.classList.contains('active')) {
            priceBunny = Number(((Number(dataSliderStorege.textContent) * 0.01) + (Number(dataSliderTransfer.textContent) * 0.01)).toFixed(2));

        } else {
            priceBunny = Number(((Number(dataSliderStorege.textContent) * 0.02) + (Number(dataSliderTransfer.textContent) * 0.01)).toFixed(2));
        };
        return priceBunny;
    }
    if (company === 'scaleway') {
        let priceScaleway;

        if (elSingle.classList.contains('active')) {
            if (storegeSliderPosition <= 75 && transferSliderPosition <= 75) {

                // console.log('I here');
                priceScaleway = "Free";
            } else if (storegeSliderPosition > 75 && transferSliderPosition > 75) {
                priceScaleway = Number((((Number(dataSliderStorege.textContent) - 75) * 0.03) + ((Number(dataSliderTransfer.textContent) - 75) * 0.02)).toFixed(2));

            } else if (storegeSliderPosition > 75) {
                priceScaleway = (Number(dataSliderStorege.textContent) - 75) * 0.03
            } else {
                priceScaleway = (Number(dataSliderTransfer.textContent) - 75) * 0.02
            }
        } else {
            if (storegeSliderPosition <= 75 && transferSliderPosition <= 75) {
                priceScaleway = "Free";
            } else if (storegeSliderPosition > 75 && transferSliderPosition > 75) {
                priceScaleway = Number((((Number(dataSliderStorege.textContent) - 75) * 0.06) + ((Number(dataSliderTransfer.textContent) - 75) * 0.02)).toFixed(2));

            } else if (storegeSliderPosition > 75) {
                priceScaleway = (Number(dataSliderStorege.textContent) - 75) * 0.06
            } else {
                priceScaleway = (Number(dataSliderTransfer.textContent) - 75) * 0.02
            }
        }
        // console.log(priceScaleway);
        return priceScaleway;
    }

};

function setPrice(priceBackblaze, priceBunny, priceScaleway, priceVultr) {
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
};

function getWidthDiagram(company, priceBackblaze = 0, priceBunny = 0, priceScaleway = 0, priceVultr = 0) {
    if (company === 'backblaze') {
        let getWidthBackblaze;

        if (priceBackblaze === 0) {
            getWidthBackblaze = 0;
        }
        else if (priceBackblaze <= 7) {
            getWidthBackblaze = 7 * 100 / 80;
        } else {
            getWidthBackblaze = priceBackblaze * 100 / 80;
        }
        return getWidthBackblaze;
    }

    if (company === 'bunny') {
        return priceBunny * 100 / 80;
    }

    if (company === 'scaleway') {
        let getWidthScaleway

        if (priceScaleway === 'Free') {
            getWidthScaleway = 0;
        } else {
            getWidthScaleway = priceScaleway * 100 / 80;
        }
        return getWidthScaleway;
    }
    if (company === 'vultr') {
        let getWidthVultr;
        if (priceVultr === 0) {
            getWidthVultr = 0;
        } else if (priceVultr < 5) {
            getWidthVultr = 5 * 100 / 80;
        } else {
            getWidthVultr = priceVultr * 100 / 80;
        }
        return getWidthVultr;
    }


};

function setWidthDiagram(getWidthBackblaze, getWidthBunny, getWidthScaleway, getWidthVultr) {
    elDiagramBackblaze.style.width = `${2 + getWidthBackblaze}%`;

    if (getWidthBunny >= 12.5) {
        elDiagramBunny.style.width = `${2 + 12.5}%`;
    } else {
        elDiagramBunny.style.width = `${2 + getWidthBunny}%`;
    }
    elDiagramScaleway.style.width = `${2 + getWidthScaleway}%`;

    elDiagramVult.style.width = `${2 + getWidthVultr}%`;
};
