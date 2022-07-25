import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./picModal.css"
import { EffectCoverflow, FreeMode, Keyboard, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { MDBBtn } from "mdb-react-ui-kit";


export class PicModal extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      currentScr: ''
    }
  }

  slideChange(swiper) {
    let image = swiper.el.querySelectorAll('img');
    let activeScr = image[swiper.activeIndex].src;
    this.setState({ currentScr: activeScr });
  }

  initDownSlider(swiper){
    swiper.slideTo(this.props.activeIndex,3)
  }

  render() {
    return (
      <>
        <div id="myModal" class="modal">
          <div className="modal-image-placeholder">
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
              <SwiperSlide>
                <div className="container">
                  <div className="row">
                    <div className="col-9">
                      <span className="text-white">Image Namw</span>
                    </div>
                    <div className="col-3">
                      <ul class="list-inline d-flex justify-content-end">
                        <li class="list-inline-item"><a href={this.state.currentScr} download class="fas fa-arrow-down fa-lg  text-white" ></a></li>
                        <li class="list-inline-item"><a class="fas fa-share fa-lg  text-white" ></a></li>
                        <li class="list-inline-item"><a onClick={this.props.closeEvent} class="fas fa-times fa-lg  text-white" ></a></li>
                      </ul>

                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <img src={this.state.currentScr !== '' ? this.state.currentScr : this.props.images[this.props.activeIndex]} />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="modal-image-slider">
            <Swiper
              onSlideChange={swiper => this.slideChange(swiper)}
              onAfterInit= {swiper => this.initDownSlider(swiper)}
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
              modules={[EffectCoverflow, Keyboard]}
              className="downSwipe"
            >
              {
                this.props.images.map(image => {
                  return (
                    <SwiperSlide>
                      <img src={image} />
                    </SwiperSlide>
                  );
                })
              }
            </Swiper>
          </div>
        </div>
      </>

    );
  }

}