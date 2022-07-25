import React from "react";
import { HeaderNavbar } from "../navbar/navbar";
import './gallery.css';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";


// import required modules
import { EffectCoverflow, Keyboard, Pagination } from "swiper";
import { PicModal } from "./picModal/picModal.js";

class Gallery extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            src: '',
            activeIndex: 0,
            images: [],
            albums: [
                {
                    name: 'album1',
                    date: '10/11/2022',
                    images: [
                        'https://swiperjs.com/demos/images/nature-1.jpg',
                        'https://swiperjs.com/demos/images/nature-2.jpg',
                        'https://swiperjs.com/demos/images/nature-3.jpg',
                        'https://swiperjs.com/demos/images/nature-4.jpg',
                    ]
                },
                {
                    name: 'album2',
                    images: [
                        'https://swiperjs.com/demos/images/nature-5.jpg',
                        'https://swiperjs.com/demos/images/nature-6.jpg',
                        'https://swiperjs.com/demos/images/nature-7.jpg',
                        'https://swiperjs.com/demos/images/nature-8.jpg',

                    ]
                }
            ]

        }
    }

    image = [];
    lazyLoad() {
        let scrollTop = window.pageYOffset;
        this.image.forEach(img => {
            if (img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            }
        })

    }
    componentDidMount() {
        this.lazyLoad();
        this.image = document.querySelectorAll('img.lazy');
        document.addEventListener("scroll", () => this.lazyLoad());
        window.addEventListener("resize", () => this.lazyLoad());
        window.addEventListener("orientationChange", () => this.lazyLoad());
    }

    closeModal() {
        this.setState({ showModal: false })
    }

    openModal(index, albumIndex) {
        this.setState({images: this.state.albums[albumIndex].images});
        this.setState({ showModal: true })
        this.setState({ activeIndex: index });
    }

    slideChange(swiper) {
        let image = swiper.el.querySelectorAll('img');
        let activeScr = image[swiper.activeIndex].src;
        this.setState({ src: activeScr });
    }

    renderAlbum() {
        return (
            <>
                {
                    this.state.albums &&
                    this.state.albums.map((album,albumIndex) => {
                        return (
                            <>
                                <li class="timeline-item mb-5">
                                    <span class="timeline-icon">
                                        <i class="fas fa-rocket text-primary fa-sm fa-fw"></i>
                                    </span>

                                    <h5 class="fw-bold">{album.name}</h5>
                                    <p class="text-muted mb-2 fw-bold">{album.date}</p>
                                    <p class="text-muted">
                                        <Swiper
                                            onSlideChange={swiper => this.slideChange(swiper)}
                                            effect={"coverflow"}
                                            grabCursor={true}
                                            centeredSlides={true}
                                            slidesPerView={"auto"}
                                            keyboard={{
                                                enabled: true,
                                            }}
                                            coverflowEffect={{
                                                rotate: 50,
                                                stretch: 0,
                                                depth: 100,
                                                modifier: 1,
                                                slideShadows: true,
                                            }}
                                            pagination={true}
                                            modules={[EffectCoverflow, Pagination, Keyboard]}
                                            className="slideSwiper"
                                        >
                                            {album.images.map((image, index) => {
                                                return (
                                                    <SwiperSlide>
                                                        <img onClick={() => this.openModal(index, albumIndex)} src={image} />
                                                    </SwiperSlide>
                                                );
                                            })}
                                        </Swiper>

                                    </p>
                                </li>
                            </>
                        );
                    })
                }
            </>
        );
    }

    render() {
        return (
            <>
                {this.state.showModal ? <PicModal images={this.state.images} activeIndex={this.state.activeIndex} closeEvent={() => this.closeModal()} /> :
                    <>
                        <HeaderNavbar />
                        <section className="gallery">
                            <ul class="timeline-with-icons">
                                {this.renderAlbum()}
                            </ul>
                        </section>
                    </>
                }
            </>
        );
    }
}

export default Gallery;