import React from "react";
import Rx from "rxjs/Rx";
import { rxConnect, ofActions } from "rx-connect";
import { Input, Grid, Button } from "semantic-ui-react";

@rxConnect(() => {
  const actions = {
    click$: new Rx.Subject()
  };

  return [
    Rx.Observable::ofActions(actions),
    actions.click$
      .switchMap(() => Rx.Observable.of({ counter$: 10 }))
      .startWith({ counter$: 1 })
  ];
})
class SearchBar extends React.Component {
  render() {
    const { click, counter$ } = this.props;
    console.log(this.props);

    return (
      <Grid>
        <Grid.Row centered columns={3} style={{ paddingTop: 200 }}>
          <Grid.Column>
            <h1>Search for github Users</h1>
            <div>Type username here:</div>
            <Input placeholder="Search..." fluid style={{ paddingBottom: 2 }} />
            <Button fluid primary onClick={() => click()}>
              Search
            </Button>
            <div>{counter$}</div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default SearchBar;
