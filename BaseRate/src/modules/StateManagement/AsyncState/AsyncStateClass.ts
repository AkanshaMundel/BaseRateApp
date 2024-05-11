export default class AsyncStateClass {
    state: AsyncState = {
        status: 'dormant',
        message: '',
    };

    static getPlainAsyncState({
        status = 'dormant',
        message = '',
        meta,
    }: AsyncStateFactory<undefined> = {}) {
        return { status, message, meta };
    }

    constructor(state?: AsyncState) {
        if (state) this.state = state;
    }

    isLoading() {
        return this.state.status === 'initialized';
    }

    hasFailed() {
        return this.state.status === 'failed';
    }

    isDormant() {
        return this.state.status === 'dormant';
    }

    isSuccessful() {
        return this.state.status === 'success';
    }

    getMessage() {
        return this.state.message;
    }

    setStatus(status: AsyncStatus) {
        this.state.status = status;
    }

    setLoading() {
        this.setStatus('initialized');
    }

    setDormant() {
        this.setStatus('dormant');
    }

    setSuccess() {
        this.setStatus('success');
    }

    setFailed() {
        this.setStatus('failed');
    }
}
