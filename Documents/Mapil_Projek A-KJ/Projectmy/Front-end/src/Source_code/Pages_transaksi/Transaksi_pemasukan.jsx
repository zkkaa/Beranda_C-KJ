import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import "../CSS/Pages_transaksi/Transaksi_pemasukan.css";
import { Link } from "react-router-dom";
import QuantitySelector from "../component/fitur_tambahan/tambahkurang_angka";
import { useState, useEffect } from "react";
import axios from "axios";
import { MagnifyingGlass } from "@phosphor-icons/react";
import InputTransaksi_pemasukan from "../Pages_transaksi/InputTransksi/input_transaksi.jsx";

export default function Transaksi_pemasukan() {
  //handle pelanggan

  //handle barang
  const [showForm, setShowForm] = useState(false);
  const [Cart, setCart] = useState([]);

  const handleBayarClick = () => {
    setShowForm(!showForm);
  };
  console.log(Cart);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let newTotal = 0;
    Cart.forEach((icart) => {
      newTotal = newTotal + parseInt(icart.total);
    });
    setTotal(newTotal);
  });

  const removeProduct = async (product) => {
    const newCart = Cart.filter(
      (CartItem) => CartItem.Id_Barang !== product.Id_Barang
    );
    setCart(newCart);
  };

  const AddCart = async (item) => {
    let findProduct = await Cart.find((i) => {
      return i.Id_Barang === item.Id_Barang;
    });

    if (findProduct) {
      let newCart = [];
      let newItem;

      Cart.forEach((CartItem) => {
        if (CartItem.Id_Barang === item.Id_Barang) {
          newItem = {
            ...CartItem,
            jumlah: CartItem.jumlah + 1,
            total: CartItem.Harga_Barang * (CartItem.jumlah + 1),
          };
          newCart.push(newItem);
        } else {
          newCart.push(CartItem);
        }
      });
      setCart(newCart);
    }
     else {
      let addProduct = {
        ...item,
        jumlah: 1,
        harga: item.Harga_Barang,
        total: item.Harga_Barang,
      };
      setCart([...Cart, addProduct]);
    }
  };

  return (
    <div
      className={`container_3 ${showForm ? "blur" : ""}`}
      style={showForm ? { overflow: "hidden" } : {}}
    >
      <Navbar />
      <Sidebar />
      <div className="cont_transaksi">
        <div className="transaksi_menu">
          <div className="div_pemasukan_t">
            <ul>
              <li>
                <Link
                  to={"/transaksi/pemasukan"}
                  className="pemasukan_t"
                  id="active5"
                >
                  <span>Pemasukan</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="div_pengeluaran_t">
            <ul>
              <li>
                <Link to={"/transaksi/pengeluaran"} className="pengeluaran_t">
                  <span>Pengeluaran</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="tbl_data_produk-transaksi">
          <div className="page-transaksi-left">
            <div className="transaksi-left-top">
              <button className="btn-barang-transaksi" id="active8">
                <span>Barang</span>
              </button>
              <button className="btn-layanan-transaksi" id="active9">
                <span>Layanan</span>
              </button>
            </div>
            <div className="transaksi-left-bottom-semua">
              <ProductCartBarang AddCart={AddCart} />
            </div>
          </div>
          <div className="page-transaksi-right">
            <div className="div-pesanan-pt">
              <span className="pesanan">Pesanan</span>
            </div>
            <div className="tbl_data_pesanan-pt">
              <div className="list-pesanan-pt">
                <table>
                  <thead>
                    <tr className="tabel_judul-pt">
                      <th className="produk_transaksi-pt">Produk</th>
                      <th className="kuantitas_transaksi-pt">Kuantitas</th>
                      <th className="harga_transaksi-pt">Harga</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Cart
                      ? Cart.map((CartProduct, key) => (
                          <tr key={key}>
                            <td>{CartProduct.Nama_Barang}</td>
                            <td>{CartProduct.jumlah}</td>
                            <td>{CartProduct.harga}</td>
                            <td>
                              <button
                                className="bt-hps-pesanan"
                                onClick={() => removeProduct(CartProduct)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="1.5vw"
                                  height="3vh"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))
                      : "no item in cart"}
                  </tbody>
                </table>
              </div>
              <div className="transaksi_pesan-pt">
                <div className="div_jumlah-harga-pt">
                  <div className="div_total-pt">
                    <span>Total :</span>
                  </div>
                  <div className="div_bayar-pt">
                    <span>Rp.</span>
                    <span>{total}</span>
                  </div>
                </div>
                <div className="div_btn_bayar">
                  <button onClick={handleBayarClick}>
                    <span>Bayar</span>
                  </button>
                </div>
              </div>
            </div>
            {showForm && <InputTransaksi_pemasukan total={total} Cart={Cart}/>}
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductCartBarang = ({ AddCart }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/Data/data_barang")
      .then((res) => {
        const responseData = res.data;
        setData(responseData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      {data.map((item) => (
        <ul class="produk-terdaftar-pt">
          <li class="li-produk-pt" key={item.Id_Barang}>
            <div className="div_terdaftar-pt">
              <div className="gambar_terdaftar-pt">
                <img
                  src={`http://localhost:3000/public/${item.Poto_Barang}`}
                  alt=""
                />
              </div>
              <div className="keterangan_terdaftar-pt">
                <div className="div-top-pt">
                  <div className="nama_terdaftar-pt">
                    <div>
                      <span className="produk-pt">{item.Nama_Barang}</span>
                    </div>
                    <div>
                      <span>Rp.</span>
                      <span className="harga_terdaftar-pt">
                        {item.Harga_Barang}
                      </span>
                    </div>
                  </div>
                  {/* <div className="btn_terdaftar-pt">
                    <div className="btn-edit-pt">
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.5vw"
                          height="3vh"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="btn-hapus-pt">
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.5vw"
                          height="3vh"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div> */}
                </div>
                <div className="div-bottom-pt">
                  <div className="div-pesan-pt">
                    <button className="pesan-pt" onClick={() => AddCart(item)}>
                      <span>Pesan</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      ))}
    </>
  );
};
