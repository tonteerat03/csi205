import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Carts = ({ carts, setCarts }) => {

  const totalItems = carts.length;
  const totalPrice = carts
    .reduce((prev, cart) => prev + (cart.price || 0), 0)
    .toFixed(2);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "20px auto",
        padding: "1rem",
        border: "1px solid lightgray",
        borderRadius: "0.5rem",
        boxShadow: "0 0 0.25rem gray",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
          height: "50vh",
          overflowY: "auto",
        }}
      >
        {carts.map((cart) => (
          <Card
            key={cart.id}
            style={{
              margin: "0 auto",
            }}
          >
            <Card.Img
              variant="top"
              src={cart.thumbnailUrl}
              style={{
                height: "150px",
                objectFit: "cover",
              }}
            />
            <Card.Body
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Card.Title>{cart.title}</Card.Title>
              <Card.Text>
                <b>${cart.price ? cart.price.toFixed(2) : "-"}</b>
              </Card.Text>
              <Button
                variant="outline-danger"
                onClick={() =>
                  setCarts(carts.filter((c) => c.id !== cart.id))
                }
              >
                Remove from Carts
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
          fontSize: "1.2rem",
          fontWeight: "500",
        }}
      >
        Products:{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>
          {totalItems} items
        </span>{" "}
        - Total Price:{" "}
        <span style={{ color: "green", fontWeight: "bold" }}>
          ${totalPrice}
        </span>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "15px",
        }}
      >
        <Button variant="warning" style={{ fontWeight: "bold" }}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Carts;
