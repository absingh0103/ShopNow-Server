import React from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector } from "react-redux";
import { selectSearchedProducts } from "../productSlice";

const data = [
  "https://images-eu.ssl-images-amazon.com/images/G/31/img17/AmazonBusiness/JanArt/Gateway/MainBanner_1242_450_1701.jpg",
  "https://m.media-amazon.com/images/G/31/img21/shoes/2023/June/MFD/Herotater/HERO_MEN_WOMEN-2._SX3000_QL85_.jpg",
  "https://static-assets.business.amazon.com/assets/in/2nd-may-2023/1104_AB_MayART_Starts_Hero_2880x960%20(3).jpg.transform/2880x960/image.jpg",
  "https://images-na.ssl-images-amazon.com/images/G/31/img22/Fashion/Event/MayART/Eventpage/AFpage/Header/V1/pc-headers-may-art._CB620973202_.gif",
  "https://cdn0.desidime.com/cdn-cgi/image/fit=contain,f=auto,onerror=redirect,w=1349,h=285,q=90/attachments/photos/776626/original/afwrSale.png",

  "https://feeds.abplive.com/onecms/images/uploaded-images/2023/01/03/3155af0868504bb9f60ef86fd72740791672742403225256_original.jpg",

  "https://m.media-amazon.com/images/G/31/img21/shoes/2023/AfterPD/Hero/ewd._SX3000_QL85_.jpg",
  "https://rukminim1.flixcart.com/fk-p-flap/1600/280/image/a2c4c95d52ebc71f.png?q=50",
  "https://rukminim2.flixcart.com/fk-p-flap/1600/280/image/1e4d95bb4aed0afe.jpg?q=50",
  "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/84f7864000cb3f6b.png?q=50",
];

// Using ->>  react-material-ui-carousel and mui styles

const ProductBanner = () => {
  const searchedProducts = useSelector(selectSearchedProducts);

  const changeMargin = () => {
    if (searchedProducts.length > 0) {
      return;
    } else {
      return "-mt-12";
    }
  };
  return (
    <div
      className={`${changeMargin()} bg-gradient-to-r from-rose-100 to-teal-100`}
    >
      <div className="lg:pt-5  max-w-7xl mx-auto ">
        <Carousel
          autoPlay={true}
          animation="slide"
          indicators={false}
          cycleNavigation={true}
          navButtonsProps={{
            style: {
              color: "#494949",
              backgroundColor: "#fff",
              borderRadius: 0,
              marginTop: -22,
              height: "104px",
            },
          }}
        >
          {data.map((img, index) => {
            return (
              <>
                <img
                  src={img}
                  alt="banner"
                  className=" w-full lg:h-72  h-44  lg:rounded-md  "
                />
              </>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductBanner;
