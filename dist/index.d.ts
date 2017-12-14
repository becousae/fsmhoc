import * as React from 'react';
export interface Action<T> {
    type: T;
}
export interface InjectedProps<S, A> {
    transition: (component: React.Component, action: Action<A>) => void;
    status: S;
}
export default function fsm<Props, State, Status, ActionType>(statusMachine: any, commands: any, initialStatus: Status): (Component: any) => {
    new (props: Props): {
        transition(component: any, action: Action<ActionType>): void;
        command(nextStatus: Status, action: Action<ActionType>): void;
        render(): any;
    };
    displayName: string;
};
