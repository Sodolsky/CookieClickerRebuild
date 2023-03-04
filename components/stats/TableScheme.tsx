interface TableSchemeProps {
  totalBaseRate: number;
  totalMultiplier: number;
}
export const TableScheme: React.FC<TableSchemeProps> = ({
  children,
  totalBaseRate,
  totalMultiplier,
}) => {
  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <span className="font-bold text-lg text-green-400">
          Total Base Rate: {totalBaseRate.toFixed(2)}
        </span>
        <span className="font-bold text-lg text-orange-400">
          Total Multiplier: {totalMultiplier.toFixed(2)}
        </span>
      </div>
      <table className="">
        <tr>
          <th>Icon</th>
          <th>Name</th>
          <th>Bonus</th>
          <th className="px-3">Total</th>
        </tr>
        {children}
      </table>
    </>
  );
};
