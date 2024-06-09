const EmptyPage = ({ title }) => {
  return (
    <div
      style={{
        background: "white",
        height: "30rem",
        margin: "auto",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        border: "solid 1px",
        width: "30rem",
        marginTop: "2rem",
      }}
    >
      <h1>{title}</h1>
    </div>
  );
};
export default EmptyPage;
