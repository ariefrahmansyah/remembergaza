import formatNumber from "../utils/format";

export default function VictimsList({ victims }) {
  return (
    <>
      {victims.map((victim, index) => (
        <>
          {formatNumber(index + 1)}
          <br />
          {`${victim.name}`}
          <br />
          {`(${victim.en_name})`}
          <br />
          <br />
        </>
      ))}
    </>
  );
}
