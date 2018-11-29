import React from "react";
import { Query } from "react-apollo";
import { format } from "date-fns";
import styled from "styled-components";
import gql from "graphql-tag";
import Error from "./ErrorMessage";
import OfferItemStyles from "./styles/OfferItemStyles";

const today = format(new Date(), "yyyy-MM-dd");

const ACTIVE_OFFERS_QUERY = gql`
  query ACTIVE_OFFERS_QUERY($today: DateTime = "${today}") {
    offers(where: { expireOn_gte: $today }, orderBy: createdAt_ASC) {
      id
      title
      description
      code
      discount
      availCount
      availOn
      expireOn
    }
  }
`;

const OfferUl = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: 1fr;
`;

class OfferList extends React.Component {
  render() {
    return (
      <Query query={ACTIVE_OFFERS_QUERY}>
        {({ data: { offers }, loading, error }) => {
          if (loading) return <p>loading...</p>;
          if (error) return <Error erorr={error} />;
          return (
            <div>
              <h2>
                Currently {offers.length} active offer
                {offers.length > 1 ? "s" : ""}
              </h2>

              <OfferUl>
                {offers.map(offer => (
                  <OfferItemStyles key={offer.id}>
                    <h2>
                      <span className="code">{offer.code}</span>
                      <span className="title">{offer.title}</span>
                      {/* <span className="discount">{offer.discount}</span> */}
                    </h2>
                    <div className="description">{offer.description}</div>
                    <div className="date-container">
                      Valid upto -
                      <span className="date-badge">
                        {format(offer.availOn, "dd-MMM-YYYY")}{" "}
                      </span>
                      to
                      <span className="date-badge">
                        {format(offer.expireOn, "dd-MMM-YYYY")}{" "}
                      </span>
                    </div>
                  </OfferItemStyles>
                ))}
              </OfferUl>
            </div>
          );
        }}
      </Query>
    );
  }
}

export { ACTIVE_OFFERS_QUERY };
export default OfferList;
