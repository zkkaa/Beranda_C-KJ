import React, { useState } from 'react';

const RupiahInput = () => {
    const [inputValue, setInputValue] = useState('');

    const formatRupiah = (angka) => {
        const number_string = angka.replace(/[^,\d]/g, '').toString();
        const split = number_string.split(',');
        const sisa = split[0].length % 3;
        let rupiah = split[0].substr(0, sisa);
        const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        if (ribuan) {
            const separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
        return 'Rp. ' + rupiah;
    };

    const handleInputChange = (e) => {
        const formattedValue = formatRupiah(e.target.value);
        setInputValue(formattedValue);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Masukkan nominal"
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default RupiahInput;
