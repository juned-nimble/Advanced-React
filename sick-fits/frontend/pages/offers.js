import CreateOffer from "../components/CreateOffer";
import PleaseSignIn from "../components/PleaseSignIn";
import OfferList from "../components/OfferList";

const Offers = props => (
  <div>
    <PleaseSignIn>
      <CreateOffer />
      <OfferList />
    </PleaseSignIn>
  </div>
);

export default Offers;
