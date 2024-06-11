import '../../../Source_code/CSS/input_data/input_layanan.css'
import { useState } from 'react';
import axios from 'axios';
import { DataTersimpan } from '../PopUp/data-tersimpan';

export default function UpdateLayanan({DataLayanan}){

    const[Data, setData] = useState({
        Id_Layanan : DataLayanan[0].Id_Layanan,
        Nama_Layanan : DataLayanan[0].Nama_Layanan,
        Harga_Layanan : DataLayanan[0].Harga_Layanan,
        Stok_Layanan : DataLayanan[0].Stok_Layanan,
        Poto_Layanan : DataLayanan[0].Poto_Layanan,
        Kode_Layanan: DataLayanan[0].Kode_Layanan,
    });
    const[Show, setShow] = useState(false)
    function refreshData(){
      window.location.reload();
  }

    console.log(Data)
    function Handle_inputLayanan(event) {
      event.preventDefault();
      axios
      .post(
        `${import.meta.env.VITE_API_URL}/Update_data_layanan`,
        Data
        )
        .then((res) => {
          console.log(res);
          });
        setShow(true)
      }
    return(
        <>
        {Show && <DataTersimpan/>}
         <div
        className={`contain ${Show ? "blur" : ""}`}
        style={Show ? { overflow: "hidden" } : {}}
      >
        <form onSubmit={Handle_inputLayanan}>
          <div className="contain-updatelayanan">
            <div className="tbl_layanan">
              <div className="tambah_data_layanan">
                <div className="div_ttl">
                  <span className="ttl">Tabel Tambah Layanan</span>
                </div>
                <div className="kolom_input_l1">
                  <div className="div_kl">
                    <span className="span_input_l">Kode Layanan</span>
                    <div>
                      <input
                        type="text"
                        className="input_Bkode_l"
                        onChange={e => setData({...Data, Kode_Layanan: e.target.value})}
                        value={Data.Kode_Layanan}
                        required
                      />
                    </div>
                  </div>
                  <div className="div_np">
                    <span className="span_input_l">Nama Layanan</span>
                    <div>
                      <input
                        type="text"
                        className="input_Bnama_l"
                        onChange={e => setData({...Data, Nama_Layanan: e.target.value})}
                        value={Data.Nama_Layanan}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="kolom_input_p2">
                  <div className="div_kl">
                    <span className="span_input_l">Harga Layanan</span>
                    <div>
                      <input
                        type="text"
                        className="input_Bharga_l"
                        onChange={e => setData({...Data, Harga_Layanan: e.target.value})}
                        value={Data.Harga_Layanan}
                        required
                      />
                    </div>
                  </div>
                  <div className="div_np">
                    <span className="span_input_l">Stok Bahan</span>
                    <div>
                      <input
                        type="number"
                        className="input_Bstok_l"
                        onChange={e => setData({...Data, Stok_Layanan: e.target.value})}
                        value={Data.Stok_Layanan}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="kolom_gambar_l">
                  <div>
                    <span className="span_input_l">Gambar Layanan</span>
                  </div>
                  <div className="input_gambar_l">
                  <img src={`${import.meta.env.VITE_API_URL}/public/${Data.Poto_Layanan}`} alt="" />
                  </div>
                </div>
                <div className="btn_hapussimpan-l">
                  <input type="reset" value={"Batal"} className="hapus-up_layanan" onClick={refreshData} />
                  <div className="btn_simpan-layanan">
                    <button className="simpan-layanan_l">Simpan</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
        </>
    )
}