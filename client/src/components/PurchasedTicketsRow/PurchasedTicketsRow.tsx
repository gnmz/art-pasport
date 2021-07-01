import { useEffect } from "react";
import { useState } from "react";
import QRCode from "qrcode";

import "./PurchasedTicketsRow.css";

interface IPurchasedTicketsRowProps {
  ticket: any;
}

const PurchasedTicketsRow: React.FC<IPurchasedTicketsRowProps> = (props) => {
  const { serialNumber, name, exhibitionName, locationName, price } =
    props.ticket;

  const [qrcode, setQrcode] = useState("");
  useEffect(() => {
    const generateQrcode = async () => {
      const string = `Купленный билет № ${serialNumber} для прохода на ${exhibitionName}`;
      try {
        const response = await QRCode.toDataURL(string);
        setQrcode(response);
      } catch (error) {
        console.log(error);
      }
    };
    generateQrcode();
  }, []);

  return (
    <div className="purchased-tickets-row">
      <div className="purchased-tickets-row-main">
        <h4 className="purchased-tickets-row-title">{exhibitionName}</h4>
        <div className="purchased-tickets-row-description">
          <p>Где: {locationName}</p>
          <p>Билет №{serialNumber}</p>
          <p>Куплен на имя {name}</p>
          <p>Стоимость {price}руб. (оплачено полностью)</p>
        </div>
      </div>
      <div>
        <img src={qrcode} alt="qrcode" className="qrcode" />
      </div>
    </div>
  );
};

export default PurchasedTicketsRow;
