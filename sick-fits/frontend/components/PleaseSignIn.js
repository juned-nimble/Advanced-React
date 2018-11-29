import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import Signin from "./Signin";

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data.me) {
        return (
          <div>
            <p>Please Sign In before Continuing</p>
            <Signin />
          </div>
        );
      }
      //pass login user detail to each children
      //so we dont require to query it in each component
      return React.Children.map(props.children, child =>
        React.cloneElement(child, { me: data.me })
      );
    }}
  </Query>
);

export default PleaseSignIn;
