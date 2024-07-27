import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Department.css";

const Department = () => {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/ortho.jpg",
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
    },
    {
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
    },
  ];
  // const responsive = {
  //   desktop: {
  //     breakpoint: {
  //       max: 3000,
  //       min: 1024,
  //     },
  //     items: 3,
  //     partialVisibilityGutter: 40,
  //   },
  //   mobile: {
  //     breakpoint: {
  //       max: 464,
  //       min: 0,
  //     },
  //     items: 1,
  //     partialVisibilityGutter: 30,
  //   },
  //   tablet: {
  //     breakpoint: {
  //       max: 1024,
  //       min: 464,
  //     },
  //     items: 2,
  //     partialVisibilityGutter: 30,
  //   },
  // };

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1,
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1,
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1,
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="departments">
      <h2>Departments</h2>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        customTransition="transform 1000ms ease-in-out"
        transitionDuration={1000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="carousel-item-padding-40-px"
      >
        {departmentsArray.map(({ name, imageUrl }, i) => {
          return (
            <div key={i} className="card">
              <div className="depart-name">{name}</div>
              <img src={imageUrl} alt={name} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Department;
