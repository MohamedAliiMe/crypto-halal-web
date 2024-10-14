import React from "react";
interface CardProps {
  item: any;
}

const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <div className="bg-white overflow-hidden rounded-md shadow-md p-2">
      <img
        alt=""
        src={item?.image}
        className="w-full h-[140px] object-cover rounded-md"
      />

      <div className="bg-white pt-6">
        <p className="text-primary text-[14px] md:text-size22 font-medium">
          {item?.title}
        </p>
        <span className="flex items-center my-4">
          <span className="h-px flex-1 bg-[#ddd]"></span>
        </span>
        <div className="flex items-center justify-start">
          <img
            alt=""
            src={item?.lecturer?.image}
            className="h-6 w-6 md:h-12 md:w-12 object-cover rounded-full"
          />
          <h6 className="text-[12px] md:text-size16 font-medium text-yellow mx-4">
            {item?.lecturer?.name}
          </h6>
        </div>

        <div className="flex items-center justify-between pt-4 pb-2">
          <span className="text-[12px] md:text-size16 font-medium text-darkGray">
            {item?.date}
          </span>
          <div className="flex items-center">
            <img alt="" src="/assets/eye.svg" className="mx-2" />
            <span className="text-[12px] md:text-size16 font-medium text-darkGray">
              {item?.views}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
