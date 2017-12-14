import * as React from 'react';

interface Action<T> {
  type: T;
}

export interface InjectedProps<S, A> {
  transition: (component: React.Component, action: Action<A>) => void;
  status: S;
}

export default function fsm<Props, State, Status, ActionType>(
  // tslint:disable-next-line: no-any
  statusMachine: any,
  // tslint:disable-next-line: no-any
  commands: any,
  initialStatus: Status
) {
  interface WrapperState {
    status: Status;
  }

  type CAction = Action<ActionType>;
  type CProps = InjectedProps<Status, CAction>;

  // tslint:disable-next-line: no-any
  return (Component: React.ComponentClass<any>) => {
    return class extends React.Component<Props, WrapperState> {
      static displayName = 'FSM';

      constructor(props: Props) {
        super(props);
        this.state = {
          status: initialStatus,
        };
        this.transition = this.transition.bind(this);
      }

      transition(component: React.Component<Props & CProps, State>, action: CAction) {
        const currentState = this.state.status;
        const nextStatus = statusMachine[currentState][action.type];

        if (nextStatus) {
          this.command.bind(component)(nextStatus, action);
          this.setState({
            status: nextStatus
          });
        }
      }

      command(nextStatus: Status, action: CAction) {
        const command = commands[nextStatus];
        if (command) {
          command(this);
        }
      }

      render() {
        return (
          <Component transition={this.transition} status={this.state.status} {...this.props} />
        );
      }
    };
  };
}
