import React from "react";
import Rx from "rxjs/Rx";
import { rxConnect, ofActions } from "rx-connect";
import {
  Input,
  Grid,
  Button,
  Header,
  Segment,
  Image,
  Message
} from "semantic-ui-react";

const API = "https://api.github.com/users/";
const errors = {
  0: "The Id you are looking for is not existent. We apologise.",
  1: "Please provide numbers"
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
          .catch(() => Rx.Observable.of({ error: { message: errors[0] } }));

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
                    link:{" "}
                    <a href={data.url} target="_blank">
                      {data.url}
                    </a>
                  </Header>
                  <Image fluid centered src={data.avatar_url} />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          )}
      </Grid>
    );
  }
}

export default SearchBar;
