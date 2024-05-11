type AsyncStatus = "dormant" | "initialized" | "success" | "failed";

interface AsyncState<T = any> {
    status: AsyncStatus;
    message: string;
    meta?: T;
}

interface AsyncStateFactory<T> {
    status?: AsyncStatus;
    message?: string;
    meta?: T;
}