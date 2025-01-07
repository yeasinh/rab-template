"use client";

import "./Banner.scss";

import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useEffect } from "react";
import Slider from "react-slick";
import { useAppDispatch } from "@lib/hooks";
import { RootState } from "@lib/root.reducer";
import { useSelector } from "react-redux";
import { FetchStatusEnum } from "@lib/services/fetch.type";
import {
  MediaType,
  MediaTypes,
  PublishTypes,
} from "@lib/services/media/media.service.type";
import { mediaActions } from "@lib/slices/media/media.slice";

const Banner = () => {
  const dispatch = useAppDispatch();

  const media = useSelector(
    (state: RootState) => state.media.getMediaResponse?.findAllMedia
  )
    ?.filter((mediaItem) => mediaItem.mediaType === MediaTypes.SLIDER)
    ?.filter((m) => m?.isPublished === PublishTypes.YES);

  const mediaFetchStatus = useSelector(
    (state: RootState) => state.media.getMediaFetchStatus
  );

  const isEnglish = useSelector((state: RootState) => state.language.isEnglish);

  const checkIfVideo = (sliderFilePath: string) => {
    if (sliderFilePath.match(".mp4")) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    dispatch(
      mediaActions.getMediaFetch({
        request: {
          page: 0,
          limit: 50,
        },
      })
    );
  }, [dispatch]);

  return (
    <>
      <section className="banner-area menu-fix-margin-top">
        <Slider
          dots={true}
          infinite={media && media.length < 3 ? false : true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay={false}
          autoplaySpeed={3000}
          nextArrow={
            <Icon icon="ri:arrow-right-s-line" width="16px" height="16px" />
          }
          prevArrow={
            <Icon icon="ri:arrow-left-s-line" width="16px" height="16px" />
          }
        >
          {mediaFetchStatus ===
            (FetchStatusEnum.FAILURE || FetchStatusEnum.IDLE) && (
            <div>
              <div className="banner-img">
                <video autoPlay loop muted style={{ width: "100%" }}>
                  <source src="/videos/rab-banner-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag...
                </video>

                <div className="banner-text">
                  <div className="banner-text-content">
                    <h3>
                      {isEnglish
                        ? "We are committed to establishing criminal repression and peace"
                        : "অপরাধী দমন ও শান্তি প্রতিষ্ঠায় আমরা প্রতিশ্রুতিবদ্ধ"}
                    </h3>
                    <p>
                      {isEnglish
                        ? "Rapid Action Battalion (RAB)"
                        : "র‌্যাপিড এ্যাকশন ব্যাটালিয়ন (র‌্যাব)"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {mediaFetchStatus === FetchStatusEnum.SUCCESS &&
            media.length > 0 &&
            media.map((s: MediaType, index: number) => {
              return (
                <div>
                  <div className="banner-img">
                    {checkIfVideo(s.mediaFilePath) && (
                      <video autoPlay loop muted style={{ width: "100%" }}>
                        <source src={s.mediaFilePath} type="video/mp4" />
                      </video>
                    )}
                    {!checkIfVideo(s.mediaFilePath) && (
                      <Image
                        src={s.mediaFilePath}
                        alt="BannerImg"
                        width={100}
                        height={100}
                      />
                    )}
                    <div className="banner-text">
                      <div className="banner-text-content">
                        <h3>{isEnglish ? s.titleEn : s.titleBn}</h3>
                        <p>{isEnglish ? s.subTitleEn : s.subTitleBn}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </Slider>
      </section>
    </>
  );
};

export default Banner;
