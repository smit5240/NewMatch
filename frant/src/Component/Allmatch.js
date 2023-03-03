import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loding from "./Loding";

export default function Allmatch() {
  const [allmatch, setAAllmatch] = useState();
  const [single, setSingle] = useState();
  // const [isDisable, setIsDisable] = useState();
  const [lode, setLode] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const data = localStorage.getItem("userdata");
    if (!data) {
      navigate("/cancel");
    } else {
      try {
        axios
          .get("http://localhost:4200/allmatch")
          .then((res) => {
            setLode(false);
            setAAllmatch(res.data.allmatches);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const OneU = async (_id) => {
    await axios
      .get(`http://localhost:4200/singlematch/${_id}`)
      .then((res) => {
        setSingle(res.data.oneuser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancel = (id) => {
    document.getElementById(id).className = "disable";
  };

  const activet = (id) => {
    document.getElementById(id).className = "active";
  };

  return (
    <div>
      <div className="m-5">{lode === true && <Loding />}</div>
      <div className="container top">
        <table className="table">
          <thead className="text-light bg-dark">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Contact</th>
              <th>Address</th>
              <th>T/F</th>
            </tr>
          </thead>
          <tbody>
            {allmatch &&
              allmatch.map((all, index) => {
                return (
                  <tr id={all._id} key={all._id}>
                    <td
                      className="isdesided"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => {
                        OneU(all._id);
                      }}
                    >
                      {index + 1}
                    </td>
                    <td
                      className="isdesided"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => {
                        OneU(all._id);
                      }}
                    >
                      {all.name}
                    </td>
                    <td
                      className="isdesided"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => {
                        OneU(all._id);
                      }}
                    >
                      {all.email}
                    </td>
                    <td
                      className="isdesided"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => {
                        OneU(all._id);
                      }}
                    >
                      {all.contact}
                    </td>
                    <td
                      className="isdesided"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => {
                        OneU(all._id);
                      }}
                    >
                      {all.address}
                    </td>
                    <td className="test">
                      <div className="d-flex">
                        <a
                          className="me-3"
                          onClick={() => {
                            activet(all._id);
                          }}
                        >
                          <i className="fa-solid fa-circle-check text-success"></i>
                        </a>
                        <a onClick={() => cancel(all._id)}>
                          <i className="fa-solid fa-circle-xmark text-danger"></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-center">
                <h1 className="modal-title fs-5 " id="staticBackdropLabel">
                  Your User
                </h1>
              </div>
              <div className="modal-body">
                <div className="row p-0 bg-white">
                  <div className="col-12">
                    {" "}
                    <span>Name :</span> {single && single.name}
                  </div>
                  <div className="col-12">
                    <span>E-mail : </span>
                    {single && single.email}
                  </div>
                  <div className="col-12">
                    <span>Contact :</span> {single && single.contact}
                  </div>
                  <div className="col-12">
                    <span>Address : </span>
                    {single && single.address}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
