import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <section className="cta">
      <p className="cta-text">
        Are You Ready for Collabration and <br className="sm:block hidden" />
        Let’s build something together!
      </p>
      <Link to="/contact" className="btn">
        Contact
      </Link>
    </section>
  );
};
