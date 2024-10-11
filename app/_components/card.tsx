import React from "react";
interface CartProps {
  title: string;
  img: string;
}

const Card: React.FC<CartProps> = ({ title, img }) => {
  return (
    <div className="bg-white overflow-hidden rounded-md shadow-md p-2">
      <img alt="" src={img} className="h-48 w-full object-cover rounded-md" />

      <div className="bg-white pt-4">
        <p className="text-primary text-size22 font-medium">{title}</p>
        <span className="flex items-center my-4">
          <span className="h-px flex-1 bg-[#ddd]"></span>
        </span>
        <div className="flex items-center justify-start">
          <img
            alt=""
            src="/assets/mock-image.png"
            className="h-12 w-12 object-cover rounded-full"
          />
          <h6 className="text-size16 font-medium text-yellow mx-4">
            أ.د / محمد علي
          </h6>
        </div>

        <div className="flex items-center justify-between pt-4 pb-2">
          <span className="text-size16 font-medium text-darkGray">
            11 اكتوبر 2023
          </span>
          <div className="flex items-center">
            <img alt="" src="/assets/eye.svg" className="mx-2" />
            <span className="text-size16 font-medium text-darkGray">440</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;