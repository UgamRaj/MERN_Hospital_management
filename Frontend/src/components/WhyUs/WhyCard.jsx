const WhyCard = ({ imgUrl, titleH6, para }) => {
  return (
    <div className="whyCardMain">
      <div className="imgCard">
        <img src={imgUrl} alt="cardio" />
      </div>
      <div className="textCard">
        <h6>{titleH6}</h6>
        <p>{para}</p>
      </div>
    </div>
  );
};

export default WhyCard;
