import Sidebar from "../../component/Sidebar";
import Navbar from "../../component/Navbar";
import "../../CSS/Pages_transaksi/InputTransaksi/input_transaksi.css";
import { Car, MagnifyingGlass } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function InputTransaksi_pemasukan({total, Cart}) {
  const [data, setData] = useState([]);
  const [totalHarga, setTotal] = useState(parseInt(total));
  const [Diskon, setDiskon] = useState(0);
  const [Pajak, setPajak] = useState(0);
  const [NominalBayar, setNominal] = useState(0);
  const [Kembalian, setKembalian] = useState(0);
  const [dana, setDana] = useState([]);
  const [pemasukan, setPemasukan] = useState(0);
  const [Saldo, setSaldo] = useState(0);
  const [upSaldo, setUpSaldo] = useState(0);
  const [upPemasukan, setUpPemasukan] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/Data/data_pelanggan")
      .then((res) => {
        const responseData = res.data;
        setData(responseData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  function cari(e){
    const bar = data.filter((pelanggan) =>{
      return pelanggan.Nama_Pelanggan.toLowerCase().includes(e)
    })
    setData(bar);
  }

  function InputDiskon(e){    
    setDiskon(e);
  }

  function InputPajak(e){ 
    setPajak(e);
  }

  function InputNominal(e){    
    setNominal(e);
  }
    useEffect(() =>{
      const tes = parseInt(total) + parseInt(Pajak) - parseInt(Diskon);
      setTotal(tes);
      const balik =  parseInt(NominalBayar) - parseInt(totalHarga);
      setKembalian(balik);
      
    })

    useEffect(() => {
      axios
        .get("http://localhost:3000/Info")
        .then((res) => {
          const responseDana = res.data;
          setDana(responseDana);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, []);

    useEffect(()=>{
      dana.map((e) =>{
        const inp = e.Pemasukan;
        const saldo = e.Saldo;
        setPemasukan(inp);
        setSaldo(saldo)
      })

      const update = Saldo + totalHarga;
      const updatePemasukan = pemasukan + totalHarga;
      setUpSaldo(update);
      setUpPemasukan(updatePemasukan);
      console.log(upSaldo);
      console.log(upPemasukan);

    })
    
    function KirimData(e){
      e.preventDefault();
      
      let newItem = [{
        "TotalhargaBayar": totalHarga,
        "Diskon": Diskon,
        "Pajak": Pajak,
        "NominalBayar" : NominalBayar,
        "Kembalian" : Kembalian,
      }];
      console.log(data)
      console.log(newItem)
      console.log(Cart)
      axios
      .post(
        "http://localhost:3000/Transaksi/pemasukan",
        {data, newItem, Cart}
      )
      .then((res) => {
        console.log(res);
      });

      axios
      .post(
        "http://localhost:3000/pemasukan",
        {upPemasukan, upSaldo}
      )
      .then((res) => {
        console.log(res);
      });
      
  }


  return (
    <div>
      <Navbar />
      <Sidebar />
      <form onSubmit={KirimData}>
      <div className="cont_T-pelanggan_terdaftar">
        <div className="pelanggan_terdaftar">
          <div className="judul_T-pel_terdaftar">
            <span className="terdaftar_judul">Pelanggan</span>
          </div>
          <div className="terdaftar_cari">
            <div className="cari">
              <button className="btn_cari">
                <MagnifyingGlass size={32} />
              </button>
              <input
                type="search"
                className="terdaftar_input-cari"
                placeholder="Masukkan nama pelanggan"
                onChange={(e) => cari(e.target.value)}
                />
            </div>
            <div className="hasil">
            {data.map((item)=>(
              <div key={item.Id_Pelanggan}>{item.Nama_Pelanggan}</div>
            ))}
            </div>
          </div>
          <div className="terdaftar_btn">
            <button className="btn_pelanggan-terdaftar">
              <span>+ Pelanggan Baru</span>
            </button>
          </div>

          
          {/* {data.filter((item) => item.Nama_Pelanggan.toLowerCase().includes(search)).map((item) => ( */}
          <div className="terdaftar_identitas">
            <div className="divnama">
              <div className="nama_p">
                <span>Nama</span>
              </div>
              <div className="titik-dua">
                <span>:</span>
              </div>
              <div className="input_T_nama">
                {/* <input type="text" /> */}
                {/* <span>{bar[0].Nama_Pelanggan}</span> */}
              </div>
            </div>
            <div className="divnomer">
              <div className="nomer-telepon_p">
                <span>Nomer Telepon</span>
              </div>
              <div className="titik-dua">
                <span>:</span>
              </div>
              <div className="input_T_nomer">
                {/* <input type="text" /> */}
                {/* <span>{bar[0].Nomer_Telepon}</span> */}
              </div>
            </div>
            <div className="divalamat">
              <div className="alamat_p">
                <span>Alamat</span>
              </div>
              <div className="titik-dua">
                <span>:</span>
              </div>
              <div className="input_T_alamat">
                {/* <input type="text" /> */}
                {/* <span>{bar[0].Alamat_Pelanggan}</span> */}
              </div>
            </div>
          </div>
          {/* ))} */}
          <div className="judul_T-pel_terdaftar">
            <span className="terdaftar_judul">Pembayaran</span>
          </div>
          <div className="terdaftar_pembayaran">
            <div className="div_total_harga-pt">
              <span className="span_input_t">Total Tagihan</span>
              <div>
                {/* <input type="text" className="input_tagihan-pt" value={total}/> */}
                <span>{totalHarga}</span>
              </div>
            </div>
            <div className="div_diskon_pajak-pt">
              <div className="div_diskon-pt">
                <span className="span_input_t">Diskon</span>
                <div>
                  <input type="text" className="input_diskon-pt" placeholder="Masukan diskon" onChange={(e) => InputDiskon(e.target.value)}/>
                </div>
              </div>
              <div className="div_pajak-pt">
                <span className="span_input_t">Pajak</span>
                <div>
                  <input type="text" className="input_pajak-pt" placeholder="Masukan pajak" onChange={(e) => InputPajak(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className="div_nominal_bayar-pt">
              <span className="span_input_t">Nominal Bayar</span>
              <div>
                <input type="text" className="input_nominal-pt" placeholder="Masukan nominal" onChange={(e) => InputNominal(e.target.value)}/> 
              </div>
            </div>
          </div>
          <div className="btn_simpan-pelanggan_t">
            <Link to={"/Transaksi/pemasukan/input_pemasukan/order_berhasil"}>
            <button className="simpan-pelanggan_t">Bayar</button>
            </Link>
          </div>
        </div>
      </div>
      </form>
    </div>
  );
}
