import React from "react";
import { HeaderNavbar } from "../navbar/navbar";
import './gallery.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { service } from "../../service/ServiceContext";

// import required modules
import { EffectCoverflow, Grid, Keyboard, Pagination } from "swiper";
import { PicModal } from "./picModal/picModal.js";

class Gallery extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            isGridView: true,
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

    componentDidMount() {
        this.context.galleryService.getGallery().then(gallery => {
            this.setState({ albums: gallery });
        });
    }

    closeModal() {
        this.setState({ showModal: false })
    }

    openModal(index, albumIndex) {
        this.setState({ images: this.state.albums[albumIndex].image });
        this.setState({ showModal: true })
        this.setState({ activeIndex: index });
    }

    slideChange(swiper) {
        let image = swiper.el.querySelectorAll('img');
        let activeScr = image[swiper.activeIndex].src;
        this.setState({ src: activeScr });
    }

    renderAlbumInGrid(album, albumIndex) {
        return (
            <>
                <div class="container">
                    <div class = "row">
                    {album.image && album.image.map((image, index) => {
                        return (<>
                                {image.isImage && <div class="col-4 col-lg-3">
                                    <img class="m-2" onClick={() => this.openModal(index, albumIndex)} src={image.src} alt={image.alt} role={image.role} /></div>
                                }
                        </>
                        );
                    })}
                    </div>
                </div>
            </>
        );
    }

    renderAlbumInCoverflow(album, albumIndex) {
        return (
            <>
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
                    {album.image && album.image.map((image, index) => {
                        return (
                            <SwiperSlide key={index}>
                                {image.isImage &&
                                    <img onClick={() => this.openModal(index, albumIndex)} src={image.src} alt={image.alt} role={image.role} />
                                }
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </>
        );
    }

    renderAlbum() {
        return (
            <>
                {
                    this.state.albums &&
                    this.state.albums.map((album, albumIndex) => {
                        return (
                            <>
                                <li key={albumIndex} class="timeline-item mb-5">
                                    <span class="timeline-icon">
                                        <i class="fas fa-rocket text-primary fa-sm fa-fw"></i>
                                    </span>

                                    <h5 class="fw-bold">{album.name}</h5>
                                    <p class="text-muted mb-2 fw-bold">{album.date}</p>
                                    <p class="text-muted">
                                        {this.state.isGridView ? this.renderAlbumInGrid(album, albumIndex) : this.renderAlbumInCoverflow(album, albumIndex)}
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
                {this.state.showModal ?
                    <PicModal images={this.state.images} activeIndex={this.state.activeIndex} closeEvent={() => this.closeModal()} /> :
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
Gallery.contextType = service;
export default Gallery;

