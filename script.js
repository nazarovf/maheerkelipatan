const grid = document.getElementById('grid');
const inputs = [document.getElementById('k1'), document.getElementById('k2'), document.getElementById('k3')];
const btnTandai = document.getElementById('tandai');
const btnReset = document.getElementById('reset');
const hasilEls = [document.getElementById('hasil1'), document.getElementById('hasil2'), document.getElementById('hasil3')];
const same12 = document.getElementById('same12');
const same13 = document.getElementById('same13');
const same23 = document.getElementById('same23');
const same123 = document.getElementById('same123');

// buat grid 1-100
for (let n = 1; n <= 100; n++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.textContent = n;
    cell.dataset.val = n;
    grid.appendChild(cell);
}

// bersihkan grid
function clearGrid() {
    document.querySelectorAll('.cell').forEach(c => c.classList.remove('a1', 'a2', 'a3', 'overlap'));
}

// update hasil per kelipatan & label dinamis
function updateHasil(vals) {
    for (let i = 0; i < 3; i++) {
        const arr = [];
        if (vals[i]) {
            for (let n = 1; n <= 100; n++) {
                if (n % vals[i] === 0) arr.push(n);
            }
        }
        hasilEls[i].textContent = arr.length ? arr.join(', ') : '-';
    }
    document.getElementById('lblH1').textContent = `Hasil Kelipatan ${vals[0] || '-'}:`;
    document.getElementById('lblH2').textContent = `Hasil Kelipatan ${vals[1] || '-'}:`;
    document.getElementById('lblH3').textContent = `Hasil Kelipatan ${vals[2] || '-'}:`;
}

// update bilangan yang sama & label dinamis
function updateSame(vals) {
    const [a, b, c] = vals;
    const arr12 = [], arr13 = [], arr23 = [], arr123 = [];
    for (let n = 1; n <= 100; n++) {
        if (a && b && n % a === 0 && n % b === 0) arr12.push(n);
        if (a && c && n % a === 0 && n % c === 0) arr13.push(n);
        if (b && c && n % b === 0 && n % c === 0) arr23.push(n);
        if (a && b && c && n % a === 0 && n % b === 0 && n % c === 0) arr123.push(n);
    }
    document.getElementById('lbl12').textContent = `Kelipatan ${a || '-'} & ${b || '-'}:`;
    document.getElementById('lbl13').textContent = `Kelipatan ${a || '-'} & ${c || '-'}:`;
    document.getElementById('lbl23').textContent = `Kelipatan ${b || '-'} & ${c || '-'}:`;
    document.getElementById('lbl123').textContent = `Kelipatan ${a || '-'}, ${b || '-'} & ${c || '-'}:`;

    same12.textContent = arr12.length ? arr12.join(', ') : '-';
    same13.textContent = arr13.length ? arr13.join(', ') : '-';
    same23.textContent = arr23.length ? arr23.join(', ') : '-';
    same123.textContent = arr123.length ? arr123.join(', ') : '-';
}

// fungsi utama tandai
function tandai() {
    const vals = inputs.map(i => parseInt(i.value, 10)).map(x => Number.isInteger(x) && x >= 1 && x <= 100 ? x : null);
    clearGrid();
    document.querySelectorAll('.cell').forEach(c => {
        const v = parseInt(c.dataset.val, 10);
        let count = 0;
        if (vals[0] && v % vals[0] === 0) { c.classList.add('a1'); count++; }
        if (vals[1] && v % vals[1] === 0) { c.classList.add('a2'); count++; }
        if (vals[2] && v % vals[2] === 0) { c.classList.add('a3'); count++; }
        if (count > 1) c.classList.add('overlap');
    });
    updateHasil(vals);
    updateSame(vals);
}

// event listener
btnTandai.addEventListener('click', e => { e.preventDefault(); tandai(); });
btnReset.addEventListener('click', e => {
    e.preventDefault();
    clearGrid();
    inputs.forEach(i => i.value = '');
    updateHasil([null, null, null]);
    updateSame([null, null, null]);
});
inputs.forEach(i => {
    i.addEventListener('input', () => {
        if (inputs.every(x => !x.value)) {
            clearGrid();
            updateHasil([null, null, null]);
            updateSame([null, null, null]);
        } else tandai();
    });
});
