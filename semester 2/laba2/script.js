document.addEventListener('DOMContentLoaded', function() {
    let side = document.getElementById('side');
    let height = document.getElementById('height');
    let sideImg = document.getElementById('side-img');
    let heightImg = document.getElementById('height-img');

    side.style.display = 'block';
    height.style.display = 'none';

    const handleRadioChange = function() {
        side.style.display = this.value === 'side' ? 'block' : 'none';
        height.style.display = this.value === 'height' ? 'block' : 'none';
        sideImg.style.display = this.value === 'side' ? 'block' : 'none';
        heightImg.style.display = this.value === 'height' ? 'block' : 'none';
        clearValues();
    };

    document.querySelectorAll('input[type=radio][name=input-type]').forEach(function(radio) {
        radio.addEventListener('change', handleRadioChange);
    });

    document.querySelectorAll('#calculator input[type="checkbox"]').forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            updateTextClass();
        });
    });;

    document.querySelectorAll('input[type="number"]').forEach(function (input) {
        input.addEventListener('focus', function () {
            this.classList.remove('error');
        });
    });
});

function updateTextClass() {
    const hChecked = document.querySelector('input[name="height"]').checked;
    const angChecked = document.querySelector('input[name="angles"]').checked;
    const diagChecked = document.querySelector('input[name="diagonals"]').checked;

    if (!hChecked && !angChecked && !diagChecked) {
        document.querySelector('.block').classList.add('text');
    } else {
        document.querySelector('.block').classList.remove('text');
    }
}

function clearValues() { 
    let inputFields = document.querySelectorAll('input[type="number"]');
    inputFields.forEach(function(inputField) {
        inputField.value = ''; 
        inputField.classList.remove('error');
    });
    
    let checkboxes = document.querySelectorAll('#calculator input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
    document.querySelector('.block').classList.remove('text');
    
    document.getElementById('results').innerHTML = '';
}

function diagonals(a, b, h) {
    return Math.sqrt(h ** 2 + ((a + b) / 2) ** 2).toFixed(3);
}

function height(a, b, c) {
    return ((0.5 * (a + b) * Math.sqrt(c * c - (Math.abs(a - b) / 2) ** 2)) / (Math.abs((a + b) / 2))).toFixed(3);
}

function anglesSide(a, b, c, h) {
    return { alpha: (Math.asin(Math.abs((a - b) / 2) / c) * (180 / Math.PI) + 90).toFixed(3), beta: (90 - Math.asin(Math.abs((a - b) / 2) / c) * (180 / Math.PI)).toFixed(3)} 
}

function diagonalsSide(a, b, c) {
    return Math.sqrt(c ** 2 + a * b).toFixed(3);
}

function anglesH(a, b, h) {
    return { alpha: (Math.atan(h / (Math.abs(b - a) / 2)) * (180 / Math.PI)).toFixed(3), beta: (180 - Math.atan(h / (Math.abs(b - a) / 2)) * (180 / Math.PI)).toFixed(3) };
}

function calculate() {
    let a, b, c, h;
    let error = false;
    const inputType = document.querySelector('input[name="input-type"]:checked').value;
    const inputs = inputType === 'side' ? ['side-a', 'side-b', 'side-c'] : ['height-a', 'height-b', 'height-h'];

    inputs.forEach(inputId => {
        const inputField = document.getElementById(inputId);
        const value = parseFloat(inputField.value);
        if (isNaN(value) || value <= 0) {
            inputField.classList.add("error");
            error = true;
        } else {
            if (inputType === 'side') {
                if (inputId === 'side-a') a = value;
                else if (inputId === 'side-b') b = value;
                else if (inputId === 'side-c') c = value;
            } else if (inputType === 'height') {
                if (inputId === 'height-a') a = value;
                else if (inputId === 'height-b') b = value;
                else if (inputId === 'height-h') h = value;
            }
        }
    });

    if (error) {
        document.getElementById('results').innerHTML = 'Введите корректные данные!';
        return false;
    }
    
    let results = '';
    const hChecked = document.querySelector('input[name="height"]').checked;
    const angChecked = document.querySelector('input[name="angles"]').checked;
    const diagChecked = document.querySelector('input[name="diagonals"]').checked;

    if (inputType === 'height') {
        if (hChecked) {
            results += `Высота трапеции: ${h.toFixed(3)}<br>`;
        }
        if (angChecked) {
            const angles = anglesH(a, b, h);
            results += `Угол a: ${angles.alpha} градусов<br>`;
            results += `Угол b: ${angles.beta} градусов<br>`;
        }
        if (diagChecked) {
            results += `Диагонали: ${diagonals(a, b, h)}<br>`;
        }
    } else if (inputType === 'side') {
        if (hChecked) {
            results += `Высота трапеции: ${height(a, b, c)}<br>`;
        }
        if (angChecked) {
            const angles = anglesSide(a, b, c, height(a, b, c));
            results += `Угол a: ${angles.alpha} градусов<br>`;
            results += `Угол b: ${angles.beta} градусов<br>`;
        }
        if (diagChecked) {
            results += `Диагонали: ${diagonalsSide(a, b, c)}<br>`;
        }
    }
    document.getElementById('results').innerHTML = '';
    if (!hChecked && !angChecked && !diagChecked) {
        document.querySelector('.block').classList.add('text');
        document.getElementById('results').innerHTML = 'Выберите данные для вычисления!';
        return false;
    } else {
        document.querySelector('.block').classList.remove('text');
    }
    document.getElementById('results').innerHTML += '<b>Результат</b>:<br>' + results;
}
