import PurchasedTicketsRow from "../PurchasedTicketsRow/PurchasedTicketsRow"


interface IPurchasedTicketsProps{
    purchasedTickets:any[];
}


const PurchasedTicketsList:React.FC<IPurchasedTicketsProps> = (props) => {
    const {purchasedTickets}:any = props
    

    return (
        <div className="events-list-wrapper">
            {purchasedTickets.map((item:any) => <div key={item.serialNumber}><PurchasedTicketsRow ticket={item} /></div>)}
        </div>
    )
}

export default PurchasedTicketsList
