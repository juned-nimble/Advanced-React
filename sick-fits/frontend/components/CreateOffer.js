import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { ACTIVE_OFFERS_QUERY } from "./OfferList";

const CREATE_OFFER_MUTATION = gql`
  mutation CREATE_OFFER_MUTATION(
    $discount: Int!
    $code: String!
    $title: String!
    $description: String
    $availCount: Int!
    $availOn: DateTime!
    $expireOn: DateTime!
  ) {
    createOffer(
      discount: $discount
      code: $code
      title: $title
      description: $description
      availCount: $availCount
      availOn: $availOn
      expireOn: $expireOn
    ) {
      code
    }
  }
`;

class CreateOffer extends Component {
  state = {
    code: "",
    discount: 0,
    title: "",
    description: "",
    availCount: 1,
    availOn: "",
    expireOn: ""
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    let { me } = this.props;
    if (!me || !me.permissions.includes("ADMIN")) return null;
    return (
      <Mutation
        mutation={CREATE_OFFER_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: ACTIVE_OFFERS_QUERY }]}
      >
        {(createOffer, { loading, error }) => (
          <Form
            data-test="form"
            onSubmit={async e => {
              e.preventDefault();
              const res = await createOffer();
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter A Description"
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="discount">
                Discount %
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  placeholder="Discount"
                  required
                  value={this.state.discount}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="availCount">
                How many time it can be use?
                <input
                  type="number"
                  id="availCount"
                  name="availCount"
                  placeholder="availCount"
                  required
                  value={this.state.availCount}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="Code">
                Code
                <input
                  id="code"
                  name="code"
                  placeholder="Enter A Code"
                  required
                  value={this.state.code}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="availOn">
                Available from
                <input
                  id="availOn"
                  name="availOn"
                  placeholder="Enter date (yyyy-mm-dd)"
                  required
                  value={this.state.availOn}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="expireOn">
                Expire on
                <input
                  id="expireOn"
                  name="expireOn"
                  placeholder="Enter date (yyyy-mm-dd)"
                  required
                  value={this.state.expireOn}
                  onChange={this.handleChange}
                />
              </label>

              <button type="submit">Create New Offer</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateOffer;
export { CREATE_OFFER_MUTATION };
