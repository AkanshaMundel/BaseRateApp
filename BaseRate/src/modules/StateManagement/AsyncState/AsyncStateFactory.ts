export default function AsyncStateFactory<T = undefined>({
    status = "dormant",
    message = "",
    meta,
}: AsyncStateFactory<T> = {}) {
    return { status, message, meta }
}