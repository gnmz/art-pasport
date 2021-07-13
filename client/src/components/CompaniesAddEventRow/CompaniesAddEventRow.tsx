interface ICompaniesAddEventRowProps {
  serialNumber: string;
  serialNumberHandler: any;
}

const CompaniesAddEventRow: React.FC<ICompaniesAddEventRowProps> = ({
  serialNumber,
  serialNumberHandler,
}) => {
  return (
    <div>
      serialNumber:{" "}
      <input
        type="text"
        value={serialNumber ? serialNumber : ""}
        onChange={serialNumberHandler}
        name="serialNumber"
      />
    
    </div>
  );
};

export default CompaniesAddEventRow;
