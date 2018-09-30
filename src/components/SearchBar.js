import React from "react";
import Rx from "rxjs/Rx";
import { rxConnect, ofActions } from "rx-connect";
import {
  Input,
  Grid,
  Header,
  Segment,
  Image,
  Message
} from "semantic-ui-react";
import PT from "prop-types";

const API = "https://api.github.com/users/";
const errors = {
  0: "The user you are looking for is not existent.",
  1: "You exceeded the limit of possible searches. Ask github why."
};

@rxConnect(() => {
  const actions = {
    type$: new Rx.Subject()
  };

  return [
    Rx.Observable::ofActions(actions),
    actions.type$.flatMap(text => {
      if (text[0].length)
        return Rx.Observable.ajax
          .getJSON(`${API}${text}`)
          .switchMap(res => Rx.Observable.of({ data: res, error: {} }))
          .catch(error => {
            let message;

            if (error.status === 403) message = errors["1"];
            else message = errors["0"];
            Rx.Observable.of({ error: { message } });
          });

      return Rx.Observable.of({ data: {} });
    })
  ];
})
class SearchBar extends React.Component {
  render() {
    const { type, error, data } = this.props;
    return (
      <Grid>
        <Grid.Row centered columns={2} style={{ paddingTop: 50 }}>
          <Grid.Column>
            <Header as="h1">Search for in database</Header>
            <div style={{ paddingBottom: 3 }}>Type album ID:</div>
            <Input
              placeholder="Search..."
              focus
              fluid
              onChange={e => type(e.target.value)}
            />

            {error &&
              error.message && <Message color="red">{error.message}</Message>}
          </Grid.Column>
        </Grid.Row>
        {data &&
          data.id &&
          !error.message && (
            <Grid.Row centered columns={2}>
              <Grid.Column>
                <Segment>
                  <Header as="h2">{data.login}</Header>
                  <Header as="h4">
                    profile: &nbsp;
                    <a href={data.url} target="_blank" rel="noopener noreferrer">
                      {data.url}
                    </a>
                  </Header>
                  <a href={data.url} target="_blank" rel="noopener noreferrer">
                    <Image fluid centered src={data.avatar_url} />
                  </a>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          )}
      </Grid>
    );
  }
}

SearchBar.PT = {
  type: PT.func,
  error: PT.shape({}),
  data: PT.shape({})
};

export default SearchBar;
