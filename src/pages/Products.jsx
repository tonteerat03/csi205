import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Products = ({ products, carts, setCarts }) => {
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
                {products.map((product) => (
                    <Card
                        key={product.id}
                        style={{
                            margin: "0 auto",
                        }}
                    >
                        <Card.Img
                            variant="top"
                            src={product.thumbnailUrl}
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
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Text>
                                <b>${product.price ? product.price.toFixed(2) : "-"}</b>
                            </Card.Text>

                            {carts.find((cart) => cart.id === product.id) ? (
                                <span className="badge bg-danger">Added to Carts</span>
                            ) : (
                                <Button
                                    variant="outline-primary"
                                    onClick={() => setCarts([...carts, product])}
                                >
                                    Add to Carts
                                </Button>
                            )}


                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Products;
