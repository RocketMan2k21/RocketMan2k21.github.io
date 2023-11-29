

async function configureObject() {
    const elementCount = parseInt(document.getElementById('elementCount').value, 10);
    const elementOrderInput = document.getElementById('elementOrder').value;
    const elementOrder = elementOrderInput.split(',').map(Number);

    const contentInput = document.getElementById('content').value;
    const content = contentInput.split(',');

    // Перевірка, чи кількість елементів, порядок і контент співпадають
    if (elementCount === elementOrder.length && elementCount === content.length) {
        // Створити об'єкт або відправити його на сервер
        const configObject = {
            elementCount,
            elementOrder,
            content,
        };

        await addCarousel(configObject);

        // Вивести налаштування у консоль (ви можете відправити їх на сервер тут)
        console.log(configObject);
    } else {
        alert("Кількість елементів, порядок і контент повинні бути однаковими");
    }
}

const addCarousel = async(configObject) => {
    try{
        const response = await fetch('create-carousel.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(configObject),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        console.log('Carousel added successfully');
    } catch (error) {
      console.error('Error adding carousel:', error.message);
    }
};