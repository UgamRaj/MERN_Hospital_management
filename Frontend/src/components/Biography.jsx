const Biography = ({ imageUrl }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="about" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who we are</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora
          asperiores autem, cupiditate inventore sed qui rem. Ut, id quaerat.
          Laboriosam corrupti blanditiis, consequuntur dicta eligendi nobis
          excepturi itaque explicabo corporis?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam earum
          placeat dolor reiciendis fugit et.
        </p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae
          vitae nihil, deleniti porro iusto suscipit recusandae delectus
          deserunt quos ad ipsum modi nam. Fugiat ullam optio minus debitis nemo
          cum.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi
          explicabo veniam sunt natus rerum magnam.
        </p>
      </div>
    </div>
  );
};

export default Biography;
