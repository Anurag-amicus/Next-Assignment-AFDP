export type ApiResult<T> =
    | {
        success: true;
        data: T;
    }
    | {
        success: false;
        error: string;
    };

export interface ApiRequestOptions extends RequestInit {
    authorize?: boolean;
    _retried?: boolean;
}