export default function Calculator({
  handlePortions,
  handleForWhat,
  handleNewAmount,
  handleCalc,
}) {
  return (
    <div className="main__calculator">
      <label>
        Rinde para <input type="number" onChange={handlePortions} />
      </label>
      <label>
        (personas, porciones, etc)
        <input type="text" onChange={handleForWhat} />
      </label>
      <label>
        Debe rendir para
        <input type="number" onChange={handleNewAmount} />
      </label>
    </div>
  );
}
