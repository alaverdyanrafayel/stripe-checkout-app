// @flow
import AuthUserSelector from '../modules/auth-user/AuthUserSelector';

export default (state: Object, all: boolean = true, modules: Array<string> = []) => {
    if (all) {
        return {
            ...AuthUserSelector(state),
        };
    }

    let stateInProps = {};

    if (modules.includes('auth-user')) {
        stateInProps = Object.assign({}, stateInProps, { ...AuthUserSelector(state) });
    }

    return stateInProps;
};
