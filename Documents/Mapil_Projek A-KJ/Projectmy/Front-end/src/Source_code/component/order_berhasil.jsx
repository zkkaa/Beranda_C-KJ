// import "../../Source_code/component/print"
import { Link } from "react-router-dom";

export default function OrderBerhasil() {
  return (
    <div class="tbl_orderan_berhasil">
      <div class="orderan_berhasil">
        <div class="orderan">
          <span>Orderan Berhasil</span>
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
        <div class="div-isi">
          <div class="ket-judul">
            <span>Pajak</span>
          </div>
          <div class="ket-keterangan">
            <span>Rp.</span>
            <span class="pajak_bayar">...</span>
          </div>
        </div>
        <div class="div-isi">
          <div class="ket-judul">
            <span>Diskon</span>
          </div>
          <div class="ket-keterangan">
            <span>Rp.</span>
            <span class="diskon_nayar">...</span>
          </div>
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

        <div class="btn_printutup">
          <div class="btn_tutup">
            <Link to={"/Transaksi/pemasukan"}>
              <button class="tutup">Tutup</button>
            </Link>
          </div>
          <div class="btn_print">
            <Link to={"/Rekap/Rekap_pengeluaran/Page_Print_Pemasukan"}>
            <button class="print">Print</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
