import "./AdsBanner.scss";
import AdsBannerImg from "../../assets/images/ads-banner.jpg";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAppDispatch } from "@lib/hooks";
import { RootState } from "@lib/root.reducer";
import { useSelector } from "react-redux";
import { PublishStatus } from "@lib/services/banner/banner.service.type";
import { bannerActions } from "@lib/slices/banner/banner.slice";

const AdsBanner = () => {
  const dispatch = useAppDispatch();

  const banners = useSelector(
    (state: RootState) => state.banner.getBannerResponse?.findAllAddsBanner
  );

  useEffect(() => {
    dispatch(
      bannerActions.getBannerFetch({
        request: {
          page: 0,
          limit: 50,
        },
      })
    );
  }, [dispatch]);

  const banner = banners?.find((bn) => bn.isPublished === PublishStatus.YES);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    isVisible &&
    banner && (
      <div className="ads_banner">
        <div className="ads_content">
          <Image
            width={834}
            height={472}
            src={banner?.bannerFilePath}
            alt="AdsBanner"
            className="ads_content__image"
            // style={{ width: "80%", height: "auto" }}
          />
          <button onClick={handleClose} className="close_button">
            x
          </button>
        </div>
      </div>
    )
  );
};

export default AdsBanner;
