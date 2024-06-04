export default function Detail() {
  return (
    <>
      <div class="tbl_data_pelanggan">
        <div class="tambah_data_pelanggan">
          <div class="detail">
            <span>Detail</span>
          </div>
          <div class="div-isi">
            <div class="ket-judul">
              <span>Total Tagihan</span>
            </div>
            <div class="ket-keterangan">
              <span>Rp.</span>
              <span class="total_tagihan">...</span>
            </div>
          </div>
          <div class="div-isi">
            <div class="ket-judul">
              <span>Nominal Bayar</span>
            </div>
            <div class="ket-keterangan">
              <span>Rp.</span>
              <span class="nominal_bayar">...</span>
            </div>
          </div>
          <div class="div-isi">
            <div class="ket-judul">
              <span>Kembaliann</span>
            </div>
            <div class="ket-keterangan">
              <span>Rp.</span>
              <span class="kembalian">...</span>
            </div>
          </div>
          <div class="div-isi">
            <div class="ket-judul">
              <span>Waktu Pembayaran</span>
            </div>
            <div class="ket-keterangan">
              <span>Rp.</span>
              <span class="waktu_pembayaran">...</span>
            </div>
          </div>
          <div class="div-pesan">
            <div class="div-pesan-judul">
              <Span>Produk</Span>
            </div>
            <div class="div-pesan-barang">
              <span class="nama-produk">....Memasang wifi</span>
            </div>
            <div class="div-pesan-jumlah">
              <div class="produk">
                <div class="div-harga-barang">
                  <span>Rp.</span>
                  <span>...</span>
                </div>
                <div class="div-total-barang">
                  <span>...x</span>
                </div>
              </div>
              <div class="harus-dibayar">
                <span>Rp.</span>
                <span>...</span>
              </div>
            </div>
          </div>
          <div class="btn_printutup">
            <div class="btn_tutup">
              <button class="tutup">Tutup</button>
            </div>
            <div class="btn_print">
              <button class="print">Print</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
