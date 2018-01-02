# fsm-hoc
Higher Order Component to introduce Finite State Machine to React Components

The logic is based on [this article](https://css-tricks.com/robust-react-user-interfaces-with-finite-state-machines/).
If you want to fully understand what's happening in this package and why you should use it, definitely read it!

## Installation 
```sh
npm install fsm-hoc --save
```

## Usage

This module provides a function to wrap your components in a finite state machine.
This gives your component to additional props: `status` and `transition`.

The status is the current status of the component.
Transition is a function that takes as first argument `this`, and as second an object with 
`type` key that contains the `Action`.

### Type arguments

#### Props
The Props interface of your component you want to wrap

#### State
The State interface of your component you want to wrap

#### Status
An enum that lists the statuses your component can be in

#### Action
An enum that lists the actions that can be triggered to change a status

### Arguments

#### StatusMachine

This is an object that describes which actions can be triggered on which statuses,
and the status they go into.

```typescript
const statusMachine = {
  [Status.Idle]: {
    [Action.Submit]: Status.Loading,
  },
  [Status.Loading]: {
    [Action.Error]: Status.Error,
    [Action.Success]: Status.Success,
  },
  [Status.Error]: {
    [Action.Submit]: Status.Loading,
  },
};
```

#### Commands

Commands are side-effects that are triggered when a component changes to a new status.

```typescript
const commands = {
  [Status.Error]: (component: React.Component<Props, State>) => {
    // Side effects
    component.setState({ errorMsg: 'Wrong parameters.' });
  },
};
```

#### Initial Status

The status to start in.

### Complete example
```typescript
import { fsm, InjectedProps } from 'fsm-hoc';

enum Status {
  Idle,
  Loading,
  Error,
  Success
}

enum Action {
  Submit, Error, Success
}

const statusMachine = {
  [Status.Idle]: {
    [Action.Submit]: Status.Loading,
  },
  [Status.Loading]: {
    [Action.Error]: Status.Error,
    [Action.Success]: Status.Success,
  },
  [Status.Error]: {
    [Action.Submit]: Status.Loading,
  },
};

const commands = {
  [Status.Error]: (component: React.Component<Props, State>) => {
    // Side effects
    component.setState({ errorMsg: 'Wrong parameters.' });
  },
};

class Form extends React.Component<Props & InjectedProps<Status, Action>, State> {

  ...

  onSubmit() {
    this.props.transition(this, { type: Action.Submit }); 
  }

  render() {
    return (
      ...
      <input 
        type="button" 
        disabled={this.props.status !== Status.Loading}
        onClick={this.onSubmit}
      >
        Submit
      </input>
      ...
    );
  }

  ...

}

export default fsm<Props, State, Status, Action>(statusMachine, commands, Status.Idle)(Form);
```
