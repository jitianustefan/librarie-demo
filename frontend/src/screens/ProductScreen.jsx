import React from 'react';
import { useParams} from "react-router-dom";
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useGetProductsDetailsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = () => {
    const { id: productId } = useParams();
    const { data: product, isLoading, error} = useGetProductsDetailsQuery(productId);
    //const [product, setProduct] = useState({});
    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         const { data } = await axios.get(`/api/products/${productId}`);
    //         setProduct(data);
    //     }

    //     fetchProduct();
    // }, [productId]);

  return <>
    <Link className="btn btn-light my-3" to="/">Inapoi</Link>
    { isLoading ? 
    ( <Loader /> ) 
    : error ? 
    (
      <Message variant='danger'>{error?.data?.message || error.error}</Message>
    ) : 
    (
        <Row>
        <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>
                    Pret: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                    Descriere: {product.description}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>Pret:</Col>
                            <Col>
                                <strong>${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Status:</Col>
                            <Col>
                                <strong>{product.countInStock > 0 ? 'In stoc' : 'Stoc epuizat'}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button
                            className='btn-black'
                            type='button'
                            disabled={product.countInStock ===0}
                        >Adauga in cos
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
    )}
</>;
}

export default ProductScreen