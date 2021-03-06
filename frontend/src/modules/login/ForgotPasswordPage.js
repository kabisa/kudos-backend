import { h, Component } from "preact";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Responsive,
} from "semantic-ui-react";
import { route } from "preact-router";
import { Mutation } from "react-apollo";

import { PATH_FEED } from "../../routes";
import { Toolbar } from "../../components/navigation";
import settings from "../../config/settings";
import { MUTATION_REGISTER } from "./queries";

import s from "./style.scss";

class ForgotPasswordPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.confirm = this.confirm.bind(this);
    this.saveUserData = this.saveUserData.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  _handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  _confirm(data) {
    if (data.createUser) {
      this.saveUserData(data.createUser.token);
      route(PATH_FEED, true);
    }
  }

  _saveUserData(token) {
    localStorage.setItem(settings.LOCALSTORAGE_TOKEN, token);
  }

  _formSubmit(e, createUser) {
    e.preventDefault();
    const { name, email, password } = this.state;
    createUser({
      variables: { name, email, password },
    });
  }

  render() {
    return (
      <Mutation
        mutation={MUTATION_REGISTER}
        onCompleted={data => this.confirm(data)}
      >
        {(createUser, { error }) => {
          return (
            <div>
              <Toolbar text="Forgot password" />
              <div className="main-form">
                <Grid
                  textAlign="center"
                  className={s.grid}
                  verticalAlign="middle"
                >
                  <Grid.Column className={s.column}>
                    <Header as="h2" color="blue" textAlign="center">
                      Forgot password
                    </Header>
                    <h1 style={{ color: "red" }}>TODO</h1>
                    <Form
                      size="large"
                      error={error}
                      onSubmit={e => this.formSubmit(e, createUser)}
                    >
                      <Segment stacked>
                        <Form.Input
                          fluid
                          icon="user"
                          name="email"
                          iconPosition="left"
                          placeholder="E-mail address"
                          onChange={this.handleChange}
                        />

                        <Button color="blue" fluid size="large">
                          Reset password
                        </Button>

                        {error && (
                          <Message
                            error={true}
                            header="Unable to register"
                            content="Please check your input fields"
                          />
                        )}
                      </Segment>
                    </Form>
                    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                      <Message className={s.back}>
                        <div onClick={() => window.history.back()}>Back</div>
                      </Message>
                    </Responsive>
                  </Grid.Column>
                </Grid>
              </div>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
export default ForgotPasswordPage;
