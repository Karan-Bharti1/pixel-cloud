import Carousel from 'react-bootstrap/Carousel';
import { carouselImageOneUrl, carouselImageThreeUrl, carouselImageTwoUrl } from '../src/url';

function CarouselCard() {
  return (
    <Carousel interval={2000}>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img-small"
        src={carouselImageOneUrl}
          alt="Pixel Cloud"
        />
        <Carousel.Caption>
          <h3>Upload Your Photos</h3>
          <p>Quickly upload and organize your pictures in one place.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img-small"
         src={carouselImageTwoUrl}
          alt="Pixel Cloud"
        />
        <Carousel.Caption>
    <h3>Create Beautiful Albums</h3>
          <p>Group your memories with custom album covers and names.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img-small"
         src={carouselImageThreeUrl}
          alt="Pixel Cloud"
        />
        <Carousel.Caption>
          <h3>Access from Anywhere</h3>
          <p>View and share your photos from any device, anytime.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselCard;
